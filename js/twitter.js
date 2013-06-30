function clean() {
    $("li:empty").remove();
}

function tick(){
        $('#twit li:first').slideUp( function () { $(this).appendTo($('#twit')).slideDown(); });
}


$(document).ready(function () {
    var displaylimit = 3;
    var showdirecttweets = false;
    var showretweets = true;
    var showtweetlinks = true;
    var showprofilepic = true;


	 
    $.getJSON('cache.json', 
        function(feeds) {   
		   //alert(feeds);
            var feedHTML = '';
            var displayCounter = 1;         
            for (var i=0; i<feeds.length; i++) {
				var tweetscreenname = feeds[i].user.name;
                var tweetusername = feeds[i].user.screen_name;
                var profileimage = feeds[i].user.profile_image_url_https;
                var status = feeds[i].text; 
				var isaretweet = false;
				var isdirect = false;
				var tweetid = feeds[i].id_str;
				
				if(typeof feeds[i].retweeted_status != 'undefined'){
				   profileimage = feeds[i].retweeted_status.user.profile_image_url_https;
				   tweetscreenname = feeds[i].retweeted_status.user.name;
				   tweetusername = feeds[i].retweeted_status.user.screen_name;
				   tweetid = feeds[i].retweeted_status.id_str
				   isaretweet = true;
				 };
				 status = addlinks(status);
                 var avatar = '<div class="circle" style="background-image: url('+profileimage+')"></div>';

				 var html = '<li>'+avatar+'@'+tweetusername+': '+status+'<li>';
                // $('.circle').css("background-image", "url('"+profileimage+"')");  
				//console.log(feeds[i]);

			
				$('#twit').append(html);

            }
             
    });
         
    function addlinks(data) {
        //Add link to all http:// links within tweets
        data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
            return '<a href="'+url+'" >'+url+'</a>';
        });
             
        data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
            return '<a href="http://twitter.com/'+reply.substring(1)+'" style="font-weight:lighter;" >'+reply.charAt(0)+reply.substring(1)+'</a>';
        });
        return data;
    }
     
});
