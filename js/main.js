$(function() {

    $('.sections').on('click', function gettingNews() {
        
        $(function loadingChange() {
            $(document).ajaxStart(function () {
                $('.newsfeed').hide();
                $('#loader').css('display', 'flex');
            });
    
            $(document).ajaxStop(function () {
                $('.newsfeed').show();
                $('#loader').css('display', 'none');
            });
        });
    });

    $('.sections').on('change', function gettingNews() {
        
        var sectionSelected = $('.sections').val();      
        
        if (sectionSelected != "") {

            $('.newsfeed').empty();
            $('.newsfeed').css('top', '20%');

            if ($(document).width() > 600) {
                $('.header-desktop').css('top', '21.297');
                $('.nyt-icon').css('width', '70px');
                $('.nyt-icon').css('height', '70px');
                $('.nyt-icon').css('margin-left', '50px');
                $('.section-choose').css('margin-top', '0px');
                $('.section-choose').css('padding-left', '50px');
                // $('.copyright').css('top', '1685px');
                        
            }   

            if ($(document).width() >= 600 && $(document).width() < 1000) {
                $('.copyright').css('padding-top', '7%');
                $('.copyright').css('top', '2150px');
                $('.header-desktop').css('margin-bottom', '20px');
                $('.header-desktop').css('margin-top', '0px');
            }

            if ($(document).width() < 1000) {
                $('.nyt-icon').css('margin-left', '0');
            }

            if ($(document).width() >= 1000) {
                $('.copyright').css('top', '1690px');
                $('.copyright').css('height', '50px');
                $('.copyright').css('margin-bottom', '10px');
            }    
            
            var url = 'https://api.nytimes.com/svc/topstories/v2/' + sectionSelected + '.json';
            url += '?' + $.param({
                'api-key': 'feaf225e47ba4c55adc03b5ef13f8eed'
                }
            );
        
            $.ajax({
                url: url,
                method: 'GET',
            }).done(function(result){
                console.log(result);
                var i = 0;
                $.each(result.results, function(key, value){
                    if (value.multimedia[4] && i < 12) {
                        $('.newsfeed').append('<li class="li-background" style="background-image: url('+value.multimedia[4].url+')"><a target="blank" href='+value.url+'>'+'<p>'+value.title+'</p>'+'</a></li">'
                    );
                    i++;
                    }
                });
            })

            $(window).resize(function(){location.reload();})
            
            .fail(function(err){
                throw err;
            });
        }
    }); 
})