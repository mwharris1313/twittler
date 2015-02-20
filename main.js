var _;
var log = console.log.bind(console);
streams.users['billy'] = [];
var g = {};
g.isPaused = false;
g.currentUser = null;
g.isTimeFriendly = false;
g.checkInterval = 4500;
g.user = 'billy';

$(document).ready(function(){

	checkPosts();
	setInterval(checkPosts, g.checkInterval);

	// --------------------------------------------------------
	// PAUSE/PLAY click event

	var play = function(){
			$('.headRight').text('PAUSE');
			$('.headRight').removeClass('play');
			$('.headRight').addClass('pause');
			g.isPaused = false;
			checkPosts();		
	}
	var pause = function(){
			$('.headRight').text('PLAY');
			$('.headRight').removeClass('pause');
			$('.headRight').addClass('play');
			g.isPaused = true;
	}

	$('.headRight').on('click', function(){ g.isPaused ? play() : pause(); });

	// --------------------------------------------------------
	// user's post event , button click or keyboard enter key

	var postIt = function(){
		var message = $('.postInput').val();
		makePost(g.user, message);
		$('.postInput').val('');
		var tempUser = g.currentUser;
		g.currentUser = g.user;
		play();
		_.delay(function(){g.currentUser = tempUser}, 3000);

	}

	$('.postButton').on('click', postIt);
	$('.postInput').keypress(function (e) {
		if (e.which == 13) {
			postIt();
		} 
	});


	// --------------------------------------------------------
	// username click event

	var userNameClicked = function(user){
		if (g.currentUser) {
			g.currentUser = null;
			play();
		} else {
			g.currentUser = user;
			checkPosts();
			pause();
		}
	}

	$('.headLeft').on('click', function(e){
		var user = $(e.target).text().split('@')[1];
		userNameClicked(user);
	});

	$('.segmentWrapper').on('click', '.segment', function(e){
		var thisClass = $(e.target).attr('class');

		var test = '';
		if (thisClass === 'segLeft') {
			g.isTimeFriendly = !g.isTimeFriendly;
			checkPosts();
		};

		if (thisClass === 'segMiddle') {
			userNameClicked(e.target.innerHTML);
		};
		if (thisClass === 'segRight'){
			//TODO: click on message puts post in top window
		};
	});
	// --------------------------------------------------------

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
			var middle = '<span class="segMiddle">'+post.user+'</span>';
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
