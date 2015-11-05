<!--
<!DOCTYPE html>
<title>Perlin noise</title>
<style>
.centerbox {
  /* flexbox, por favor */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-pack: center;
  -moz-box-align: center;
  width: 1024px;
  height: 768px;
  margin: 0; padding: 0;
}
body, html { width: 100%; height: 100%; padding: 0; margin: 0; }
canvas {
  /* border-radius: 30px;  Border radiuses don't seem to work with putImageData */
  box-shadow: 0 0 10px #777;
  width: 1024px;
  height: 768px;
}
body {
  background-color: #eee;
}
</style>
<body>
<div class='centerbox' id="center"><canvas></canvas></div>
<script src='perlin.js'></script>
<script language="javascript" src="http://code.jquery.com/jquery-1.4.1.js" type="text/javascript"></script>
<script src='js/perlin.js'></script>
<script src='js/renderer.js'></script>
<script src='renderer.js'></script>
<script>
var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = 1500;
canvas.height = 1500;
var ctx = canvas.getContext('2d');
var image = ctx.createImageData(canvas.width, canvas.height);
var data = image.data;
var start = Date.now();
for (var x = 0; x < canvas.width; x++) {
  if (x % 100 == 0) {
   noise.seed(Math.random());
  }
  for (var y = 0; y < canvas.height; y++) {
    var value = Math.abs(noise.perlin2(x / 100, y / 100, 0) *20);
    value *= 256;
    var cell = (x + y * canvas.width) * 4;
    data[cell] = data[cell + 1] = data[cell + 2] = value;
   data[cell] += Math.max(0, (25 - value) * 8);
    data[cell + 3] = 255; // alpha.
  }
}
/* // Benchmark code.
start = Date.now();
for (var x = 0; x < 10000; x++) {
  for (var y = 0; y < 10000; y++) {
    noise.simplex2(x / 50, y/50);
  }
}*/
var end = Date.now();
ctx.fillColor = 'black';
ctx.fillRect(0, 0, 100, 100);
ctx.putImageData(image, 0, 0);
ctx.font = '16px sans-serif'
ctx.textAlign = 'center';
ctx.fillText('Rendered in ' + (end - start) + ' ms', canvas.width / 2, canvas.height - 20);
if(console) {
  console.log('Rendered in ' + (end - start) + ' ms');
}

$("#center").click(function(e){
  var renderer = new Renderer();
    var x = e.pageX/1024*1500; //- this.offsetLeft;
    var y = e.pageY/768*1500;// - this.offsetTop;
    var value = Math.abs(noise.perlin3(x / 100, y / 100, 0) *20);
    value *= 256;
    alert("x: " + x + "y: " + y + "value " + value);
}); 
</script>
</body>
-->


<!DOCTYPE html>
<title>Perlin noise</title>
<style>
.centerbox {

  width: 1500px;
  height: 1500px;
  margin: 0; padding: 0;
}
body, html { width: 100%; height: 100%; padding: 0; margin: 0; }
canvas {
  /* border-radius: 30px;  Border radiuses don't seem to work with putImageData */
  box-shadow: 0 0 10px #777;
  width: 1024px;
  height: 768px;
}
body {
  background-color: #eee;
}
</style>
<div class='centerbox' id="center"><canvas></canvas></div>
<script src='js/perlin.js'></script>
<script src='js/renderer.js'></script>
<script language="javascript" src="http://code.jquery.com/jquery-1.4.1.js" type="text/javascript"></script>
<script>



var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = 1500;
canvas.height = 1500;
var ctx = canvas.getContext('2d');
var image = ctx.createImageData(canvas.width, canvas.height);
var data = image.data;
var height = -1000;
var fn = 'simplex'
var originalSeed = .5;
function drawFrame() {
  var start = Date.now();
  // Cache width and height values for the canvas.
  var cWidth = canvas.width;
  var cHeight = canvas.height;
  var max = -Infinity, min = Infinity;
  var noisefn = fn === 'simplex' ? noise.simplex3 : noise.perlin3;
  noise.seed(.5);
  renderer = new Renderer();
  for (var x = 0; x < cWidth; x++) {
    for (var y = 0; y < cHeight; y++) {
      var value = renderer.brownian("zombies", x, y);
      //value = (1 + value) * 1.1 * 128;
      var cell = (x + y * cWidth) * 4;
      data[cell] = data[cell + 1] = data[cell + 2] = value;
      //data[cell] += Math.max(0, (25 - value) * 8);
      data[cell + 3] = 255; // alpha.
    }
  }
  var end = Date.now();
  ctx.fillColor = 'black';
  ctx.fillRect(0, 0, 100, 100);
  ctx.putImageData(image, 0, 0);
  ctx.font = '16px sans-serif'
  ctx.textAlign = 'center';
  ctx.fillText(fn + ' rendered in ' + (end - start) + ' ms', cWidth / 2, cHeight - 20);
  if(console) {
    console.log(fn + ' rendered in ' + (end - start) + ' ms', 'range: ' + min + ' to ' + max);
  }
  height += 0.05;
}
drawFrame();

$("#center").click(function(e){
  var renderer = new Renderer();
    var x = e.pageX/1024*1500; //- this.offsetLeft;
    var y = e.pageY/768*1500;// - this.offsetTop;
    var value = renderer.brownian("zombies" , x, y);//noisefn(x / 500, y / 120, height);
    alert("x: " + x + "y: " + y + "value " + value);
}); 
</script>
-->