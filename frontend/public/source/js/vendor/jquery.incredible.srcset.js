(function($, window, document) {
    // retrieve all images that contain the srcset tag
    $(document).find("img[data-srcset]").each(function() {
        var self = this;

        // retrieve the comma-separated srcset values
        var srcset = $(self).data("srcset").split(',');
        var initUrl;

        for (var i = 0; i < srcset.length; i++) {
            // retrieve the url and media query for each srcset
            var x = srcset[i].trim().split(' ');
            var url = x[0];

            // if there is no viewport width, then it is the default src
            var mq;
            if (x.length > 1) {
                mq = x[1];
            }

            // if there was a media query
            if (mq !== undefined && mq) {
                // create the media query list
                var mql = window.matchMedia("only screen and (min-width: " + mq.replace('w','px') + ")");

                // check if it currently matches the media query
                if (mql.matches) {
                    // set the image's src on init
                    initUrl = url;
                }
            } else {
                // set to the default if no mq was specified
                $(self).attr("src", url);
            }
        }

        // if the initUrl is set becaused it matched a media query
        if (initUrl) {
            $(self).attr("src", initUrl);
        }
    });
})(window.jQuery, window, document);
