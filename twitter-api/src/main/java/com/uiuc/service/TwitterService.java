package com.uiuc.service;

import com.google.common.collect.Lists;
import com.twitter.hbc.ClientBuilder;
import com.twitter.hbc.core.Client;
import com.twitter.hbc.core.Constants;
import com.twitter.hbc.core.Hosts;
import com.twitter.hbc.core.HttpHosts;
import com.twitter.hbc.core.endpoint.StatusesFilterEndpoint;
import com.twitter.hbc.core.processor.StringDelimitedProcessor;
import com.twitter.hbc.httpclient.auth.Authentication;
import com.twitter.hbc.httpclient.auth.OAuth1;
import com.uiuc.model.Tweet;
import com.uiuc.util.ApplicationProperties;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

/*
 * Github : https://github.com/twitter/hbc
 * */
@Slf4j
public class TwitterService {

    public static Client createTwitterClient(BlockingQueue<String> msgQueue, ArrayList<String> hashTagsList){

        Hosts twitterHosts = new HttpHosts(Constants.STREAM_HOST);
        StatusesFilterEndpoint twitterEndpoint = new StatusesFilterEndpoint();
        List<String> terms = hashTagsList;
        twitterEndpoint.trackTerms(terms);

        ClientBuilder builder = new ClientBuilder()
                .name("Twitter-Client-01")
                .hosts(twitterHosts)
                .authentication(getAuthentication())
                .endpoint(twitterEndpoint)
                .processor(new StringDelimitedProcessor(msgQueue));

        Client twitterClient = builder.build();

        return twitterClient;
    }

    private static Authentication getAuthentication(){
        final HashMap<String, String> properties = ApplicationProperties.getProperties();
        log.info("App Properties : "+properties);
        return new OAuth1(properties.get("twitterApiKey"), properties.get("twitterApiSecretKey"),properties.get("twitterAccessToken"), properties.get("twitterAccessTokenSecret"));
    }

    public static void run(ArrayList<String> hashTagsList){
        BlockingQueue<String> msgQueue = new LinkedBlockingQueue<String>(1000);
        Client twitterClient = createTwitterClient(msgQueue, hashTagsList);
        Optional<String> msg;
        try {
            twitterClient.connect();

            while (!twitterClient.isDone()) {
                log.info("Polling Message -->");
                msg = Optional.ofNullable(msgQueue.poll(2, TimeUnit.SECONDS));
                if(msg.isPresent()){
                    log.info("Sending Message : "+msg.get());
                    JSONParser parser = new JSONParser();
                    JSONObject root = (JSONObject) parser.parse(msg.get());
                    writeToFile(root.get("text").toString());
                }
            }
        } catch (InterruptedException | ParseException | IOException e) {
            log.error("Error Occurred : ",e);
            twitterClient.stop();
        } finally {
            twitterClient.stop();
        }
    }

    private static void writeToFile(String content) throws IOException {
        Path path = Paths.get("C:/Users/dipta/OneDrive/Documents/MCS/CS 410/CourseProject/file-read-api/output.txt");
        Files.write(path, content.getBytes(), StandardOpenOption.APPEND);
    }
}
