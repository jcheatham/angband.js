



var letters = [['a','e','i','o','u','y','ae','ui','ai','ae'],['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z','th','dh']];

var letterFilter = [];
//				  [[a ,e ,i ,o ,u ,y ,ae,ui,ai,ae],[b ,c ,d ,f ,g ,h ,j ,k ,l ,m ,n ,p ,q ,r ,s ,t ,v ,w ,x ,y ,z ,th,dh]]
letterFilter[0] = [[20,20,20,16,6 ,1 ,14,14,14,14],[1 ,8 ,8 ,15,5 ,15,0 ,0 ,20,12,20,3 ,4 ,15,15,15,8 ,4 ,0 ,10,0 ,15,10]]; //elvish

var bob = [1,0,4];
//random name generator. Currently *very* random. And crap.
function generateName(type) {
	var name = '';
	var wordLength = misc.RNG(4,9);
	var toggle = misc.RNG(0,1);

	while (wordLength > 0) {
		name += letters[toggle][misc.wRNG(letterFilter[type][toggle])];
		toggle = 1-toggle;
		wordLength--;
	}
	return name;
}

function testElvishNames(num) {
	var tempStr = '';
	for (var I1 = 0; I1 <= num; I1++) 	{
		tempStr += generateName(0) + '<br />';
	}

	$('name').innerHTML = tempStr;
}

//test function to check my weighted rng
function bobbus() {
	var tempBob;
	var tempBob0 = 0;
	var tempBob1 = 0;
	var tempBob2 = 0;
	for (var I1 = 1000; I1 > 0; I1--) {
		tempBob = misc.wRNG([4,0,1]);
		if (tempBob === 0)
		{
			tempBob0++;
		}
		else if (tempBob == 1)
		{
			tempBob1++;
		}
		else if (tempBob == 2)
		{
			tempBob2++;
		}
	}
	alert('0:'+tempBob0+',1:'+tempBob1+',2:'+tempBob2);
}

var bob1 = 5;
function testy()
{
	var bob1 = 3;
	bob1++;
	alert(bob1);
}




	var varfred = -137
function speedtest1() {

	var freddus1 = [0]
	for (var I1 = 0; I1 <= 1000000000; I1++) {

		if (freddus1.length > 0) {
			return true
		}

	}
	return true;
}
function speedtest2() {

	var freddus2 = 4
	for (var I1 = 0; I1 <= 1000000000; I1++) {

		if (typeof freddus2 != "undefined") {
			return true
		}
	}
	return true;
}
function speedtest3() {

	var freddus3 = []
	var varfred2 = varfred
	for (var I1 = 0; I1 <= 1000000; I1++) {

		varfred2 = varfred
		if (varfred2 < 0) {
			varfred2 = 0 - varfred2
		}

		freddus3.push(varfred2);

	}
	return true;
}

function test() {
	var bobu
	var bobs = ""
	var boba = []
	var bobnu = 0
	var bobo = {}
	var bobn = null

	alert([typeof bobu,typeof bobs,typeof boba,typeof bobnu,typeof bobo,typeof bobn,'\n' + typeOf(bobu),typeOf(bobs),typeOf(boba),typeOf(bobnu),typeOf(bobo),typeOf(bobn)])


}

