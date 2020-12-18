$(document).ready(function () {

    $('#tweetTable').hide();
    $('#searchSentimentTable').hide();
    $('#evalTable').hide();
    $('#profanityTable').hide();
    $('#flex1').hide();
    $('#flex2').hide();
    $('#eval').hide();
    $('#searchSentiment').prop('disabled', true);
    $('#searchProfanity').prop('disabled', true);

    let api_url;

    $("#searchProfanity").click(function () {
        $('#tweetTable').hide();
        $('#evalTable').hide();
        $('#eval').hide();
        $('#searchSentimentTable').hide();
        $("#profanityTable tbody").empty();

        $.ajax({
            url: 'http://127.0.0.1:5000/offensive',
            type: 'get',
            success: function (data) {
                //console.log(data);
                let output = JSON.parse(data);
                let count = 1;
                output.forEach(function (ele) {
                    if (ele.tweet.length < 2) {
                        console.log('skipping')
                    } else {
                        if (ele.prediction == 0) {
                            $('#profanityTable tbody').append("<tr><td class='table-dark'>" + count +
                                "</td><td class='table-light'>" + ele.tweet + "</td><td class='table-success'>" +
                                'Non Offensive' + "</td><td>" + ele.prob + "</td></tr>");
                        }
                        if (ele.prediction == 1) {
                            console.log('at 1')
                            $('#profanityTable tbody').append("<tr><td class='table-dark'>" + count +
                                "</td><td class='table-light'>" + ele.tweet + "</td><td class='table-danger'>" +
                                'Offensive' + "</td><td>" + ele.prob + "</td></tr>");
                        }
                    }

                    count++;
                });
                $('#profanityTable').show();
            }
        });

    });

    $("#calcEval").click(function () {
        $("#evalTable tbody").empty();
        console.log('here');

        var sentimentData = [];
        // loop over each table row (tr)
        $("#searchSentimentTable tr").each(function () {
            var currentRow = $(this);

            var col1_value = currentRow.find("td:eq(0)").text();
            var col2_value = currentRow.find("td:eq(1)").text();
            var col3_value = currentRow.find("td:eq(2)").text();
            var col4_value = currentRow.find("#userSelect").val()
            var val = currentRow.find("#userSelect").val();

            var obj = {};
            obj.col1 = col1_value;
            obj.col2 = col2_value;
            obj.col3 = col3_value;
            obj.col4 = col4_value;

            sentimentData.push(obj);
        });
        console.log(sentimentData);
        sentimentData.shift();
        let evalscore = calCulateEvalStat(sentimentData);
        $('#evalTable tbody').append("<tr><td>" + evalscore.accuracy + "</td><td>" + evalscore.precison + "</td><td>" + evalscore.recall + "</td><td>"
            + evalscore.fscore + "</td><tr>");
        $('#evalTable').show();
    });

    function calCulateEvalStat(sentimentData) {
        let tp = 0;
        let fp = 0;
        let fn = 0;
        let tn = 0;
        let precison = 0;
        let recall = 0;
        let accuracy = 0;
        let fscore = 0;
        sentimentData.forEach(ele => {
            if (ele.col3 == 'Positive' && ele.col4 == 'upositive') {
                tp++;
            }
            if (ele.col3 == 'Negative' && ele.col4 == 'upositive') {
                fn++;
            }
            if (ele.col3 == 'Positive' && ele.col4 == 'unegetive') {
                fp++;
            }
            if (ele.col3 == 'Negative' && ele.col4 == 'unegetive') {
                tn++;
            }
        });
        //console.log("🚀 ~ file: search.js ~ line 50 ~ calCulateEvalStat ~ precison", tp, fp, fn, tn)
        precison = tp / (tp + fp);
        recall = tp / tp + fn;
        accuracy = (tp + tn) / sentimentData.length;
        fscore = (2 * precison * recall) / (precison + recall);
        let evalScore = {};
        evalScore.precison = isNaN(precison) ? 0 : precison;
        evalScore.recall = isNaN(recall) ? 0 : recall;
        evalScore.accuracy = accuracy;
        evalScore.fscore = isNaN(fscore) ? 0 : fscore;

        console.log(evalScore);
        return evalScore;
    }

    $("#search").click(function () {
        $('#searchSentimentTable').hide();
        $('#evalTable').hide();
        $('#eval').hide();
        $('#searchSentiment').prop('disabled', false);
        $('#searchProfanity').prop('disabled', false);
        let keyword = $("#keyword").val();
        if (!keyword) {
            $('#flex2').show();
        } else {
            $('#flex2').hide();
            if ($("#inlineRadio1").prop("checked")) {
                api_url = `http://localhost:8080/tweets/populer/keyword/${keyword}`;
            }
            if ($("#inlineRadio2").prop("checked")) {
                api_url = `http://localhost:8080/tweets/recent/keyword/${keyword}`;
            }
            if ($("#inlineRadio3").prop("checked")) {
                api_url = `http://localhost:8080/tweets/mixed/keyword/${keyword}`;
            }
            console.log(api_url)

            $.ajax({
                type: 'GET',
                url: api_url,
                contentType: 'application/json',
                "headers": {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                success: function (response, status, xhr) {
                    let count = 1;
                    output = response;
                    const tweets = output.tweets;
                    $('#tweetTable').find('tbody').empty();
                    tweets.forEach(ele => {
                        let location;
                        if (ele.location) {
                            location = ele.location;
                        } else {
                            location = "Not Found";
                        }
                        console.log(ele.location);
                        $('#tweetTable tbody').append("<tr><td>" + count + "</td><td>" + ele.userName + "</td><td>" + location + "</td><td>" + formatDate(ele.createdAt) + "</td><td>" + ele.text + "</td></tr>");
                        count++;
                    })
                    $('#tweetTable').show();
                },
                error: function () {
                    console.log('At error')
                }
            })
        }
    });

    // $('#searchSentiment').click(function () 
    $(document).on("click", "#searchSentiment", function () {
        $('#tweetTable').hide();
        $('#profanityTable').hide();
        $("#searchSentimentTable tbody").empty();
        console.log('Here at sentiment')
        $.ajax({
            url: 'http://127.0.0.1:5000/sentiment/search',
            type: 'get',
            beforeSend: function () {
                $('#loading').show();

            },
            complete: function () {
                $('#loading').hide();
            },
            success: function (data) {
                //console.log(data);
                let output = JSON.parse(data);
                let count = 1;
                output.forEach(function (ele) {
                    console.log("ele", count, typeof (ele.tweet))
                    if (ele.tweet.length < 2) {
                        console.log('skipping')
                    } else {
                        if (ele.sentiment == 'Positive') {

                            $('#searchSentimentTable tbody').append("<tr><td class='table-dark'>" + count +
                                "</td><td class='table-light'>" + ele.tweet + "</td><td class='table-success'>" +
                                ele.sentiment + "</td> " +
                                "<td><select class='btn btn-light' id='userSelect'><option selected>Select your response</option><option value='upositive'>Postive</option><option value='unegetive'>Negetive</option></select>"
                                + "</td></tr>");
                        }
                        if (ele.sentiment == 'Negative') {
                            $('#searchSentimentTable tbody').append("<tr><td class='table-dark'>" + count +
                                "</td><td class='table-light'>" + ele.tweet + "</td><td class='table-danger'>" +
                                ele.sentiment + "</td> " +
                                "<td><select class='btn btn-light' id='userSelect'><option selected>Select your response</option><option value='upositive'>Postive</option><option value='unegetive'>Negetive</option></select>"
                                + "</td></tr>");
                        }
                    }

                    count++;
                });
                $('#searchSentimentTable').show();
                $('#eval').show();
            }
        });
    });

});

function formatDate(dt) {
    return new Date(Date.parse(dt));
}


