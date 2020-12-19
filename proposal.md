# Sentiment Analyis and Offensive Language Detection 
### By: Riya Gupta, Chitra Uppalapati, and Diptam Sarkar

What are the names and NetIDs of all your team members? Who is the captain? The captain will have more administrative duties than team members.
- riyag3 (captain), chitrau2, diptams2

What is your free topic? Please give a detailed description. What is the task? Why is it important or interesting? What is your planned approach? What tools, systems or datasets are involved? What is the expected outcome? How are you going to evaluate your work?

- Our free topic is conducting sentiment analysis as well as polite and impolite language detection on a set of aroundtop tweets from the daily trending hashtags, dynamically. We are trying to categorize the most popular tweets as positive, negative, depending on the topic. This is an interesting project because it allows us to sense what the overall attitude and feeling is towards certain ideas when examining the most relevant tweets per hashtag. This can allow us to find certain patterns and sentiments in the trending hashtags, which can help us identify how people feel about popular discussions and products as well as how polarized specific topics on Twitter are. This project will be most helpful for identifying sentiment towards political discussions as well as new products. We plan to use Twitter HBC, the Java HTTP client for accessing the Twitter API, to fetch our 1,000 tweets. Then, we will build a system that classifies the tweets. When analyzing our data, we will experiment with different classifiers and evaluate our system using the standard classification evaluations metrics (Precision, Recall, and F-score). The expected outcome is to display our results on a web app that we will create using React.

Which programming language do you plan to use?
- Python, Java, Javascript

Please justify that the workload of your topic is at least 20*N hours, N being the total number of students in your team. You may list the main tasks to be completed, and the estimated time cost for each task.
Main Tasks:
- Dynamically get tweets from daily trending hashtags (20 hours)
  - Input hashtags from our web app
  - Clean our data
  - store in local
- Perform sentiment analysis/language detection (positive, negative,) (20 hours)
  - Feed tweets into modules for language analysis
  - Update tweets with language analysis information
- Output results on a web app (20 hours)
  - Create a good UI
  - Add information on how to use the tool/its purpose
