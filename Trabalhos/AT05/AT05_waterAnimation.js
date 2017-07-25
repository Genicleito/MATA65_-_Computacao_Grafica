var scene 			= null;
var renderer		= null;
var camera 			= null;
var pointLight		= null;
var orbitControls	= null;
var clock;

function init() {

	clock = new THREE.Clock();
	
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(60.0, 1.0, 0.1, 100.0);
	
	// Controle de Camera Orbital
	orbitControls = new THREE.OrbitControls(camera);
	orbitControls.autoRotate = false;

	// Adiciona luz ambiente
	var ambientLight = new THREE.AmbientLight(new THREE.Color(1.0, 1.0, 1.0));
	scene.add(ambientLight);

	loadMeshes();
		
	renderer.clear();
}

function loadMeshes() {
	// Load Mesh
	 var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/bunny.obj', buildScene);		
}

function render() {
	var delta = clock.getDelta();
    orbitControls.update(delta);

    uniforms.t.value += 0.7;

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function buildScene(loadedMesh) {  

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

	//Add point light Source
	pointLight = new THREE.PointLight(new THREE.Color(1.0, 1.0, 1.0));
	pointLight.distance = 0.0;
	pointLight.position.set(box.max.x*10.0, box.max.y*10.0, box.max.z*10.0);
	scene.add(pointLight);
	
	var i = 0.0;

	uniforms = {
		uCamPos	: 	{ type: "v3", value:camera.position},
		uLPos	:	{ type: "v3", value:pointLight.position},
		t    :   { type: "f", value: i }
		//texture: { type: "t", value: THREE.ImageUtils.loadTexture('./box.png') }
		};
	
	var matShader = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: document.getElementById( 'phong-vs' ).textContent,
			fragmentShader: document.getElementById( 'phong-fs' ).textContent
			} );
	
/*	
	loadedMesh.traverse(function (child) {	
		if (child instanceof THREE.Mesh) {
			child.material = matShader;
			if ( (child.geometry.attributes.normal != undefined) ) {
				child.geometry.computeFaceNormals();
				child.geometry.computeVertexNormals();
				child.geometry.normalsNeedUpdate = true;
				}
			}
		});
	
	scene.add(loadedMesh);
*/
	// Ground
	//var groundGeom = new THREE.PlaneBufferGeometry(maxCoord*25, maxCoord*25, 50, 50);
	var groundGeom = new THREE.PlaneGeometry(maxCoord * 3, maxCoord * 3, 300, 300);
	groundGeom.computeFaceNormals();
	groundGeom.computeVertexNormals();
	groundGeom.normalsNeedUpdate = true;
	groundGeom.rotateX(-Math.PI / 2.0);

	var matGround = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: document.getElementById( 'phong-vs' ).textContent,
		fragmentShader: document.getElementById( 'phong-fs' ).textContent,
		side: THREE.DoubleSide,
		shading: THREE.FlatShading
	} );

	var groundMesh = new THREE.Mesh(groundGeom, matGround);
	scene.add(groundMesh);

/*	
	var groundMesh = new THREE.Mesh(groundGeom, new THREE.MeshBasicMaterial({color: 0x550055}));
	groundMesh.material.side 	= THREE.DoubleSide;
	groundMesh.material.shading	= THREE.FlatShading;
	groundMesh.rotation.x = -Math.PI / 2;
	groundMesh.position.y = 5;//box.min.y*2.0;
	scene.add(groundMesh);
*/
	render();
}
