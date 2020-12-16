$(document).ready(function () {


    $('#monitor').hide();
    
    $("#button-addon1").click(function () {
        let hashtags = $("#hashtags").val();
        console.log(hashtags);
        let monitor_url = `http://localhost:8080/tweets/hashtags/${hashtags}`;
        console.log(monitor_url);
        $("#hashtags").val('');
        $('#monitor').show();
    
        $.ajax({
            type: 'GET',
            url: monitor_url,
            contentType : 'application/json',
            "headers": {
                "accept": "application/json",
                "Access-Control-Allow-Origin":"*"
            },
            success: function (response, status, xhr) {
                
            },
            error: function () {
                console.log('At error')
            }
        })
    
    });
    $("#button-addon2").click(function () {
        $('#monitor').hide();
    });
        //setTimeout(fetchdata, 5000);
    });
    
    
    function fetchdata() {
        $.ajax({
            url: 'fetch_details.php',
            type: 'post',
            success: function (data) {
                // Perform operation on return value
                alert(data);
            },
            complete: function (data) {
                setTimeout(fetchdata, 5000);
            }
        });
    }