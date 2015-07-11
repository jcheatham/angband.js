

//the array that holds all the instances of monsters.
var monsters = [];



// monster object. Contains method for monsters, mostly.
var monster = {

	place : function (entity, x, y) {
		dungeon.map[x][y].monster = entity;
		entity.posX = x;
		entity.posY = y;
		display.addCoordUpdate(entity.posX, entity.posY);
	},

	create : function (libIndex, x, y) {
		var monsterNumber = monsters.push(new monster.MonsterConstructor(libIndex));

		if ((typeof x == 'undefined') || (typeof y == 'undefined')) {	// if placement coords not set, pick a random position
			while (1) {
				x = misc.RNG(2, dungeon.sizeX - 2);
				y = misc.RNG(2, dungeon.sizeY - 2);
				if (dungeon.map[x][y].floor === 0) {
					break;
				}
			}
		}
		monster.place(monsters[monsterNumber - 1], x, y);
	},

	kill : function (entity) {
		/*this.alive = false*/
		display.addCoordUpdate(entity.posX, entity.posY);
		display.updateConsole(entity.name + ' dies horribly');

		var monsterIndexToSplice = monsters.indexOf(dungeon.map[entity.posX][entity.posY].monster);
		delete dungeon.map[entity.posX][entity.posY].monster;
		monsters.splice(monsterIndexToSplice, 1);

		// create corpse??
	},



	//standard monster constructor.
	MonsterConstructor : function (monlibIndex) {
		this.uID = misc.getUniqueId();
		this.name = lib.monsters[monlibIndex].description + ' ' + this.uID;
		this.type = monlibIndex;		//should reference an entry in the monsters file
		this.symbol = lib.monsters[monlibIndex].chr;
		this.colour = lib.monsters[monlibIndex].cls;
		this.posX = -1;
		this.posY = -1;
		this.maxHP = lib.monsters[monlibIndex].hp;
		this.HP = this.maxHP;
		this.XP = lib.monsters[monlibIndex].xp;
		this.speed = 10;

		return this;
	},

	//custom monster constructor. For a fully custom (ie, non library) monster, or the player.
	CustomMonsterConstructor : function (inName) {
		this.uID = misc.getUniqueId();
		this.name = inName;
		this.symbol = 'Ø';
		this.colour = 'o';
		this.posX = -1;
		this.posY = -1;
		this.speed = 10;

		return this;
	}


};




var move = {

	moveTowardsEntity : function (entity, target) {

		var closestCoord = [0, 0];
		var diffDistSum = Math.abs(entity.posX - target.posX) + Math.abs(entity.posY - target.posY);
		var diffDistMax = Math.max(Math.abs(entity.posX - target.posX), Math.abs(entity.posY - target.posY));
		var testarray = [""];
		for (var I1 = -1; I1 < 2; I1++) {
			for (var I2 = -1; I2 < 2; I2++) {

				tryDiffDistSum = Math.abs(entity.posX - target.posX + I2) + Math.abs(entity.posY - target.posY + I1);
				tryDiffDistMax = Math.max(Math.abs(entity.posX - target.posX + I2), Math.abs(entity.posY - target.posY + I1));

				testarray.push([I2, I1, tryDiffDistMax, tryDiffDistSum, "\n"]);
				// if it can be moved to, and is nearer* than current nearest, set that as current nearest!
				// * = if is less moves, or same number of moves but more direct
				if ((typeof dungeon.map[entity.posX + I2][entity.posY + I1].monster == 'undefined') &&
						(lib.terrain[dungeon.map[entity.posX + I2][entity.posY + I1].floor].pass === true) &&
						((tryDiffDistMax < diffDistMax) || ((tryDiffDistMax == diffDistMax) && tryDiffDistSum < diffDistSum))) {
					closestCoord = [I2, I1];
					diffDistSum = tryDiffDistSum;
					diffDistMax = tryDiffDistMax;

				}
			}
		}
		//alert(testarray)
		if (closestCoord !== [0, 0]) {
			actions.move(entity, closestCoord[0], closestCoord[1]);
		}
	},


	//very crudely returns no.of spaces/moves between the two entities. Touching entities will return 1, and so on.
	//	because diagonal moves take no longer than 90deg ones, it simply takes the greater of the x/y distances
	checkEntityProximity : function (entity1, entity2) {

		var diffX = entity1.posX - entity2.posX;
		var diffY = entity1.posY - entity2.posY;

		diffX = (diffX < 0)? -diffX : diffX;
		diffY = (diffY < 0)? -diffY : diffY;

		if (diffX > diffY) {
			return diffX;
		}
		else {
			return diffY;
		}
	}

};



