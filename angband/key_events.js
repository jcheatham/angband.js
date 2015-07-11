

var eventListen = {
	inputMode : 'normal',
	shiftKeyStatus : false, //these keep a record of which keys are pressed when.
	ctrlKeyStatus : false,
	altKeyStatus : false,


	keyEvents : function (e) {
		if (typeOf(window.event) != 'undefined') {	//preventing default key responses
			e = window.event;	//IE
			e.returnValue = false;
			e.cancelBubble = false;
		}
		else {	// non-IE
			e.preventDefault();
			e.stopPropagation();
		}
		if (e.type == 'keydown') {	//keydown events
			if (eventListen.inputMode == 'menu') {

						// ***** MENU key bindings *****

				switch (e.keyCode) {
				case 38 :	// up
					menu.highlight(2, 'up');
					break;
				case 40 :	// down
					menu.highlight(2, 'down');
					break;
				case 49 :	// 1
					menu.highlight(3, 1);
					break;
				case 50 :	// 2
					menu.highlight(3, 2);
					break;
				case 51 :	// 3
					menu.highlight(3, 3);
					break;
				case 52 :	// 4
					menu.highlight(3, 4);
					break;
				case 53 :	// 5
					menu.highlight(3, 5);
					break;
				case 54 :	// 6
					menu.highlight(3, 6);
					break;
				case 55 :	// 7
					menu.highlight(3, 7);
					break;
				case 56 :	// 8
					menu.highlight(3, 8);
					break;
				case 57 :	// 9
					menu.highlight(3, 9);
					break;
				case 13 :	// return/enter
					menu.select();
					break;
				case 66 :	// b
					menu.goBack();
					break;
				case 116 :	// F5/refresh
					window.location.reload();
					break;
				case 27 :	// Escape
					menu.closeAll();
					break;
				}
			}
			else
			{
				// ***** IN-GAME key bindings *****


				switch (e.keyCode) {
				case 16 :	//SHIFT
					eventListen.shiftKeyStatus = true;
					$('shift').innerHTML = 'true';
					break;
				case 17 :	//CTRL
					eventListen.ctrlKeyStatus = true;
					$('ctrl').innerHTML = 'true';
					break;
				case 18 :	//ALT
					eventListen.altKeyStatus = true;
					$('alt').innerHTML = 'true';
					break;
				case 33 :	// page up
					actions.tryMove(1, -1);
					break;
				case 34 :	// page down
					actions.tryMove(1, 1);
					break;
				case 35 :	// end
					actions.tryMove(-1, 1);
					break;
				case 36 :	// home
					actions.tryMove(-1, -1);
					break;
				case 37 :	// left
					actions.tryMove(-1, 0);
					break;
				case 38 :	// up
					actions.tryMove(0, -1);
					break;
				case 39 :	// right
					actions.tryMove(1, 0);
					break;
				case 40 :	// down
					actions.tryMove(0, 1);
					break;
				case 69 :	//e
					dungeon.gen.erodeLevel(10, 16);
					display.updateWholeScreen();
					break;
				case 71 :	//g
					dungeon.generateLevel();
					player.posX = dungeon.roomList[0][0];
					player.posY = dungeon.roomList[0][1];
					display.updateWholeScreen();
					break;
				case 77 :	//m
					//randomly place monster
					monster.create(misc.RNG(0, 2));
					display.updateScreen();
					break;
				case 97 :	// 1/down-left **NUMPAD keys**
					actions.tryMove(-1, 1);
					break;
				case 98 :	// 2/down
					actions.tryMove(0, 1);
					break;
				case 99 :	// 3/down-right
					actions.tryMove(1, 1);
					break;
				case 100 :	// 4/left
					actions.tryMove(-1, 0);
					break;
				case 101 :	// 5/stay
					actions.tryMove(0, 0);
					break;
				case 102 :	// 6/right
					actions.tryMove(1, 0);
					break;
				case 103 :	// 7/up-left
					actions.tryMove(-1, -1);
					break;
				case 104 :	// 8/up
					actions.tryMove(0, -1);
					break;
				case 105 :	// 9/up-right
					actions.tryMove(1, -1);
					break;
				case 116 :	// F5/refresh
					window.location.reload();
					break;
				case 223 :	// weird apostrophe thing
					actions.tryMove(1, -1);
					break;
				case 27 :	// Escape
					menu.generateMenu(0);
					break;
				}
			}
		}
		else if (e.type == 'keyup') //keyup events
		{
			switch (e.keyCode) {
			case 16 :	//SHIFT
				eventListen.shiftKeyStatus = false;
				$('shift').innerHTML = 'false';
				break;
			case 17 :	//CTRL
				eventListen.ctrlKeyStatus = false;
				$('ctrl').innerHTML = 'false';
				break;
			case 18 :	//ALT
				eventListen.altKeyStatus = false;
				$('alt').innerHTML = 'false';
				break;
			}
		}
		$('keyDebug').innerHTML = e.keyCode;
	}


};






// setting up event listeners
if (document.addEventListener) {
	document.addEventListener('keydown', eventListen.keyEvents, false);//code for Moz
	document.addEventListener('keyup', eventListen.keyEvents, false);
}
else {
	document.attachEvent('onkeydown', eventListen.keyEvents); //code for IE
	document.attachEvent('onkeyup', eventListen.keyEvents);
}


