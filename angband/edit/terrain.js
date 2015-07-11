



//Things that can be on floor:
// floor ('.','░','▒','▓','█',':','*') (num)
// stairs ('>','<') (num)
// Shops (0-9) (num)
// doors ('+',''') (num)
// treasure/money ($) (array)
// traps (^,'.') (num)
// monsters (M) (object reference)
// you! (@) (boolean)
// visibility (lit, unlit, unknown) (num)


// description = what is it?
// chr = screen character
// col = colour
// cls = CSS class
// pass = is it passable?

lib.terrain = [
{
description : 'open floor',	//0
chr : '.',
col : 'white',
cls : 'w',
pass : true
},
{
description : 'permanent rock',	//1
chr : '▒',
col : 'light grey',
cls : 'lg',
pass : false
},
{
description : 'granite',	//2
chr : '▒',
col : 'white',
cls : 'w',
pass : false
},
{
description : 'magma',	//3
chr : '▓',
col : 'white',
cls : 'w',
pass : false
},
{
description : 'quartz',	//4
chr : '░',
col : 'white',
cls : 'w',
pass : false
},
{
description : 'quartz treasure',	//5
chr : '*',
col : 'orange',
cls : 'o',
pass : false
},
{
description : 'rubble',	//6
chr : ':',
col : 'white',
cls : 'w',
pass : false
},
{
description : 'pit',	//7
chr : ' ',
col : 'white',
cls : 'w',
pass : false
},
{
description : 'blood stained floor',	//8
chr : '.',
col : 'red',
cls : 'r',
pass : true
},
{
description : 'end of file entry',	//9
chr : '.',
col : 'white',
cls : 'w',
pass : false
}
];








