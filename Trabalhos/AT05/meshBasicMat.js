var scene 			= null;
var renderer		= null;
var camera 			= null;
var orbitControls	= null;
var day 			= 0.0;
var year			= 0.0;
var month			= 0.0;
var clock;

function init() {

	clock = new THREE.Clock();
	
	scene = new THREE.Scene();

	loadMesh();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(60.0, 1.0, 0.1, 30.0);
	
	// Controle de Camera Orbital
	orbitControls = new THREE.OrbitControls(camera);
	orbitControls.autoRotate = true;
		
	renderer.clear();
}

function loadMesh() {

	// Load Mesh
	var loader = new THREE.OBJLoader();
	//loader.load('../../Assets/Models/bunny.obj', buildScene);		
}

function render() {
	var delta = clock.getDelta();
    orbitControls.update(delta);

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function buildScene(loadedMesh) {

	var material 		= new THREE.MeshBasicMaterial();
	material.color 		= new THREE.Color(1.0, 1.0, 1.0);

	loadedMesh.traverse(function (child) {	
		if (child instanceof THREE.Mesh) {
			child.material = material;
			if ( (child.geometry.attributes.normal != undefined) ) {
				child.geometry.computeFaceNormals();
				child.geometry.computeVertexNormals();
				child.geometry.normalsNeedUpdate = true;
				}
			}
		});

	scene.add(loadedMesh);

	// Bounding Box	
	var box = new THREE.Box3();
	box.setFromObject(loadedMesh);	
	// Adjust Camera Position and LookAt	
	var maxCoord = Math.max(box.max.x,box.max.y,box.max.z);
	
	camera.position.x 	= 
	camera.position.y 	= 
	camera.position.z 	= maxCoord*1.5;
	camera.far 			= new THREE.Vector3(	maxCoord*5, 
												maxCoord*5, 
												maxCoord*5).length();

	camera.lookAt(new THREE.Vector3(	(box.max.x + box.min.x)/2.0,
										(box.max.y + box.min.y)/2.0,
										(box.max.z + box.min.z)/2.0));
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxisHelper(maxCoord*1.3);
	scene.add( globalAxis );
	
	// Ground
	var groundGeom = new THREE.PlaneBufferGeometry(maxCoord*200.0, maxCoord*200.0, 50, 50);

	var materialG 		= new THREE.MeshBasicMaterial({color: 0x0000ff});
	var groundMesh = new THREE.Mesh(groundGeom, materialG);
	groundMesh.material.side 	= THREE.DoubleSide;
	groundMesh.material.shading	= THREE.SmoothShading;
	groundMesh.rotation.x = -Math.PI / 2;
	groundMesh.position.y = box.min.y*2.0;
	scene.add(groundMesh);
	
	render();
}

