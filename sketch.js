

let url;
let x = 0;
let y = 0;
let end = true;
let time = 0;
let totalTime = 0;
let count = 0;

let width = 1000
let height = 700;

var peer = new Peer();


peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  
});






function setxy(){
	url = getURL();
	print(url);
	x = random(50,width-50);
	y = random(50,height-50);
	
	
}




function setup() {
  createCanvas(width, height);
  setxy()

  
}


function draw() {
  if (end){
   background(0);
   textSize(32);
   text(str(round(totalTime/count,3)), (width/2)-50, height/2);
   text(str(round(count,3)), (width/2)-50, height/2 + 50);

    
  }else{
	  background(150);
	  fill(color(255,0,0));
	  noStroke();
	  circle(x, y, 50);
  }
}




function mousePressed(){
  if (end == false){
    if (abs(mouseX - x) < 25 && abs(mouseY - y) < 25){
		count += 1;
		setxy()
    }else{
		totalTime = (millis() - time)/1000;
		setxy()
		end = true;
    }
  }else{
	  count = 0;
	  time = millis();
	  end = false;
  }
  
  
}

