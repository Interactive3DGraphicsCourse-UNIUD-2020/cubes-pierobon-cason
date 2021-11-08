# Progetto 1 - Modellare e Renderizzare con i Cubi

## Risultato Finale



## Introduzione

Il progetto consiste nella costruzione di una scena formata esclusivamente da cubi. 
La parte iniziale è stata quella di cercare una HeightMap online.
Dopodiché si è studiato, prima il come applicare le giuste coordinate ai singoli cubi, e poi come ovviare al calo di fps presente. 
L'applicazione del THREE.BufferGeometryUtils.mergeBufferGeometries ha permesso un aumento delle prestazioni, siccome ha diminuito drasticamente le draw call alla CPU.
Si è dichiarato un buffer per le 3 tipologie di blocchi, differenziante fra di loro in base all'altezza.
Dopo aver creato la parte geometrica dei cubi si è passati alla parte del materiale, definendo per ogni tipologia la texture da applicare. 

## Cambiamento delle Texture

Quando si stava pensando alle texture da usare, si sono aggiunti dei bottoni con la funzione di cambiare le texture dei cubi.
In particolar modo si sono introdotte due macro categorie: inverno e estate. 
Se prima c'erano solo 3 texture: acqua, terra e roccia; ora si sono aggiunte le 3 rispettive texture in versione invernale: ghiaccio, roccia più chiara e neve.

## Aggiunta Neve

Per rendere la scena più dinamica, si è aggiunta la neve durante la stagione invernale. 
Dopo uno studio e una ricerca online, si è creata prima una classe Particle3D, poi 3 funzioni con lo scopo di:
	- Far spawnare la neve; 
	- Rimuovere la neve;
	- Animare la neve.
La volontà di far rimuovere la neve e poi aggiungerla ogni volta, è dovuta al non voler visualizzare i fiocchi fermi, in caso di stagione estiva.

## Aggiunta Sole

Mancava la presenza di dinamicità nella stagione estiva e per ovviare si è aggiunto un sole, che ruotasse intorno alla "mappa" e illuminasse la scena. 
Per inserire il sole si è pensato di definire prima la geometria, quindi creando una sfera, poi il suo materiale e mesharli. Successivamente fare una add di questo oggetto appena creato, con un PointLight.
Il risultato è un oggetto che emana luce di tipo PointLight.
Per farlo invece ruotare, si è aggiunta alla sfera un pivot, con coordinate (0,0,0) e quindi al centro della scena. 
Il sole ruota intorno all'asse x, con come perno il pivot.
Infine si è tolta la rotazione se la stagione è quella invernale. 
## PREVIEW
![preview](https://user-images.githubusercontent.com/50354928/140802269-cecd42ce-570e-421f-9e0b-4011aa5b3694.gif)
