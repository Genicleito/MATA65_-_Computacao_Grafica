
    // once everything is loaded, we run our Three.js stuff.
    function init() {

        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);

        var torus = createMesh(new THREE.TorusGeometry(20, 5, 8, 6, Math.PI * 2));
        // add the sphere to the scene
        scene.add(torus);

        // position and point the camera to the center of the scene
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 50;
        camera.lookAt(new THREE.Vector3(10, 0, 0));

        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

       	/* Ajuda Bastante a visualizar o eixo X e Y */
		var help = new THREE.AxisHelper(25);
		scene.add(help);

        // call the render function
        var i = 0;


        // setup the control gui
        var controls = new function () {
            // we need the first child, since it's a multimaterial

            this.raio = torus.children[0].geometry.parameters.radius;
            this.tubo = torus.children[0].geometry.parameters.tube;
            this.segmentosRadiais = torus.children[0].geometry.parameters.radialSegments;
            this.segmentosTubulares = torus.children[0].geometry.parameters.tubularSegments;
            this.arco = torus.children[0].geometry.parameters.arc;

            this.redraw = function () {
                // remove the old plane
                scene.remove(torus);
                // create a new one

                torus = createMesh(new THREE.TorusGeometry(controls.raio, controls.tubo, Math.round(controls.segmentosRadiais), Math.round(controls.segmentosTubulares), controls.arco));
                // add it to the scene.
                scene.add(torus);
            };
        };

        var painel = new dat.GUI();
        painel.add(controls, 'raio', 1, 40).onChange(controls.redraw);
        painel.add(controls, 'tubo', 1, 40).onChange(controls.redraw);
        painel.add(controls, 'segmentosRadiais', 3, 100).onChange(controls.redraw);
        painel.add(controls, 'segmentosTubulares', 2.6, 20).onChange(controls.redraw);
        //painel.add(controls, 'arco', 0, Math.PI * 2).onChange(controls.redraw);


        render();

        function createMesh(geom) {

            // assign two materials
            var meshMaterial = new THREE.MeshNormalMaterial();
            meshMaterial.side = THREE.DoubleSide;
            var wireFrameMat = new THREE.MeshBasicMaterial();
            wireFrameMat.wireframe = true;

            // create a multimaterial
            var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

            return mesh;
        }

        function render() {
            //stats.update();

            torus.rotation.y = i += 0.01;
            //torus.rotation.x = i += 0.0001;
            torus.rotation.z = i += 0.0001;

            // render using requestAnimationFrame
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        }

        //function initStats() {

            //var stats = new Stats();
            //stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            //stats.domElement.style.position = 'absolute';
            //stats.domElement.style.left = '0px';
            //stats.domElement.style.top = '0px';

            //document.getElementById("Stats-output").appendChild(stats.domElement);

            //return stats;
        //}
    }
    window.onload = init;