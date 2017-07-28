var scene 			= null;
var renderer		= null;
var camera 			= null;
var DirectionalLight		= null;
var orbitControls	= null;
var clock;

function init() {

	clock = new THREE.Clock();
	
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(1.0, 1.0, 1.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(60.0, 1.0, 0.1, 100.0);
	
	orbitControls = new THREE.OrbitControls(camera);
	orbitControls.autoRotate = false;

	var ambientLight = new THREE.AmbientLight(new THREE.Color(1.0, 1.0, 1.0));
	scene.add(ambientLight);

	loadMeshes();
		
	renderer.clear();
}

function loadMeshes() {
<<<<<<< HEAD
	var loader = new THREE.OBJLoader();
	buildScene();
=======
	// Load Mesh
	var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/bunny.obj', buildScene);		
>>>>>>> a4eec7c57b6edb08cb6993db0642790315220dac
}

function render() {
	var delta = clock.getDelta();
    orbitControls.update(delta);

    uniforms.contAnimation.value += 0.7;

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

<<<<<<< HEAD
function buildScene() {  

	var coordX = 250.0, coordY = 248.0, coordZ = 194.0;	
	var maxCoord = Math.max(coordX, coordY, coordZ);
=======
function buildScene(loadedMesh) {  
	/* max.x: 250 max.y 247.5642547607422 max.z 193.65597534179688 min.x: -250 min.y -247.5642547607422 min.z -193.65597534179688 */
	// Bounding Box	
	var box = new THREE.Box3();
	box.setFromObject(loadedMesh);	
	console.log("max.x: " + box.max.x + " max.y " + box.max.y + " max.z " + box.max.z + " min.x: " + box.min.x + " min.y " + box.min.y + " min.z " + box.min.z);
	// Adjust Camera Position and LookAt	
	var maxCoord = Math.max(box.max.x,box.max.y,box.max.z);
>>>>>>> a4eec7c57b6edb08cb6993db0642790315220dac
	
	camera.position.x 	= 
	camera.position.y 	= 
	camera.position.z 	= maxCoord*1.5;
	camera.far 			= new THREE.Vector3(	maxCoord*5, 
												maxCoord*5, 
												maxCoord*5).length();

	camera.lookAt(new THREE.Vector3( 0.0, 0.0, 0.0) );
	camera.updateProjectionMatrix();
/*	
	var globalAxis = new THREE.AxisHelper(maxCoord*1.3);
	scene.add( globalAxis );
*/
	DirectionalLight = new THREE.DirectionalLight(new THREE.Color(1.0, 1.0, 1.0));
	DirectionalLight.distance = 0.0;
	DirectionalLight.position.set(coordX * (-10.0), coordY * 10.0, 0.0);
	scene.add(DirectionalLight);
	
	var i = 0.0;

	uniforms = {
		uCamPos	: 	{ type: "v3", value:camera.position},
		uLPos	:	{ type: "v3", value:DirectionalLight.position},
		contAnimation    :   { type: "f", value: i }
		};

	var planGeo = new THREE.PlaneGeometry(maxCoord * 3, maxCoord * 3, 300, 300);
	planGeo.computeFaceNormals();
	planGeo.computeVertexNormals();
	planGeo.normalsNeedUpdate = true;
	planGeo.rotateX(-Math.PI / 2.0);

	var matPlan = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: document.getElementById( 'phong-vs' ).textContent,
		fragmentShader: document.getElementById( 'phong-fs' ).textContent,
		side: THREE.DoubleSide,
		shading: THREE.FlatShading
	} );

	var groundMesh = new THREE.Mesh(planGeo, matPlan);
	scene.add(groundMesh);

	render();
}
