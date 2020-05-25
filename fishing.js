var mainContent = document.getElementsByClassName('main-content')[0];
var largeFishElement = document.getElementsByClassName('large-fish')[0];
var smallFishElement = document.getElementsByClassName('small-fish')[0];
var containerWidth = mainContent.clientWidth;

// working in vw units
var largeFishWidth = largeFishElement.clientWidth / containerWidth * 100;
var smallFishWidth = smallFishElement.clientWidth / containerWidth * 100;

var largeX;
var smallX;

var bodyElement;

initializeCounters();
moveFish();

function initializeCounters() {
	$(document).ready(function(){
		var counters = document.getElementsByClassName("counter");
		bodyElement = document.getElementsByTagName("body")[0];
		bodyElement.onscroll = function(){ checkToAnimateCounters(counters) };
		checkToAnimateCounters(counters);
	});
}

function checkToAnimateCounters(counters) {
	for (var i = 0; i < counters.length; i++) {
		var counter = counters[i];
		if (isScrolledIntoView(counter)){
			startCounter();
			bodyElement.onscroll = null;
			break;
		}
	}
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return (elemTop <= docViewBottom && elemBottom >= docViewBottom) || 
    		(elemTop <= docViewTop && elemBottom >= docViewTop) ||
    		((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function startCounter() {
	$(document).ready(function() {
		$('.counter').each(function () {
			$(this).prop('Counter', 0).animate(
			{ 
				Counter: $(this).text() 
			}, 
			{ 
				duration: 3000,
			  	easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
	});
}

function moveFish() {
	$(document).ready(function() {
		initFish();
		var id = setInterval(frame, 6);
		var switchedFish = false;

		function frame() {
			if (!switchedFish && largeX > 50){
				var mediaIndex = largeFishElement.src.toString().search("media") + 6;
				var imageLocation = largeFishElement.src.toString().substring(0, mediaIndex) + "dolphin-going-right.png";
				largeFishElement.src = imageLocation;
				switchedFish = true;
			}

			smallX += .2;
			if (smallX > 33){
				largeX += .3;
			}

			if (smallX >= 100){
				smallFishElement.style.setProperty('visibility', 'hidden');
			}
			if (largeX >= 100)
			{
				largeFishElement.style.setProperty('visibility', 'hidden');
				clearInterval(id);
			}
			
			largeFishElement.style.setProperty('left', largeX + 'vw');
			smallFishElement.style.setProperty('left', smallX + 'vw');
		}
	});
}

function initFish(){
	largeX = -largeFishWidth;
	smallX = -smallFishWidth;

	largeFishElement.style.setProperty('top', 0);
	largeFishElement.style.setProperty('left', largeX + "vw");
	largeFishElement.style.setProperty('visibility', 'visible');

	smallFishElement.style.setProperty('top', 0);
	smallFishElement.style.setProperty('left', smallX + "vw");
	smallFishElement.style.setProperty('visibility', 'visible');
}