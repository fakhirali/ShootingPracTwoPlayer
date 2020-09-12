let x = 0;
let y = 0;
let end = false;

function setxy(){
	x = random(100,1400);
	y = random(100,600);
	
	
}




function setup() {
  createCanvas(1500, 700);
  
  setxy()

  
}


function draw() {
  if (end){
   background(0) ;
    
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
		setxy()
    }else{
		setxy()
		end = true;
    }
  }else{
	end = false;
  }
  
  
}

