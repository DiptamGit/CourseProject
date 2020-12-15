package com.uiuc.model;

import java.util.Objects;

public class Tweet {

    private String text;
    private String createdAt;
    private String userName;
    private String location;

    public Tweet(String text, String createdAt, String userName, String location) {
        this.text = text;
        this.createdAt = createdAt;
        this.userName = userName;
        this.location = location;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tweet tweet = (Tweet) o;
        return Objects.equals(text, tweet.text) && Objects.equals(createdAt, tweet.createdAt) && Objects.equals(userName, tweet.userName) && Objects.equals(location, tweet.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(text, createdAt, userName, location);
    }

    @Override
    public String toString() {
        return "Tweet{" +
                "text='" + text + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", userName='" + userName + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}
