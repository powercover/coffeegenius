var brand = '';
var variety = '';
var custom_sugs = '';

var buttonWidth = '';
var descBlockWidth = '';

var rebuildCols = function (inner_content, idbrand) {
    // Clear columns
    $(inner_content).find('.item_col .item').remove();
    $(inner_content).closest('.content').css('visibility', 'hidden');

    var items = [];

    for (var i in allVarieties) {
        if (idbrand == undefined || allVarieties[i].idbrand == idbrand) {
            items.push(allVarieties[i]);
        }
    }
    ;

    if (items.length == 0) {
        return;
    }

    items.sort(function (a, b) {
        if (a.description[0].toLowerCase() < b.description[0].toLowerCase()) {
            return -1;
        } else if (a.description[0].toLowerCase() > b.description[0].toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    });

    var firstCol = Math.ceil(items.length / 2);

    var firstColAlpha = '&nbsp;';
    if (items[0].description[0] != items[firstCol - 1].description[0]) {
        firstColAlpha = items[0].description[0] + ' - ' + items[firstCol - 1].description[0];
    }

    var secondCol = false;
    if (items.length > 1) {
        secondCol = Math.floor(items.length / 2);
    }

    var secondColAlpha = '&nbsp;';

    if (secondCol && items[firstCol].description[0] != items[firstCol + secondCol - 1].description[0]) {
        secondColAlpha = items[firstCol].description[0] + ' - ' + items[firstCol + secondCol - 1].description[0];
    }

    $(inner_content).find('.item_col:eq(0) .alpha_title').html(firstColAlpha);
    $(inner_content).find('.item_col:eq(1) .alpha_title').html(secondColAlpha);

    for (var i in items) {
        var column;

        if (i < firstCol) {
            column = $(inner_content).find('.item_col:eq(0)');
        } else {
            column = $(inner_content).find('.item_col:eq(1)');
        }

        var item = $('<a></a>').attr({
            class: 'item',
            id: items[i].id,
            idbrand: items[i].idbrand,
            href: 'javascript:void(0);',
        }).text(items[i].description).appendTo(column);
    }

//    $(inner_content).find('.alpha_title').each(function () {
//        $(this).css({
//            height: $('.big_button').height() + 'px',
//            fontSize: $('.big_button').css('fontSize'),
//            lineHeight: parseInt($('.big_button').css('lineHeight')) * 0.7 + 'px',
//        });
//    });

//    $(inner_content).find('.item').each(function () {
//        $(this).css({
//            // height: $(this).height() + 'px',
//            fontSize: $('.big_button').css('fontSize'),
//            lineHeight: parseInt($('.big_button').css('lineHeight')) * 0.7 + 'px',
//            // padding: $('.big_button').css('padding'),
//        });
//    });

    $(inner_content).css({display: '', height: ''})
    setTimeout(function () {
        console.log($(inner_content).height());
        $(inner_content).data('actualHeight', $(inner_content).height()).css({display: 'none', height: '0px'});

        $(inner_content).closest('.content').css('visibility', '');

        $(inner_content).prev('.big_button').removeClass('unactive');
    }, 100);
}

//var coffee = {
//    ajax: function() {
//        
//    }
//}

$(document).ready(function () {
    buttonWidth = $('.content_wrapper.half').width();
    $('.content_wrapper.half').height(buttonWidth);


    $('.open_brands, .open_varieties').on('click', function (e) {
        e.preventDefault();

        var menu = $(this).next();
        if (!$(this).hasClass('unactive')) {

            if (menu.css('display') == 'none') {
                menu.css('display', 'block').animate({height: menu.data('actualHeight') + 'px'}, 500, function () {
                });
            } else {
                menu.animate({height: '0px'}, 500, function () {
                    menu.css('display', 'none')
                });
            }
        }
    });

//    if (window.screen.availWidth <= 1024) {
//        $('.brands').find('.alpha_title').each(function () {
//            $(this).css({
//                height: $(this).height() + 'px',
//                fontSize: $(this).css('fontSize'),
//                lineHeight: $(this).css('lineHeight')
//            });
//        });
//        $('.brands').find('.item').each(function () {
//            $(this).css({
//                // height: $(this).height() + 'px',
//                fontSize: $(this).css('fontSize'),
//                lineHeight: $(this).css('lineHeight'),
//                padding: $(this).css('padding'),
//            });
//        });

    // Turn VH sizes to pixels (iphone bug)
//        $('#title').css({
//            height: $('#title').height() + 'px',
//            fontSize: $('#title').css('fontSize'),
//            lineHeight: $('#title').css('lineHeight')
//        });
//
//        $('#sub_title').css({
//            height: $('#sub_title').height() + 'px',
//            fontSize: $('#sub_title').css('fontSize'),
//            lineHeight: $('#sub_title').css('lineHeight')
//        });
//
//        $('#top_pattern').css({
//            height: $('#top_pattern').height() + 'px',
//            marginTop: $('#top_pattern').css('marginTop')
//        });

//        $('.big_button').each(function () {
//            $(this).css({
//                height: $(this).height() + 'px',
//                fontSize: $(this).css('fontSize'),
//                lineHeight: $(this).css('lineHeight')
//            });
//        });

//        $('.sub_content').each(function () {
//            $(this).css({
////                padding: $(this).css('padding')
//            });
//        });

//        $('.inner_content').each(function () {
//            $(this).css({
//                padding: $(this).css('padding')
//            });
//        });

//        $('.big_menu_button').each(function () {
//            $(this).css({
//                height: $(this).css('height'),
//                paddingTop: $(this).css('paddingTop')
//            });
//        });

//        $('.content_wrapper .items_list').each(function () {
//            $(this).css('display', '');
//        });
//    }



    $(window).resize(function () {
        if ($(window).width() >= 384)
            console.log("landscape");
        buttonWidth = $('.content_wrapper.half').width();
        $('.content_wrapper.half').height(buttonWidth);

        descBlockWidth = $('.list_items .list_item_wrapper').width() - 167;

        $('.list_items .list_item_wrapper .list_item .desc_block').width(descBlockWidth);

        $('.scroll_block').width(descBlockWidth - 5);
        $('.scroll_block .jspContainer').width(descBlockWidth - 5);
        $('.scroll_block .jspContainer .jspPane').width(descBlockWidth - 5);
        $('.desc_block').find('.scroll_block').jScrollPane();

    });



    $('.brands').data('actualHeight', $('.brands').height()).css({display: 'none', height: '0px'});
    $('.vars').data('actualHeight', $('.vars').height()).css({display: 'none', height: '0px'});

    // rebuildCols($('.vars'));

    setTimeout(function () {
        $('body').animate({opacity: 1});
    }, 150);

    $('body').on('click', '.big_menu_button', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        custom_sugs = $(this).find('.title').data('ids');
//        console.log(custom_sugs);

        $('.semi_blocks_wrapper').css('display', 'none');
        $('#product_list').css('display', 'block');

        $('#product_list .sub_title').text('Recommendations for ' + variety + ':');

        $('#products').addClass('loading').html('');

        //and send a request
        $.ajax({
            type: "POST",
            url: 'index.php?r=welcome/getproductsbycustomsugs/',
            data: {
                custom_sugs: custom_sugs
            },
            success: function (data) {
                //alert($.isArray(data));
                //console.log(data);
                $('#products').html(data).find('.list_item').each(function () {
                    var self = this;
                    var circle = $(this).find('.image_circle');

                    var circleWidth = circle.width()

                    var circleBorderWidth = 7;

                    if (window.screen.availWidth > 1024) {
                        circleBorderWidth = 4;
                    }

                    circleWidth += circleBorderWidth * 2;

                    var backgroundSize = circle.data('b-size');
                    var multiplier = circleWidth / backgroundSize;

                    descBlockWidth = $('.list_items .list_item_wrapper').width() - 167;

                    $('.list_items .list_item_wrapper .list_item .desc_block').width(descBlockWidth);
//                    console.log(descBlockWidth)


                    var img = new Image();
                    img.src = '/' + circle.data('b-image');
                    console.log(img);
                    img.onload = function () {
                        var bgPos = circle.css('backgroundPosition').split(' ');
                        bgPos[0] = parseInt(bgPos[0]) * multiplier - circleBorderWidth + 'px';
                        bgPos[1] = parseInt(bgPos[1]) * multiplier - circleBorderWidth + 'px';
                        bgPos = bgPos.join(' ');

                        circle.css({
                            width: circleWidth,
                            height: circleWidth,
                            backgroundSize: img.width * multiplier + 'px',
                            backgroundPosition: bgPos,
                        });
                        $(self).find('.desc_block .scroll_block').height(circleWidth + (circleBorderWidth * 2) - 10);
                        $(self).find('.desc_block .scroll_block').jScrollPane();
                    };

                    $('#products').removeClass('single double');
                    switch ($('#products .list_item_wrapper').length) {
                        case 1:
                            $('#products').addClass('single');
                            break;
                        case 2:
                            $('#products').addClass('double');
                            break;

                    }

                });
                $('#products').removeClass('loading');
            }
        });

    });
    $('body').on('click', '.item_col .item', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('.vars .item').css('display', 'block');
        var menu = $(this).closest('.items_list');

        menu.parent().find('.big_button span').text($(this).text());

        if (menu.css('display') == 'none') {
            menu.css('display', 'block').animate({height: menu.data('actualHeight') + 'px'}, 500, function () {
            });
        } else {
            menu.animate({height: '0px'}, 500, function () {
                menu.css('display', 'none')
            });
        }

        //prepare data
        if (menu.parent().find('.big_button').hasClass('open_brands')) { //get brand
            brand = $(this).text();
            //$('.items_list .vars .item[idbrand!=' + $(this).attr('idbrand') + ']').css('display', 'none');
            $('.vars .item').removeClass('hidden');
            $('.vars .item[idbrand!=' + $(this).attr('id') + ']').addClass('hidden');

            $('.vars').css({display: '', height: ''}).data('actualHeight', $('.vars').height());

            $('.open_varieties.big_button span').text('Select Variety');

            rebuildCols($('.vars'), $(this).attr('id'));
        } else if (menu.parent().find('.big_button').hasClass('open_varieties')) { //get variety
            variety = $(this).text();

            $('.semi_blocks_wrapper').css('display', 'none');
            $('#product_list').css('display', 'block');

            $('#product_list .sub_title').text('Recommendations for ' + variety + ':');

            $('#products').addClass('loading').html('');

            //and send a request
            $.ajax({
                type: "POST",
                url: 'index.php?r=welcome/getall/',
                data: {
                    brand: brand,
                    variety: variety
                },
                success: function (data) {
                    $('#products').html(data).find('.list_item').each(function () {
                        var self = this;

                        var circle = $(this).find('.image_circle');
                        var circleWidth = circle.width()
                        var circleBorderWidth = 7;

                        if (window.screen.availWidth > 1024) {
                            circleBorderWidth = 4;
                        }

                        circleWidth += circleBorderWidth * 2;

                        var backgroundSize = circle.data('b-size');
                        var multiplier = circleWidth / backgroundSize;


                        descBlockWidth = $('.list_items .list_item_wrapper').width() - 167;

                        $('.list_items .list_item_wrapper .list_item .desc_block').width(descBlockWidth);

                        var img = new Image();
                        img.src = '/' + circle.data('b-image');
                        img.onload = function () {
                            var bgPos = circle.css('backgroundPosition').split(' ');
                            bgPos[0] = parseInt(bgPos[0]) * multiplier - circleBorderWidth + 'px';
                            bgPos[1] = parseInt(bgPos[1]) * multiplier - circleBorderWidth + 'px';
                            bgPos = bgPos.join(' ');

                            circle.css({
                                width: circleWidth,
                                height: circleWidth,
                                backgroundSize: img.width * multiplier + 'px',
                                backgroundPosition: bgPos,
                            });

                            $(self).find('.desc_block .scroll_block').height(circleWidth + (circleBorderWidth * 2) -10);
                            $(self).find('.desc_block .scroll_block').jScrollPane();
                        };

                        $('#products').removeClass('single double');
                        switch ($('#products .list_item_wrapper').length) {
                            case 1:
                                $('#products').addClass('single');
                                break;
                            case 2:
                                $('#products').addClass('double');
                                break;

                        }

                        $('#products').removeClass('loading');
                    });
                }
            });
        }


    });
});
