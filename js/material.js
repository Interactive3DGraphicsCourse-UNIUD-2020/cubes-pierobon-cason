var waters = [];
var grounds = [];
var rocks = [];

var season;

function makeCube(i, j, posizione, width, height) {
    var geometry = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(1, 1, 1));
    //posizione: altezza della heightmap
    //se la posizione attuale (data[i] e' minore di 1) acqua
    if (posizione < 1) {
        var water = geometry.clone();
        water.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2, posizione / 2 + j, i / width - height / 2));
        waters.push(water);
        //se la posizione e' minore di 13 erba
    } else if (posizione < 13) {
        var ground = geometry.clone();
        ground.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2, posizione / 2 + j, i / width - height / 2));
        grounds.push(ground);
        //altrimenti e' roccia
    } else {
        var rock = geometry.clone();
        rock.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2, posizione / 2 + j, i / width - height / 2));
        rocks.push(rock);
    }
}

//Crea l'intero terreno aggiungendo i cubi
function makeGround(data, width, height) {
    // i da 0 a 3600 (se 60x60)
    for (var i = 0; i < width * height; i++) {
        //var data = getHeightData(img, 0.12)
        //data[i] = posizione attuale
        for (var j = 0; j < data[i]; j++) {
            makeCube(i, j, data[i], width, height);
        }
    }
    // Effettua il merge dei singoli cubi
    var waterCubes = THREE.BufferGeometryUtils.mergeBufferGeometries(waters);
    var groundCubes = THREE.BufferGeometryUtils.mergeBufferGeometries(grounds);
    var rockCubes = THREE.BufferGeometryUtils.mergeBufferGeometries(rocks);

    // Creo la mesh di tutti i cubi 
    var meshWater = new THREE.Mesh(waterCubes, getMaterial("waterSummer"));
    var meshGround = new THREE.Mesh(groundCubes, getMaterial("terrainSummer"));
    var meshStone = new THREE.Mesh(rockCubes, getMaterial("stoneSummer"));

    scene.add(meshWater);
    scene.add(meshGround);
    scene.add(meshStone);
}

//in base alla stringa del materiale passato, restituisce un certo material
function getMaterial(materiale) {
    switch (materiale) {
        case "waterSummer":
            var material = new THREE.MeshPhongMaterial({
                map: textureLoader('textures/water.jpg'),
                opacity: 0.5,
                transparent: true,
                side: THREE.DoubleSide
            });
            break;
        case "stoneSummer":
            var material = new THREE.MeshPhongMaterial({
                map: textureLoader('textures/rock.jpg'),
                side: THREE.DoubleSide
            });
            break;
        case "terrainSummer":
            var material = new THREE.MeshPhongMaterial({
                map: textureLoader('textures/grass.png'),
                side: THREE.DoubleSide
            });
            break;
        case "waterWinter":
            var material = new THREE.MeshPhongMaterial({
                map: textureLoader('textures/ice.jpg'),
                opacity: 0.5,
                transparent: true,
                side: THREE.DoubleSide
            });
            break;
        case "stoneWinter":
            var material = new THREE.MeshPhongMaterial({
                map: textureLoader('textures/snow.png'),
                side: THREE.DoubleSide
            });
            break;
        case "terrainWinter":
            var material = new THREE.MeshPhongMaterial({
                map: textureLoader('textures/litestone.png'),
                side: THREE.DoubleSide
            });
            break;
        case "sun":
            var material = new THREE.MeshPhongMaterial({
                opacity: 0.5,
                transparent: true,
                map: textureLoader('textures/sun.png'),
                side: THREE.DoubleSide
            });
            break;

    }
    return material;
}

//ritorna un'array con l'altezza data dall'immagine per ogni pixel
function getHeightData(img, scale) {

    if (scale == undefined) scale = 1;
    //crea canvas
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    //crea un contesto 2d sopra il canvas 
    var context = canvas.getContext('2d');

    var size = img.width * img.height;
    //array di grandezza immagine, per poter cambiare colore ai pixel
    var data = new Float32Array(size);

    //disegnare un'immagine nel canvas nel piano 2d, dove 0 e 0 sono le posizioni
    context.drawImage(img, 0, 0);

    //imposta a 0 tutti i valori dell'array posizione asse z
    for (var i = 0; i < size; i++) {
        data[i] = 0;
    }

    //prende informazioni dal punto top-left (0,0) fino alla sua larghezza, e restituisce l'oggetto contenente i dati dell'immagine
    var imgd = context.getImageData(0, 0, img.width, img.height);
    //prendo i pixel di quell'immagine
    var pix = imgd.data;

    //dovrebbe avere un'immagine piatta
    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var all = pix[i] + pix[i + 1] + pix[i + 2];
        data[j++] = scale * all / 3;
    }
    return data;
}

//metodo per caricare la texture, dato un certo file passato
function textureLoader(file) {
    var tl = new THREE.TextureLoader();
    var newTex = tl.load(file);
    newTex.magFilter = THREE.NearestFilter;
    return newTex;
}

//data un'immagine heightmap, quando viene caricata, viene richiamata la funzione getHeightData 
//che restituisce un'array data con tutti i valori delle varie 
//altezze rispetto alla heightmap, successivamente si richiama la funzione makeGround per 
//creare effettivamente il terreno
function startGround() {
    var img = new Image();
    img.onload = function () {
        var data = getHeightData(img, 0.12);
        makeGround(data, img.width, img.height);
    };
    img.src = "mappa/heightmap.png";
}