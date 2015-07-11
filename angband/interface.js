

var menu = {

	currentId : null,
	currentEntry : null,
	history : [],
	historyVisible : [],

	//generates the HTML necessary for alls the parts of a menu. Info generated from menus.js JSON data.
	generateMenu : function (menuId) {
		var menuHTML = '';
		menu.currentId = menuId;

		//title and instruction area
		menuHTML += '\n<h1>' + lib.menus[menuId].title + '</h1>\n';
		if (typeOf(lib.menus[menuId].desc) === 'string') {
			menuHTML += '<p class="desc">&nbsp;' + lib.menus[menuId].desc + '\n</p>';
		}
		$('menuTitle').innerHTML = menuHTML;
		menuHTML = ''; //reset var

		// main listing area
		menuHTML += '<div class="menu" id="menu' + menuId + '">\n';
		for (var I1 = 1; I1 <= lib.menus[menuId].entries.length; I1++) {
			menuHTML += '<span onmouseover="menu.highlight(1,' + I1 + ',' + menuId +
				')" onclick="menu.select(' + menuId + ')" id="menu' + menuId + '-' + I1 + '"> ' + I1 +
				') ' + lib.menus[menuId].entries[I1 - 1].text + '</span><br />\n';
		}
		menuHTML += '</div>\n';

		$('menuDesc').innerHTML = '';		// HTML for description

		//actually create menu HTML, if necessary
		if ($('menu' + menuId) === null) {
			if (lib.menus[menuId].type && lib.menus[menuId].type === 'sub') {	// for submenu (still show previous)
				$('menuContent').innerHTML += menuHTML;
				menu.historyVisible.push(menuId);
			}
			else {
				$('menuContent').innerHTML = menuHTML;	// for new menu (replaces old one)
				if (menu.history[menu.history.length - 1] !== menuId) {
					menu.history.push(menuId);
				}
				menu.historyVisible = [menuId];
			}
			menu.currentEntry = 0;
		}
		else {	//otherwise, just work out which one is currently highlighted
			for (I1 = 1; I1 <= lib.menus[menuId].entries.length; I1++) {
				if ($('menu' + menuId + '-' + I1).className === 'highlight') {
					menu.highlight(3, I1);
				}
			}
		}

		menu.show();
		menu.showHideBack();
		//$('debug').innerHTML = menu.history + ' - ' + menu.historyVisible + ' - ' + menu.currentEntry;
	},


	// Highlights an entry and displays other associated info (in the current menu only)
	highlight : function (type, item, menuId) {

		var newId;

		if (type === 1) {	//for mouseOver highlighting

			if (menuId !== menu.currentId) {	//if hovering over a different menu

				if ($('menu' + menuId + '-' + item).className !== 'highlight') {
						//if it's not the entry that opened the current menu, go back to that menu
					menu.goBack(menuId);
					newId = item;
				}
				else {	//if it is, do nothing
					return;
				}
			}
			else {	// if hovering over current menu, highlight new entry in that
				newId = item;
			}
		}
		else if (type === 2) {	//for up/down highlighting
			if (item === 'down') {
				if (menu.currentEntry >= lib.menus[menu.currentId].entries.length) {
					newId = 1;
				}
				else {
					newId = menu.currentEntry + 1;
				}
			}
			else if (item === 'up') {
				if (menu.currentEntry <= 1) {
					newId = lib.menus[menu.currentId].entries.length;
				}
				else {
					newId = menu.currentEntry - 1;
				}
			}
		}
		else if (type === 3) {	//for numerical selection highlighting
			if (item > 0 && item <= lib.menus[menu.currentId].entries.length) {
				newId = item;
			}
			else {
				return;
			}
		}

		if (menu.currentEntry) {		//unhighlight old entry, if exists
			$('menu' + menu.currentId + '-' + menu.currentEntry).className = '';
		}

		$('menu' + menu.currentId + '-' + newId).className = 'highlight'; //finally, highlight it via CSS
		menu.currentEntry = newId;	//record new entry

		var entryDesc = lib.menus[menu.currentId].entries[newId - 1].desc;		//add entry descriptions
		if (entryDesc) {
			$('menuDesc').innerHTML = '<p class="desc">' + entryDesc + '</p><br />\n';
		} else {
			$('menuDesc').innerHTML = '';
		}
	},


	// will do whatever the menu entry is supposed to do
	select : function (menuId) {

		if (menuId && menuId !== menu.currentId) {
			menu.goBack(menuId);			//if you've clicked on another menu, go back to it
			return;
		}

		if (menu.currentEntry > 0 && menu.currentEntry <= lib.menus[menu.currentId].entries.length) {
			var entry = lib.menus[menu.currentId].entries[menu.currentEntry - 1];
		}
		else {
			return;		//return if selected entry is out of bounds, eg for 0 (the default)
		}

		if (typeOf(entry.command) === 'string') {	// do the commands
			eval(entry.command);
		}

		if (typeOf(entry.menu) === 'number') {	// open sub or new menus
			if (lib.menus[entry.menu].type) {
				menu.generateMenu(entry.menu, lib.menus[entry.menu].type);
			}
			else {
				menu.generateMenu(entry.menu, 'new');
			}
		}
		if (entry.close) {	// close all menus
			menu.closeAll();
		}
	},


	goBack : function (toMenu) {	//goes to a previous menu in the menu history

			//back to a specific one - nb can only be from one submenu to another
		if (typeOf(toMenu) === 'number') {
			for (var I1 = 0; I1 <= menu.historyVisible.length - 1; I1++) {	//delete entries one by one
				$('menuContent').removeChild($('menu' + menu.historyVisible.pop()));
				menu.currentId = menu.historyVisible[menu.historyVisible.length - 1];
				if (menu.currentId === toMenu) {	// stop if match with inputted menu ID
					break;
				}
			}
			menu.generateMenu(menu.historyVisible[menu.historyVisible.length - 1], 'sub');
		}
			//back by 1
		else {
			if (menu.historyVisible.length > 1) {	//submenu
				$('menuContent').removeChild($('menu' + menu.historyVisible.pop())); //remove HTML + history of old one
				menu.generateMenu(menu.historyVisible[menu.historyVisible.length - 1], 'sub');
			}
			else if (menu.history.length > 1) {		//new menu
				menu.history.pop();
				menu.generateMenu(menu.history.length - 1, 'new');
				menu.currentId = menu.history[menu.history.length - 1];
				menu.currentEntry = 0;
			}
		}
		menu.showHideBack();
	},

	//Will toggle the "b) Back" part of the menu key
	showHideBack : function () {
		if (menu.history.length > 1 || menu.historyVisible.length > 1) { //show/hide "back" option as appropriate
			$('backSpan').style.visibility = 'visible';
		}
		else {
			$('backSpan').style.visibility = 'hidden';
		}
	},

	//will hide all menus and revert to "normal" key input mode
	hide : function () {
		$('mainMenu').style.display = 'none';
		eventListen.inputMode = 'normal';
	},

	//will show all menus, re-centre them, and go to "menu" key input mode
	show : function () {
		var mainMenuStyle = $('mainMenu').style;
		if (mainMenuStyle.display !== 'block') {
			mainMenuStyle.display = 'block';
			menu.recentreMenu();
			eventListen.inputMode = 'menu';
		}
	},

	//will close all menu and erase menu history.
	closeAll : function () {
		if ($('mainGame').style.display !== 'block') {		//you can't close all if there's nothing else open.
			return;
		}
		menu.hide();
		menu.history.length = 0;
		menu.historyVisible.length = 0;
		menu.currentId = null;
		menu.currentEntry = null;
		$('menuTitle').innerHTML = '';
		$('menuDesc').innerHTML = '';
		$('menuContent').innerHTML = '';

	},

	//
	recentreMenu : function () {
		$('mainMenu').style.left = (display.updateWindowWidth() / 2) - ($('mainMenu').offsetWidth / 2) + 'px';
	}

};



window.onresize = function(){menu.recentreMenu();}


