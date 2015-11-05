function World(){
	this.landscape = [];
	this.foliage = [];
	this.removedTrees = [];
	this.zombies = [];
	this.removedZombies = [];
	this.arrows = [];
}

function Thing(){
	var width = 0;
	var height = 0;
	var position = [];
	var solid = false;
}

World.prototype.add = function(texture){
	var tile = new Tile(texture, this.landscape.length-1, this.toHtml(texture));
	this.landscape.push(tile);
}

World.prototype.addFoliage = function(foliage){
	this.foliage.push(foliage);	
}

World.prototype.addZombie = function(zombie){
	this.zombies.push(zombie);
}

World.prototype.addArrow = function(arrow){
	this.arrows.push(arrow)
}

World.prototype.pushStart = function(tile){
	this.landscape.unshift(tile);
}

//calculate if objects are offset # of pixels apart in the specified direction
World.prototype.isColliding = function(firstObj, secondObj, direction, xOffset, yOffset, boxWidth, boxHeight){
	if(direction == "right"){
		if(
			(firstObj.solid && secondObj.solid) &&
			(
			//upper left
			(firstObj.position[0] + firstObj.width + xOffset - boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + firstObj.width + xOffset - boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset - boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset - boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//lower left
			(firstObj.position[0] + firstObj.width + xOffset - boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + firstObj.width + xOffset - boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset + boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset + boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//upper right
			(firstObj.position[0] + firstObj.width + xOffset + boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + firstObj.width + xOffset + boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset - boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset - boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//lower right
			(firstObj.position[0] + firstObj.width + xOffset + boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + firstObj.width + xOffset + boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset + boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset + boxHeight/2 <= secondObj.position[1] + secondObj.height)
			)
		){

		return true;
		}

	} else if(direction == "left"){
		if(
			(firstObj.solid && secondObj.solid) &&
			(
			//upper left
			(firstObj.position[0] - xOffset - boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] - xOffset - boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset - boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset - boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//lower left
			(firstObj.position[0] - xOffset - boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] - xOffset - boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset + boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset + boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//upper right
			(firstObj.position[0] - xOffset + boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] - xOffset + boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset - boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset - boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//lower right
			(firstObj.position[0] - xOffset + boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] - xOffset + boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset + boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset + boxHeight/2 <= secondObj.position[1] + secondObj.height)
			)
		){

		return true;
		}
	} else if(direction == "down"){
		if(
			(firstObj.solid && secondObj.solid) &&
			(
			//upper left
			(firstObj.position[0] + xOffset - boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + xOffset - boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] + firstObj.height + yOffset - boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] + firstObj.height + yOffset - boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//lower left
			(firstObj.position[0] + xOffset - boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + xOffset - boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] + firstObj.height + yOffset + boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] + firstObj.height + yOffset + boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//upper right
			(firstObj.position[0] + xOffset + boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + xOffset + boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] + firstObj.height + yOffset - boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] + firstObj.height + yOffset - boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//lower right
			(firstObj.position[0] + xOffset + boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + xOffset + boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] + firstObj.height + yOffset + boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] + firstObj.height + yOffset + boxHeight/2 <= secondObj.position[1] + secondObj.height)
			)
		){

		return true;
		}
	} else if(direction == "up"){
		if(
			(firstObj.solid && secondObj.solid) &&
			(
			//upper left
			(firstObj.position[0] + xOffset - boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + xOffset - boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset - boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset - boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//lower left
			(firstObj.position[0] + xOffset - boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + xOffset - boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset + boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset + boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//upper right
			(firstObj.position[0] + xOffset + boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + xOffset + boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset - boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset - boxHeight/2 <= secondObj.position[1] + secondObj.height) ||

			//lower right
			(firstObj.position[0] + xOffset + boxWidth/2 >= secondObj.position[0] &&
			firstObj.position[0] + xOffset + boxWidth/2 <= secondObj.position[0] + secondObj.width &&
			firstObj.position[1] - yOffset + boxHeight/2 >= secondObj.position[1] &&
			firstObj.position[1] - yOffset + boxHeight/2 <= secondObj.position[1] + secondObj.height)
			)
		){

		return true;
		}
	}

}

World.prototype.toHtml = function(textureName){
	return "<img style=\"z-index:-2; height:32px; width: 32px; float:left\" src=" + "textures/" + textureName + ".png>";
}

World.prototype.loadScreen = function(xpos, ypos){
	var currentScreenX = xpos;
	var currentScreenY = ypos;

	var outString ="";
	this.landscape = [];
	this.foliage = [];
	this.zombies = [];

	ren = new Renderer();

	for(var i = ypos; i < ypos+24; i++){
		for(var j = xpos; j < xpos+40; j++){
			var value = ren.brownian("continents", j, i);	
			var removed = false;
			var tree = new Tree("Green", (j-currentScreenX) * 32, (i-currentScreenY) * 32);
		    if(value < 0){
		    	this.add("zeldaWater");
		    } else if(value < 500){
		    	this.add("zeldaSand");
		    } else {
		    	if((ren.brownian("greenTrees", j, i) < 0)  && ((i-currentScreenY) % 3 == 0) && ((j -currentScreenX) % 2 == 0)){
		    		if(!tree.isRemoved()){
		    			tree = new Tree("Green", (j-currentScreenX) * 32, (i-currentScreenY) * 32);
		    			this.addFoliage(tree);
		    		} else {
		    			var stump = new Stump((j-currentScreenX) * 32, (i-currentScreenY) * 32);
						this.addFoliage(stump);
		    		}
		    	}else if((ren.brownian("redTrees", j, i) < 0)  && ((i-currentScreenY) % 3 == 0) && ((j -currentScreenX) % 2 == 0)){
		    		if(!tree.isRemoved()){
		    			tree = new Tree("Red", (j-currentScreenX) * 32, (i-currentScreenY) * 32);
		    			this.addFoliage(tree);
		    		} else {
		    			var stump = new Stump((j-currentScreenX) * 32, (i-currentScreenY) * 32);
						this.addFoliage(stump);
		    		}
		    	} else if((ren.brownian("yellowTrees", j, i) < 0)  && ((i-currentScreenY) % 3 == 0) && ((j -currentScreenX) % 2 == 0)){
		    		if(!tree.isRemoved()){
		    			tree = new Tree("Yellow", (j-currentScreenX) * 32, (i-currentScreenY) * 32);
		    			this.addFoliage(tree);
		    		} else {
		    			var stump = new Stump((j-currentScreenX) * 32, (i-currentScreenY) * 32);
						this.addFoliage(stump);
		    		}
		    	} else if((ren.brownian("zombies", j, i) < 0)  && ((i-currentScreenY) % 3 == 0) && ((j -currentScreenX) % 2 == 0)){
		    			var zombie = new Zombie((j-currentScreenX) * 32, (i-currentScreenY) * 32, this.zombies.length, "right");
						if(!Zombie.prototype.isRemoved(zombie.globalPosition)){
							this.addZombie(zombie);
						}
		    	}
		  		this.add("zeldaGrassTwo");	
		    } 
		}
	}

	for(var i = 0; i < this.landscape.length; i++){
		outString += this.landscape[i].htmlTag;
	}

	for(var i = 0; i < this.foliage.length; i++){
		outString += this.foliage[i].htmlTag;
	}

	for(var i = 0; i < this.zombies.length; i++){
		outString += this.zombies[i].htmlTag;
	}

	document.getElementById("mainFrame").innerHTML = outString;
	hero.initialize();
}

World.prototype.saveState = function(xscreen, yscreen){
  	
}

function Tile(textureName, position, htmlTag){
	this.textureName = textureName;
	this.position = position;
	this.htmlTag = htmlTag;
}

