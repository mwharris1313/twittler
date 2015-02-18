var _;
var log = console.log.bind(console);
streams.users['billy'] = [];

$(document).ready(function(){

	var msg = ['j0','a1','b2','c3','d4','e5','f6','g7','h8','i9'];
	var billyTweet = function() { makeTweet( 'billy', msg[Math.floor(Math.random()*10)] ); };
	setInterval(billyTweet, 2000);

	setInterval(checkTweets, 1000, {amount:10, user:'billy', isTimeFriendly:true});

});

var checkTweets = function(args){
	var amount 			= args.amount;
	var user			= args.users;
	var isTimeFriendly	= args.isTimeFriendly;

	var body = $('body');
	var tweetBox = $('.tweetBox');
	tweetBox.html('');

	var tweets = !user ? streams.home :
		_.filter(streams.home, function(item){ return item.user === user; });

	var len = tweets.length;
	var maxTweets = len < amount ? len : amount;

	var now = (new Date).getTime();
	for (var i = len-1; i >= (len-maxTweets); i--){

		var tweet = tweets[i];
		var createdAt = isTimeFriendly ? dateToFriendly(tweet.created_at) : tweet.created_at;

		var tag = $('<div></div>');
		tag.text(createdAt +  ' @' + tweet.user + ': ' + tweet.message);
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

var dateToFriendly = function(date){
	var s,m,h,d,m,y;
	s = 1000;
	m = 60000;
	h = 3600000;
	d = 86400000;
	mn = 2592000000;
	y = 946080000000;

	var then = date.getTime();

	var now = (new Date).getTime();
	var ms = now - then;


	if (ms < s)		return 'now';
	if (ms < 2*s)	return '1 second ago';
	if (ms < m)		return Math.floor(ms/s) + ' seconds ago';
	if (ms < 2*m)	return '1 minute ago';
	if (ms < h)		return Math.floor(ms/m) + ' minutes ago';
	if (ms < 2*h)	return '1 hour ago';
	if (ms < d )	return Math.floor(ms/h) + ' hours ago';
	if (ms < 2*d)	return '1 day ago';
	if (ms < mn )	return Math.floor(ms/d) + ' days ago';
	if (ms < 2*mn)	return '1 month ago';
	if (ms < y )	return Math.floor(ms/mn) + ' months ago';
	if (ms < 2*y)	return '1 year ago';
					return Math.floor(ms/y) + ' years ago';

}