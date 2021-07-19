function init() {

    $('#c1 .drag')
        .resizable({ 
            handles: 'all' ,
            containment: "parent",
            resizeBox: true,
            resizeBoxClass: 'custom-resize-box'
        });

}