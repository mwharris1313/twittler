var _;
var log = console.log.bind(console);
streams.users['billy'] = [];
var g = {};
g.isPaused = false;
g.currentUser = null;
g.isFriendly = false;

$(document).ready(function(){
	var msg = ['a1','b2','c3','d4','e5','f6','g7','h8','i9','j10'];
	var billyPost = function() { makePost( 'billy', msg[Math.floor(Math.random()*10)] ); };
	setInterval(billyPost, 3000);

	//setInterval(checkTweets, 1000, {user:'billy', isTimeFriendly:true});
	setInterval(checkMessages, 2000, {user:'billy', isTimeFriendly:false});

	$('.headRight').on('click', function(){
		g.isPaused = !g.isPaused;
	});

	$('.segmentWrapper').on('click', '.segment', function(e){
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

var checkMessages = function(args){
	if (!g.isPaused){	

		var amount 			= args.amount;
		var user			= g.currentUser || args.users;
		var isTimeFriendly	= args.isTimeFriendly;

		var body = $('body');
		var segmentWrapper = $('.segmentWrapper');
		segmentWrapper.html('');

		var messages = !user ? streams.home :
			_.filter(streams.home, function(item){ return item.user === user; });


		for (var i = messages.length-1; i >= 0; i--){

			var message = messages[i];
			var createdAt = isTimeFriendly ? dateToFriendly(message.created_at) : 
				dateToFull(message.created_at);

			var tag = $('<div class="segment"></div>');
			var left = '<span class="segLeft">'+createdAt+'</span>';
			var middle = '<span class="segMiddle">'+' @' + message.user+': </span>';
			var right = '<span class="segRight">'+message.message+'</span>';
			tag.html(left+middle+right);
			tag.appendTo(segmentWrapper);
		}

	}
}

var makePost = function(fUser, fPost){
	var post = {};
	post.user = fUser;
	post.message = fPost;
	post.created_at = new Date();
	addTweet(post);
};
