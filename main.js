var _;
var log = console.log.bind(console);

streams.users['billy'] = [];

$(document).ready(function(){

	var msg = ['j0','a1','b2','c3','d4','e5','f6','g7','h8','i9'];
	var billyTweet = function() { makeTweet( 'billy', msg[Math.floor(Math.random()*10)] ); };
	setInterval(billyTweet, 2000);

	setInterval(checkTweets, 1000, 10, 'billy');
	//setInterval(checkTweets, 1000, 20);

});

var checkTweets = function(amount, user){

	var body = $('body');
	var tweetBox = $('.tweetBox');
	tweetBox.html('');

	var tweets = !user ? streams.home :
		_.filter(streams.home, function(item){ return item.user === user; });

	var len = tweets.length;
	var maxTweets = len < amount ? len : amount;

	for (var i = len-1; i >= (len-maxTweets); i--){

		var tweet = tweets[i];
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