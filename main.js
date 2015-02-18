$(document).ready(function(){

	var testArg = "helloWorld";
	checkTweets(testArg);
	setInterval(checkTweets, 1000, testArg);

});

function showLength(){
	console.log(streams.home.length);
}

function checkTweets(msg){
	console.log(arguments[0]);

	var body = $('body');
	var tweetBox = $('.tweetBox');
	tweetBox.html('');

	var numTweets = 10;
	var len = streams.home.length;
	for (var i = len-1; i >= (len-numTweets); i--){

		var tweet = streams.home[i];
		var tag = $('<div></div>');
		tag.text(tweet.created_at +  ' @' + tweet.user + ': ' + tweet.message);
		tag.appendTo(tweetBox);

	}
}