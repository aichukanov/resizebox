$(document).ready(function () {
    // common listeners
    $(document)
        .on('click', '.container', function (e) {
            $(this).find('.selected').removeClass('selected');
        })
        .on('click', '.drag', function (e) {
            $(this).addClass('selected');
            e.stopPropagation();
        });

    // set random position for all elements
    $('.container').each(function () {
        var container = $(this),
            drag = container.find('.drag'),
            dragSize = 50,
            height = container.height() - dragSize - 50,
            width = drag.length > 0 ? (container.width() / drag.length) : 10;        

        drag.each(function (i) {
            $(this).css({
                left: Math.random() * dragSize + i * width,
                top: Math.random() * height + 40
            });
        });
    });

    init();
});
    
function selectActive() {
    var $this = $(this);
    if (!$this.hasClass('selected')) {
        $this.siblings('.selected').removeClass('selected');
        $this.addClass('selected');
    }
}