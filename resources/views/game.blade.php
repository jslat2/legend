<?php 

if(count($_SESSION['removed']) > 0){
	$trees = '[';
	for($i = 0; $i < count($_SESSION['removed']); $i++){
		if($i == count($_SESSION['removed'])-1){
			$trees .= ('[' . $_SESSION['removed'][$i][0] . ',' 
					. $_SESSION['removed'][$i][1] . ','
					. $_SESSION['removed'][$i][2] . ','
					. $_SESSION['removed'][$i][3] . ']]');
		} else {
			$trees .= ('[' . $_SESSION['removed'][$i][0] . ',' 
				. $_SESSION['removed'][$i][1] . ','
				. $_SESSION['removed'][$i][2] . ','
				. $_SESSION['removed'][$i][3] . '],');
		}
	}
} else{
	$trees = '[]';
}

if(count($_SESSION['removedZombies']) > 0){
	$zombies = '[';
	for($i = 0; $i < count($_SESSION['removedZombies']); $i++){
		if($i == count($_SESSION['removedZombies'])-1){
			$zombies .= ('[' . $_SESSION['removedZombies'][$i][0] . ',' 
					. $_SESSION['removedZombies'][$i][1] . ','
					. $_SESSION['removedZombies'][$i][2] . ','
					. $_SESSION['removedZombies'][$i][3] . ']]');
		} else {
			$zombies .= ('[' . $_SESSION['removedZombies'][$i][0] . ',' 
				. $_SESSION['removedZombies'][$i][1] . ','
				. $_SESSION['removedZombies'][$i][2] . ','
				. $_SESSION['removedZombies'][$i][3] . '],');
		}
	}
} else{
	$zombies = '[]';
}

if(count($_SESSION['heroX']) > 0){
	$heroX = $_SESSION['heroX'];
} else{
	$heroX = "0";
}

if(count($_SESSION['heroY']) > 0){
	$heroY = $_SESSION['heroY'];
} else{
	$heroY = "0";
}

$screenX = $_SESSION['screenX'];
$screenY = $_SESSION['screenY'];

?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

 	<script src="https://code.jquery.com/jquery-2.1.4.js"></script>
	<script src="js/renderer.js"></script>
	<script src="js/listener.js"></script>
	<script src="js/perlin.js"></script>
	<script src="js/world.js"></script>
	<script src="js/foliage.js"></script>
	<script src="js/hero.js"></script>
	<script src="js/inventory.js"></script>
	<script src="js/zombie.js"></script>
	<script src="js/arrow.js"></script>
	<script src="js/gameover.js"></script>
	<link rel="stylesheet" href="stylesheet.css">

</head>
<body>
	@include('header')
	<div class="content">

		@include('sidebar')
		<div class="frame" id="mainFrame">
			<script> 
				var rightBorder = 1280;
				var leftBorder = 0;
				var bottomBorder = 768;
				var topBorder = 0;
				var currentScreenX = 0;
				var currentScreenY = 0;
				var charWidth = 48;
				var charHeight = 72;
				var inventoryOpen = false;
				var lastIPress = 0;
				var lastInventoryMove = 0;
				var currentInventoryPosition = 0;
				var lastFire = 0;
				var lastHitTime = 0;
				var lastArrowHitTime = 0;
				var lastHeroDamageTime = 0;
				var gameOver = false;


				//initialize the map
				var originalSeed = .5;
				noise.seed(originalSeed);

				var instance = new World();

				//create and initialize the hero
				var hero = new Hero(<?php echo $heroX ?>, <?php echo $heroY ?>, 4, charWidth, charHeight);

				//initialize the foliage and zombies
				instance.removedTrees = <?php echo $trees ?>;
				instance.removedZombies = <?php echo $zombies ?>;

				//initialize screen position
				currentScreenX = <?php echo $screenX . ';'?>
				currentScreenY = <?php echo $screenY . ';'?>
				instance.loadScreen(currentScreenX, currentScreenY);

				//initialize inventory
				Inventory.prototype.initializeInventory();

				new Listener();
				var renderer = new Renderer();

				//prevent window scroll when space pressed
				window.onkeydown = function(e) {
    				if(e.keyCode == 32 && e.target == document.body) {
        				e.preventDefault();
        				return false;
   		 			}
				};

				$("#saveButton").click(function(){
					$.get( 
						"/save",
						{ 	x: currentScreenX, 
							y: currentScreenY,
							removedTrees: JSON.stringify(instance.removedTrees), 
							removedZombies: JSON.stringify(instance.removedZombies),
							heroPositionX: hero.position[0],
							heroPositionY: hero.position[1]							
						} 

					);
				});

				window.addEventListener("keydown", function (e) {
	 				Listener.keys[e.keyCode] = true;
				});
				window.addEventListener("keyup", function (e) {
	  				Listener.keys[e.keyCode] = false;
				});

				document.addEventListener('DOMContentLoaded', function(){
					
					 (function animationLoop(){
					 	if(!gameOver){
					 		renderer.render();
	    					requestAnimationFrame(animationLoop);
	    				}
	 				 })();
	 				
				}, false);	

			</script>
		</div>
	</div>
</body>
</html>