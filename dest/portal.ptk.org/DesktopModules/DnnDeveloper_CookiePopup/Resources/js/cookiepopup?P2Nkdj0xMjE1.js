(function ( $ ) {
    "use strict";

    const cookiePopupHtml = '<div id="cookie-popup-container">' +
        '<div class="cookie-popup" style="display: none;">' +
            '<div class="cookie-popup-inner">' +
                '<div class="cookie-popup-left">' +
                    '<div class="cookie-popup-headline">This website uses cookies</div>' +
                    '<div class="cookie-popup-sub-headline">By using this site, you agree to our use of cookies.</div>' +
                '</div>' +

                '<div class="cookie-popup-right">' +
                    '<a href="#" class="cookie-popup-accept-cookies">Accept</a>' +
                    '<a href="#" class="cookie-popup-learn-more">Learn More</a>' +
                '</div>' +
            '</div>' +
            '<div class="cookie-popup-lower" style="display: none;">' +
                'Cookies are small files stored on your computer, which websites use to improve your browsing experience. They may be used to save your progress or user preferences.' +
            '</div>' +
        '</div>' +
    '</div>';

    var onAccept;

    $.extend({
        acceptCookies : function(options) {
            var cookiesAccepted = getCookie("cookiesAccepted");

            if (!cookiesAccepted) {
                var cookiePopup = $(cookiePopupHtml);
                var position = "bottom";

                if(options != undefined) {
                    position = options.position != undefined ? options.position : "bottom";

                    if(options.title != undefined)
                        cookiePopup.find('.cookie-popup-headline').text(options.title);
                    if(options.text != undefined)
                        cookiePopup.find('.cookie-popup-sub-headline').text(options.text);
                    if(options.acceptButtonText != undefined)
                        cookiePopup.find(".cookie-popup-accept-cookies").text(options.acceptButtonText);
                    if(options.learnMoreButtonText != undefined)
                        cookiePopup.find(".cookie-popup-learn-more").text(options.learnMoreButtonText);
                    if (options.learnMoreButtonLink != undefined)
                        cookiePopup.find(".cookie-popup-learn-more").attr("href", options.learnMoreButtonLink);
                    if(options.learnMoreInfoText != undefined)
                        cookiePopup.find(".cookie-popup-lower").text(options.learnMoreInfoText);
                    if(options.theme != undefined)
                        cookiePopup.addClass("theme-" + options.theme);
                    if(options.onAccept != undefined)
                        onAccept = options.onAccept;

                    if(options.learnMore != undefined) {
                        if(options.learnMore == false)
                            cookiePopup.find(".cookie-popup-learn-more").remove();
                    }

                }
                
                cookiePopup.find('.cookie-popup').addClass("position-" + position);
                $('body').append(cookiePopup);
                $('.cookie-popup').slideToggle();
            }    
        }
    });

    $(document).on('click', '.cookie-popup-accept-cookies', function (e) {
        e.preventDefault();
        saveCookie();
        $('.cookie-popup').slideToggle();
        if (typeof onAccept === "function")
            onAccept();
    });
    //    .on('click', '.cookie-popup-learn-more', function (e) {
    //    e.preventDefault();
    //    $('.cookie-popup-lower').slideToggle();
    //});

    var cookie = $.acceptCookies(options);
    if (getCookie("cookiesAccepted"))
        $(".cookie-indicator").removeClass("badge-danger").addClass("badge-success").text("Cookie saved");
    else
        $(".cookie-indicator").removeClass("badge-success").addClass("badge-danger").text("No cookie found");

    //function getCookie(cname) {
    //    var name = cname + "=";
    //    var decodedCookie = decodeURIComponent(document.cookie);
    //    var ca = decodedCookie.split(';');
    //    for (var i = 0; i < ca.length; i++) {
    //        var c = ca[i];
    //        while (c.charAt(0) == ' ') {
    //            c = c.substring(1);
    //        }
    //        if (c.indexOf(name) == 0) {
    //            return c.substring(name.length, c.length);
    //        }
    //    }
    //    return "";
    //}

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function saveCookie() {
        if ($('#UseCoockie').val() == 'False') {
            var SessionDays = $('#SessionDays').val();

            Date.prototype.addDays = function (days) {
                var dat = new Date(this.valueOf());
                dat.setDate(dat.getDate() + days);
                return dat;
            }

            var dat = new Date();
            var expireDate = dat.addDays(parseInt(SessionDays));
            var expires = "expires=" + expireDate
            document.cookie = "cookiesAccepted=true; " + expires + "; path=/";
        }
    }
 
}( jQuery ));