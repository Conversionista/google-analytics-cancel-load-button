// @name            Google Analytics Cancel Load Button
// @namespace       http://tampermonkey.net/
// @version         0.3
// @description     A button to cancel the annoying loading screen in Google Analytics
// @author          Conversionista!
// @match           https://analytics.google.com/*
// @grant           none
// @updateURL       https://openuserjs.org/meta/conversionista/Google_Analytics_Cancel_Load_Button.meta.js
// @downloadURL     https://openuserjs.org/src/scripts/conversionista/Google_Analytics_Cancel_Load_Button.user.js
    
(function() {
    var origOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function() {
        if (/getPage/.test(arguments[1]) && document.querySelector('.ID-loadingProgressBarContainer')) {
            var xhr = this;
            var button = document.createElement('button');

            button.innerHTML = "Cancel";
            button.style.position = 'absolute';
            button.style.top = 0;
            button.style.right = 0;
            button.style.zIndex = 999999;

            document.querySelector('.ID-loadingProgressBarContainer').appendChild(button);

            button.addEventListener('click', function() {
                xhr.abort();
                setTimeout(function() {
                    button.parentNode.removeChild(button);
                    document.querySelector('.ID-closeButton').click();
                }, 25);
            });

            this.addEventListener('load', function() {
                button.parentNode.removeChild(button);
            });
        }

        origOpen.apply(this, arguments);
    };
})();
