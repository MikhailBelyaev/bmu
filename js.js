    $(document).ready(function(){
        $.get(
           "https://www.googleapis.com/youtube/v3/channels",{
           part : 'contentDetails', 
           forUsername : 'snailkick',
           key: 'AIzaSyD_ul1XlyVgvAL5Jh6oOTd9k_N9p4DT2TU'},
           function(data) {
             $.each( data.items, function( i, item ) {
                  pid = item.contentDetails.relatedPlaylists.uploads;
                  getVids(pid);
              });
          }
        );

        function getVids(pid){
            $.get(
                "https://www.googleapis.com/youtube/v3/playlistItems",{
                part : 'snippet', 
                maxResults : 1,
                playlistId : pid,
                key: 'AIzaSyD_ul1XlyVgvAL5Jh6oOTd9k_N9p4DT2TU'},
                function(data) {
                    var results;
                    $.each( data.items, function( i, item ) {
                        results = item.snippet;
                        $('.related_lastvideo').css({backgroundImage: 'url(http://i.ytimg.com/vi/'+results.resourceId.videoId+'/0.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'block', opacity: 1});
                        if(document.location.hash.indexOf('price')>-1){
                            $('.related_lastvideo').css({marginTop: -100});
                        }
                        $('.related_lastvideo').click(function(){
                            OpenInNewTab('http://www.youtube.com/watch?v='+results.resourceId.videoId);
                        });
                        $('.related_lastvideo_label2').text(results.title);
                        setInterval(function(){
                            if($('.related_lastvideo').hasClass('related_light_on')){
                                $('.related_lastvideo').removeClass('related_light_on')
                            }else{
                                $('.related_lastvideo').addClass('related_light_on')
                            }
                        }, 1000);
                        $('.related_lastvideo').mouseenter(function(){
                            $('.related_lastvideo_label1, .related_lastvideo_label2').addClass('related_lastvideo_label_out');
                        });
                        $('.related_lastvideo').mouseleave(function(){
                            $('.related_lastvideo_label1, .related_lastvideo_label2').removeClass('related_lastvideo_label_out');
                        });

                        
                    });
                }
            );
        }
    });