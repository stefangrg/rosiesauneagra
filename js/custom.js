var money = 0;
var moneda = " Credite";
var back_card = {
	"id":0,
	"src":"img/cards/0.png"
}

var cards = [back_card,back_card,back_card];
var audio = new Audio('music/bgsong.mp3');
var winSound = new Audio('music/win-sound.wav');
var cardSound = new Audio('music/bet-sound.wav');

var audioPlaying = false;

audio.loop = true;
audio.volume = 0.3;

winSound.volume = 0.7;
winSound.loop = false;
cardSound.volume = 0.7;
cardSound.loop = false;

$( document ).ready(function() {
    $("#prev0").attr("src",back_card['src']);
    $("#prev1").attr("src",back_card['src']);
    $("#prev2").attr("src",back_card['src']);
    $("#bottom-text").text("Rosie sau neagra ?");

    $("#red-button").on('click',function(){
    	roll(1);
		cardSound.play();
    });
    $("#black-button").on('click',function(){
    	roll(0);
		cardSound.play();
    });

    $("#start-button").on('click',function(){
    	var input = $("#money-input").val();
    	if(input == '' || input == null || isNaN(parseInt($("#money-input").val())))
    	{
    		alert("Introduceti suma de bani!");
    	    return;
    	}

		toggleAudio();
    	
    	$("#start-container").css("display","none");
    	$("#game-container").css("display","block");
    	$("#game-container").fadeOut(0).fadeIn(400);
    	money = parseInt($("#money-input").val());
    	$("#money").text(money + moneda);
    	$("#red-button").prop("disabled",false);
		$("#black-button").prop("disabled",false);

    });

    $(document).on("keydown",function(e){
    	if( !$("#red-button").prop("disabled") && !$("#black-button").prop("disabled")  ){
    		if(e.which == 37) $("#red-button").click();
    		if(e.which == 39) $("#black-button").click();
    	}

    	if(e.which == 13){
    			if($("#start-container").css("display") != "none"){
    			 $("#start-button").click();
    			}
    	}

		if(e.which == 38){
			$("#bet-increase").click();
		}
		if(e.which == 40){
			$("#bet-decrease").click();
		}
    		
    });

	$("#mute-button").on('click',function(){
		toggleAudio();
	});

	$("#bet-increase").on('click',function(){
		changeBet(100);
	});

	$("#bet-decrease").on('click',function(){
		changeBet(-100);
	});

});

function toggleAudio(){
	if(audioPlaying){
		audio.pause();
		audioPlaying = false;
	}
	else{
		audio.play();
		audioPlaying = true;
	}
}

function roll(number){
	var bet = parseInt($("#bet").val());
	if(money <= 0 || bet > money || bet == 0 || $("#bet").val() == '' || isNaN($("#bet").val()))
	{
		alert("Nu ai suficiente credite! :(");
	 	return;
	}
	$("#red-button").prop("disabled",true);
	$("#black-button").prop("disabled",true);
	
	money -= bet;
	$("#money").text(money + moneda);

	var randcard = parseInt(getRandom(1,53));
	//console.log(randcard);
	var randcardsrc = "img/cards/"+randcard+".png";
	var color = getColor(randcard);

	var newcard = {
		"id":randcard,
		"src":randcardsrc,
		"color":color
	}
	
	$("#maincard").fadeOut(200).fadeIn(200).fadeOut(600,function(){
		$("#maincard").attr("src",newcard['src']);
		if(color == number){
			money += bet*2;
			winSound.play();
			var winTextElement = $(".win-text");
			winTextElement.text("+" + bet*2);
			winTextElement.fadeIn(200).fadeOut(1300);
		}
		$("#money").text(money + moneda);
	});

	$("#maincard").fadeIn(50).delay(1500).fadeOut(100,function(){
		$("#maincard").attr("src",back_card['src']);
		addPrev(newcard);
		$("#red-button").prop("disabled",false);
		$("#black-button").prop("disabled",false);
	}).fadeIn(100);
	

	
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getColor(nr){
	if(nr <= 26) var color = 0;
	if(nr > 26) var color = 1;
	return color;
}

function addPrev(card){

	cards.push(card);
	cards.shift();

	$("#prev0").attr("src",cards[0].src);
    $("#prev1").attr("src",cards[1].src);
    $("#prev2").attr("src",cards[2].src);
}

function changeBet(value){
	var betInput = $("#bet");
	var bet = parseInt(betInput.val());
	var newBet = bet + value;
	if(newBet >= 0)
		betInput.val(newBet);
}