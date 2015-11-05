function Renderer(){
	this.frameStart = null;
    this.initialNumFireballs;
    this.lastZombieUpdate = 0;
    this.lastArrowUpdate = 0;
}

Renderer.prototype.render = function(time){

    var endPos = 1000, // in pixels
    duration = 1000; // in milliseconds

    if(hero.health == 0){
        gameOver = true;
    }

    if (time === undefined) {
    	time = new Date().getTime();
    }

    if (this.frameStart === null) {
    	this.frameStart = time;
    }

    //if hero is dead show game over screen
    if(gameOver){
        GameOver.prototype.showGameOver();
    }
    
    //hero movements/shooting
    /*****************************************************************************
    ******************************************************************************/

    if(!inventoryOpen && Listener.keys[73] && ((time - lastIPress > 200))){
        lastIPress = time;
        currentInventoryPosition = 0;
        Inventory.prototype.openInventory();
    }


    if(!inventoryOpen){
        
    	if(Listener.keys[83]){
    	   hero.move("down");
    	} 

    	 if(Listener.keys[87]){
    	   hero.move("up");
    	} 

    	if (Listener.keys[65]){
    		hero.move("left");
    	}

        if (Listener.keys[68]){
    		hero.move("right");
    	}

        //fire weapon
        if(Listener.keys[32] && hero.currentWeapon == 'bow' && ((time-lastFire) > 500) && instance.arrows.length < 1){
            lastFire = time;
            hero.fire(); 
        } else if (Listener.keys[32] && hero.currentWeapon == 'sword'){
            hero.fire();
        }

        this.updateZombies();
        this.updateArrows();
    }

    if(inventoryOpen){
        if(Listener.keys[13]){
            if($('#inventory div:nth-child('+ (currentInventoryPosition + 1) + '):contains(Make Bow)').length > 0){
                Inventory.prototype.removeItem(currentInventoryPosition + 1);
                Inventory.prototype.addItem("bow");
            } else if($('#inventory div:nth-child('+ (currentInventoryPosition + 1) + '):contains(Bow)').length > 0){
                hero.equip('bow');
                Inventory.prototype.closeInventory();
            }
        } else{
            if(Listener.keys[68] && ((time - lastInventoryMove) > 200)){
                Inventory.prototype.nextInventory();
                lastInventoryMove = time;
            } else if(Listener.keys[65] && ((time - lastInventoryMove) > 200)){
                Inventory.prototype.previousInventory();
                lastInventoryMove = time;
            } else if((Listener.keys[73] || Listener.keys[13]) && ((time - lastIPress) > 200)){
                Inventory.prototype.closeInventory();
                lastIPress = time;
            }
        }
    }
}

Renderer.prototype.updateZombies = function(){
    if (time === undefined) {
        var time = new Date().getTime();
    }

    for(var i = 0; i < instance.zombies.length; i++){
        if(instance.zombies[i].health == 0){
            $('#zombie' + instance.zombies[i].localIdent).remove();  
            instance.removedZombies.push(instance.zombies[i].globalPosition);
            instance.zombies.splice(i, 1);
        }
    }
    if(time > this.lastZombieUpdate + 10){
        this.lastZombieUpdate = time;
        for(var i = 0; i < instance.zombies.length; i++){
            var ran = Math.random();
            if(ran < .0025){
                instance.zombies[i].direction = "left";
                document.getElementById("zombie" + instance.zombies[i].localIdent).src = "textures/zeldaZombieLeft.png";
            } else if(ran < .005){
                instance.zombies[i].direction = "right";
                document.getElementById("zombie" + instance.zombies[i].localIdent).src = "textures/zeldaZombie.png";
            } else if(ran < .0075){
                instance.zombies[i].direction = "up";
            } else if(ran < .01){
                instance.zombies[i].direction = "down";
            }

            instance.zombies[i].move(instance.zombies[i].direction);
        }
    }
}

Renderer.prototype.updateArrows = function(){
    if (time === undefined) {
        var time = new Date().getTime();
    }

    if(time > this.lastArrowUpdate + 1){
        this.lastArrowUpdate = time;
        for(var i = 0; i < instance.arrows.length; i++){
            instance.arrows[i].move(instance.arrows[i].direction);
        }
    }
}

//transform function for generating world map
Renderer.prototype.brownian = function(layer, x, y){
  if(layer == "continents"){
    var xpos = x*.04;
    var ypos = y*.04;
    
    var frq = 2500.0;
    var amp = 100;
       
    var sum = 0.0;
    var gain = 3;
    for(var i = 0; i < 8; i++){
     
    sum +=  noise.perlin3(x*gain/frq, y*gain/frq, 0) * amp/gain;
    gain *= 2;
    }
    return (1 + sum *2) * 1.1 *128; 
  } else if(layer == "mountains"){

  
    var xpos = x*.04;
    var ypos = y*.04;
    
    var frq = 700.0;
    var amp = 300;
       
    var sum = 0.0;
    var gain = 8;
    for(var i = 0; i < 10; i++){
     
    sum +=  noise.perlin3(x*gain/frq, y*gain/frq, 0) * amp/gain ;
    gain *= 2;
    }
    return (1 + sum *2) * 1.1 *128-3500; 

  } else if(layer == "redTrees"){

    var xpos = x*.04;
    var ypos = y*.04;
    
    var frq = 600.0;
    var amp = 300;
       
    var sum = 0.0;
    var gain = 8;
    for(var i = 0; i < 10; i++){
     
    sum +=  noise.perlin3(x*gain/frq, y*gain/frq, 0) * amp/gain ;
    gain *= 2;
    }
    return (1 + sum *2) * 1.1 *128 + 5000; 
  } else if(layer == "yellowTrees"){
    noise.seed(originalSeed / 2);
    var xpos = x*.04;
    var ypos = y*.04;
    
    var frq = 600.0;
    var amp = 300;
       
    var sum = 0.0;
    var gain = 8;
    for(var i = 0; i < 10; i++){
     
    sum +=  noise.perlin3(x*gain/frq, y*gain/frq, 0) * amp/gain ;
    gain *= 2;
    noise.seed(originalSeed);
    return (1 + sum *2) * 1.1 *128 + 5000; 
    }
  } else if(layer == "greenTrees"){
    noise.seed(.75);
    var xpos = x*.04;
    var ypos = y*.04;
    
    var frq = 500.0;
    var amp = 800;
       
    var sum = 0.0;
    var gain = 8;
    for(var i = 0; i < 10; i++){
     
    sum +=  noise.perlin3(x*gain/frq, y*gain/frq, 0) * amp/gain ;
    gain *= 2;
    noise.seed(originalSeed);
    return (1 + sum *2) * 1.1 *128 + 5000; 
    }
  } else if(layer == "zombies"){
    noise.seed(.75);
    var xpos = x*.04;
    var ypos = y*.04;
    
    var frq = 100.0;
    var amp = 800;
       
    var sum = 0;
    var gain = 20;
    for(var i = 0; i < 10; i++){
     
    sum +=  noise.perlin3(x*gain/frq, y*gain/frq, 0) * amp/gain ;
    gain *= 2;
    noise.seed(originalSeed);
    return (1 + sum *2) * 1.1 *128 + 5000; 
    }
  }
}

Renderer.prototype.riverTransform = function(x, y) {
    var value = Math.abs(noise.perlin3(x / 100, y / 100, 0) *20);
    value *= 256;
    return value;
}
