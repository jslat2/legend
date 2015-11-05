function GameOver(){
}

GameOver.prototype.showGameOver = function(){
	var gameOver = document.createElement("div");
	gameOver.id = "gameover";
	gameOver.className = "gameover";
	gameOver.style.width = rightBorder * 3 / 4 + "px";
	gameOver.style.height = bottomBorder * 3 / 4 + "px";
	gameOver.style.left =  rightBorder/2 + "px";
	gameOver.style.top =  bottomBorder/2 + "px";
	$('#mainFrame').append(gameOver);

	var title = document.createElement("div");
	title.className = "title";
	title.innerHTML = "<b><i>Game Over</i></b>";
	$('#gameover').append(title);

	var loadLast = document.createElement("div");
	loadLast.id = "loadLast";
	loadLast.className = "loadLast";
	loadLast.innerHTML = "<a href=\"/home\">Load Last Save</a>";
	$('#gameover').append(loadLast);

	var logout = document.createElement("div");
	logout.id = "logout";
	logout.className = "logout";
	logout.innerHTML = "<a href=\"/logout\">Logout</a>";
	$('#gameover').append(logout);
}