

lib.menus = [
{
title : 'Main Menu',	//0
entries : [
	{text : 'Begin Game',
	desc : 'Starts a new game',
	menu : 1
	},	{text : 'Quick Start Game',
	desc : 'Goes straight to the dungeon with a default character',
	command : 'game.startNew();',
	close : true
	},
	{text : 'Save Game',
	desc : 'Sorry, no saving functionality exists yet.'
	},
	{text : 'Options',
	desc : 'I\'m afraid that there are no options either...'
	},
	{text : 'About',
	desc : 'Version 0.0.25 pre-pre-alpha. (Probably just into proof-of-concept stage.)<br /><br />J/ADORE is Copyright (c) 2008-9 Andrew Cohen.'
	},
	{text : 'Contact',
	desc : 'Any feedback, suggestions or bugs would be appreciated: jadore.feedback&#64;gmail.com'
	}
]
},
{
title : 'Create New Character - Choose Gender',	//1
desc : 'Please choose a gender for your character. Your character\'s gender has no significant impact on gameplay<br />&nbsp;',
type : 'new',
entries : [
	{text : 'Male',
	command : 'newCharacter.gender = "Male";',
	menu : 2
	},
	{text : 'Female',
	command : 'newCharacter.gender = "Female";',
	menu : 2
	}
]
},
{
title : 'Create New Character - Choose Race',	//2
desc : 'Please choose a race for your character. Your character\'s race determines various intrinsic strengths and weaknesses.',
type : 'sub',
entries : [
	{text : 'Human',
	desc : 'Humans are pretty boring, but versatile',
	command : 'newCharacter.race = "Human";',
	menu : 3
	},
	{text : 'High Elf',
	desc : 'Elves have pointy ears.',
	command : 'newCharacter.race = "High Elf";',
	menu : 3
	},
	{text : 'Dwarf',
	desc : 'Dwarves are gruff, beardy, and like beer.',
	command : 'newCharacter.race = "Dwarf";',
	menu : 3
	}
]
},
{
title : 'Create New Character - Choose Class',	//3
desc : 'Please choose a class for your character. Your character\'s class also determines various strengths and skills.',
type : 'sub',
entries : [
	{text : 'Warrior',
	desc : 'Warriors enjoy hitting things, and not much else.',
	command : 'newCharacter.className = "Warrior";',
	menu : 4
	},
	{text : 'Mage',
	desc : 'Mages shoot spells and stuff.',
	command : 'newCharacter.className = "Mage";',
	menu : 4
	}
]
},
{
title : 'Create New Character - Choose Generation Method',	//4
desc : 'Please choose the method you would like to use to generate stats for your character.<br />&nbsp;',
type : 'sub',
entries : [
	{text : 'Random',
	desc : 'This system, like most others thus far, is not yet built.<br />So, you have just one option. That doesn\'t really do much.',
	command : 'newCharacter.genMethod = "random"; alert("At this point, the game should go to the stat rolling screen/show generated stats"); game.startNew();',
	close : true
	}
]
}
];
