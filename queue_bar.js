"use strict";

import {View} from './view.js';

const screenSize = 704;

QueueBar = {

    markAt: (position, duration) => {
        const screenPaddingOffset = 18.0;
        const relativeScreenWidthToMovieLength = screenSize / duration;
        const mark = relativeScreenWidthToMovieLength * position + screenPaddingOffset;
        $('div#bar_marker').css({left: mark});
    },

    placeInteractiveIconsOnBar: async (queues, duration) => {
        const screenOffset = 6;
        const base = duration / screenSize;
        const positionSpot = (queues[key].time / base) - screenOffset;

        for await (key of queues) {
            if (queues[key].metadata) {
                let the_kind = queueBar.type(queues[key].metadata);
                $('#icon_bar').append(View.icon(key, kind, queues[key].time));
                $('#icon_' + key).css("left", positionSpot);
            }
        }
        await $('#icon_bar').fadeIn();
    },

    requestModalType: (event) => {
        const url = `/api/queues/callback?meta=${event.queuePoint.metadata}&movie_id=${window.movie.id}&name=${event.queuePoint.name}`;
        fetch(url)
            .then(response => {
                queueBar.popupModal(response)
            })
            .catch(error => {
                console.warn(err)
            });
    },

    // On the Service's API platform,  custom markup was inserted into each movie record.
    // The response would allow the type() function to match and decide which kind of interactive modal to display.
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
            $('div#likeFrame').html(View.liker(object.picture_url, object.link))
        } else if (object.thumbnail_url == undefined) {
            milyoni.quote = object;
            $('div#quoteFrame').html(View.aQuote(milyoni.quote.text))
        } else if (object.is_commentary) {
            let urlForView = "http://c.brightcove.com/services/viewer/federated_f9?isVid=1&isUI=1&publisherID=11111&playerID=11111&domain=embed&videoId=" + milyoni.clip.video_id;
            milyoni.clip = object;
            $('div#quoteFrame').html(View.commentary(urlForView))
        } else {
            milyoni.clip = object;
            $('div#clipFrame').html(View.clip(milyoni.clip.thumbnail_url))
        }
    },

    stop: function () {
        $('div#bar_marker').stop();
    }

};
