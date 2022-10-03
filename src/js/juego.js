
const miModulo = (() => {
    "use strict"
    let deck          = [];
    const tipos       = ['C','D','H','S'];
    const especiales  = ['A','J','Q','K'];

    let puntosJugadores = [];
        
    //referencias del HTML
    const btnPedir   = document.querySelector("#btnPedir"),
          btnDetener = document.querySelector("#btnDetener"),
          btnNuevo   = document.querySelector("#btnNuevo");

    const divCartasJugadores = document.querySelectorAll(".divCartas"),
          puntosHTML = document.querySelectorAll("small")

    // inicializacion del juego
    const inicioJuego = ( numJugadores = 2) => {
        deck = crearDeck();
        for ( let i = 0; i< numJugadores; i++ ) {
            puntosJugadores.push(0);
        }
        puntosHTML.forEach(elem => elem.innerHTML = 0)
        divCartasJugadores.forEach(elem => elem.innerHTML = "")
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }
        

    //esta funcion crea una nueva baraja 
    const crearDeck = () => {

        deck = [];

        for( let i = 2; i <= 10; i++) {
            for( let tipo of tipos) {
                deck.push(i + tipo)
            }
        }

        for( let tipo of tipos){
            for( let esp of especiales ){
                deck.push(esp + tipo);
            }
        }
        console.log(deck)
        
        return _.shuffle( deck )
    }

    //esta funcion permite tomar una carta 
    const pedirCarta = () => {

        if ( deck. length === 0){
            throw "No hay cartas en la baraja"
        }
        return deck.pop(); 
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ?
                (valor === "A") ? 11 : 10
                : valor * 1;
    }

    //     //let puntos = 0;
    //     if( isNaN( valor ) ){
            
    //         puntos = (valor === "A") ? 11: 10;
    //         console.log(puntos)
    //     } else{
    //         console.log("Es numero");
    //         puntos = valor * 1;
            
    //     }
        
    // }
    // turno: 0 = primer jugador y el ultimo corresponde a la computadora
    const puntosAcumulados = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno]

    }

    const crearCarta = (carta, turno) => {  

        const imgCarta = document.createElement("img");
        imgCarta.src = `src/cartas/${ carta }.png`;
        imgCarta.classList.add("carta")
        divCartasJugadores[turno].append(imgCarta) 
    }
    
    const determinarGanador = () => {

        
        setTimeout(() => {
        
            if (puntosJugadores[0] > puntosJugadores[1] && puntosJugadores[0] < 22 || puntosJugadores[0] < 22 && puntosJugadores[1] > 21) {
                
            alert("Ganaste Bece¡")
            } else if (puntosJugadores[1] > puntosJugadores[0] && puntosJugadores[1] < 22 || puntosJugadores[1] < 22 && puntosJugadores[0] > 21)  {
                
            alert("gano la computadora")
            } else if ( puntosJugadores[1] === puntosJugadores[0] || puntosJugadores > 42 ) {
                
            alert("No hay ganador")
            }
            else{
                alert("error")
            }
        }, 1000);


    }
    // Turno de la computadora
    const turnoComputadora = () => {

 
        do { 
        const carta = pedirCarta();
        puntosAcumulados(carta, puntosJugadores.length - 1)

        crearCarta(carta, puntosJugadores.length - 1)

        // const imgCarta = document.createElement("img");
        // imgCarta.src = `src/cartas/${ carta }.png`;
        // imgCarta.classList.add("carta")
        
        // divCartasComputadora.append(imgCarta)
        } while (puntosJugadores[1] < 16);
        
        determinarGanador()
    } 
    

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta           = pedirCarta();
        const puntosJugador = puntosAcumulados(carta, 0)

        crearCarta( carta, 0 );
        
        if ( puntosJugador>21 ) {
        
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        } else if ( puntosJugador === 21 ) {
            
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        }
        

    });

    btnDetener.addEventListener("click", () =>{
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugadores[0])
    
    }
    )
    btnNuevo.addEventListener("click", () => {
        puntosJugadores = []
        inicioJuego();

    });

    
return{
    inicioJuego
}

})();





