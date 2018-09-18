var renderer;
var scene;
var camera;
var composer;
var texture;
var shaderPass;
var parameters;

var gui = new dat.GUI();

function init() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	buildGUI();

	camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	var textureLoader = new THREE.TextureLoader();
	texture = textureLoader.load("../../Assets/Images/lena.png", onLoadTexture);
/*
	texture.repeat.x = 100 / 512;
	texture.repeat.y = 100 / 512;
	texture.offset.x = ( 500 / 100 ) * texture.repeat.x;
	texture.offset.y = ( 700 / 100 ) * texture.repeat.y;
*/
	var txtMaterial = new THREE.MeshBasicMaterial( { 
					map : texture
					} );

	// Plane
	var planeGeometry 	= new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);                 
	var plane = new THREE.Mesh( planeGeometry, txtMaterial );
	plane.position.set(0.0, 0.0, -0.5);
	scene.add( plane );	
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	renderer.clear();
    requestAnimationFrame( animate );
};

function onLoadTexture() {

	if (!texture.image) 
		console.log("ERROR: loading texture");
	else {

		console.log("Image size: " + texture.image.width + " x " + texture.image.height);
		console.log("Pixel size: " + 1.0/texture.image.width + " x " + 1.0/texture.image.height);

		renderer.setSize(texture.image.width, texture.image.height);
	
		THREE.rgbShader = {	
			uniforms: {
				tDiffuse: 	{ type: "t", value:null },
				uChannel: 	{ type: "v3", value: new THREE.Vector3(1.0, 0.0, 0.0) }
				},
			vertexShader: 	document.getElementById( 'rgb-vs' ).textContent,
			fragmentShader:	document.getElementById( 'rgb-fs' ).textContent 
			};		

		composer = new THREE.EffectComposer(renderer);
		
		// Cria os passos de renderizacao
		var renderPass 	= new THREE.RenderPass(scene, camera);
		
		shaderPass 		= new THREE.ShaderPass(THREE.rgbShader);
		shaderPass.renderToScreen = true;

		composer.addPass(renderPass);
		composer.addPass(shaderPass);
		composer.render();
		}
};

function buildGUI() {

	parameters = {
		bRFilter	: true,
		bGFilter	: true,
		bBFilter	: true
		};

	gui.add( parameters, 'bRFilter' );
	gui.add( parameters, 'bGFilter' );
	gui.add( parameters, 'bBFilter' );

	gui.open();

};

function animate() {
	update();
	render();		
    requestAnimationFrame( animate );
};

function update() {

	var r=0.0,
		g=0.0,
		b=0.0;

	if (shaderPass != null) {
		if (parameters.bRFilter == true)
			r = 1.0;

		if (parameters.bGFilter == true)
			g = 1.0;

		if (parameters.bBFilter == true)
			b = 1.0;

		shaderPass.uniforms["uChannel"].value = new THREE.Vector3(r, g, b);
		}	

};

function render() {

	if(composer)	
		composer.render();

};
