Tree.prototype = new Thing();

function Tree(color, x, y){
	this.htmlTag = "<img src=\"textures/zelda" + color + "Tree.png\" class = \"tree\" style=\"position:absolute; left:" + String(x) + "px; top: " +  String(y) + "px;\">";  
	this.position = [x, y];
	this.solid = true;
	this.width = 64;
	this.height = 96;
	this.globalPosition = [currentScreenX, currentScreenY, x, y];
	this.color = color;
}

Stump.prototype = new Thing();

function Stump(x, y){
	this.htmlTag = "<img src=\"textures/zeldaStump.png\" class = \"stump\" style=\"position:absolute; left:" + String(x) + "px; top: " +  String(y) + "px;\">";  
	this.position = [x, y];
	this.solid = false;
	this.width = 64;
	this.height = 96;
	this.globalPosition = [currentScreenX, currentScreenY, x, y];
}

Tree.prototype.isRemoved = function(){
	for(var i = 0; i < instance.removedTrees.length; i++){
		if(this.globalPosition[0] == instance.removedTrees[i][0] &&
			this.globalPosition[1] == instance.removedTrees[i][1] &&
			this.globalPosition[2] == instance.removedTrees[i][2] &&
			this.globalPosition[3] == instance.removedTrees[i][3]){
			return true;
		}
	}	
}