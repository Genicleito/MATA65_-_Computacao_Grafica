var coorXSol = 0.0;
var coorYSol = 0.0;

var coorXTerra = 1.0;
var coorYTerra = 0.5;

var coorXOutro = 0.0;
var coorYOutro = 1.2;

var velocidadeTerra = 0.8;
var velocidadeOutro = 0.1;

var numOrbitas = 1;

var renderer = new THREE.WebGLRenderer();

function init() {

	var scene = new THREE.Scene();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	
	var camera = new THREE.Camera();

	var sol = new THREE.Geometry();
	var terra = new THREE.Geometry();
	var outroPlaneta = new THREE.Geometry();

	//sol.vertices.push( new THREE.Vector3( 3.0,  2.0, 0.0) );
	// terra.vertices.push(	new THREE.Vector3(6.0, 6.0, 0.0) );
	// outroPlaneta.vertices.push( new THREE.Vector3(9.0, 7.0, 0.0) );

	lerValores();

	// As variáveis de X e Y vão ser dinamicas
	var raioTerra = Math.sqrt((coorXTerra - coorXSol) * (coorXTerra - coorXSol) + (coorYTerra - coorYSol) * (coorYTerra - coorYSol));
	console.log("raio da terra ", raioTerra);
	var raioOutro = Math.sqrt((coorXOutro - coorXSol) * (coorXOutro - coorXSol) + (coorYOutro - coorYSol) * (coorYOutro - coorYSol));
	console.log("raio do outro Planeta ", raioOutro);

console.log("============> ", coorXTerra);

	sol.vertices.push( new THREE.Vector3( coorXSol,  coorYSol, 0.0) );

	//	Mudar depois
	var camera = new THREE.OrthographicCamera( -4, 4, 4, -4, -4, 4 );
	scene.add( camera );
	
	//	=========================== log =====================================
	console.log("Comprimento da Terra: ", (2 * Math.PI) * raioTerra);
	console.log("Comprimento do Outro: ", (2 * Math.PI) * raioOutro);
	console.log("Velocidade da Terra: ", velocidadeTerra);
	console.log("Velocidade do Outro Planeta: ", velocidadeOutro);
	//	=========================== log =====================================

	var menorVelocidade, raioMenorVelocidade;

	if(velocidadeOutro < velocidadeTerra){
		menorVelocidade = velocidadeOutro;
		raioMenorVelocidade = raioOutro;
	}else{
		menorVelocidade = velocidadeTerra;
		raioMenorVelocidade = raioTerra;
	}
console.log("Numero de orbitas: ", numOrbitas);
console.log("Menor velocidade: ", menorVelocidade);
console.log("Raio de menor velocidade: ", raioMenorVelocidade);
console.log("Comprimento: ", (2 * Math.PI * raioMenorVelocidade) * numOrbitas);

	for(var i = 0; menorVelocidade * i < ((2 * Math.PI * raioMenorVelocidade) * numOrbitas); i++){
		var geometria = new THREE.Geometry();

		geometria.vertices.push(new THREE.Vector3(Math.cos(velocidadeTerra * i) * raioTerra + coorXSol, (Math.sin(velocidadeTerra * i) * raioTerra + coorYSol) * 2, 0.0),
								new THREE.Vector3(Math.cos(velocidadeOutro * i) * raioOutro + coorXSol, (Math.sin(velocidadeOutro * i) * raioOutro + coorYSol) * 2, 0.0)
								);

		geometria.colors[0] = new THREE.Color(Math.random(), Math.random(), Math.random());
		geometria.colors[1] = new THREE.Color(Math.random(), Math.random(), Math.random());

		var material = new THREE.LineBasicMaterial( {
		    //linewidth: 10,
		    //color: 0xffffff,
		    vertexColors: THREE.VertexColors
		} );

		var linha = new THREE.Line( geometria, material );
		scene.add( linha );
	}

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	renderer.clear();
	renderer.render(scene, camera);
};

function lerValores() {
	
	var x = document.getElementById("form");
	var text = "";
	var i, validar = 1;
	for (i = 0; i < x.length; i++) {
	    text += x.elements[i].value + "<br>";
	    if(x.elements[i].value == "")
	    	validar = 0;
	}

	if(validar){
		//console.log(x.length, " campos");
		coorXSol = parseFloat(x.elements[0].value);
		coorYSol = parseFloat(x.elements[1].value);

		numOrbitas = parseFloat(x.elements[2].value);

		coorXTerra = parseFloat(x.elements[3].value);
		coorYTerra = parseFloat(x.elements[4].value);

		velocidadeTerra = parseFloat(x.elements[5].value);
		console.log("Velocidade da terra---> ", parseFloat(x.elements[5].value));
		console.log("Coord Terra ==> ", parseFloat(x.elements[3].value));

		coorXOutro = parseFloat(x.elements[6].value);
		coorYOutro = parseFloat(x.elements[7].value);
		
		velocidadeOutro = parseFloat(x.elements[8].value);

	}else{
		console.log("Esqueceu algum valor?");
	}
}