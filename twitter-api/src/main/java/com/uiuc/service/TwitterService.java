package com.uiuc.service;

import com.twitter.hbc.ClientBuilder;
import com.twitter.hbc.core.Client;
import com.twitter.hbc.core.Constants;
import com.twitter.hbc.core.Hosts;
import com.twitter.hbc.core.HttpHosts;
import com.twitter.hbc.core.endpoint.StatusesFilterEndpoint;
import com.twitter.hbc.core.processor.StringDelimitedProcessor;
import com.twitter.hbc.httpclient.auth.Authentication;
import com.twitter.hbc.httpclient.auth.OAuth1;
import com.uiuc.util.ApplicationProperties;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
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
    private static int count = 0;

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
            int count = 0;
            while (!twitterClient.isDone()) {
                if(count < 30){
                    log.info("Polling Message with count --> "+count);
                    msg = Optional.ofNullable(msgQueue.poll(2, TimeUnit.SECONDS));
                    if(msg.isPresent()){
                        count++;
                        //log.info("Sending Message : "+msg.get());
                        JSONParser parser = new JSONParser();
                        JSONObject root = (JSONObject) parser.parse(msg.get());
                        String tweet = (root.get("text").toString());
                        log.info(root.get("text").toString());
                        writeToFile(tweet);
                    }
                }else {
                    break;
                }
            }
        } catch (InterruptedException | ParseException | IOException e) {
            log.error("Error Occurred : ",e);
            twitterClient.stop();
        } finally {
            twitterClient.stop();
        }
    }

    public static void writeToFile(ArrayList<String> contents) throws IOException {

        File fout = new File("C:/Users/dipta/OneDrive/Documents/MCS/CS 410/CourseProject/file-read-api/search.txt");
        boolean exists = fout.exists();
        if(exists){
            fout.delete();
        }
        FileOutputStream fos = new FileOutputStream(fout);

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));
        contents.forEach(content -> {
            try {
                bw.write(content);
                bw.newLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        bw.close();
    }

    public static void writeToFile(String content) throws IOException {
//        File fout = new File("C:/Users/dipta/OneDrive/Documents/MCS/CS 410/CourseProject/file-read-api/monitor.txt");
//        boolean exists = fout.exists();
//        if(exists){
//            log.info("Deleting ------------------------------>>>>>>>>>");
//            fout.delete();
//        }
        log.info("Writing in file ------------>>");
        Files.write(Paths.get("C:/Users/dipta/OneDrive/Documents/MCS/CS 410/CourseProject/file-read-api/monitor.txt"),
                (content+System.lineSeparator()).getBytes(), StandardOpenOption.APPEND);
    }
}
