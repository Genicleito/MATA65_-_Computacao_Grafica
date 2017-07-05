// A super ellipse
var controls, scene, camera, box, spline, counter = 0;
var orbitControls = null;

var tangent = new THREE.Vector3();
var axis = new THREE.Vector3();
var up = new THREE.Vector3( 1, 0, 0 );
//var uslice = 20;
//var vslice = 20;
var sg1, sg2, sg3, sg4, sg5, sg6;
// parameter for the super ellipse these give  Piet Hein's superegg.
//var r = 10, t = 2.5;
var A = B = 1.5, C = 2;

var count = 0;

var DTOR = 0.01745329252;

var groupTorus = null;
var groupEllipsoid = null;

var superTorusTriangleMesh1 = null;
var superTorusTriangleMesh2 = null;
var superTorusTriangleMesh3 = null;

var superEllipsoidTriangleMesh1 = null;
var superEllipsoidTriangleMesh2 = null;
var superEllipsoidTriangleMesh3 = null;

var n1_superTorus = 0.2, n2_superTorus = 0.2;
var n1_superEllipse = 3, n2_superEllipse = 2;

var tipoCamera = null;
renderer = new THREE.WebGLRenderer();

function init() {
    
    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    //document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera( 45.0, window.innerWidth/window.innerHeight, 0.1, 1000.0 );
    camera2 = new THREE.PerspectiveCamera( 45.0, window.innerWidth/window.innerHeight, 0.1, 1000.0 );
    //camera.position.set(10, 10, 10);
    camera.position.set(0, 0, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera2.lookAt(new THREE.Vector3(0, 0, -10));
    
    scene = new THREE.Scene();
    //controls = new THREE.TrackballControls(camera, render.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autorotate = true;
    //clock = new THREE.Clock();

    var x = document.getElementById("form");
    if(x.elements[0].value != ""){
         tipoCamera = parseInt(x.elements[0].value);
         console.log("tipo da camera lido: " + tipoCamera);
    }else{
        console.log("Não apague o valor da câmera, por favor! :)");
    }

    var material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide, vertexColors:THREE.VertexColors } ) ;

/*    var wirematerial = new THREE.MeshBasicMaterial( { 
        color: 0x666666, wireframe: true, polygonOffset: true,     
        polygonOffsetFactor: 1.0, polygonOffsetUnits: 1.0 } ) ;
 */   
    scene.add( new THREE.AxisHelper( 10 ) );

    groupTorus = new THREE.Object3D();
    groupEllipsoid = new THREE.Object3D();

    var groupTorusAxis = new THREE.AxisHelper( 1.6 );
    //groupTorus.add( groupTorusAxis );
    //groupTorus.position.set(20, 0, 0);

    var ellipsoidAxis = new THREE.AxisHelper( 2.5 );
    //groupEllipsoid.add( groupEllipsoidAxis );

    //  Primeiro SuperTorus
    superTorusTriangleMesh1 = superTorus(n1_superTorus, n2_superTorus, 0xff0000);
    //scene.add( superTorusTriangleMesh );
    groupTorus.add(superTorusTriangleMesh1);

    //  Segundo SuperTorus
    superTorusTriangleMesh2 = superTorus(1, 3, 0x00ff00);
    superTorusTriangleMesh2.position.set(3, 0, 0);
    groupTorus.add(superTorusTriangleMesh2);

    //  Terceiro SuperTorus
    superTorusTriangleMesh3 = superTorus(3, 0.2, 0x0000ff);
    superTorusTriangleMesh3.position.set(5, 1.8, 0);
    groupTorus.add(superTorusTriangleMesh3);

    //groupTorus.position.set(10, 0, 0);
    var m = new THREE.Matrix4();
/*
    m.identity();
    groupTorus.matrix.copy(m);
    m.makeTranslation(10, 0, 0);
    groupTorus.applyMatrix(m);
    groupTorus.updateMatrix();
*/
    scene.add( groupTorus );

    superEllipsoidTriangleMesh1 = superEllipsoid(n1_superEllipse, n2_superEllipse, 0xffffff);
    //scene.add( superEllipsoidTriangleMesh1 )
    superEllipsoidTriangleMesh1.position.set(6, 5, 3);
    //superEllipsoidTriangleMesh1.add(ellipsoidAxis);

    groupEllipsoid.add( superEllipsoidTriangleMesh1 );

    superEllipsoidTriangleMesh2 = superEllipsoid(0.8, 3, 0x00ffff);
    //scene.add( superEllipsoidTriangleMesh2 )
    superEllipsoidTriangleMesh2.position.set(0, 5, 0);
    //superEllipsoidTriangleMesh2.add(ellipsoidAxis);

    groupEllipsoid.add( superEllipsoidTriangleMesh2 );

    superEllipsoidTriangleMesh3 = superEllipsoid(2, 0.2, 0xff00ff);
    //scene.add( superEllipsoidTriangleMesh3 )
    superEllipsoidTriangleMesh3.position.set(0, -2, 4);
    //superEllipsoidTriangleMesh3.add(ellipsoidAxis);

    groupEllipsoid.add( superEllipsoidTriangleMesh3 );

    //Adicionar daqui a pouco
    scene.add(groupEllipsoid);

    //animate();
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    renderer.clear();
    render();
}

var direcao = 0;
var velX = 0;
var velY = 0;
var velZ = 0;

var direcaoEllipse = 0;
var velXEllipse = 0;
var velYEllipse = 0;
var velZEllipse = 0;
var velocidadeEllipse = 0;

var anguloCam2 = 0.02;
var retornar = true;

var cam2Cont = 50;

function render() {
//console.log("Tipo da camera: " + tipoCamera);
    switch(tipoCamera){
        case 1:

            break;
        case 2:
            //camera.position.set(0, 50, 50);
 /*           var r = 50;
            if(Math.cos(cam2Cont) * r < 0)
                r = 10;
            camera2.position.set(0, 0, Math.cos(cam2Cont) * r);
            //console.log(Math.cos(cam2Cont) * r);
            console.log("aqui " + Math.cos(cam2Cont) * r);
            if((Math.cos(cam2Cont) * r < -9.999749715063816 && retornar) || (Math.cos(cam2Cont) * r > 9.999749715063816 && !retornar) ){
                if(anguloCam2 < 10){
                    console.log("rodando " + anguloCam2);
                    if(retornar)
                        camera2.lookAt(new THREE.Vector3(10 - anguloCam2, 0, -10 + anguloCam2));
                    else{
                        camera2.lookAt(new THREE.Vector3(-10 + anguloCam2, 0, -10 + anguloCam2));
                    }
                    anguloCam2 += 0.02;
                }else{
                    //retornar = retornar;
                    cam2Cont -= 0.01;
                    camera2.lookAt(new THREE.Vector3(0, 0, 10));
                    retornar = !retornar;
                }*/
                camera2.position.set(0, 0, cam2Cont);
                if((cam2Cont < -10 && retornar) || (cam2Cont > 10 && !retornar) ){
                    if(anguloCam2 < 10){
                        console.log("Rotacionando...");
                        if(retornar)
                            camera2.lookAt(new THREE.Vector3(10 - anguloCam2, 0, -10 + anguloCam2));
                        else{
                            camera2.lookAt(new THREE.Vector3(10 - anguloCam2, 0, 10 - anguloCam2));
                        }
                        anguloCam2 += 0.02;
                    }else{
                        //retornar = retornar;
                        cam2Cont -= 0.01;
                        if(retornar)
                            camera2.lookAt(new THREE.Vector3(0, 0, 10));
                        else
                            camera2.lookAt(new THREE.Vector3(0, 0, -10));
                        retornar = !retornar;
                    }
                }else{
                    if(!retornar)
                        cam2Cont += 0.2;
                    else
                        cam2Cont -= 0.2;
                    anguloCam2 = 0.02;
                console.log("Entrando...");
            }
            
            
            break;
        case 3:

            break;
        case 4:

            break;
    }
    //var delta = clock.getDelta();
    //controls.update(delta);
    //controls.update();

    var m = new THREE.Matrix4();
    count += 0.04;

    if (velX <= 10 && direcao == 0){
        velX += 0.04;
        velY += 0.04;
        velZ += 0.04;
    }else if(direcao == 1 || velX > 10){
        direcao = 1;
        velX = velY -= 0.04;
        velZ = 10;
        if (velX < -10)
            direcao = 2;
    }else{
        velZ -= 0.04;
        if(velZ < -10)
            direcao = 0;
    }
/*    
    day     += 0.07;
    year    += 0.01;
    month   += 0.04;
*/
    //groupSun.rotateOnAxis(new THREE.Vector3(0.0, 1.0, 0.0).normalize(), day);
    m.identity();
    groupTorus.matrix.copy(m);
    m.makeRotationY(count - 0.02);
    groupTorus.applyMatrix(m);

    m.makeRotationX(count - 0.02);
    groupTorus.applyMatrix(m);


    m.makeTranslation(-velX, -velY, velZ);
    groupTorus.applyMatrix(m);
    groupTorus.updateMatrix();

    groupTorus.updateMatrix();

    superTorusTriangleMesh1.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0).normalize(), 0.01);
    superTorusTriangleMesh2.rotateOnAxis(new THREE.Vector3(0.0, 0.5, 0.0).normalize(), 0.01); 
    superTorusTriangleMesh3.rotateOnAxis(new THREE.Vector3(0.0, 0.0, 1.9).normalize(), 0.01); 
    // m.identity();
    // sun.matrix.copy(m);
    // m.makeRotationY(year);
    // sun.applyMatrix(m);
    // sun.updateMatrix();

    velocidadeEllipse += 0.01;

    if (velXEllipse >= -10 && direcaoEllipse == 0){
        velXEllipse -= 0.04;
        velYEllipse += 0.04;
        velZEllipse += 0.04;
    }else if(direcaoEllipse == 1 || velXEllipse < -10){
        direcaoEllipse = 1;
        velXEllipse += 0.04;
        velYEllipse -= 0.04;
        velZEllipse -= 0.04;
        if (velXEllipse >= 10)
            direcaoEllipse = 0;
    }

    m.identity();
    groupEllipsoid.matrix.copy(m);
    m.makeRotationY(velocidadeEllipse);
    groupEllipsoid.applyMatrix(m);

    m.makeRotationX(0.0001);
    groupEllipsoid.applyMatrix(m);


    m.makeTranslation(-velXEllipse, -velYEllipse, velZEllipse);
    groupEllipsoid.applyMatrix(m);
    groupEllipsoid.updateMatrix();

    superEllipsoidTriangleMesh1.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0).normalize(), 0.01);
    superEllipsoidTriangleMesh2.rotateOnAxis(new THREE.Vector3(0.0, 1.0, 1.0).normalize(), 0.01);
    superEllipsoidTriangleMesh3.rotateOnAxis(new THREE.Vector3(0.0, 1.0, 0.0).normalize(), 0.02);

    controls.update();

    renderer.render(scene, camera);
    renderer.render(scene, camera2);
    
    requestAnimationFrame(render);
}

function superTorus(n1, n2, cor){
    var u, v, du = 5, dv = 5;
    var r0 = 1.0, r1 = 0.25;
    //var n1 = 3, n2 = 0.2;
    var theta, phi, x, y, z;

    var triangleGeometry = new THREE.Geometry();
    var i = 0;
    var triangleMaterial = new THREE.MeshBasicMaterial({ 
        color:cor, 
        //vertexColors:THREE.VertexColors,
        //side:THREE.DoubleSide,
        wireframe:false
    }); 

    for (u = 0; u < 360; u += du) {
        //console.log("theta = ", u);
        for (v = 0; v < 360; v += dv) {
            theta = (u) * DTOR;
            phi   = (v) * DTOR;
            x = auxC(theta, n1) * ( r0 + r1 * auxC(phi, n2) );
            y = auxS(theta, n1) * ( r0 + r1 * auxC(phi, n2) );
            z = r1 * auxS(phi, n2);

            triangleGeometry.vertices.push(new THREE.Vector3( x,  y, z)); 
            //triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2));
            //i++;

            //console.log("Face 1: ", x, y, z);

            theta = (u + du) * DTOR;
            phi   = (v) * DTOR;
            x = auxC(theta, n1) * ( r0 + r1 * auxC(phi, n2) );
            y = auxS(theta, n1) * ( r0 + r1 * auxC(phi, n2) );
            z = r1 * auxS(phi, n2);

            triangleGeometry.vertices.push(new THREE.Vector3( x,  y, z)); 
            //triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2));
            //i++;

            //console.log("Face 2: ", x, y, z);

            theta = (u + du) * DTOR;
            phi   = (v + dv) * DTOR;
            x = auxC(theta, n1) * ( r0 + r1 * auxC(phi, n2) );
            y = auxS(theta, n1) * ( r0 + r1 * auxC(phi, n2) );
            z = r1 * auxS(phi, n2);

            triangleGeometry.vertices.push(new THREE.Vector3( x,  y, z)); 
            //triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2));
            //i++;

            //console.log("Face 3: ", x, y, z);

            theta = (u) * DTOR;
            phi   = (v + dv) * DTOR;
            x = auxC(theta, n1) * ( r0 + r1 * auxC(phi, n2) );
            y = auxS(theta, n1) * ( r0 + r1 * auxC(phi, n2) );
            z = r1 * auxS(phi, n2);

            triangleGeometry.vertices.push(new THREE.Vector3( x,  y, z)); 
            triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2));      // Face 1
            triangleGeometry.faces.push(new THREE.Face3(i, i+2, i+3));      // Face 2
            
            var j = triangleGeometry.faces.length - 2;

            triangleGeometry.faces[j].vertexColors[0] = new THREE.Color( 1/360*u, 0.0, 1/360*v);
            triangleGeometry.faces[j].vertexColors[1] = new THREE.Color( 1/360*u, 0.0, 1/360*v); 
            triangleGeometry.faces[j].vertexColors[2] = new THREE.Color( 1/360*u, 0.0, 1/360*v); 
            //triangleGeometry.faces[i/4].vertexColors[3] = new THREE.Color( 0.0, (u)/(v + 1), v); 

            triangleGeometry.faces[j + 1].vertexColors[0] = new THREE.Color( 1/360*u, 0.0, 1/360*v);
            triangleGeometry.faces[j + 1].vertexColors[1] = new THREE.Color( 1/360*u, 0.0, 1/360*v); 
            triangleGeometry.faces[j + 1].vertexColors[2] = new THREE.Color( 1/360*u, 0.0, 1/360*v);

            i+=4;   //Foram 4 vertices

            //console.log("Face 4: ", x, y, z);
        }
    }

    return new THREE.Mesh(triangleGeometry, triangleMaterial); 

}

function superEllipsoid(n1, n2, cor){
    var u, v, du = 5, dv = 5;
    //var r0 = 1.0, r1 = 0.25;
    //var n1 = 3, n2 = 2;
    var theta, phi, x, y, z;

    var triangleGeometry = new THREE.Geometry();
    var i = 0;
    var triangleMaterial = new THREE.MeshBasicMaterial({ 
        //color:0xffffff, 
        color:cor,
        //vertexColors:THREE.VertexColors,
        //side:THREE.DoubleSide,
        wireframe:false
        }); 

    for (u = 0; u < 360; u += du) {
        //console.log("theta = ", u);
        for (v = 0; v < 360; v += dv) {
            theta = (u) * DTOR;
            phi   = (v) * DTOR;
            x = A * auxC(phi, n1) * ( auxC(theta, n2) );
            y = B * auxC(phi, n1) * ( auxS(theta, n2) );
            z = C * auxS(phi, n1);

            triangleGeometry.vertices.push(new THREE.Vector3( x,  y, z)); 
            //triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2));
            //i++;

            //console.log("Face 1: ", x, y, z);

            theta = (u + du) * DTOR;
            phi   = (v) * DTOR;
            x = A * auxC(phi, n1) * ( auxC(theta, n2) );
            y = B * auxC(phi, n1) * ( auxS(theta, n2) );
            z = C * auxS(phi, n1);

            triangleGeometry.vertices.push(new THREE.Vector3( x,  y, z)); 
            //triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2));
            //i++;

            //console.log("Face 2: ", x, y, z);

            theta = (u + du) * DTOR;
            phi   = (v + dv) * DTOR;
            x = A * auxC(phi, n1) * ( auxC(theta, n2) );
            y = B * auxC(phi, n1) * ( auxS(theta, n2) );
            z = C * auxS(phi, n1);

            triangleGeometry.vertices.push(new THREE.Vector3( x,  y, z)); 
            //triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2));
            //i++;

            //console.log("Face 3: ", x, y, z);

            theta = (u) * DTOR;
            phi   = (v + dv) * DTOR;
            x = A * auxC(phi, n1) * ( auxC(theta, n2) );
            y = B * auxC(phi, n1) * ( auxS(theta, n2) );
            z = C * auxS(phi, n1);

            triangleGeometry.vertices.push(new THREE.Vector3( x,  y, z)); 
            triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2));
            triangleGeometry.faces.push(new THREE.Face3(i, i+2, i+3));
            
            i+=4;   //Foram 4 vertices

            //console.log("Face 4: ", x, y, z);
        }
    }

    return new THREE.Mesh(triangleGeometry, triangleMaterial);
}

function sign(x) {
    x = +x // convert to a number
    if (x === 0 || isNaN(x))
        return x
    return x > 0 ? 1 : -1
}

function auxC(w, m) {
    var c = Math.cos(w);
    return sign(c) * Math.pow(Math.abs(c), m);
}

function auxS(w, m) {
    var s = Math.sin(w);
    return sign(s) * Math.pow(Math.abs(s), m);
}

// Given a point on a sphere find the corresponding point on the super-ellipsoid
function SEvec(x, y, z) {
//    var th = Math.atan2(y, x);
//    var phi = Math.asin(z);
//    var xx = A * auxC(phi, 3) * auxC(th, 2);
//    var yy = B * auxC(phi, 3) * auxS(th, 2);
//    var zz = C * auxS(phi, 3);
//    return new THREE.Vector3(xx, yy, zz);

    var th = Math.atan2(y, x);
    var phi = Math.asin(z);
    var X = auxC(th, 0.2) * (1.0 + 0.25 * auxC(phi, 0.2));
    var Y = auxS(th, 0.2) * (1.0 + 0.25 * auxC(phi, 0.2));
    var Z = 0.25 * auxS(phi, 0.2);
    return new THREE.Vector3(X, Y, Z);
}

// Generate points for the first face
function sf1(u, v) {
    var x = 1 - 2*u;
    var y = 2*v - 1;
    var z = 1;
    var l = Math.sqrt(x*x + y*y + z*z);
    return SEvec( x/l, y/l, z/l);
}

// second face
function sf2(u, v) {
    var x = 2*u - 1;
    var y = 2*v - 1;
    var z = -1;
    var l = Math.sqrt(x*x + y*y + z*z);
    return SEvec( x/l, y/l, z/l);
}
function sf3(u, v) {
    var x = 2*u - 1;
    var z = 2*v - 1;
    var y = 1;
    var l = Math.sqrt(x*x + y*y + z*z);
    return SEvec( x/l, y/l, z/l);
}
function sf4(u, v) {
    var x = 1 - 2*u;
    var z = 2*v - 1;
    var y = -1;
    var l = Math.sqrt(x*x + y*y +z *z);
    return SEvec( x/l, y/l, z/l);
}
function sf5(u, v) {
    var z = 1 - 2*u;
    var y = 1 - 2*v;
    var x = 1;
    var l = Math.sqrt(x*x + y*y + z*z);
    return SEvec( x/l, y/l, z/l);
}
function sf6(u, v) {
    var z = 1 - 2*u;
    var y = 2*v - 1;
    var x = -1;
    var l = Math.sqrt(x*x + y*y + z*z);
    return SEvec( x/l, y/l, z/l);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}                                    
/*
function render() {
    controls.update();
    renderer.render(scene, camera);
}
*/
/*
function reCalc() {
    r = 2;//$('#r').val();
    t = 2.5;//$('#t').val();
    A = 3;//$('#A').val();
    B = 3;//$('#B').val();
    C = 4;//$('#C').val();
    console.log(r, t, A, B,C);
    var pos=0;
    for(var v = 0; v <= vslice; ++v) {
        for(var u = 0; u <= uslice; ++u) {
            sg1.vertices[pos] = sf1(u/uslice, v/vslice);
            sg2.vertices[pos] = sf2(u/uslice, v/vslice);
            sg3.vertices[pos] = sf3(u/uslice, v/vslice);
            sg4.vertices[pos] = sf4(u/uslice, v/vslice);
            sg5.vertices[pos] = sf5(u/uslice, v/vslice);
            sg6.vertices[pos] = sf6(u/uslice, v/vslice);
            ++pos;
        }
    }
    sg1.verticesNeedUpdate = true;
    sg2.verticesNeedUpdate = true;
    sg3.verticesNeedUpdate = true;
    sg4.verticesNeedUpdate = true;
    sg5.verticesNeedUpdate = true;
    sg6.verticesNeedUpdate = true;
}
*/