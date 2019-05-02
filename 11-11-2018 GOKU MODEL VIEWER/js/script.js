//creating the new scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
//creating the canera, add it to scene
var camera = new THREE.PerspectiveCamera(75,(window.innerWidth-30)/(window.innerHeight-30), 0.1, 1000 );
//orbit.js camera controls
var controls = new THREE.OrbitControls( camera );
camera.position.set( 0, 10, 50 );
controls.update();

//create some light
var ambient = new THREE.AmbientLight(0xf0ffff, 1.0);
scene.add(ambient);

//add the renderer to dom
var renderer = new THREE.WebGLRenderer();
renderer.setSize( (window.innerWidth-30), (window.innerHeight-30) );
document.body.appendChild( renderer.domElement );

//keeps track of current mesh
var currentMesh;

// instantiate a loader
var objLoader = new THREE.OBJLoader();
var mtlLoader = new THREE.MTLLoader();
//load mtl
mtlLoader.load("models/Goku/Goku.mtl", function (materials) {

    materials.preload();

    //load the base model for GOKU
    objLoader.setMaterials(materials);
	objLoader.load("models/Goku/Goku.obj", function ( obj ) {
		// Add the loaded object to the scene
		currentMesh = obj;
		obj.position.set(0,0,0);
		console.log(obj);
		scene.add( obj );
	});

});

//animation function
var animate = function () {

	requestAnimationFrame( animate );
	currentMesh.rotateY(.01);
	controls.update();
	renderer.render( scene, camera );

};

animate();
