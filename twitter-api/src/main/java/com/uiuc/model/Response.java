package com.uiuc.model;

import java.util.ArrayList;

public class Response {

    private ArrayList<Tweet> tweets;

    public Response(String status, String error) {
        this.status = status;
        this.error = error;
    }

    private String status;
    private String error;

    public Response(ArrayList<Tweet> tweets, String status, String error) {
        this.tweets = tweets;
        this.status = status;
        this.error = error;
    }

    public ArrayList<Tweet> getTweets() {
        return tweets;
    }

    public void setTweets(ArrayList<Tweet> tweets) {
        this.tweets = tweets;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
