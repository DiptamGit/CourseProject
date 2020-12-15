$(document).ready(function () {

    $('#tweetTable').hide();
    $('#flex1').hide();
    $('#flex2').hide();

    let api_url;

    $( "#search" ).click(function() {
        let keyword = $( "#keyword" ).val();
        if(!keyword){
            $('#flex2').show();
        }else{
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
            contentType : 'application/json',
            "headers": {
                "accept": "application/json",
                "Access-Control-Allow-Origin":"*"
            },
            success: function (response, status, xhr) {
                let count = 1;
                output = response;
                const tweets = output.tweets;
                $('#tweetTable').find('tbody').empty();
                tweets.forEach(ele => {
                    let location;
                    if(ele.location){
                        location = ele.location;
                    }else{
                        location = "Not Found";
                    }
                    console.log(ele.location);
                    $('#tweetTable tbody').append("<tr><td>"+ count + "</td><td>"+ ele.userName + "</td><td>" + location + "</td><td>" + formatDate(ele.createdAt) + "</td><td>"+ele.text + "</td></tr>");
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
});

function formatDate(dt) {
    return new Date(Date.parse(dt));
}


