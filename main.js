import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

var spaceTexture = new THREE.TextureLoader().load('space.jpeg');
var moonTexture = new THREE.TextureLoader().load('moon.jpeg');
var normalTexture = new THREE.TextureLoader().load('normal.jpeg');
var normalTexture1 = new THREE.TextureLoader().load('11.png');
var seloTexture = new THREE.TextureLoader().load('s4.jpg');
var otherTexture = new THREE.TextureLoader().load('1.jpg');




var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


var geometry = new THREE.TorusGeometry(10, 3, 16, 100);
var material = new THREE.MeshStandardMaterial({
  map: otherTexture,
  normalMap: normalTexture1,
  roughness: 0.2,
  metalness: 0.2 });
var torus = new THREE.Mesh(geometry, material);
scene.add(torus);

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

var ambiantLight = new THREE.AmbientLight(0xffffff);
// ambiantLight.position.set(0, 0, 0);
scene.add(pointLight, ambiantLight);

var lightHelper = new THREE.PointLightHelper(pointLight, 5);
var gridHelper = new THREE.GridHelper(100, 10);
// scene.add(gridHelper, lightHelper);

var controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  var geometry = new THREE.SphereGeometry(0.25, 24, 24);
  var material = new THREE.MeshStandardMaterial({
    map: seloTexture,
    roughness: 0.2,
    metalness: 0.2 });
  var star = new THREE.Mesh(geometry, material);
  
  var [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);

  scene.add(star);
}
Array(200).fill().forEach(addStar);

scene.background = spaceTexture;

//Selo Photo
var Selo = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({ 
    map: seloTexture,
    roughness: 0.2,
    metalness: 0.2
  })
);
scene.add(Selo);

//Moon
var moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
    roughness: 0.1,
    metalness: 0.1
  })
);
moon.position.z = 30
moon.position.setX(-10);
scene.add(moon);

function moveCamera() {
  var t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y  += 0.075;
  moon.rotation.z += 0.05;

  Selo.rotation.x += 0.01
  Selo.rotation.y += 0.01

  camera.position.x = t * -0.3
  camera.position.y = t * -0.3
  camera.position.z = t * -0.3
}
document.body.onscroll = moveCamera();


function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.0005;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.0001;

  Selo.rotation.x += -0.001;
  Selo.rotation.y += -0.01;
  Selo.rotation.z += -0.001;

  moon.rotation.x += 0.0005;
  moon.rotation.y += 0.00075;
  moon.rotation.z += 0.0005;

  controls.update();
  renderer.render(scene, camera);
}
animate();
