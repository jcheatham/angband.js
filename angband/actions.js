
var actions = {

	// this one is for the player only, as movement buttons can translate into many actions!
	tryMove : function (x, y) {

		var actionSpeed = player.speed;

		//Monsters/player there, cancel move, attack instead
		if (typeof dungeon.map[player.posX + x][player.posY + y].monster != 'undefined') {
			actions.attack(player, dungeon.map[player.posX + x][player.posY + y].monster);
			turn.endTurn(actionSpeed);
		}

		//if can't move in the direction, then don't actually move
		else if (lib.terrain[dungeon.map[player.posX + x][player.posY + y].floor].pass === false) {
			x = 0;	//can't walk through walls!
			y = 0;
			display.updateConsole('There is a wall in the way. Idiot.');
		}

		//actually move
		else {
			actions.move(player, x, y);
			turn.endTurn(actionSpeed);
		}
	},

	move : function (entity, x, y) {

		if (entity != player) {		//updating the dungeon map for monsters
			delete dungeon.map[entity.posX][entity.posY].monster;
			dungeon.map[entity.posX + x][entity.posY + y].monster = entity;
		}
		display.addCoordUpdate(entity.posX, entity.posY);//adding to 'to be updated' array
		display.addCoordUpdate(entity.posX + x, entity.posY + y);
		entity.posX += x;	//updating where the entity is in dedicated variables
		entity.posY += y;
	},

	attack : function (attacker, attacked) {

		attacked.HP--;

		if (attacked == player) {
			display.updateConsole(attacker.name + ' hits you. You say "ow".');
			display.updateStats();
		}
		if (attacker == player) {
			display.updateConsole('You hit ' + attacked.name + '. It says "ow".');
		}

		//was it a killing blow?
		if (attacked.HP <= 0) {
			if (attacked != player) {
				monster.kill(attacked);
			}
			else {
				game.playerDeath();
			}
		}
	}
};







