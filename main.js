var r = 0;
$(document).ready(function(){

	streams.users['billy'] = [];

	var testArg = "helloWorld";
	var amount = 10;
	checkTweets(amount);
	setInterval(checkTweets, 1000, amount);

});

var checkTweets = function(amount){
	r++;
	var msg = ['j0','a1','b2','c3','d4','e5','f6','g7','h8','i9'];
	makeTweet('billy', 'talked to ' + msg[r%10]);

	var body = $('body');
	var tweetBox = $('.tweetBox');
	tweetBox.html('');

	var len = streams.home.length;
	for (var i = len-1; i >= (len-amount); i--){

		var tweet = streams.home[i];
		var tag = $('<div></div>');
		tag.text(tweet.created_at +  ' @' + tweet.user + ': ' + tweet.message);
		tag.appendTo(tweetBox);

	}
}

var makeTweet = function(user, message){
	var tweet = {};
	tweet.user = user;
	tweet.message = message;
	tweet.created_at = new Date();
	addTweet(tweet);
};