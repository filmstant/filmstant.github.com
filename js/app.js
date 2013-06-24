$(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('#toTop').fadeIn();
    } else {
        $('#toTop').fadeOut();
    }
});

$("#toTop").click(function() {
    $("html, body").animate({scrollTop: 0}, 1000);
 });


$(document).ready(function() {

var apiurl;

if($("#homeflag").length > 0) {
    apiurl = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?country=us&apikey=qsrc3nwb5xsuvwbnv6xazzc3";
}

if($("#upcomingflag").length > 0) {
    apiurl = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?limit=6&country=us&apikey=qsrc3nwb5xsuvwbnv6xazzc3";
}



  $.ajax({

    url: apiurl,

    dataType: "jsonp",

    beforeSend:function(){
    $('#footer').hide();
    // Spinner
    $('.loading').show();
  	},

    success: searchCallback,


    error:function(){
    // failed request
    $('.loading').empty();
    $('.loading').html('<h1>!</h1>');
  	}

  });


});



// callback for when we get back the results
function searchCallback(data) {


$('.loading').hide();

 var movies = data.movies;
 var movTitle;
 var style;
 var noSpaceMovTitle;

 var noReview="No Reviews Yet...";
 var noScore="N/A";

 $.each(movies, function(index, movie) {


	// To Do List
	//Javascript needs to be refactored/tweaked heavily and html moved out.
	//Format Date better

	if (movie.title.length > 21){
		var length = 19;
		movTitle = movie.title.substring(0,length);
		movTitle = movTitle+'...';
	}

	else {
		movTitle = movie.title;
	}

  noSpaceMovTitle = movie.title.replace(/\s+/g, '');

  if (movie.critics_consensus === undefined){
    movie.critics_consensus = noReview;
  }

  if (movie.ratings.critics_score == "-1"){
    movie.ratings.critics_score = noScore;
  }

  if (movie.ratings.audience_score == "0"){
    movie.ratings.audience_score = noScore;
  }

  



   $('.movielist').append('<li><div class="postercolumn"><img src="' + movie.posters.detailed + '" width="180" height="261"/><div class="blueer"><a href="http://www.youtube.com/embed?listType=search&list=' + movie.title + ' trailer" target="_blank"><span class="icon" aria-hidden="true" data-icon="&#9654;"></span>   trailer</a></div><a href="http://www.google.com/movies?hl=en&q=' + movie.title + '" target="_blank"><span class="icon" aria-hidden="true" data-icon="&#128340;"></span>   showtimes</a></div><div class="infocolumn"><div class="titlebox"><h2>' + movTitle + '</h2></div><div class="reviewbox"><p>' + movie.critics_consensus + '</p><h6> ' + movie.release_dates.theater + ' &#183; ' + movie.runtime + ' min &#183; Rated ' + movie.mpaa_rating + '</h6></div><div class="scores"><div class="'+ noSpaceMovTitle +'Critic criticbox"><a href="' + movie.links.alternate + '#contentReviews"><h3>' + movie.ratings.critics_score + '</h3><p>CRITICS</p></a></div><div class="'+ noSpaceMovTitle +'Audience audiencebox"><a href="' + movie.links.alternate + '#audience_reviews"><h3>' + movie.ratings.audience_score + '</h3><p>AUDIENCE</p></a></div></div></div></li>');


	if (movie.ratings.audience_score < 60){		
		style = $('<style type="text/css">.'+ noSpaceMovTitle +'Audience{ background: #e74c3c; } .'+ noSpaceMovTitle +'Audience:hover{ background: #fe5353; }</style>');
			$('html > head').append(style);
	}

	if (movie.ratings.critics_score < 60){			
				style = $('<style type="text/css">.'+ noSpaceMovTitle +'Critic{ background: #e74c3c; } .'+ noSpaceMovTitle +'Critic:hover{ background: #fe5353; }</style>');
			$('html > head').append(style);
	}


 });


  $("#footer").show();

}

