let iconos
let memoria = []
let dificultad = "normal";
tiempo = 20
let puntos = 0;
cartas = 0

contador()
generarTablero();

function cargarIconos() {
    iconos = [
        '<i class="fa-solid fa-meteor"></i>',
        '<i class="fa-solid fa-ghost"></i>',
        '<i class="fa-solid fa-volleyball"></i>',
        '<i class="fa-solid fa-chess-rook"></i>',
        '<i class="fa-solid fa-heart"></i>',
        '<i class="fa-regular fa-heart"></i>',
        '<i class="fa-solid fa-dice"></i>',
        '<i class="fa-solid fa-ring"></i>',
        '<i class="fa-solid fa-puzzle-piece"></i>',
        '<i class="fa-solid fa-dragon"></i>',
        '<i class="fa-solid fa-dice-four"></i>',
        '<i class="fa-solid fa-dice-five"></i>',
        '<i class="fa-regular fa-chess-queen"></i>',
        '<i class="fa-solid fa-fire"></i>',
        '<i class="fa-solid fa-graduation-cap"></i>',
        '<i class="fa-solid fa-apple-whole"></i>',
        '<i class="fa-solid fa-gamepad"></i>',
        '<i class="fa-solid fa-lightbulb"></i>',
        
    ]
}

function cambiarDificultad() {
    dificultad = document.getElementById("dificultad").value;
    generarTablero();
}

function generarTablero(){
    cargarIconos();
    document.getElementById("puntos").innerHTML = 0    
    memoria = []
    let tablero = document.getElementById("tablero")
    let tarjetas = [];
    switch (dificultad) {
        case "facil":
            cartas = 12;
            tiempo = 60;
            break;
        case "normal":
            cartas = 24;
            tiempo = 80;
            break;
        case "dificil":
            cartas = 36;
            tiempo = 150;
            break;
        default:
            cartas = 24;
            tiempo = 120;
    }
    
    console.log(cartas)
    for (let i = 0; i < cartas; i++) {
        tarjetas.push(` 
        <div class="area-tarjeta" onclick="seleccionar(${i})">
        <div class="tarjeta" id= "tarjeta${i}">
            <div class="cara delantera">
                <i class="fa-solid fa-question"></i>
            </div>
            <div class="cara trasera" id= "trasera${i}">
                ${iconos[0]}
            </div>
        </div>
    </div>
    `)
    if(i%2==1){
        iconos.splice(0,1)
    }
        
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ");

    setTimeout(function() {
        Miaudio = document.getElementById("audio")
        Miaudio.play()
       
    }, 6000); 
}

    


function seleccionar(i){
    let tarjeta = document.getElementById("tarjeta" + i)
    if(tarjeta.style.transform != "rotateY(180deg)"){
        tarjeta.style.transform = "rotateY(180deg)"
        memoria.push(i);
        
        
    }
    if(memoria.length == 2){
        
        deseleccionar(memoria)
        memoria = []
    }
}

function deseleccionar(memoria){
    setTimeout(() => {
    
    let trasera1 = document.getElementById("trasera" + memoria[0])
    let trasera2 = document.getElementById("trasera" + memoria[1])
    if(trasera1.innerHTML != trasera2.innerHTML){
        let tarjeta1 = document.getElementById("tarjeta" + memoria[0])
        let tarjeta2 = document.getElementById("tarjeta" + memoria[1])
        tarjeta1.style.transform = "rotateY(0deg)"
        tarjeta2.style.transform = "rotateY(0deg)"
        
    }
    else{
        trasera1.style.background = "plum";
        trasera2.style.background = "plum";
        puntos++
        document.getElementById("puntos").innerHTML = puntos
        
        console.log(puntos)
        
    }
    if(verificarFin(cartas)){
        
        swal.fire({
            title: `Ganaste` + " puntos: " + puntos,
            icon: "success",
            confirmButtonColor: "#3085d6",
        })
        pausa_audio()
        audio_victoria()
        generarTablero()
        puntos=0;
    }
    }, 500);

    
    
}

function verificarFin(cartas){  
    
    for (let i = 0; i < cartas; i++) {
        let trasera = document.getElementById("trasera" + i)
        if (trasera.style.background != "plum") {
            return false;   
        }
    }
    return true;
    
}

function contador(){
    
    
    const intervalo = setInterval(function () {
        document.getElementById('timer').innerHTML = tiempo

        if(tiempo == 0){
            swal.fire({
                title: `Perdiste` +" Puntos: "+ puntos,
                icon: "error",
                confirmButtonColor: "#3085d6",
            })
            audio_derrota()
            pausa_audio()
            puntos = 0
            console.log("puntos"+puntos)
            generarTablero()
            
            
        }
        tiempo--
        
        
    },1000)
    
}

function pausa_audio(){
    Miaudio = document.getElementById("audio")
    Miaudio.pause()
}

function audio_derrota(){
    Miaudio = document.getElementById("audio_derrota")
    Miaudio.play()
}

function audio_victoria(){
    Miaudio = document.getElementById("audio_victoria")
    Miaudio.play()
}