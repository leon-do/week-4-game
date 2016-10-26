// makes 4 buttons and assign random numbers
	for (i = 0; i < 4; i++){

		var healthPoints = generateRandom(2000,3000);
		var attackPower = generateRandom(1,2);
		var counterAttackPower = generateRandom(10,30);

		$(".container1").append(
				"<button" +
				" data-healthPoints=" + healthPoints + 
				" data-attackPower=" + attackPower +
				" data-baseAttackPower=" + attackPower +
				" data-counterAttackPower=" + counterAttackPower +
				">" + 
				healthPoints + 
				"</button>")
	}



	// move butttons around
	$("button").on("click",function(){

		// if buttons are in container 1, then append to container 2 and 3
		if ($(this).parent().attr("class") === "container1"){
			$(".container2").append(this)
			$(".container3").append($(".container1").children())		
		}

		// if buttons is in container 3 && nothing in container 4, then append
		if ($(this).parent().attr("class") === "container3" 
		&& $(".container4").children().is("button") == false){
			
			$(".container4").append(this)
			$("#attackBtn").css("display","block")
		}

	})





	// attacking
	$("#attackBtn").on("click",function(){

		// get healthPoints in container 2 and 4
		var myHealthPoints = parseInt($(".container2").children().attr("data-healthPoints"))
		var urHealthPoints = parseInt($(".container4").children().attr("data-healthPoints"))

		// get data from attackPower in container 2 (convert it to an int)
		var myAttackPower = parseInt($(".container2").children().attr("data-attackPower"))

		// get data from baseAttackPower in container 2 (convert it to an int)
		var myBaseAttackPower = parseInt($(".container2").children().attr("data-baseAttackPower"))

		// get counterAttack Power in container 4
		var urCounterAttackPower = parseInt($(".container4").children().attr("data-counterAttackPower"))

		// do some math
		myHealthPoints = myHealthPoints - urCounterAttackPower;
		urHealthPoints = urHealthPoints - myAttackPower;

		// display varaibles in container 5
		$(".container5").html(
			"attackPower: " + myAttackPower +
			"<br>" +
			"counterAttackPower: " + urCounterAttackPower)
		
		// update myAttackPower
		myAttackPower = myAttackPower + myBaseAttackPower;

		// update myAttackPower inside of button inside of container 2
		$(".container2").children("button").attr("data-attackPower",myAttackPower)

		// update myHealthPoints inside of button inside of container 2
		$(".container2").children("button").html(myHealthPoints)
		$(".container2").children("button").attr("data-healthPoints",myHealthPoints)
		
		// update urhealthPoints inside of button inside of container 4
		$(".container4").children("button").html(urHealthPoints)
		$(".container4").children("button").attr("data-healthPoints",urHealthPoints)






	// win or lose section

		// if myHealthPoints < 0, then display lose and remove buttons in container 3
		if (myHealthPoints < 0){
			alert("you lose")
			$(".container3").children("button").remove()

		}

		// if you defeat the opponent, then remove the button and hide the attack button
		if (urHealthPoints < 0){
			$(".container4").children("button").remove()
			$("#attackBtn").css("display","none")
		}

		// if myHealthPoints > 0 & no buttons in container 3 & 4, then you win
		if (myHealthPoints > 0 
			&& $(".container3").children().is("button") == false
			&& $(".container4").children().is("button") == false){
			alert("you win")
			alert("time for a new mouse")
		}


	})




	// used to generate a random number
	function generateRandom(min,max){
		var RandomNumber = Math.floor(Math.random()*(max - min) + min)
		return RandomNumber;
	}