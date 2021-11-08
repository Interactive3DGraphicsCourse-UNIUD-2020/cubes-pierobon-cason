var particles = [];

Particle3D = function(material) {
    THREE.Sprite.call(this, material);
    this.velocity = new THREE.Vector3(0, -0.5, 0);
};

Particle3D.prototype = new THREE.Sprite();
Particle3D.prototype.constructor = Particle3D;

Particle3D.prototype.updatePhysics = function() {
    this.position.add(this.velocity);
}

/*
per ogni particella, si prende prima la velocità, dichiarata nella classe Partice3D (che è solo nell'asse y e di -0.5), e si fa scendere 
i fiocchi di -0.5 dalla posizione di partenza. Successivamente se si va sotto una certa y, si ritorna a 200 blocchi di altezza, cioè si crea un ciclo
di neve che cade dall'alto.
*/
function animationSnow() {
    for (var i = 0; i < particles.length; i++) {

        var particle = particles[i];
        particle.updatePhysics();

        with (particle.position) {
            if (y < 0) y += 200;
        }
    }
}

/*
aggiunge la neve alla scena, dove prima crea un materiale, dopo crea una particella 3d con il materiale.
Successivamente posiziona i fiocchi in maniera random per le 3 posizioni x, y, z, dove è importante farle spawnare 
dentro il blocco della mappa.
Alla fine di tutto le particelle vengono aggiunte alla scena.
*/
function addSnow() {
    var material = new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load('textures/snowflake.jpeg') });
    for (var i = 0; i < 300; i++) {

        particle = new Particle3D(material);
        particle.position.x = Math.random() * (30 - (-30)) + (-30);
        particle.position.y = Math.random() * 200;
        particle.position.z = Math.random() * (30 - (-30)) + (-30);
        particle.scale.x = 0.5;
        particle.scale.y = 0.5;
        scene.add(particle);

        particles.push(particle);
    }
}
/*
rimuove tutte le particelle dalla scena, così da non farle rimanere quando si cambia la stagione.
*/
function removeSnow() {
    for(var i = 0; i<particles.length; i++){      
        scene.remove( particles[i]);
    }
}
