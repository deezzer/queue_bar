"use strict";

var QueueBar = {

    var screenSize = 704;

    markAt: (position, duration) => {
        var screenPaddingOffset = 18.0;
        var relativeScreenWidthToMovieLength =  screenSize / duration;
        var mark = relativeScreenWidthToMovieLength * position + screenPaddingOffset;
        $('div#bar_marker').css({left: mark});
    },

    placeInteractiveIconsOnInteractiveBar: async (queues, duration) => {
        var base = duration / screenSize;
        var screenOffset = 6;
        var positionSpot = (queues[key].time / base) - screenOffset;

        for await (key of queues) {
            if (queues[key].metadata) {
                let the_kind = queueBar.type(queues[key].metadata);
                $('#icon_bar').append(`<img onclick='milyoni.seek(${queues[key].time});' 
                                        id='icon_${key}' 
                                        class='icon_bar ${the_kind}' 
                                        src='/images/${the_kind}_icon.png' >`);
                $('#icon_' + key).css("left", positionSpot);
            }
        }
        await $('#icon_bar').fadeIn();
    },

    requestAppropriateModalType: async (event) => {
       try {
         var response = await fetch(`/api/queues/callback?meta=${event.queuePoint.metadata}&movie_id=${window.movie.id}&name=${event.queuePoint.name}`)
         await queueBar.popupModal(response); } 
       catch (err) {
         console.warn(err)
      }
    },

    // On the remote platform, a custom markup was inserted into each movie record. 
    // Upon making an API call to the platform, the response would allow this type() function to match and decide which kind of interactive modal to display.
    type: (metadata) => {
        var kind;

        if (metadata.match(/facebook\.com/)) {
            kind = 'like';
        } else if (metadata.match(/\[/)) {
            kind = 'clip';
        } else if (metadata.match(/\~/)) {
            kind = 'commentary';
        } else {
            kind = 'quote';
        }
        return kind;
    },

    popupModal: (object) => {
        if (object.link) {
            $('div#likeFrame').html(`<b>${object.name}</b><br/><img src="${object.picture_url}"> <iframe src="https://www.facebook.com/plugins/like.php?href=${object.link}&amp;send=false&amp;layout=standard&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=45" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:35px;" allowTransparency="true"></iframe>`).fadeIn().delay(20000).fadeOut();
        } else if (object.thumbnail_url == undefined) {
            milyoni.quote = object;
            $('div#quoteFrame').html(`"${milyoni.quote.text}" <img src="/images/share.png" width="60" height="18" class="shareButton" onclick="fbCallQuote();"/>`).fadeIn().delay(20000).fadeOut();
        } else if (object.is_commentary) {
            let view_url = "http://c.brightcove.com/services/viewer/federated_f9?isVid=1&isUI=1&publisherID=11111&playerID=11111&domain=embed&videoId=" + milyoni.clip.video_id;
            milyoni.clip = object;

            $('div#quoteFrame').html(`
  <object id="flashObj" width="250" height="200" classid="clsid:11111" codebase="http://download.me">
    <param name="movie" value="http://c.brightcove.com/services/viewer/federated_f9?isVid=1" />
    <param name="bgcolor" value="#FFFFFF" />
    <param name="flashVars" value="playerID=11111&playerKey=0000&domain=embed&dynamicStreaming=true" />
    <param name="base" value="http://admin.brightcove.com" />
    <param name="seamlesstabbing" value="false" />
    <param name="allowFullScreen" value="true" />
    <param name="swLiveConnect" value="true" />
    <param name="allowScriptAccess" value="always" /> 
    <embed src="${view_url}"
        bgcolor="#FFFFFF" 
        flashVars="playerID=11111&playerKey=AQ~~,11111~,11111-11111&domain=embed&dynamicStreaming=true" 
        base="http://admin.brightcove.com" 
        name="flashObj" width="250" h
        eight="200" seamlesstabbing="false" 
        type="application/x-shockwave-flash" 
        allowFullScreen="true" 
        swLiveConnect="true" 
        allowScriptAccess="always" 
        pluginspage="http://www.macromedia.com/shockwave/oldschool-i-know/download/index.cgi">
    </embed>
  </object>
   <br> 
   <img src="/images/share.png" width="60" height="18" class="shareButton" onclick="fbCallQuote()"/>`)
                .fadeIn().delay(20000).fadeOut();
        } else {
            milyoni.clip = object;
            $('div#clipFrame').html(`<img src="${milyoni.clip.thumbnail_url}" width="158" height="85" class="clipImage" /> <img src="/images/share.png" width="60" height="18" class="shareButton" onclick="fbCallClip();" />`).fadeIn().delay(20000).fadeOut();
        }
    },

    stop: function () {
        $('div#bar_marker').stop();
    }

};
