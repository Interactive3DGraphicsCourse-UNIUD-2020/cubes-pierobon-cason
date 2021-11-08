//ogni chiamata dell'update verifica se è stato premuto o no il buttom winter o summer
//si richiama il metodo changeTexture, e dopo si cambia il valore della variabile summer/winter
//la condizione di snowing == false serve per impendire la generazione di +300 particelle ogni
//volta che si clicchi sul bottone inverno.
function ChangeSeason() {
    if (summer == true) {
        changeTexture("summer");
        removeSnow();
        summer = false;
        snowing = false;
    }
    if (winter == true) {
        changeTexture("winter");
        if(snowing == false){
            addSnow();
            snowing = true;
        }
        winter = false;
    }
}

//data la stagione restituisce una certa texture 
//@param stagione da cambiare
//@modify texture di tutti i cubi 
function changeTexture(season) {
    if (season == "summer") {
        var waterCubes = THREE.BufferGeometryUtils.mergeBufferGeometries(waters);
        var groundCubes = THREE.BufferGeometryUtils.mergeBufferGeometries(grounds);
        var rockCubes = THREE.BufferGeometryUtils.mergeBufferGeometries(rocks);

        var meshWater = new THREE.Mesh(waterCubes, getMaterial("waterSummer"));
        var meshGround = new THREE.Mesh(groundCubes, getMaterial("terrainSummer"));
        var meshStone = new THREE.Mesh(rockCubes, getMaterial("stoneSummer"));

        scene.add(meshWater);
        scene.add(meshGround);
        scene.add(meshStone);
    }
    if (season == "winter") {
        var waterCubes = THREE.BufferGeometryUtils.mergeBufferGeometries(waters);
        var groundCubes = THREE.BufferGeometryUtils.mergeBufferGeometries(grounds);
        var rockCubes = THREE.BufferGeometryUtils.mergeBufferGeometries(rocks);

        var meshWater = new THREE.Mesh(waterCubes, getMaterial("waterWinter"));
        var meshGround = new THREE.Mesh(groundCubes, getMaterial("terrainWinter"));
        var meshStone = new THREE.Mesh(rockCubes, getMaterial("stoneWinter"));

        scene.add(meshWater);
        scene.add(meshGround);
        scene.add(meshStone);
    }
}

