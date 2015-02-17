$(document).ready(function(){

	var body = $('body');
	var tweetBox = $('.tweetBox');

	for (var i=0; i<streams.home.length; i++){

		var tweet = streams.home[i];
		var tag = $('<div></div>');
		tag.text('@' + tweet.user + ': ' + tweet.message);
		tag.appendTo(tweetBox);

	}

});
