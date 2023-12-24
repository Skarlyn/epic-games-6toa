let base_preguntas = readText("base-preguntas.json");
let interprete_bp = JSON.parse(base_preguntas);
let pregunta;
let posiblesRespuestas = [];
let puntuacion = 0;
let btn_correspondiente = [
    select_id("btn1"), select_id("btn2"), select_id("btn3"), select_id("btn4")
];

escogerPreguntasAleatoria();

function escogerPreguntasAleatoria() {
    
    const randomIndex = Math.floor(Math.random() * interprete_bp.length);
    escogerPreguntas(randomIndex);
    // Elimina la pregunta seleccionada de la lista
    interprete_bp.splice(randomIndex, 1);
}

function escogerPreguntas(n) {
    pregunta = interprete_bp[n];
    select_id("categoria").innerHTML = pregunta.categoria; //ERROR: nuestra palabrabra clave no es la correcta, ya que, la que establecimos en nuestro archivo JSON no terminaba en "s"
    select_id("pregunta").innerHTML = pregunta.pregunta; //ERROR: nuestra palabrabra clave no es la correcta, ya que, la que establecimos en nuestro archivo JSON no terminaba en "s"
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").objectFit = pregunta.objectFit;
    select_id("btn1").innerHTML = pregunta.respuesta; //ERROR: los id de nuestros botones no eran los correctos en nuestro archivo js
    select_id("btn2").innerHTML = pregunta.incorrecta1;
    select_id("btn3").innerHTML = pregunta.incorrecta2;
    select_id("btn4").innerHTML = pregunta.incorrecta3;
    desordenarRespuestas(pregunta);
}

let btns = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
];

function desordenarRespuestas(pregunta) {
    posiblesRespuestas = [pregunta.respuesta, pregunta.incorrecta1, pregunta.incorrecta2, pregunta.incorrecta3];

    posiblesRespuestas.sort(() => Math.random() - 0.5);

    select_id("btn1").innerHTML = posiblesRespuestas[0];
    select_id("btn2").innerHTML = posiblesRespuestas[1];
    select_id("btn3").innerHTML = posiblesRespuestas[2];
    select_id("btn4").innerHTML = posiblesRespuestas[3];
}


function oprimir_btn(i) {
    if (posiblesRespuestas[i] == pregunta.respuesta) {
        btn_correspondiente[i].style.background = 'green';
        puntuacion++;
        
        // Verifica si todas las preguntas han sido respondidas correctamente
        if (interprete_bp.length === 0) {
            alert("¡Felicidades! Has respondido todas las preguntas correctamente. Tu puntuación final es: " + puntuacion);
            puntuacion = 0; // Reinicia la puntuación a 0
            // Reinicia la lista de preguntas
            interprete_bp = JSON.parse(base_preguntas);
        }
    } else {
        btn_correspondiente[i].style.background = 'red';
        alert("Haz Perdido, tu puntuación final es: " + puntuacion);
        puntuacion = 0; // Reinicia la puntuación a 0
        reiniciar();
    }
    actualizarPuntuacionEnPantalla();
    setTimeout(() => {
        reiniciar();
    }, 500);
}


function actualizarPuntuacionEnPantalla() {
    select_id("puntuacion").innerHTML = "Puntuacion: " + puntuacion;
}

function reiniciar() {
    for (const btn of btn_correspondiente) {
        btn.style.background = 'white';
    }
    escogerPreguntasAleatoria();
}

function select_id(id) {
    return document.getElementById(id);
}

function style(id) {
    return select_id(id).style
}

function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        texto = xmlhttp.responseText;
    }
    return texto;
}