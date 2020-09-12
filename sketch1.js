let conn;
let url;
var cnv;
var peerid;
let isGreen = false;
let cnvWidth = 800;
let cnvHeight = 500;
let ready = false;
let otherReady = false;
let countdown = 5;
var timer;
var interval;
let x = 0;
let y = 0;
let ox = 0;
let oy = 0;
var cx;
var cy;
let game = false;
let totalhits = 0;
var ototalhits = 0;
var end = false;
let c;
let oc;


var peer = new Peer();

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
	ID = id;
	el = createElement('h2',url.split("?")[0] + "?" + ID);
	el.position(20, 5);
});




function showConnected(){
	el.remove();
	el = createElement('h2',"connected to " + peerid);
	el.position(20,5);
	button = createButton('ready');
	button.position(50, 5);
	button.mousePressed(ImReady);
}







function ImReady(){
	button.remove();
	el.remove()
	ready = true;
	conn.send({ready});	
	
}


function startScene(){
	ready = false;
	timer = createElement('timer');
	timer.position(20,5);
	interval = setInterval(TimeIt,1000);

}

function TimeIt(){
	timer.html(countdown);
	countdown --;
	if (countdown < 0 && game == false){
		countdown = 30;
		startGame();
	}else if (countdown < 0 && game){
		end = true;
		
	}

}

function startGame(){
	setxy();
	game = true;
	

	
}


function setxy(){

	if (isGreen){
		x = random(20,(cnvWidth/2)-20);
		y = random(10,cnvHeight-10);
	}else{
		x = random((cnvWidth/2)+20,cnvWidth-20);
		y = random(10,cnvHeight-10);
		
	}

	if(game){
		conn.send({x,y,totalhits});
		
		
	}
}








function setup() {
	url = getURL();
	
	if (url.split("?").length > 1){
		isGreen = true;
		peer.on('open', function(){
	
			conn = peer.connect(url.split("?")[1],{
				reliable: true
			});
			conn.on('open', function() {
				peerid = conn.peer;
				showConnected();

			});
			
			conn.on('data', function(data) {
				print(data.ready);
				otherReady = data.ready;
				
			});
			
			
			conn.on('error', function(err){
				print("error");
				print(err);
			});
			
			
		});
		

	}else{

		peer.on('connection', function(c) {
			conn = c;
			peerid = conn.peer;
			showConnected();
			conn.on('data', function(data) {
				print(data.ready);
				otherReady = data.ready;
				
			});
		  
		});

		
	}
	
	setxy();

	
	cnv = createCanvas(cnvWidth, cnvHeight);
	cx = (windowWidth - width) / 2;
	cy = (windowHeight - height) / 2;
	print(cx,cy);
	cnv.position(cx, cy);
	c = color(10, 255, 10);
	oc = color(255, 10, 10);


}



function draw() {
	background(220);
	line(cnvWidth/2,0,cnvWidth/2,cnvHeight);
	if (ready && otherReady){
		startScene();
	
	}
	if(game && end == false){
	
		fill(c);
		circle(x,y,20);
		
		conn.on('data', function(data) {
				ox = data.x;
				oy = data.y;
				ototalhits = data.totalhits;
			});
		fill(oc);
		circle(ox,oy,20);
	}else if(end){
		background(0);
		textSize(32);
		if(isGreen){
			text(str(totalhits), cnvWidth/4, height/2);
			text(str(ototalhits), (cnvWidth/4)*3, height/2);
			
			
		}else{
			
			text(str(ototalhits), cnvWidth/4, height/2);
			text(str(totalhits), (cnvWidth/4)*3, height/2);
			
			
		}
		

		
	}
  
}


function mousePressed(){
	if (end == false ){
		if (abs(mouseX - x) < 10 && abs(mouseY - y) < 10){
			totalhits += 1;
			setxy()
		}
	}
  

}


