let conn;
let url;
let x = 0;
let y = 0;
let end = true;
let time = 0;
let totalTime = 0;
let count = 0;
let ID;
let width = 1000
let height = 700;
let client = false;

var peer = new Peer();

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
	ID = id;
	el = createElement('h2',url.split("?")[0] + "?" + ID);
	el.position(20, 5);
});





peer.on('connection', function(conn) {
	client = false
	conn.on('data', function(data) {
		console.log('Received', data.x);
		console.log('Received', data.y);
		console.log('Recieved', data.end);
		x = data.x;
		y = data.y;
		end = data.end;

		
  });
  
});





function setxy(){
	if (client == true){
		print(client);
		x = random(50,width-50);
		y = random(150,height-50);
		conn.send({x,y,end});
		
	}
	
}





function setup() {
	url = getURL()
	
	
	if (url.split("?").length > 1){
		
		peer.on('open', function(){
	
			conn = peer.connect(url.split("?")[1],{
				reliable: true
			});
			conn.on('open', function() {
				print(x,y);
				conn.send({x,y,end});
				//conn.send(y);
				client = true;

			});
			conn.on('error', function(err){
				print("error");
				print(err);
			});
			
			
		});
		

	}
		
	
	

	
	
	
	
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
	if (mouseY > 50){
	  if (end == false ){
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
}

