/**
 * sasson javascript core
 *
 */
(function($) {

  Drupal.sasson = {};

  /**
   * This script will watch files for changes and
   * automatically refresh the browser when a file is modified.
   */
  Drupal.sasson.watch = function(url, instant) {

    var request;
    var dateModified;

    // Check the last time the file was modified
    request = $.ajax({
      type: "HEAD",
      url: url,
      success: function () {
        dateModified = request.getResponseHeader("Last-Modified");
        interval = setInterval(check,1000);
      }
    });

    var updateStyle = function(filename) {
      var headElm = $("head > *:contains('" + filename + ".css')");
      if (headElm.length > 0) {
        // If it's in an @import rule
        headElm.html(headElm.html().replace(filename + '.css?', filename + '.css?s'));
      } else {
        // If it's in a <link> tag
        headElm = $('head > link[href*="' + filename + '.css"]');
        headElm.attr('href', headElm.attr('href').replace(filename + '.css?', filename + '.css?s'));
      }
    };

    // Check every second if the timestamp was modified
    var check = function() {
      request = $.ajax({
        type: "HEAD",
        url: url,
        success: function () {
          if (dateModified != (dateModified = request.getResponseHeader("Last-Modified"))) {
            var filename = url.split('/');
            filename = filename[filename.length - 1].split('.');
            var fileExt = filename[1];
            filename = filename[0];
            if (instant && fileExt == 'css') {
              // css file - update head
              updateStyle(filename);
            } else if (instant && (fileExt == 'scss' || fileExt == 'sass')) {
              // SASS/SCSS file - trigger sass compilation with an ajax call and update head
              $.ajax({
                url: "",
                success: function () {
                  updateStyle(filename);
                }
              });
            } else {
              // Reload the page
              location.reload();
            }
          }
        }
      });
    };
  };

  Drupal.behaviors.sasson = {
    attach: function(context) {

      $('html').removeClass('no-js');

    }
  };

  Drupal.behaviors.showOverlay = {
    attach: function(context) {

      $('body.with-overlay').each(function() {
        var body = $(this);
        var overlay = $('<div id="overlay"><img src="'+ Drupal.settings.sasson['overlay_url'] +'"/></div>');
        var overlayToggle = $('<div class="toggle-overlay off" ><div>' + Drupal.t('Overlay') + '</div></div>');
        body.append(overlay);
        body.append(overlayToggle);
        $("#overlay").css({ opacity: Drupal.settings.sasson['overlay_opacity'] });
        $('.toggle-overlay').click(function() {
          $('body').toggleClass('show-overlay');
          $('#overlay').fadeToggle();
          $(this).toggleClass("off");
        });
        $("#overlay").draggable();
      });

    }
  };

  Drupal.behaviors.showGrid = {
    attach: function(context) {

      $('body.grid-background').each(function() {
        var body = $(this);
        var gridToggle = $('<div class="toggle-grid" ><div>' + Drupal.t('Grid') + '</div></div>');
        body.addClass('grid-visible').append(gridToggle);
        $('.toggle-grid').click(function() {
          $('body').toggleClass('grid-visible');
          $(this).toggleClass("off");
        });
      });

    }
  };

})(jQuery);


// Console.log wrapper to avoid errors when firebug is not present
// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if (this.console) {
    console.log(Array.prototype.slice.call(arguments));
  }
};
;
﻿; (function($) {
	/**
	* Resizes an inner element's font so that the inner element completely fills the outer element.
	* @author Russ Painter WebDesign@GeekyMonkey.com
	* @version 0.1
	* @param {Object} Options which are maxFontPixels (default=40), innerTag (default='span')
	* @return All outer elements processed
	* @example <div class='mybigdiv filltext'><span>My Text To Resize</span></div>
	*/
	$.fn.textfill = function(options) {
		var defaults = {
			maxFontPixels: 40,
			innerTag: 'span'
		};
		var Opts = jQuery.extend(defaults, options);
		// $(this).addClass('textfill-wrapper');
		return this.each(function() {
			var fontSize = Opts.maxFontPixels;
			var ourText = $(Opts.innerTag + ':visible:first', this).addClass('textfill-test');
			var maxWidth = $(this).width();
			var lineHeight;
			var textHeight;
			var textWidth;
			do {
				
				// // Debugging
				// fontSize = fontSize - 4;
				// console.log("fontSize: " + fontSize);
				// console.log("lineHeight: " + lineHeight);
				// console.log("textHeight: " + textHeight);
				// console.log("maxWidth: " + maxWidth);
				// console.log("textWidth: " + textWidth);
				// console.log("------------------------------");
				// // end Debugging
				
				ourText.css('font-size', fontSize);
				textHeight = ourText.innerHeight();
				textWidth = ourText.innerWidth();
				lineHeight = parseInt(ourText.css('line-height'), 10) * 1.5;
				fontSize = fontSize - 1;

			} while ((textHeight >= lineHeight || textWidth >= maxWidth) && fontSize > 12);
			ourText.removeClass('textfill-test');
			// $(this).removeClass('textfill-wrapper');
		});
	};
})(jQuery);


;
/*
 * ##### Sasson - advanced drupal theming. #####
 *
 * SITENAME scripts.
 *
 */

(function($) {
  
  // DUPLICATE AND UNCOMMENT
  // Drupal.behaviors.behaviorName = {
  //   attach: function (context, settings) {
  //     // Do some magic...
  //   }
  // };

  // Drupal.behaviors.fitText = {
  //   attach: function (context, settings) {
  //     $("#node-3 header").textfill({ maxFontPixels: 100, innerTag: 'h2' });
  //     // $("header h2").quickfit();
  //     // $("header h2").each(function() {
  //     //   $(this).quickfit();
  //     // });
  //   }
  // };

  $(window).load(function() {
    $("header").textfill({ maxFontPixels: 200, innerTag: 'h2' });
    $(".field-item").textfill({ maxFontPixels: 200, innerTag: 'h2' });
    $(".field-item").textfill({ maxFontPixels: 200, innerTag: 'h3' });
  });

})(jQuery);
;
