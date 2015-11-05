function Inventory(){
}

Inventory.prototype.initializeInventory = function(){
	inventory = {'wood': 10, 'bush': 10};
}

Inventory.prototype.openInventory = function(){
	
    inventoryOpen = true;
	var inventoryBox = document.createElement("div");
	inventoryBox.id = "inventory";
	inventoryBox.className = "inventory";
	inventoryBox.style.width = rightBorder * 3 / 4 + "px";
	inventoryBox.style.height = bottomBorder * 3 / 4 + "px";
	inventoryBox.style.left =  rightBorder/2 + "px";
	inventoryBox.style.top =  bottomBorder/2 + "px";;
	$('#mainFrame').append(inventoryBox);

	var count = 0;
	for(itemName in inventory){
		var item = document.createElement("div");
		item.id = "item" + count;
		item.className = "item";
		item.style.background = "url(textures/" + itemName + ".png)";
		item.style.backgroundRepeat = "no-repeat";
		item.style.backgroundPosition = "center";
		item.innerHTML = "<span style=\" font-size:30px \"> " + inventory[itemName] + "</span>";
		$('#inventory').append(item);
		count++;
	}

	if(inventory['wood'] > 9 && inventory['bush'] > 9  && !(inventory['bow'] == 'Bow')){
		var createBox = document.createElement("div");
		createBox.className = "createBox";
		createBox.innerHTML = "Make Bow";
		$('#inventory').append(createBox);
	}

}

Inventory.prototype.removeItem = function(position){
	$('#inventory div:nth-child('+ position + ')').remove();
}

Inventory.prototype.addItem = function(name){
		var item = document.createElement("div");
		item.class = "item";
		item.style.background = "url(textures/" + name + ".png)";
		item.style.backgroundRepeat = "no-repeat";
		item.style.backgroundPosition = "center";
		if(name == 'wood'){
			inventory['wood']++;
		} else if(name == 'bush'){
			inventory['bush']++;
		} 

		else if(name == 'bow'){
			if(inventory['bow'] == 'Bow'){
				return;
			}
			inventory['bow'] = 'Bow';
			inventory['wood'] -= 10;
			inventory['bush'] -= 10;
			item.innerHTML = "<span style=\" font-size:30px \">Bow</span>";
			Inventory.prototype.closeInventory();
			Inventory.prototype.openInventory();
		}
}

Inventory.prototype.nextInventory = function(){
	if(currentInventoryPosition < $('#inventory div').length - 1){
		$('#inventory div:nth-child('+ (currentInventoryPosition + 1) + ')').css('border', 'none');
		$('#inventory div:nth-child('+ (currentInventoryPosition + 2) + ')').css('border', '10px solid black');
		currentInventoryPosition++;
	}
}

Inventory.prototype.previousInventory = function(){
	if(currentInventoryPosition > 0){
		$('#inventory div:nth-child('+ (currentInventoryPosition + 1) + ')').css('border', 'none');
		$('#inventory div:nth-child('+ currentInventoryPosition + ')').css('border', '10px solid black');
		currentInventoryPosition--;
	}
}

Inventory.prototype.closeInventory = function(){
	inventoryOpen = false;
	$('#inventory').remove();
	lastIPress = new Date().getTime();
}