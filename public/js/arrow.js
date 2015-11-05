Arrow.prototype = new Thing();

function Arrow(direction, x, y){
	this.htmlTag = "<img src=\"textures/" + direction + "arrow.png\" class = \"arrow\" style=\"position:absolute; left:" + String(x) + "px; top: " +  String(y) + "px;\">";  
	this.position = [x, y];
	this.solid = true;
	if(direction == 'right' || direction == 'left'){
		this.width = 48;
		this.height = 7;
	} else{
		this.width = 7;
		this.height = 48;
	}
	this.globalPosition = [currentScreenX, currentScreenY, x, y];
	this.speed = 20;
	this.direction = direction;
}

Arrow.prototype.move = function(direction){
	
	var currTime = new Date().getTime();

	if(direction == "up"){
		if(this.position[1] <= topBorder){
			instance.arrows = [];
			$('.arrow').remove();
			return;
		}

		//check to see if arrow is running in to a solid object
		for(var i = 0; i < instance.foliage.length; i++){
			if(instance.isColliding(instance.arrows[0], instance.foliage[i], "up", this.width/2, 0, this.width - 1, 0)){
				instance.arrows = [];
				$('.arrow').remove();
				return;
			}
		}

		for(var i = 0; i < instance.zombies.length; i++){
			if(instance.isColliding(instance.arrows[0], instance.zombies[i], "up", this.width/2, 0, this.width - 1, 0)){
				if(currTime - lastArrowHitTime > 200){
						instance.zombies[i].health--;
						lastArrowHitTime = currTime;
				}
				instance.arrows = [];
				$('.arrow').remove();
				return;
			} 
		}

		$('.arrow').css( "top", instance.arrows[0].position[1] + "px");
		instance.arrows[0].position[1] -= this.speed;

	} else if(direction == "down"){
		if(this.position[1] >= bottomBorder - 48){
			instance.arrows = [];
			$('.arrow').remove();
			return;
		}

		//check to see if arrow is running in to a solid object
		for(var i = 0; i < instance.foliage.length; i++){
			if(instance.isColliding(instance.arrows[0], instance.foliage[i], "down", this.width/2, 0, this.width - 1, 0)){
				instance.arrows = [];
				$('.arrow').remove();
				return;
			}
		}

		for(var i = 0; i < instance.zombies.length; i++){
			if(instance.isColliding(instance.arrows[0], instance.zombies[i], "down", this.width/2, 0, this.width - 1, 0)){
				if(currTime - lastArrowHitTime > 200){
						instance.zombies[i].health--;
						lastArrowHitTime = currTime;
				}
				instance.arrows = [];
				$('.arrow').remove();
				return;
			} 
		}

		$('.arrow').css( "top", instance.arrows[0].position[1] + "px");
		instance.arrows[0].position[1] += this.speed;
	} else if(direction == "right"){
		if(this.position[0] >= rightBorder - this.width){
			instance.arrows = [];
			$('.arrow').remove();
		} else{
			//check to see if arrow is running in to a solid object
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(instance.arrows[0], instance.foliage[i], "right", 0, -this.height/2, 0, this.height - 1)){
					instance.arrows = [];
					$('.arrow').remove();
					return;
				}
			}

			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(instance.arrows[0], instance.zombies[i], "right", 0, -this.height/2, 0, this.height - 1)){
					if(currTime - lastArrowHitTime > 200){
						instance.zombies[i].health--;
						lastArrowHitTime = currTime;
					}
					instance.arrows = [];
					$('.arrow').remove();
					return;
				} 
			}

			$('.arrow').css( "left", instance.arrows[0].position[0] + "px");
			instance.arrows[0].position[0] += this.speed;
			
		}
	} else if(direction == "left"){
		if(this.position[0] <= leftBorder){
			instance.arrows = [];
			$('.arrow').remove();
		} else{
			//check to see if arrow is running in to a solid object
			for(var i = 0; i < instance.foliage.length; i++){
				if(instance.isColliding(instance.arrows[0], instance.foliage[i], "left", 0, -this.height/2, 0, this.height - 1)){
					instance.arrows = [];
					$('.arrow').remove();
					return;
				}
			}

			for(var i = 0; i < instance.zombies.length; i++){
				if(instance.isColliding(instance.arrows[0], instance.zombies[i], "left", 0, 0, -this.height/2, 0, this.height - 1)){
					if(currTime - lastArrowHitTime > 200){
						instance.zombies[i].health--;
						lastArrowHitTime = currTime;
					}
					instance.arrows = [];
					$('.arrow').remove();
					return;
				} 
			}

			$('.arrow').css( "left", instance.arrows[0].position[0] + "px");
			instance.arrows[0].position[0] -= this.speed;
			
		}
	}
}