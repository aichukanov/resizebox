/**
 * "jQuery UI Intellectual guides".
 *
 * @copyright       Copyright 2017, Anton Chukanov
 * @version         0.0.1
 */

(function ($) {
    $.extend($.ui.resizable.prototype.options, {
        resizeBox: false
    });

    $.ui.plugin.add('resizable', 'resizeBox', {
        start: function (evt, ui) {
            var $this = $(this),
                inst = $this.data('ui-resizable');

            if (inst.options.resizeBox) {
            	if (!inst.options_resizeBox || inst.options_resizeBox.length == 0) {
	            	inst.options_widthBox = $('<div></div>').addClass("new-width");
	            	inst.options_heightBox = $('<div></div>').addClass("new-height");
	            	inst.options_resizeBox = $('<div></div>')
	            		.addClass("resize-box")
                        .addClass(inst.options.resizeBoxClass || '')
	            		.append(inst.options_widthBox)
	            		.append(inst.options_heightBox);

                    $('body').append(inst.options_resizeBox);
            	}
            	else {
            		inst.options_resizeBox.show();
            	}
            }
        },
        resize: function (evt, ui) {
            var $this = ui.helper,
                inst = $(this).data('ui-resizable');

            if (inst.options.resizeBox) {
                var newW = $this.width(),
                    newH = $this.height();

                inst.options_widthBox.text('W: ' + newW + ' px');
                inst.options_heightBox.text('H: ' + newH + ' px');

                inst.options_resizeBox.offset({
                    top: evt.clientY + 20,
                    left: evt.clientX + 20
                });
                fit(inst.options_resizeBox, $('body'), { right: 10, bottom: 10 });
            }
        },
        stop: function (evt, ui) {
            var $this = $(this),
                inst = $this.data('ui-resizable');

            if (inst.options.resizeBox) {
                inst.options_resizeBox.hide();
            }
        }
    });

    function getDirection (ui, asObject) {
        var oPos = ui.originalPosition,
            oSize = ui.originalSize,
            pos = ui.position,
            size = ui.size;

        var w = oSize.width != size.width,
            h = oSize.height != size.height,
            l = oPos.left != pos.left,
            t = oPos.top != pos.top,
            direction = '';

        var handles = ['n, e, s, w, ne, se, sw, nw'];

        if (l && t) {
            direction = w && h ? 'nw' : w ? 'w' : 'n';
        }
        else if (l) {
            direction = w && h ? 'sw' : w ? 'w' : 's';
        }
        else if (t) {
            direction = w && h ? 'ne' : w ? 'e' : 'n';
        }
        else {
            direction = w && h ? 'se' : w ? 'e' : 's';
        }

        if (asObject) {
            return {
                left: direction.indexOf('w') >= 0,
                right: direction.indexOf('e') >= 0,
                top: direction.indexOf('n') >= 0,
                bottom: direction.indexOf('s') >= 0
            };
        }
        else {
            return direction;
        }
    }

	function fit(what, where, padding, windowIgnore) {
        if (!where || where.length == 0) {
            where = $('body');
        }
	    what.offset({
	        left: getFittedX(what, where, padding ? padding.right : null, windowIgnore),
	        top: getFittedY(what, where, padding ? padding.bottom : null, windowIgnore)
	    });
	}

	function getFittedX(what, where, rightPadding, windowIgnore) {
	    return Math.min(
	        what.offset().left,
	        getMaxLeftByWrapper(what, where, rightPadding)
	    );
	}

	function getFittedY(what, where, bottomPadding, windowIgnore) {
	    return Math.min(
	        what.offset().top,
	        getMaxTopByWrapper(what, where, bottomPadding),
	        windowIgnore ? Number.MAX_SAFE_INTEGER : getMaxTopByWrapper(what, $(window))
	    );
	}

	function getMaxTopByWrapper(what, where, bottomPadding) {
	    bottomPadding = bottomPadding || 15;
        var offset = where.offset();
	    return where.height() - where.scrollTop() + (offset ? offset.top : 0) - what.height() - bottomPadding;
	}

	function getMaxLeftByWrapper(what, where, rightPadding) {
	    rightPadding = rightPadding || 0;
        var offset = where.offset();
	    return where.width() + (offset ? offset.left : 0) - what.width() - rightPadding;
	}
})(jQuery);