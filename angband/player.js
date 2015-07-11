

var player;

var newCharacter = {

	gender : 'Male',
	race : 'Human',
	className : 'Warrior',
	genMethod : 'random',

	create : function () {
		player = new monster.CustomMonsterConstructor('SuperAt');

			//filling in details that normal monsters don't have
		player.className = newCharacter.className; //note the 'Name' suffix to avoid clashes with the reserved word 'class'
		player.race = newCharacter.race;
		player.gender = newCharacter.gender;
		player.age = misc.RNG(18, 50);
		player.height = misc.RNG(4, 6) + '\'' + misc.RNG(0, 11);
		player.HP = 50;
		player.maxHP = 50;
		player.XP = 0;
		player.level = 1;
	}
};

/* function playerDeath() {

	// show end screen etc
} */
