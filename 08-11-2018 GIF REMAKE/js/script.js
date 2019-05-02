//creating the new scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
var camera = new THREE.OrthographicCamera( 40 / - 2, 40 / 2, 40 / 2, 40 / - 2, 1, 1000 );
scene.add( camera )

//add the renderer to dom
var renderer = new THREE.WebGLRenderer();
renderer.setSize( 400*2, 400*2 );
document.body.appendChild( renderer.domElement );

//set up array for containing boxes, and an array for containing relative scale values
var boxesCOL = [];

//create an array of 225 1x1x1 boxes in a 15x15 grid
var gridSize = 16;

for(var i = 0; i < gridSize; i++){
	var boxesROW = [];
	for(var j = 0; j < gridSize; j++){

		var geometry = new THREE.BoxGeometry( 1, 1.5, 1 );
		//chang face color
		geometry.faces[4].color.setHex(0x82baaf);
		geometry.faces[5].color.setHex(0x82baaf);
		geometry.faces[0].color.setHex(0xe6e4b1);
		geometry.faces[1].color.setHex(0xe6e4b1);
		geometry.faces[8].color.setHex(0x3f5385);
		geometry.faces[9].color.setHex(0x3f5385);

		var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
		var cube = new THREE.Mesh( geometry, material );
		cube.position.z = i;
		cube.position.x = j;
		scene.add(cube);

		boxesROW.push(cube);

	}

	boxesCOL.push(boxesROW);
}

//change the camera position and refocus on center of scene
camera.position.z = gridSize;
camera.position.y = gridSize - 2;
camera.position.x = gridSize;
camera.lookAt( scene.position );

//math control ( used with sliders )
var angle = 1;
var offsetMax = .8;
var speed = 0.02;

//animation function
var animate = function () {
	requestAnimationFrame( animate );
	
	//loop through boxes and check to see if it's okay to move it based off of offset related to the boxes pos
	for(var i = 0; i < boxesCOL.length; i++){
		
		for(var j = 0; j < boxesROW.length; j++){
			
			//simple distance formula
			var distance = Math.pow(( i - Math.abs((gridSize/2))), 2) + Math.pow((j - Math.abs((gridSize/2))), 2);
			//scale that value ot an offset
			var offset = scale(distance, 0, gridSize-1, 0, offsetMax);
			//make the offset effect the angle used to calculate the height
			var a = angle + offset;
			//calc height with sin, and then map to a larger scale
			var height = Math.floor(scale(Math.sin(a), -1, 1, 1, 150));
			//divide by const for fluid movement, reemoving this will make the animation choppy ( and break)
			height /= 25;
			//chagne box y scale based on calced values
			boxesCOL[i][j].scale.y = 3 + height;
		
		}

	}
	//constanly change angle to keep moving through sin
	angle -= speed;
	
	renderer.render( scene, camera );
};

animate();

//maps a range of numbers to another
function scale(input, in_min, in_max, out_min, out_max){
  return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}