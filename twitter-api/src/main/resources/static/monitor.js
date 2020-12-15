$('#monitor').hide();

    $( "#button-addon1" ).click(function() {
        let hashtags = $( "#hashtags" ).val();
        console.log(hashtags);
        $( "#hashtags" ).val('');
        $('#monitor').show();
    });
    $( "#button-addon2" ).click(function() {
        $('#monitor').hide();
    });

    function fetchdata(){
        $.ajax({
         url: 'fetch_details.php',
         type: 'post',
         success: function(data){
          // Perform operation on return value
          alert(data);
         },
         complete:function(data){
          setTimeout(fetchdata,5000);
         }
        });
       }
       
       $(document).ready(function(){
        setTimeout(fetchdata,5000);
       });