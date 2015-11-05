Hero.prototype = new Thing();
function Hero(x, y, speed, width, height){
	this.position = [x, y];
	this.speed = speed;
	this.direction = "right";
	this.width = width;
	this.height = height;
	this.solid = true;
	this.inventory = [];
	this.currentWeapon = 'sword';
	this.health = 1;
}	

//fire weapon
Hero.prototype.fire = function(){

	var currTime = new Date().getTime();

	if(this.currentWeapon == 'sword'){
		if(this.direction == "left"){
			//destroy hit foliage 
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(this, instance.foliage[i], "left", 33, -44, 0, 0)){
					var toRemove = $('.tree').filter(function() {
	    				var element = $(this);
	    				if(element.css('left') == instance.foliage[i].position[0] + 'px'
	    					&& element.css('top') == instance.foliage[i].position[1] + 'px') {
	        				element.remove();
	        			}
					});
					var stump = new Stump(instance.foliage[i].position[0], instance.foliage[i].position[1]);
					$("#mainFrame").append(stump.htmlTag);
					instance.removedTrees.push(instance.foliage[i].globalPosition);
					if(instance.foliage[i].color == 'Green'){
						Inventory.prototype.addItem('wood');
					} else if(instance.foliage[i].color == 'Yellow'){
						Inventory.prototype.addItem('bush');
					}
					instance.foliage.splice(i, 1);
				}
			} 

			//destroy zombies
			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(this, instance.zombies[i], "left", 33, -44, 0, 0)){
					if(currTime - lastHitTime > 200){
						instance.zombies[i].health--;
						lastHitTime = currTime;
					}
				}
			} 

			var heroTag = document.getElementById("hero");
			heroTag.src = "textures/heroSwingLeft.png";
			heroTag.style.left = String(this.position[0] - 33) + "px";
		} else if(this.direction == "right"){
			//destroy hit foliage 
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(this, instance.foliage[i], "right", 33, -44, 0, 0)){
					var toRemove = $('.tree').filter(function() {
	    				var element = $(this);
	    				if(element.css('left') == instance.foliage[i].position[0] + 'px'
	    					&& element.css('top') == instance.foliage[i].position[1] + 'px') {
	        				element.remove();
	        			}
					});
					var stump = new Stump(instance.foliage[i].position[0], instance.foliage[i].position[1]);
					$("#mainFrame").append(stump.htmlTag);
					instance.removedTrees.push(instance.foliage[i].globalPosition);
					if(instance.foliage[i].color == 'Green'){
						Inventory.prototype.addItem('wood');
					} else if(instance.foliage[i].color == 'Yellow'){
						Inventory.prototype.addItem('bush');
					}
					instance.foliage.splice(i, 1);
				}
			} 

			//destroy zombies
			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(this, instance.zombies[i], "right", 33, -44, 0, 0)){
					if(currTime - lastHitTime > 200){
						instance.zombies[i].health--;
						lastHitTime = currTime;
					}
				}
			} 
			var heroTag = document.getElementById("hero");
			heroTag.src = "textures/heroSwingRight.png";
		
		} else if(this.direction == "up"){
			//destroy hit foliage 
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(this, instance.foliage[i], "up", this.height/2, 33, 0, 0)){
					var toRemove = $('.tree').filter(function() {
	    				var element = $(this);
	    				if(element.css('left') == instance.foliage[i].position[0] + 'px'
	    					&& element.css('top') == instance.foliage[i].position[1] + 'px') {
	        				element.remove();
	        			}
					});
					var stump = new Stump(instance.foliage[i].position[0], instance.foliage[i].position[1]);
					$("#mainFrame").append(stump.htmlTag);
					instance.removedTrees.push(instance.foliage[i].globalPosition);
					if(instance.foliage[i].color == 'Green'){
						Inventory.prototype.addItem('wood');
					} else if(instance.foliage[i].color == 'Yellow'){
						Inventory.prototype.addItem('bush');
					}
					instance.foliage.splice(i, 1);
				}
			} 

			//destroy zombies
			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(this, instance.zombies[i], "up", this.height/2, 33, 0, 0)){
					if(currTime - lastHitTime > 200){
						instance.zombies[i].health--;
						lastHitTime = currTime;
					}
				}
			} 
			var heroTag = document.getElementById("hero");
			heroTag.src = "textures/heroup.png";
		} else if(this.direction == "down"){
			//destroy hit foliage 
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(this, instance.foliage[i], "down", this.height/2, 33, 0, 0)){
					var toRemove = $('.tree').filter(function() {
	    				var element = $(this);
	    				if(element.css('left') == instance.foliage[i].position[0] + 'px'
	    					&& element.css('top') == instance.foliage[i].position[1] + 'px') {
	        				element.remove();
	        			}
					});
					var stump = new Stump(instance.foliage[i].position[0], instance.foliage[i].position[1]);
					$("#mainFrame").append(stump.htmlTag);
					instance.removedTrees.push(instance.foliage[i].globalPosition);
					if(instance.foliage[i].color == 'Green'){
						Inventory.prototype.addItem('wood');
					} else if(instance.foliage[i].color == 'Yellow'){
						Inventory.prototype.addItem('bush');
					}
					instance.foliage.splice(i, 1);
				}
			} 

			//destroy zombies
			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(this, instance.zombies[i], "down", this.height/2, 33, 0, 0)){
					if(currTime - lastHitTime > 200){
						instance.zombies[i].health--;
						lastHitTime = currTime;
					}
				}
			} 
			var heroTag = document.getElementById("hero");
			heroTag.src = "textures/herodown.png";
		}
	} if(this.currentWeapon == 'bow'){
		if(this.direction == 'right'){
			var arrow = new Arrow("right", this.position[0] + this.width, this.position[1] + 33);
			instance.arrows.push(arrow);
			$("#mainFrame").append(arrow.htmlTag);
		} else if(this.direction == 'up'){
			var arrow = new Arrow("up", this.position[0] + this.width/2 - 7, this.position[1] - 48);
			instance.arrows.push(arrow);
			$("#mainFrame").append(arrow.htmlTag);
		} else if(this.direction == 'down'){
			var arrow = new Arrow("down", this.position[0] + this.width/2 - 7, this.position[1] + this.height);
			instance.arrows.push(arrow);
			$("#mainFrame").append(arrow.htmlTag);
		} else if(this.direction == 'left'){
			var arrow = new Arrow("left", this.position[0] - 48, this.position[1] + 33);
			instance.arrows.push(arrow);
			$("#mainFrame").append(arrow.htmlTag);
		}

	}
}

Hero.prototype.equip = function(weapon){
	this.currentWeapon = weapon;
}


//adds hero to html body
Hero.prototype.initialize = function(){
	var heroTag = document.createElement("img");
	heroTag.src = "textures/hero" + this.direction + ".png";
	heroTag.class = "hero";
	heroTag.id = "hero";
	heroTag.style.left = String(this.position[0]) + "px";
	heroTag.style.top = String(this.position[1]) + "px"; 
	document.getElementById("mainFrame").appendChild(heroTag);
}	


Hero.prototype.move = function(direction){
	hero.direction = direction;
	var heroTag = document.getElementById("hero");

	if(direction == "up"){
		if(hero.position[1] <= topBorder){
			currentScreenY -= 24;
			document.getElementById("mainFrame").innerHTML = "";
			hero.position[1] = bottomBorder - charHeight;
			heroTag.src = "textures/hero" + direction + ".png";
			instance.loadScreen(currentScreenX, currentScreenY);
		} else{

			//check to see if char is running in to a solid object
			var canMove  = true;
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(hero, instance.foliage[i], "up", this.width/2, 0, this.width - 1, 0)){
					canMove = false;
					break;
				}
			}

			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(hero, instance.zombies[i], "up", this.width/2, 0, this.width - 1, 0)){
					canMove = false;
					break;
				}
			}

			if(canMove){
				heroTag.style.top = hero.position[1] - hero.speed +"px";
				hero.position[1] -= hero.speed;
				heroTag.src = "textures/hero" + direction + ".png";
			}
		}
	} else if(direction == "down"){
		if(hero.position[1] >= bottomBorder - charHeight){
			currentScreenY += 24;
			document.getElementById("mainFrame").innerHTML = "";
			hero.position[1] = 0;
			heroTag.src = "textures/hero" + direction + ".png";
			instance.loadScreen(currentScreenX, currentScreenY);
		} else{
			//check to see if char is running in to a solid object
			var canMove  = true;
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(hero, instance.foliage[i], "down", this.width/2, 0, this.width - 1, 0)){
					canMove = false;
					break;
				}
			}

			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(hero, instance.zombies[i], "down", this.width/2, 0, this.width - 1, 0)){
					canMove = false;
					break;
				}
			}

			if(canMove){
				heroTag.style.top = hero.position[1] + hero.speed +"px";
				hero.position[1] += hero.speed;
				heroTag.src = "textures/hero" + direction + ".png";
			}
		}
	} else if(direction == "right"){
		if(hero.position[0] >= rightBorder - charWidth){
			//load new screen if at edge of current screen
			currentScreenX += 40;
			document.getElementById("mainFrame").innerHTML = "";
			hero.position[0] = 0;
			heroTag.src = "textures/hero" + direction + ".png";
			instance.loadScreen(currentScreenX, currentScreenY);
		} else{
			//check to see if char is running in to a solid object
			var canMove  = true;
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(hero, instance.foliage[i], "right", 0, -this.height/2, 0, this.height - 1)){
					canMove = false;
					break;
				}
			}

			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(hero, instance.zombies[i], "right", 0, -this.height/2, 0, this.height - 1)){
					canMove = false;
					break;
				}
			}

			if(canMove){
				heroTag.style.left = hero.position[0] + hero.speed +"px";
				hero.position[0] += hero.speed;
				heroTag.src = "textures/hero" + direction + ".png";
			}
		}
	} else if(direction == "left"){
		if(hero.position[0] <= leftBorder){
			currentScreenX -= 40;
			document.getElementById("mainFrame").innerHTML = "";
			hero.position[0] = rightBorder - charWidth;
			heroTag.src = "textures/hero" + direction + ".png";
			instance.loadScreen(currentScreenX, currentScreenY);	
		} else{
			//check to see if char is running in to a solid object
			var canMove  = true;
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(hero, instance.foliage[i], "left", 0, -this.height/2, 0, this.height - 1)){
					canMove = false;
					break;
				}
			}

			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(hero, instance.zombies[i], "left", 0, -this.height/2, 0, this.height - 1)){
					canMove = false;
					break;
				}
			}

			if(canMove){
				heroTag.style.left = hero.position[0] - hero.speed +"px";
				hero.position[0] -= hero.speed;
				heroTag.src = "textures/hero" + direction + ".png";
			}
		}
	}
}