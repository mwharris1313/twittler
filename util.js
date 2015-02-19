var dateToFriendly = function(date){
	var s,m,h,d,mn,y; // second, minute, hour, day, month, and year in milliseconds
	s = 1000;
	m = 60000;
	h = 3600000;
	d = 86400000;
	mn = 2592000000;
	y = 946080000000;

	var then = date.getTime();

	var now = (new Date).getTime();
	var ms = now - then;


	if (ms < 2*s)	return '1 second';
	if (ms < m)		return Math.floor(ms/s) + ' seconds';
	if (ms < 2*m)	return '1 minute';
	if (ms < h)		return Math.floor(ms/m) + ' minutes';
	if (ms < 2*h)	return '1 hour';
	if (ms < d )	return Math.floor(ms/h) + ' hours';
	if (ms < 2*d)	return '1 day';
	if (ms < mn )	return Math.floor(ms/d) + ' days';
	if (ms < 2*mn)	return '1 month';
	if (ms < y )	return Math.floor(ms/mn) + ' months';
	if (ms < 2*y)	return '1 year';
					return Math.floor(ms/y) + ' years';

}

var dateToFull = function(date){
	var now = new Date();
	var d = date.toString().split(' ');
	var monthDayTime = d[1]+' '+d[2]+' '+d[4];
	var monthDayYearTime = d[1]+' '+d[2]+' '+d[3]+' '+d[4];
	var s = date.getFullYear() === now.getFullYear() ? monthDayTime : monthDayYearTime;
	return s;
}