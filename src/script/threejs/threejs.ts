import {Mesh, Scene, WebGLRenderer} from 'three';
import {PerspectiveCamera } from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";





const animation = document.getElementById('threejsAnime')
const loader = new GLTFLoader();
const scene = new Scene();
const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new WebGLRenderer({ alpha: true });
let model = new Mesh();






 //const controls = new OrbitControls( camera, renderer.domElement );


 async function init(){

    renderer.setSize( window.innerWidth, window.innerHeight );
    animation.appendChild( renderer.domElement );
    loader.load( './assets/images/gltf/brain-simple-mesh1.glb',
        ( gltf ) => model.add(gltf.scene ),
        undefined,  ( error ) =>  console.error( error )
    )
    scene.add(model);
}

init().then(()=>{
    console.log(model);
    console.log(model.material);
    console.log(model.material['color']);
    model.material['color'].set(0xdddddd * Math.random())
    console.log(model.material['color']);
    animate();
})






camera.position.z = 5;

function animate() {
    model.rotation.y += 0.001;
    model.material['color'].set(0xffffff * Math.random())
    // console.log(model.material['color']);
    requestAnimationFrame( animate );
    renderer.setAnimationLoop(() => {

        renderer.render(scene, camera);
    });
}


console.log('threejs')
