var filas = 3;
var columnas = 3;

var mosaico;
var mosaico2; //el blanco

var vueltas = 0;

//imagenes desorganizadas, 1, 2, 3... organizadas
var orden_imagenes = ["4","2","8","5","1","6","7","9","3"];

//funcion que pone las imagenes en el tablero
window.onload = function() {
    for(let r = 0; r < filas; r++){
        for(let c = 0; c < columnas; c++){

            //mosaico, coordenadas en mi tablero y la ubicacion de cada mosaico
            //pone las imagenes
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src =orden_imagenes.shift() + ".png";

            //hace que me puede mover y que sea unicamente a un mosaico que este al lado y este vacío
            tile.addEventListener("dragstart", dragStart); //cuando haces click en una imagen para arrastrar
            tile.addEventListener("dragover", dragOver); //cuando haces click en una imagen y se mueva
            tile.addEventListener("dragenter", dragEnter); //cuando arrastras la imagen encima de otra 
            tile.addEventListener("dragleave", dragLeave); //arrastrar una imagen y dejar una imagen
            tile.addEventListener("drop", dragDrop); //cuando sueltas la imagen sobre otra
            tile.addEventListener("dragend", dragEnd); //cambia la posicion de la imagen

            document.getElementById("tablero").append(tile);


        }
    }
}

function dragStart(){
    mosaico = this; //el mosaico que se selecciona para mover
}

//estos 3 no están haciendo nada, es innecesario 
function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(e){
    e.preventDefault();
}

function dragDrop(){
    mosaico2 = this; //es la imagen que se suelta en otro mosaico
}

function dragEnd(){
    //si no es la imagen en blanco no mover
    if(!mosaico2.src.includes("3.png")){
        return;
    }

    let mosaicos_ady = mosaico.id.split("-")//para que solo se puede mover a un lugar adyacente, es decir al lado
    let r = parseInt(mosaicos_ady[0]);
    let c = parseInt(mosaicos_ady[1]);

    let mosaicos2_ady = mosaico2.id.split("-")
    let r2 = parseInt(mosaicos2_ady[0]);
    let c2 = parseInt(mosaicos2_ady[1]);
    
    //verificar el movimiento
    let izquierda = r == r2 && c2 == c-1;
    let derecha = r == r2 && c2 == c+1;
    let arriba = c == c2 && r2 == r-1;
    let abajo = c == c2 && r2 == r+1;

    let esta_adyacente = izquierda || derecha || arriba || abajo;

    if(esta_adyacente){
    let imagenmosaico = mosaico.src;
    let imagenmosaico2 = mosaico2.src;

    //intercambiar la imagen de lugar
    mosaico.src = imagenmosaico2;
    mosaico2.src = imagenmosaico;

    //para que se incrementen los movimientos
    vueltas += 1;
    document.getElementById("vueltas").innerText = vueltas; //me muestre en texto mientras cambia el valor

    }

}



