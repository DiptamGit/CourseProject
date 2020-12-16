$(document).ready(function () {

    $('#button-addon3').click(function () {
        $.ajax({
            url: 'http://localhost:3000/tweets',
            type: 'get',
            success: function (data) {
                $('#total').empty().append(data.length);
                console.log(data);
            }
        });
    });


    $('#monitor').hide();

    $("#button-addon1").click(function () {
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
    shouldMonitor = true;
    $.ajax({
        url: 'http://localhost:3000/tweets',
        type: 'get',
        success: function (data) {
            $('#total').empty().append(data.length);
            console.log(data);
        },
    });
}