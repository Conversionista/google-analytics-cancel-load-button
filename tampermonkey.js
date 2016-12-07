// ==UserScript==
// @name         Cancel Analytics
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Conversionista!
// @match        https://analytics.google.com/*
// @grant        none
// ==/UserScript==

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
