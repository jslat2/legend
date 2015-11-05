Zombie.prototype = new Thing();

function Zombie(x, y, num, direction){
	this.localIdent = num;
	this.htmlTag = "<img src=\"textures/zeldaZombie.png\" class = \"zombie\" id = \"zombie" + num + "\" style=\"z-index:2; position:absolute; left:" + String(x) + "px; top: " +  String(y) + "px;\">";  
	this.position = [x, y];
	this.solid = true;
	this.width = 48;
	this.height = 72;
	this.globalPosition = [currentScreenX, currentScreenY, x, y];
	this.direction = direction;
	this.speed = 1;
	this.health = 3;
}

Zombie.prototype.move = function(direction){
	
	var currTime = new Date().getTime();
	this.direction = direction;
	var zombieTag = document.getElementById("zombie" + this.localIdent);

	if(direction == "up"){
		if(this.position[1] <= topBorder){
			//do nothing
		} else{

			//check to see if char is running in to a solid object
			var canMove  = true;
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(this, instance.foliage[i], "up", this.width/2, 0, this.width - 1, 0)){
					canMove = false;
					break;
				}
			}

			if(instance.isColliding(this, hero, "up", this.width/2, 0, this.width - 1, 0)){
				if(currTime - lastHeroDamageTime > 200){
					hero.health--;
					lastHeroDamageTime = currTime;
					hero.move('up');
					hero.move('up');
					hero.move('up');
					hero.move('up');
					hero.move('up');
					hero.move('up');
					hero.move('up');
					hero.move('up');
					hero.move('up');
					hero.move('up');
					hero.move('up');
					hero.move('up');
				}
				canMove = false;
			}

			if(canMove){
				zombieTag.style.top = this.position[1] - this.speed +"px";
				this.position[1] -= this.speed;
			}
		}
	} else if(direction == "down"){
		if(this.position[1] >= bottomBorder - this.height){
			//do nothing
		} else{
			//check to see if char is running in to a solid object
			var canMove  = true;
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(this, instance.foliage[i], "down", this.width/2, 0, this.width - 1, 0)){
					canMove = false;
					break;
				}
			}

			if(instance.isColliding(this, hero, "down", this.width/2, 0, this.width - 1, 0)){
				if(currTime - lastHeroDamageTime > 200){
					hero.health--;
					lastHeroDamageTime = currTime;
					hero.move('down');
					hero.move('down');
					hero.move('down');
					hero.move('down');
					hero.move('down');
					hero.move('down');
					hero.move('down');
					hero.move('down');
					hero.move('down');
					hero.move('down');
					hero.move('down');
					hero.move('down');
				}
				canMove = false;
			}
		
			if(canMove){
				zombieTag.style.top = this.position[1] + this.speed +"px";
				this.position[1] += this.speed;
			}
		}
	} else if(direction == "right"){
		if(this.position[0] >= rightBorder - this.width){
			//do nothing
		} else{
			//check to see if char is running in to a solid object
			var canMove  = true;
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(this, instance.foliage[i], "right", 0, -this.height/2, 0, this.height - 1)){
					canMove = false;
					break;
				}
			}

			if(instance.isColliding(this, hero, "right", 0, -this.height/2, 0, this.height - 1)){
				if(currTime - lastHeroDamageTime > 200){
					hero.health--;
					lastHeroDamageTime = currTime;
					hero.move('right');
					hero.move('right');
					hero.move('right');
					hero.move('right');
					hero.move('right');
					hero.move('right');
					hero.move('right');
					hero.move('right');
					hero.move('right');
					hero.move('right');
					hero.move('right');
					hero.move('right');
				}
				canMove = false;
			}

			if(canMove){
				zombieTag.style.left = this.position[0] + this.speed +"px";
				this.position[0] += this.speed;
			}
		}
	} else if(direction == "left"){
		if(this.position[0] <= leftBorder){
			//do nothing	
		} else{
			//check to see if char is running in to a solid object
			var canMove  = true;
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(this, instance.foliage[i], "left", 0, -this.height/2, 0, this.height - 1)){
					canMove = false;
					break;
				}
			}

			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(this, hero, "left", 0, -this.height/2, 0, this.height - 1)){
					if(currTime - lastHeroDamageTime > 200){
					hero.health--;
					lastHeroDamageTime = currTime;
					hero.move('left');
					hero.move('left');
					hero.move('left');
					hero.move('left');
					hero.move('left');
					hero.move('left');
					hero.move('left');
					hero.move('left');
					hero.move('left');
					hero.move('left');
					hero.move('left');
					hero.move('left');
				}
					canMove = false;
				}
			}

			if(canMove){
				zombieTag.style.left = this.position[0] - this.speed +"px";
				this.position[0] -= this.speed;
			}
		}
	}
}

Zombie.prototype.isRemoved = function (globalPosition){
	for(var i = 0; i < instance.removedZombies.length; i++){
		if(globalPosition[0] == instance.removedZombies[i][0] 
			&& globalPosition[1] == instance.removedZombies[i][1] 
			&& globalPosition[2] == instance.removedZombies[i][2]
			&& globalPosition[3] == instance.removedZombies[i][3]){
				return true;
		}
	}

	return false;
}