package com.uiuc.controller;

import com.twitter.hbc.core.Client;
import com.uiuc.model.Response;
import com.uiuc.model.Tweet;
import com.uiuc.service.TwitterService;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.toCollection;

@RestController
@Slf4j
public class TwitterController {

    @GetMapping(value = "/tweets/hashtags/{hashtags}")
    public Response streamTweets(@PathVariable String[] hashtags){
        ArrayList<String> tweets = new ArrayList<>();
        Response response = new Response("Success", "None");
       final ArrayList<String> hashTagsList = Arrays.stream(hashtags).map(e -> '#' + e).collect(toCollection(ArrayList::new));
       System.out.println(hashTagsList);
        try {
            TwitterService.run(hashTagsList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    @GetMapping("/tweets/{type}/keyword/{keyword}")
    public Response getTweets(@PathVariable String type, @PathVariable String keyword){

        String bearerToken = "AAAAAAAAAAAAAAAAAAAAADUyKQEAAAAAAY45t5wm0Vu4G05Oiv%2FWWP22ab4%3DXRYG1KfP77zdEZHjLKtDluiB6gYkw4N3nJGrK1P5FMXcjJTtGM";
        String searchResponse = null;
        Response response = null;
        ArrayList<Tweet> tweetList = new ArrayList<>();
        ArrayList<String> tweets = new ArrayList<>();

        HttpClient httpClient = HttpClients.custom()
                .setDefaultRequestConfig(RequestConfig.custom()
                        .setCookieSpec(CookieSpecs.STANDARD).build())
                .build();

        StringBuilder uri = new StringBuilder().append("https://api.twitter.com/1.1/search/tweets.json?q=%23").append(keyword).append("&result_type=").append(type).append("&count=100&lang=en");
        log.info(uri.toString());


        try {

            URIBuilder uriBuilder = new URIBuilder(uri.toString());
            HttpGet httpGet = new HttpGet(uriBuilder.build());
            httpGet.setHeader("Authorization", String.format("Bearer %s", bearerToken));
            httpGet.setHeader("Content-Type", "application/json");

            HttpResponse httpResponse = httpClient.execute(httpGet);
            HttpEntity entity = httpResponse.getEntity();
            if (null != entity) {
                searchResponse = EntityUtils.toString(entity, "UTF-8");
                //System.out.println(searchResponse);
                JSONParser parser = new JSONParser();
                JSONObject root = (JSONObject) parser.parse(searchResponse);
                JSONArray statues = (JSONArray) root.get("statuses");
                int count = 0;
                statues.forEach(e -> {
                    JSONObject status = (JSONObject) e;
                    JSONObject user = (JSONObject) status.get("user");
                    log.info(status.get("text").toString());
                    Tweet tweet = new Tweet(status.get("text").toString(),status.get("created_at").toString(),user.get("name").toString(),user.get("location").toString());
                    tweets.add(status.get("text").toString());
                    tweetList.add(tweet);
                });
            }
            log.info(String.valueOf(tweets));
            try {
                TwitterService.writeToFile(tweets);
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
            response = new Response(tweetList,"Success", "None");
        } catch (Exception e) {
            response = new Response(tweetList,"Failed", e.toString());
            e.printStackTrace();
        }
        return response;
    }

}
