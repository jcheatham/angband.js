



//Things that can be on floor:
// floor ('.','░','▒','▓','█',':','*') (num)
// stairs ('>','<') (num)
// Shops (0-9) (num)
// doors ('+',''') (num)
// treasure/money ($) (array)
// traps (^,'.') (num)
// monsters (M) (array)
// you! (@) (boolean)
// visibility (lit, unlit, unknown) (num)

var lib = {
monsters : [
	{//0
	description : 'Generic Monster No.',
	chr : 'm',
	cls : 'w',
	hp : 1,
	xp : 1},
	{//1
	description : 'Different Generic Monster No.',
	chr : 'M',
	cls : 'o',
	hp : 2,
	xp : 4},
	{//2
	description : 'Large and Angry-Looking Generic Monster No.',
	chr : 'M',
	cls : 'w',
	hp : 3,
	xp : 8}
]
};





