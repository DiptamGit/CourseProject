$(document).ready(function () {

    $('#monitor').hide();
    $('#span').hide();
    $('#sentimentTable').hide();
    $('#loading').hide();

    $('#button-addon3').click(function () {
        $.ajax({
            url: 'http://localhost:3000/tweets/monitor',
            type: 'get',
            success: function (data) {
                $('#total').empty().append(data.length);
                console.log(data);
            }
        });
    });

    $('#button-addon4').click(function () {
        $("#sentimentTable tbody").empty();
        console.log('Here at sentiment')
        $.ajax({
            url: 'http://127.0.0.1:5000/sentiment/monitor',
            type: 'get',
            beforeSend: function(){
                $('#loading').show();
               
            },
            complete: function(){
                $('#loading').hide();
             },
            success: function (data) {
                //console.log(data);
                let output = JSON.parse(data);
                let count = 1;
                output.forEach(function(ele) {
                    if (ele.tweet.length < 2) {
                        console.log("skipping empty record")
                    }else{
                        if(ele.sentiment == 'Positive'){
                            $('#sentimentTable tbody').append("<tr><td class='table-dark'>"+ count + 
                                                  "</td><td class='table-light'>"+ ele.tweet + "</td><td class='table-primary'>" + 
                                                  ele.sentiment + "</td></tr>");
                        }
                        if(ele.sentiment == 'Negative'){
                            $('#sentimentTable tbody').append("<tr><td class='table-dark'>"+ count + 
                                                  "</td><td class='table-light'>"+ ele.tweet + "</td><td class='table-danger'>" + 
                                                  ele.sentiment + "</td></tr>");
                        }
                    }

                    count++;
                 });
                $('#sentimentTable').show();
            }
        });
    });


    $("#button-addon1").click(function () {
        $('#sentimentTable').hide();
        $('#total').empty();
        $('#span').show();
        startMonitoring();
        let hashtags = $("#hashtags").val();
        console.log(hashtags);
        let monitor_url = `http://localhost:8080/tweets/hashtags/${hashtags}`;
        console.log(monitor_url);
        $("#hashtags").val('');
        $('#monitorText').empty().append(`<p>monitoring started for keyword ${hashtags}</p>`);
        $('#monitor').show();

        $.ajax({
            type: 'GET',
            url: monitor_url,
            contentType: 'application/json',
            "headers": {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function (response, status, xhr) {

            },
            error: function () {
                console.log('At error')
            }
        })

    });
    $("#button-addon2").click(function () {
        stopMonitoring();
        $('#monitor').hide();
    });

    let timerId = 0

    function startMonitoring(){
        timerId = setInterval(() => fetchTweets(), 3000);
    }

    function stopMonitoring(){
        clearInterval(timerId);
        timerId = 0;
    }
    
});


function fetchTweets() {
    $.ajax({
        url: 'http://localhost:3000/tweets/monitor',
        type: 'get',
        success: function (data) {
            $('#total').empty().append(data.length);
            console.log(data);
        },
    });
}