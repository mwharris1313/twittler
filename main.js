var _;
var log = console.log.bind(console);
streams.users['billy'] = [];
var g = {};
g.isPaused = false;
g.currentUser = null;

$(document).ready(function(){
	var msg = ['j0','a1','b2','c3','d4','e5','f6','g7','h8','i9'];
	var billyTweet = function() { makeTweet( 'billy', msg[Math.floor(Math.random()*10)] ); };
	setInterval(billyTweet, 2000);

	//setInterval(checkTweets, 1000, {user:'billy', isTimeFriendly:true});
	setInterval(checkTweets, 200, {user:'billy', isTimeFriendly:false});

	$('.headRight').on('click', function(){
		g.isPaused = !g.isPaused;
	});

	$('.segmentWrapper').on('click', function(e){
		var thisClass = $(e.target).attr('class');
		console.log(thisClass);

		var test = '';
		if (thisClass === 'segLeft') {

		};

		if (thisClass === 'segMiddle') {
			g.isPaused = false;
			g.currentUser = g.currentUser ? null : 
				e.target.innerHTML.split(':')[0].split('@')[1];
		};
		if (thisClass === 'segRight') test = 'right';
	});
});

var checkTweets = function(args){
	if (!g.isPaused){	

		var amount 			= args.amount;
		var user			= g.currentUser || args.users;
		var isTimeFriendly	= args.isTimeFriendly;

		var body = $('body');
		var segmentWrapper = $('.segmentWrapper');
		segmentWrapper.html('');

		var tweets = !user ? streams.home :
			_.filter(streams.home, function(item){ return item.user === user; });

		var len = tweets.length;
		var maxTweets = len < amount ? len : amount;

		for (var i = len-1; i >= 0; i--){

			var tweet = tweets[i];
			var createdAt = isTimeFriendly ? dateToFriendly(tweet.created_at) : 
				dateToFull(tweet.created_at);

			var tag = $('<div class="segment"></div>');
			var left = '<span class="segLeft">'+createdAt+'</span>';
			var middle = '<span class="segMiddle">'+' @' + tweet.user+': </span>';
			var right = '<span class="segRight">'+tweet.message+'</span>';
			tag.html(left+middle+right);
			tag.appendTo(segmentWrapper);
		}

	}
}

var makeTweet = function(user, message){
	var tweet = {};
	tweet.user = user;
	tweet.message = message;
	tweet.created_at = new Date();
	addTweet(tweet);
};
