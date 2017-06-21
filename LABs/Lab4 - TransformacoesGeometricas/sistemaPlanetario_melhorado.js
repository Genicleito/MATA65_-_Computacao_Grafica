var scene 		= null;
var renderer	= null;
var camera 		= null;
var earth 		= null;
var sun 		= null;
var day 		= 0.0;
var year		= 0.0;
var month		= 0.0;
var groupSun 	= null;

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );
	
	groupSun = new THREE.Object3D();

	var groupSunAxis = new THREE.AxisHelper( 1.6 );
	groupSun.add( groupSunAxis );

	// Eixo do Sol
	var sAxis = new THREE.AxisHelper(0.6);

	// Sol
	var sphereGeometry = new THREE.SphereGeometry( 0.4, 20, 20);                 
	var sphereMat = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} );
	sun = new THREE.Mesh( sphereGeometry, sphereMat );
	//sun.add(sAxis);
	//scene.add(sun);
	groupSun.add(sun);
	
	// Eixo da Terra
	var tAxis = new THREE.AxisHelper(0.15);

	// Terra
	
	sphereGeometry = new THREE.SphereGeometry( 0.1, 20, 20);                 
	sphereMat = new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe:false} );
	earth = new THREE.Mesh( sphereGeometry, sphereMat );
	earth.position.set(0.7, 0, 0);

	earth.add(tAxis);
	//scene.add( earth );	

	//var groupEarth = new THREE.Object3D();
	//var groupEarthAxis = new THREE.AxisHelper( 1.3 );
	//groupEarth.add( groupSunAxis );

	groupSun.add(earth);

	scene.add(groupSun);
		
	// Eixo da Lua
	var lAxis = new THREE.AxisHelper(0.04);

	// Lua
	
	sphereGeometry = new THREE.SphereGeometry( 0.03, 10, 10 );                 
	sphereMat = new THREE.MeshBasicMaterial( {color: 0xaaaaaa, wireframe:true} );
	moon = new THREE.Mesh( sphereGeometry, sphereMat );
	moon.add(lAxis);
	scene.add( moon );	
		
	renderer.clear();
	render();
};

function render() {
	var m = new THREE.Matrix4();
	
	day 	+= 0.07;
	year 	+= 0.01;
	month 	+= 0.04;

//groupSun.rotateOnAxis(new THREE.Vector3(0.0, 1.0, 0.0).normalize(), day);
m.identity();
groupSun.matrix.copy(m);
m.makeRotationY(year);
groupSun.applyMatrix(m);
groupSun.updateMatrix();

earth.rotateOnAxis(new THREE.Vector3(1.0, 1.0, 1.0).normalize(), 90); 
	// m.identity();
	// sun.matrix.copy(m);
	// m.makeRotationY(year);
	// sun.applyMatrix(m);
	// sun.updateMatrix();

	renderer.render(scene, camera);
	
	requestAnimationFrame(render);
}

