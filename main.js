var _;
var log = console.log.bind(console);
streams.users['billy'] = [];
var g = {};
g.isPaused = false;
g.currentUser = null;
g.isTimeFriendly = false;
g.checkInterval = 5000;
g.user = 'billy';

$(document).ready(function(){

	checkPosts();
	//setInterval(checkTweets, 1000, {user:'billy', isTimeFriendly:true});
	setInterval(checkPosts, g.checkInterval, {user:'billy', isTimeFriendly:false});

	$('.headRight').on('click', function(){
		g.isPaused = !g.isPaused;
	});

	var postIt = function(){
		var message = $('.postInput').val();
		makePost(g.user, message);
		$('.postInput').val('');
		//g.currentUser = g.user;
		checkPosts();
	}

	$('.postButton').on('click', postIt);
	$('.postInput').keypress(function (e) {
	  if (e.which == 13) postIt();
	});

	$('.segmentWrapper').on('click', '.segment', function(e){
		var thisClass = $(e.target).attr('class');

		var test = '';
		if (thisClass === 'segLeft') {

		};

		if (thisClass === 'segMiddle') {
			g.isPaused = false;
			g.currentUser = g.currentUser ? null : 
				e.target.innerHTML.split(':')[0].split('@')[1];
			checkPosts();
		};
		if (thisClass === 'segRight') test = 'right';
	});
});

var checkPosts = function(args){
	if (!g.isPaused){	


		var body = $('body');
		var segmentWrapper = $('.segmentWrapper');
		segmentWrapper.html('');

		var posts = !g.currentUser ? streams.home :
			_.filter(streams.home, function(item){ return item.user === g.currentUser; });

		var activePost = posts[posts.length-1];
		$('.headLeft').html('');
		$('.headLeft').html('@'+activePost.user);
		$('.content').html('');
		$('.content').html(activePost.message);


		for (var i = posts.length-1; i >= 0; i--){

			var post = posts[i];
			var createdAt = g.isTimeFriendly ? dateToFriendly(post.created_at) : 
				dateToFull(post.created_at);

			var tag = $('<div class="segment"></div>');
			var left = '<span class="segLeft">'+createdAt+'</span>';
			var middle = '<span class="segMiddle">'+' @' + post.user+': </span>';
			var right = '<span class="segRight">'+post.message+'</span>';
			tag.html(left+middle+right);
			tag.appendTo(segmentWrapper);
		}

	}
}

var makePost = function(user, message){
	var post = {};
	post.user = user;
	post.message = message;
	post.created_at = new Date();
	addTweet(post);
};
