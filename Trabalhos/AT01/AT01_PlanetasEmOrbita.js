var coorXSol = 0.0;
var coorYSol = 0.0;

//var coorXTerra = 8.0;
//var coorYTerra = 0.0;

//var coorXOutro = 15.0;
//var coorYOutro = 0.0;

var raioP1 = 8;
var raioP2 = 15;

var velocidadeP1 = 4;
var velocidadeP2 = 1;

var numOrbitas = 6;

var renderer = new THREE.WebGLRenderer();

function init() {

	var scene = new THREE.Scene();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	//var camera = new THREE.Camera();

	//var sol = new THREE.Geometry();
	var terra = new THREE.Geometry();
	var outroPlaneta = new THREE.Geometry();

	//sol.vertices.push( new THREE.Vector3( 3.0,  2.0, 0.0) );
	// terra.vertices.push(	new THREE.Vector3(6.0, 6.0, 0.0) );
	// outroPlaneta.vertices.push( new THREE.Vector3(9.0, 7.0, 0.0) );

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.set(0, 0, 55);
	camera.lookAt(scene.position);
	scene.add( camera );

	lerValores();

	//var raioP1   = Math.sqrt(((coorXTerra - coorXSol) * (coorXTerra - coorXSol)) + ((coorYTerra - coorYSol) * (coorYTerra - coorYSol)));
	//console.log("raio da terra ", raioP1 ) ;
	//var raioP2 = Math.sqrt(((coorXOutro - coorXSol) * (coorXOutro - coorXSol)) + ((coorYOutro - coorYSol) * (coorYOutro - coorYSol)));
	//console.log("raio do outro Planeta ", raioP2);

	var distanciaEntrePlanetas = raioP1 - raioP2;

	if(distanciaEntrePlanetas < 0)
		distanciaEntrePlanetas *= -1;

	/* Ajuda Bastante a visualizar o eixo X e Y */
	//var help = new THREE.AxisHelper(25);
	//scene.add(help);

	var geometriaSol = new THREE.CircleGeometry( (raioP1   * 0.1) + (raioP2 * 0.1), 64, 0, Math.PI * 2 );
	var materialSol = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
	var circuloSol = new THREE.Mesh( geometriaSol, materialSol );

	circuloSol.position.set(coorXSol, coorYSol, 0.5);
	scene.add(circuloSol);

	var geometriaTerra = new THREE.CircleGeometry( 0.1 * raioP1 ,  64, 0, Math.PI * 2 );
	var materialTerra = new THREE.MeshBasicMaterial( { color: 0x0066ff } );
	var circuloTerra = new THREE.Mesh( geometriaTerra, materialTerra );

	var geometriaOutro = new THREE.CircleGeometry( 0.1 * raioP2, 64, 0, Math.PI * 2 );
	var materialOutro = new THREE.MeshBasicMaterial( { color: 0x993333 } );
	var circuloOutro = new THREE.Mesh( geometriaOutro, materialOutro );
	

	//	Mudar depois
	//var camera = new THREE.OrthographicCamera( -4, 4, 4, -4, -4, 4 );
	//scene.add( camera );

	var menorVelocidade, raioMenorVelocidade;
	var raioBorda, raioInterno;

	if(raioP1 >= raioP2){
		raioBorda = raioP1 ; 
		raioInterno = raioP2;
		velocidadeExterna = velocidadeP1;
		velocidadeInterna = velocidadeP2;
	}else{
		raioBorda = raioP2;
		raioInterno = raioP1 ; 
		velocidadeExterna = velocidadeP2;
		velocidadeInterna = velocidadeP1;
	}

	if(velocidadeP2 < velocidadeP1){
		menorVelocidade = velocidadeP2;
		raioMenorVelocidade = raioP2;
	}else{
		menorVelocidade = velocidadeP1;
		raioMenorVelocidade = raioP1 ; 
	}

	var i = 0;

	function render(){
		if(menorVelocidade * i < ((2 * Math.PI * raioMenorVelocidade) * numOrbitas)){
				var geometria = new THREE.Geometry();
		
				var X1 = Math.cos((velocidadeExterna * i)/raioBorda) * raioBorda + coorXSol;
				var Y1 = ((Math.sin((velocidadeExterna * i)/raioBorda) * raioBorda) * -1 + coorYSol);

				var X2 = Math.cos((velocidadeInterna * i)/(raioBorda - distanciaEntrePlanetas)) * (raioBorda - distanciaEntrePlanetas) + coorXSol;
				var Y2 = ((Math.sin((velocidadeInterna * i)/(raioBorda - distanciaEntrePlanetas)) * (raioBorda - distanciaEntrePlanetas)) * -1 + coorYSol);

				geometria.vertices.push(new THREE.Vector3(X1, Y1, 0.0),
										new THREE.Vector3(X2, Y2, 0.0)
										);

				if(raioP1 > raioP2){
					circuloTerra.position.set(X1, Y1, 0.1);
					scene.add(circuloTerra);

					circuloOutro.position.set(X2, Y2, 0.1);
					scene.add(circuloOutro);
				}else{
					circuloOutro.position.set(X1, Y1, 0.1);
					scene.add(circuloTerra);

					circuloTerra.position.set(X2, Y2, 0.1);
					scene.add(circuloOutro);
				}
		
				geometria.colors[0] = new THREE.Color(Math.random(), Math.random(), Math.random());
				geometria.colors[1] = new THREE.Color(Math.random(), Math.random(), Math.random());
		
				var material = new THREE.LineBasicMaterial( {
				    vertexColors: THREE.VertexColors
				} );
		
				var linha = new THREE.Line( geometria, material );
				scene.add( linha );
		
				renderer.clear();
				renderer.render(scene, camera);
		}
		i++;
		requestAnimationFrame(render);
		
	}
	render();
};


function lerValores() {
	
	var x = document.getElementById("form");
	var text = "";
	var i, validar = 1;
	for (i = 0; i < x.length; i++) {
	    if(x.elements[i].value == "")
	    	validar = 0;
	}


	if(validar){
		coorXSol = parseFloat(x.elements[0].value);
		coorYSol = parseFloat(x.elements[1].value);

		numOrbitas = parseFloat(x.elements[2].value);

		raioP1 = parseFloat(x.elements[3].value);
		velocidadeP1 = parseFloat(x.elements[4].value);

		raioP2 = parseFloat(x.elements[5].value);
		velocidadeP2 = parseFloat(x.elements[6].value);

	}else{
		console.log("Esqueceu algum valor?");
	}
}