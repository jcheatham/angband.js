
var turn = {

	gameTurns : 0,
	gameTime : 0,

	//ends player's turn, does everybody else's turns.
	endTurn : function (moveTime) {

		turn.doMonsterAI(moveTime);

		turn.gameTime += moveTime;
		turn.gameTurns ++;
		display.updateScreen();
		display.checkPlayerEdgeProximity();
	},


	doMonsterAI : function (turns) {
		for (var I1 = 0; I1 <= monsters.length - 1; I1++) {
			if (move.checkEntityProximity(monsters[I1], player) === 1) {
				actions.attack(monsters[I1], player);
			}
			else {
				move.moveTowardsEntity(monsters[I1], player);
			}
		}
	}

};


