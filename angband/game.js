



var game = {


	//will begin a new game, from scratch.
	startNew : function () {


		//default generation stuff, just for demo purposes

		newCharacter.create();
		$('playerRace').innerHTML = player.race;
		$('playerClass').innerHTML = player.className;
		display.buildHTML(); //has to be called after the div "main" HTML code is
		display.showHTML(); //Could do with a better name. De-hides the stats/status/key etc
		dungeon.generateLevel();
		player.posX = dungeon.roomList[0][0];
		player.posY = dungeon.roomList[0][1];
		display.checkPlayerEdgeProximity();
		display.updateWholeScreen();
		display.updateStats();
	}
};



