let banderas = ["corea.png", "chin.png", "frnci.png", "tilndi.png", 
"portugl.png", "australia.png", "egipto.png", "pakistan.png", "asiria.png", "afganistan.png"];


let correcta = [2,1,0,1,0,1,2,0,2,2];

let opciones = [];

opciones.push(["COLOMBIA", "SINGAPUR", "COREA"]);
opciones.push(["MÉXICO", "CHINA", "BOLIVIA"]);
opciones.push(["FRANCIA", "ESPAÑA", "HAITÍ"]);
opciones.push(["UCRANIA", "TAILANDIA", "MADAGASCAR"]);
opciones.push(["PORTUGAL", "EGIPTO", "PERÚ"]);
opciones.push(["SINGAPUR", "AUSTRALIA", "ARABIA"]);
opciones.push(["JAPON", "PUERTO RICO", "EGIPTO"]);
opciones.push(["PAKISTÁN", "SINGAPUR", "COREA"]);
opciones.push(["ESPAÑA", "BOLIVIA", "ASIRIA"]);
opciones.push(["ASIRIA", "ALEMANIA", "AFGANISTÁN"]);

let posActual = 0;

let cantidadAcertadas = 0;

function comenzarJuego(){
  
    posActual = 0;
    cantidadAcertadas = 0;
    
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    cargarBandera();

}

function cargarBandera(){
    
    if(banderas.length <= posActual){
        terminarJuego();
    }
    else{
        limpiarOpciones();

        document.getElementById("imgBandera").src =banderas[posActual];
        document.getElementById("n0").innerHTML = opciones[posActual][0];
        document.getElementById("n1").innerHTML = opciones[posActual][1];
        document.getElementById("n2").innerHTML = opciones[posActual][2];
    }
}

function limpiarOpciones(){
    document.getElementById("n0").className = "nombre";
    document.getElementById("n1").className = "nombre";
    document.getElementById("n2").className = "nombre";

    document.getElementById("l0").className = "letra";
    document.getElementById("l1").className = "letra";
    document.getElementById("l2").className = "letra";
}

function comprobarRespuesta(opElegida){
    if(opElegida==correcta[posActual]){
        document.getElementById("n" + opElegida).className = "nombre nombreAcertada";
        document.getElementById("l" + opElegida).className = "letra letraAcertada";
        cantidadAcertadas++;
    }else{
        document.getElementById("n" + opElegida).className = "nombre nombreNoAcertada";
        document.getElementById("l" + opElegida).className = "letra letraNoAcertada";

        
        document.getElementById("n" + correcta[posActual]).className = "nombre nombreAcertada";
        document.getElementById("l" + correcta[posActual]).className = "letra letraAcertada";
    }
    posActual++;

    setTimeout(cargarBandera,1500);
}
function terminarJuego(){
   
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
   
    document.getElementById("numCorrectas").innerHTML = cantidadAcertadas;
    document.getElementById("numIncorrectas").innerHTML = banderas.length - cantidadAcertadas;
}

function volverAlInicio(){
    
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-inicial").style.display = "block";
    document.getElementById("pantalla-juego").style.display = "none";
}