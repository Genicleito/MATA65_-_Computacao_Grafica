function init() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	
	var camera = new THREE.Camera();

	var sol = new THREE.Geometry();
	var terra = new THREE.Geometry();
	var outroPlaneta = new THREE.Geometry();

	//sol.vertices.push(	new THREE.Vector3( 3.0,  2.0, 0.0)	);
	// terra.vertices.push(	new THREE.Vector3(6.0, 6.0, 0.0)	);
	// outroPlaneta.vertices.push(	new THREE.Vector3(9.0, 7.0, 0.0)	);

	var coorXSol = 0.0;
	var coorYSol = 0.0;

	var coorXTerra = 1.0;
	var coorYTerra = 0.5;

	var coorXOutro = 0.0;
	var coorYOutro = 1.2;

	var geometria = new THREE.Geometry();
	geometria.vertices.push(new THREE.Vector3(coorXTerra, coorYTerra, 0.0),
							new THREE.Vector3(coorXOutro, coorYOutro, 0.0)
							);

	sol.vertices.push(	new THREE.Vector3( coorXSol,  coorYSol, 0.0)	);

	// As variáveis de X e Y vão ser dinamicas
	var raioTerra = Math.sqrt((coorXTerra - coorXSol) * (coorXTerra - coorXSol) + (coorYTerra - coorYSol) * (coorYTerra - coorYSol));
	console.log("raio da terra ", raioTerra);
	var raioOutro = Math.sqrt((coorXOutro - coorXSol) * (coorXOutro - coorXSol) + (coorYOutro - coorYSol) * (coorYOutro - coorYSol));
	console.log("raio da terra ", raioOutro);

	//	Mudar depois
	var camera = new THREE.OrthographicCamera( -4, 4, 4, -4, -4, 4 );
	scene.add( camera );

	// Supor Velocidade = 0.3 e 0.1
	//geometria2 = new THREE.Geometry();
//var geo = new THREE.Geometry();




	for(var i = 1; i < (2 * Math.PI) * 10.4; i++){
		var geometria2 = new THREE.Geometry();
		geometria2.vertices.push(new THREE.Vector3(Math.cos(0.8 * i) * raioTerra + coorXSol, (Math.sin(0.8 * i) * raioTerra + coorYSol) * 2, 0.0),
								new THREE.Vector3(Math.cos(0.1 * i) * raioOutro + coorXSol, (Math.sin(0.1 * i) * raioOutro + coorYSol) * 2, 0.0)
								);
		var line2 = new THREE.Line( geometria2);
		scene.add( line2 );
	}
			

		
//geo.vertices.push(new THREE.Vector3(Math.cos(0.3 * i) * raioTerra + 6.0, Math.sin(0.3 * i) * raioTerra + 4.0, 0.0),
//					new THREE.Vector3( 6.0,  4.0, 0.0)	)
//var hue = new THREE.Line( geo );
//scene.add( hue );

	// 	setTimeout(function(){
	// 		var line2 = new THREE.Line( geometria2 );
	// 		scene.add( line2 );
			
	// 		setTimeout(function(){},500)

		
	// 		renderer.render(scene, camera);

	// 	}, 500);

		
	// }

/*	var geometria2 = new THREE.Geometry();
	geometria2.vertices.push(new THREE.Vector3(Math.cos(5 * 2) * raioTerra + 6.0, Math.sin(5 * 2) * raioTerra + 4.0, 0.0),
							new THREE.Vector3(Math.cos(5 * 2) * raioOutro + 6.0, Math.sin(5 * 2) * raioOutro + 4.0, 0.0)
							);

	var line2 = new THREE.Line( geometria2 );
	scene.add( line2 );*/

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	

	renderer.clear();
	renderer.render(scene, camera);
};

