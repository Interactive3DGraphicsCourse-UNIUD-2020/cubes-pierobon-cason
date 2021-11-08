/*
movimento del sole, intorno al pivot e all'asse X.
*/
function animationSun() {
    pivot.rotation.x += 0.01;
}

/*
creazione geometrica della sfera, creazione di un punto luce, creazione di una mesh
con le stesse caratteristiche del punto luce, e aggiunta al punto luce della mesh 
dell'oggetto.
Applicazione di una traslazione per posizionare il punto luce.
Creazione pivot in coordinate (0,0,0) per applicare in seguito una rotazione intorno 
all'asse X.
*/
function startSun() {
    const geometry = new THREE.SphereGeometry(4, 20, 20);
    sfera = new THREE.PointLight(0xfdfbd3, 3, 100, 2);
    meshSfera = new THREE.MeshStandardMaterial({
        emissive: 0xfdfbd3,
        emissiveIntensity: 3,
        color: 0xfdfbd3
    });
    sfera.add(new THREE.Mesh(geometry, meshSfera));
    sfera.castShadow = true;
    scene.add(sfera);

    sfera.applyMatrix(new THREE.Matrix4().makeTranslation(0, 40, 30));

    pivot = new THREE.Group();
    pivot.position.set(0, 0, 0);
    scene.add(pivot);
    pivot.add(sfera);
}