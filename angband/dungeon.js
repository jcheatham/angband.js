


// declaring the dungeon object, which holds all the dungeon info stuff
var dungeon = {
	map : [],
	sizeX : 160,
	sizeY : 48,
	roomList : [],
//	roomSizeX : 0,
//	roomSizeY : 0,
//	roomPosX : 0,
//	roomPosY : 0,
//	roomCounter : 0,
//	corridorArray : [],	//temp array of most recent corridor
//	roomCount : 50,


	gen : {
		//***full dungeon generation***
		makeFullDungeon : function () {
			for (var I1 = 0; I1 <= dungeon.sizeX - 1; I1++) {	// reset current dungeon
				for (var I2 = 0; I2 <= dungeon.sizeY - 1; I2++) {
					dungeon.map[I1][I2].floor = 2;
				}
			}

			for (I1 = 0; I1 <= dungeon.sizeY - 1; I1++) {		// surround edges with permanent rock
				dungeon.map[0][I1].floor = 1;
				dungeon.map[dungeon.sizeX - 1][I1].floor = 1;
			}
			for (I1 = 0; I1 <= dungeon.sizeX - 1; I1++) {
				dungeon.map[I1][0].floor = 1;
				dungeon.map[I1][dungeon.sizeY - 1].floor = 1;
			}


			dungeon.roomList = [];	//reset the roomlist

			//generate cave rooms
			for (I1 = 0; I1 <= misc.RNG((dungeon.sizeX * dungeon.sizeY) / 320, (dungeon.sizeX * dungeon.sizeY) / 180); I1++) {
				dungeon.gen.createRoomCircle(misc.RNG(1, 5));
			}

			//basic room connection guarantee
			for (I1 = 0; I1 < dungeon.roomList.length - 1; I1++) {
				dungeon.gen.createCorridor(dungeon.roomList[I1][0], dungeon.roomList[I1][1], dungeon.roomList[I1 + 1][0], dungeon.roomList[I1 + 1][1]);
			}

			//level erosion for cave look
			dungeon.gen.erodeLevel(10, 16);
			dungeon.gen.erodeLevel(10, 16);



			// Generate rooms
			// var oldRooms = [[0, dungeon.sizeX - 1, 0, dungeon.sizeY - 1]];	//x min, x max, y min, y max
			// var currentRooms = [];
			// var randSplitPos = 0;

			// for (I1 = 0; I1 < 3; I1++) {	//3 subdivides = 8 rooms
				// currentRooms = [];

				// for (I2 = 0; I2 <= oldRooms.length - 1; I2++) {
					// if (misc.wRNG([oldRooms[I2][1] - oldRooms[I2][0], oldRooms[I2][3] - oldRooms[I2][2]]) === 0) {	//vertical split
						// randSplitPos = misc.RNG(Math.max((oldRooms[I2][0] + (oldRooms[I2][1]) * 0.4), 6), Math.min((oldRooms[I2][1] * 0.6), (oldRooms[I2][1] - 6)));
						// currentRooms.push([oldRooms[I2][0], randSplitPos, oldRooms[I2][2], oldRooms[I2][3]]);
						// currentRooms.push([randSplitPos, oldRooms[I2][1], oldRooms[I2][2], oldRooms[I2][3]]);
					// }
					// else {		//horizontal split
						// randSplitPos = misc.RNG(Math.max((oldRooms[I2][2] + (oldRooms[I2][3]) * 0.4), 6), Math.min((oldRooms[I2][3] * 0.6), (oldRooms[I2][3] - 6)));
						// currentRooms.push([oldRooms[I2][0], oldRooms[I2][1], oldRooms[I2][2], randSplitPos]);
						// currentRooms.push([oldRooms[I2][0], oldRooms[I2][1], randSplitPos, oldRooms[I2][3]]);
					// }
				// }
				// oldRooms = currentRooms.slice();
			// }

			// for (I1 = 0; I1 < oldRooms.length; I1++) {
				// dungeon.gen.createRoom(oldRooms[I1][0],oldRooms[I1][1],oldRooms[I1][2],oldRooms[I1][3]);
			// }


			/*dungeon.roomCounter = ((dungeon.sizeX * dungeon.sizeY) / 100) * RNG(25, 40); //sets the room counter to 20-40% of the dungeon content

			while (dungeon.roomCounter > 0) {
				if (dungeon.gen.makeRoom() === false) {		//will only count the room if it can create it, will only create if it doesn't overlap.
					dungeon.roomCounter++;
				}
			}*/
/*			//dungeon.gen.makeCorridors(); */

		},


		//will create a circular cutout of a room
		createRoomCircle : function (r) {
			if (typeof r != 'number') {
				r = misc.fRNG(2, 9);
			}

			var roomPosX = dungeon.gen.getRandCoordsX(r);
			var roomPosY = dungeon.gen.getRandCoordsY(r);

			for (var I1 = 0 - Math.floor(r); I1 < (0 + r); I1++) {	// set to empty spaces in dungeon.map
				for (var I2 = 0 - Math.floor(r); I2 < (0 + r); I2++) {
					if (Math.sqrt((I1 * I1) + (I2 * I2)) < r) {
						dungeon.map[roomPosX + I1][roomPosY + I2].floor = 0;
					}
				}
			}
			dungeon.roomList.push([roomPosX, roomPosY, r]);
		},

		//will cut a channel between the two inputted points, in various different styles.
		createCorridor : function (aX, aY, bX, bY, corridorType) {

			if (typeOf(corridorType) == 'undefined' || corridorType === 0) {	// straight vector lines
				//convert to relative coordinates
				var relX = bX - aX;
				var relY = bY - aY;

				//determine direction in which to draw
				if (relX > relY) {
					if ((relY + relX) > 0) {		//left - a -> b, on X
						for (I1 = 0; I1 <= relX; I1++) {
							dungeon.map[aX + I1][aY + Math.round(I1 * (relY / relX))].floor = 0;
						}
					}
					else {				//down - b -> a, on Y
						for (I1 = 0; I1 <= -relY; I1++) {
							dungeon.map[bX + Math.round(I1 * (relX / relY))][bY + I1].floor = 0;
						}
					}
				}
				else {
					if ((relY + relX) < 0) {		//right - b -> a, on X
						for (I1 = 0; I1 <= -relX; I1++) {
							dungeon.map[bX + I1][bY + Math.round(I1 * (relY / relX))].floor = 0;
						}
					}
					else {				//up - a -> b, on Y
						for (I1 = 0; I1 <= relY; I1++) {
							dungeon.map[aX + Math.round(I1 * (relX / relY))][aY + I1].floor = 0;
						}
					}
				}
			}
			else {	//corridors that have random wobble?
			}
		},

		//will remove granite with a high amount of open space around it. Gives an organic, worn away look to a level. Best for caves.
		erodeLevel : function (erosionStrengthMin, erosionStrengthMax) {
			var enqueuedChanges = [];
			var localSpace;
			for (var I1 = 2; I1 <= dungeon.sizeX - 3; I1++) {	// reset current dungeon
				for (var I2 = 2; I2 <= dungeon.sizeY - 3; I2++) {
					//localSpace = dungeon.map[I1 - 1][I2 - 1].floor + dungeon.map[I1 - 1][I2].floor + dungeon.map[I1 - 1][I2 + 1].floor + dungeon.map[I1][I2 - 1].floor + dungeon.map[I1][I2 + 1].floor + dungeon.map[I1 + 1][I2 - 1].floor + dungeon.map[I1 + 1][I2].floor + dungeon.map[I1 + 1][I2 + 1].floor;
					//localSpace = (dungeon.map[I1 - 1][I2].floor + dungeon.map[I1][I2 - 1].floor + dungeon.map[I1][I2 + 1].floor + dungeon.map[I1 + 1][I2].floor) * 2;
					if ((dungeon.map[I1][I2].floor !== 0) && ((dungeon.map[I1 - 1][I2 - 1].floor + dungeon.map[I1 - 1][I2].floor + dungeon.map[I1 - 1][I2 + 1].floor + dungeon.map[I1][I2 - 1].floor + dungeon.map[I1][I2 + 1].floor + dungeon.map[I1 + 1][I2 - 1].floor + dungeon.map[I1 + 1][I2].floor + dungeon.map[I1 + 1][I2 + 1].floor) < misc.RNG(erosionStrengthMin, erosionStrengthMax))) {
						enqueuedChanges.push(I1);
						enqueuedChanges.push(I2);
					}
				}
			}
			while (enqueuedChanges.length > 0) {
				dungeon.map[enqueuedChanges.shift()][enqueuedChanges.shift()].floor = 0;
			}
		},



/* 		createRoom : function (minX, maxX, minY, maxY) {
			for (var I1 = minX + 1; I1 < maxX; I1++) {	// set to empty spaces in dungeon.map
				for (var I2 = minY + 1; I2 < maxY; I2++) {
					dungeon.map[I1][I2].floor = 0;
				}
			}
		},
		 */
/* 		// makes a room in the dungeon
		makeRoom : function () {
			dungeon.roomSizeX = RNG(6, 15); //random size between 6 and 15
			dungeon.roomSizeY = RNG(6, 15);
			dungeon.roomPosX = RNG(1, dungeon.sizeX - dungeon.roomSizeX - 1); //random placement of room
			dungeon.roomPosY = RNG(1, dungeon.sizeY - dungeon.roomSizeY - 1);

			if (dungeon.gen.checkRoomOverlap(dungeon.roomSizeX, dungeon.roomSizeY, dungeon.roomPosX, dungeon.roomPosY) === true) {
				return false;
			}
			for (var I1 = dungeon.roomPosX + 1; I1 <= dungeon.roomPosX + dungeon.roomSizeX - 1; I1++) {	// set to empty spaces in dungeon.map
				for (var I2 = dungeon.roomPosY + 1; I2 <= dungeon.roomPosY + dungeon.roomSizeY - 1; I2++) {
					dungeon.map[I1][I2].floor = 0;
					dungeon.roomCounter--;
				}
			}
			dungeon.roomList.push([dungeon.roomSizeX, dungeon.roomSizeY, dungeon.roomPosX, dungeon.roomPosY]);
			return true;
		},
		 */

/* 		//checks if the edges ONLY of a generated room are crossing open space (ie, it's overlapping another room) - returns false if it doesn't overlap, true if it does
		checkRoomOverlap : function (sX, sY, pX, pY) {
			for (var I3 = pX; I3 <= pX + sX - 1; I3++) {
				if (dungeon.map[I3][pY].floor === 0 || dungeon.map[I3][pY + sY].floor === 0) {
					return true;
				}
			}
			for (I3 = pY; I3 <= pY + sY - 1; I3++) {
				if (dungeon.map[pX][I3].floor === 0 || dungeon.map[pX + sX][I3].floor === 0) {
					return true;
				}
			}
			return false;
		},


		//This will generate corridors based on the dungeon.roomList array
		makeCorridors : function () {
			var tempArray = [];
			var sX;
			var sY;
			var pX;
			var pY;
			while (dungeon.roomList.length > 0) {
				tempArray = dungeon.roomList.pop();
				sX = tempArray[0];
				sY = tempArray[1];
				pX = tempArray[2];
				pY = tempArray[3];
				dungeon.corridorArray = [];

				for (var I1 = pX; I1 > 0; I1--) {
					dungeon.corridorArray.push(I1);
					dungeon.corridorArray.push(pY + sY.half());

					if (dungeon.map[I1][pY + sY.half()].floor === 0) {	//actually place the corridor if it hits another space.
						dungeon.gen.placeCorridor(dungeon.corridorArray);
					}
					if (dungeon.map[I1][pY + sY.half()].floor != 2) {	//break if it's no longer tunnelling through granite (eg, hits permarock)
						break;
					}
				}
			}
		},


		//actually places the corridor based on the inputted array which is X & Y coords alternatively, starting on X.
		placeCorridor : function (inArray) {
			while (inArray.length > 0) {
				dungeon.map[inArray.shift()][inArray.shift()].floor = 0;
			}
		} */

		getRandCoordsX : function (limit) {
			limit = Math.ceil(limit);
			return misc.RNG((3 + limit), (dungeon.sizeX - 4 - limit));
		},

		getRandCoordsY : function (limit) {
			limit = Math.ceil(limit);
			return misc.RNG((3 + limit), (dungeon.sizeY - 4 - limit));
		}

	},







	//makeshift level generation
	generateLevel : function () {

		dungeon.gen.makeFullDungeon();
		display.checkPlayerEdgeProximity();

		//clear old monsters
		while (monsters.length > 0) {
			monster.kill(monsters[0]);
		}

		//generate some random monsters
		for (I1 = 0; I1 <= misc.RNG((dungeon.sizeX * dungeon.sizeY) / 320, (dungeon.sizeX * dungeon.sizeY) / 180); I1++) {
			monster.create(misc.RNG(0, 2));
		}



		/*
		display.addCoordUpdate(player.posX, player.posY);

		player.posX = -1;
		player.posY = -1;

		var I1 = 0;
		var rand1, rand2;
		while (I1 < 10) {
			rand1 = misc.RNG(0, dungeon.sizeX - 1);
			rand2 = misc.RNG(0, dungeon.sizeY - 1);
			if ((typeof dungeon.map[rand1][rand2].monster == 'undefined') &&
					(lib.terrain[dungeon.map[rand1][rand2].floor].pass === true)) {
				I1++;
				monster.create('bob' + monsters.length, rand1, rand2);
			}
		}

		while (player.posX === -1 && player.posY === -1) {
			rand1 = misc.RNG(0, dungeon.sizeX - 1);
			rand2 = misc.RNG(0, dungeon.sizeY - 1);
			if ((typeof dungeon.map[rand1][rand2].monster == 'undefined') &&
					(lib.terrain[dungeon.map[rand1][rand2].floor].pass === true)) {
				player.posX = rand1;
				player.posY = rand2;
				display.addCoordUpdate(rand1, rand2);
			}
		} */

	//	display.updateScreen();
	},


	//will fill out the dungeon array with basic info (much bigger than screen array). To be called immediately.
	initiate : function () {
		for (var I1 = 0; I1 <= dungeon.sizeX - 1; I1++) {
			dungeon.map[I1] = [];

			for (var I2 = 0; I2 <= dungeon.sizeY - 1; I2++) {

				dungeon.map[I1][I2] = {
					floor : 0			//default floor filling
					//stairs : 0,
					//shops : 0,
					//doors : 0,
					//traps : 0,
					//monsters : ,		// I want to leave this undefined, but it will be set elsewhere
					//visbility : 1,
					//treasure : [],
				};
			}
		}
	}
};

dungeon.initiate();




