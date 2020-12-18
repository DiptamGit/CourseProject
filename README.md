# About the project
> There is a growing trend amongst enterprises now a days to do market study using sentiment analysis and profanity checking, when any company releases a new product for announce a merger, they normally introduce a hashtags or campaign slogan, and leveraging that they try to collect user data from social media to get an overview. Our goal pf this project was to provide a unified solution, which anyone can use for researching a keyword or hashtags and do sentiment analysis on that dataset with a view. We tried to make our entire app dynamic and, so that it will readily deployable and open to any further enhancement.

### Installation Instructions
To run the code in your local system you will need four things, assuming you already have git installed

  - Java 8
  - Maven 3+
  - Node js 12
  - Python 3

Installation instructions which I found helpful:
  - For Java you can use this [link](https://www3.ntu.edu.sg/home/ehchua/programming/howto/JDK_Howto.html), we used grallvm for dev use, but any jdk would work as long as its 8, please refrain from using 11, it may not run spring modules.
  - Node Js use this [link](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
  - Python 3, we used [Anaconda](https://docs.anaconda.com/anaconda/install/) distribution but technically any 3 distribution should work
  - Maven 3.6 is being used in this project but you can use any 3 above [version](https://www.baeldung.com/install-maven-on-windows-linux-mac) as well

Once you install and everything is setup, go your command prompt and check if they are in your path and setup was correct.
```sh
$ java -version
$ node -v
$ python –version
$ maven -v
```
If all of them responded correctly, please proceed to the next section


### How to run the application
Clone the application and you should see three main folder
 - data analyzer - python web and sentiment analysis module
 - file-read-api - node api for monitoring
 - twitter-api - spring web module for two twitter api and web views

Open three command prompt, and cd into three separte folder

run below from twitter api
```sh
mvn -v spring-boot:run
```
run below from data analyzer 
```sh
pip install flask
pip install nltk
pip install preprocessor
pip install profanity-check
python api.py
```
run below from file-read-api
```sh
node app.js
```
 if eveything is running and you can see no error in terminal, open any web browser(except older ie) and type (http://localhost:8080/search.html)
 
 ### Tools/Languages
  - Intellij IDEA
  - VS Code
  - Java
  - Spring
  - HTML/JS/CSS
  - Jquery
  - Bootstrap
  - NodeJs
  - Python

### Team
 - Diptam Sarkar
 - Riya Gupta
 - Chitra Uppalapati
 
 ### Project Demo
 [Presentation](https://mediaspace.illinois.edu/media/1_404owz5v)
 
### Credits
We referred ideas and codes for inspiration from Spring official documentation, NLTK sentiment analyis examples, Bootstrap 5 docs, freecodecamp sentiment analysis youtube videos
