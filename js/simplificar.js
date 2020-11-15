function compararDestinos (matriz, estadosA){
    var arrayConjunto = [], estadoConjunto = [];
    var k = 0, f = 1 ;
    arrayConjunto=matriz, estadoConjunto=estadosA;
    
    do{
        if (JSON.stringify(arrayConjunto[k])==JSON.stringify(arrayConjunto[f])){
            var nuevoNombre = estadoConjunto[k][0]+";"+estadoConjunto[f][0];
            console.log(nuevoNombre);
            var q=0, d=0;
            
            do{
                for(d;d<Alfabeto.length;d++){
                    if(arrayConjunto[q][d]==estadoConjunto[k][0] || arrayConjunto[q][d]==estadoConjunto[f][0]){
                        arrayConjunto[q].splice(d,1,nuevoNombre);
                    }
                }
                q++;
            }while(q<arrayConjunto.length);
            
            for(var w=0;w<estadoConjunto.length;w++){
                if(estadoConjunto[w][0]==estadoConjunto[k][0] || estadoConjunto[w][0]==estadoConjunto[f][0]){
                    estadoConjunto[w].splice(0,1,nuevoNombre);
                }
            }
            arrayConjunto.splice(f,1);
            estadoConjunto.splice(f,1);
            k=0, f++;
        }else{
            f++;                    
        }
    }while(k<arrayConjunto.length && f<arrayConjunto.length);

    return [arrayConjunto,estadoConjunto];
}

function identificaAislados (destinos, estadosAnalizado){
    var dAUX =[], estadoAUX=[], estCont=0, desCont=0, alCont=0, validador=0;
    dAUX=destinos; estadoAUX=estadosAnalizado;
    console.log(dAUX);
    console.log(estadoAUX);
    
    do{
        do{
            if(desCont==estCont){
                desCont++,alCont=0;
            }
            else{
                if(dAUX[desCont][alCont]==estadoAUX[estCont][0]){
                    validador=1, alCont++;
                    if(alCont>Alfabeto.length){
                        alCont=0, desCont++;
                    }
                }
                else{
                    alCont++;
                    if(alCont>Alfabeto.length){
                        alCont=0, desCont++;
                    }
                }
            }
        }while(desCont<dAUX.length);
        console.log(validador);

        if(validador==0 && estadoAUX[estCont][1]!=="i" && estadoAUX[estCont][1]!=="if"){
            console.log("El estado "+estadoAUX[estCont][0]+" es aislado, se elimina.");
            dAUX.splice(estCont, 1);
            estadoAUX.splice(estCont,1);
            estCont++,alCont=0,desCont=0, validador=0;
        }else{
                console.log("El estado "+estadoAUX[estCont][0]+" no es aislado, se mantiene.");
                estCont++, alCont=0, desCont=0, validador=0;
        }
    }while(estCont<estadoAUX.length);
    console.log(dAUX);
    console.log(estadoAUX);
    
    return[dAUX, estadoAUX];
}

function simplificar (estadoAFD, transAFD){
    var estadoAux = [], transAux = [], alfaAux=[], tamanoEstados =Estados1.length;
    estadoAux=estadoAFD, transAux =transAFD;
    for(var treo=1;treo<Alfabeto.length;treo++){
        alfaAux.push(Alfabeto[treo]);
    }
    console.log("Estados Iniciales, no Finales y finales (C0)"+": "+estadoAux);
    console.log("Alfabeto: "+alfaAux);

    var MatrizAux= [], ingreso =[], p=0, o=0, v=0;
    console.log("La matriz que contiene las direcciones debe ser de "+estadoAux.length+" por "+alfaAux.length);
    
    do{
        do{
            if(transAux[o][0]==estadoAux[p][0] && transAux[o][1]==alfaAux[v]){
                ingreso.push(transAux[o][2]);
                v++, o=0;
            }else{
                o++;
            }
        }while(v<alfaAux.length && o<transAux.length);
        MatrizAux.push(ingreso), ingreso=[], p++, v=0, o=0;
    }while(p<estadoAux.length);
    console.log(MatrizAux);
    
    const [destinoAislado, estadoAislado]=identificaAislados(MatrizAux,estadoAux);
    const [nuevoDestino, estadosFinal]=compararDestinos(destinoAislado,estadoAislado);
    console.log("Esta es la nueva matriz de destinos: "+nuevoDestino);
    console.log(nuevoDestino);
    console.log("Estos son los nuevos estados: "+estadosFinal);

    var transFinal=[];
    var ingreso3=[], nivelEstado=0, nivelAlfa=0;
    do{
        ingreso3.push(estadosFinal[nivelEstado][0]);
        ingreso3.push(alfaAux[nivelAlfa]);
        ingreso3.push(nuevoDestino[nivelEstado][nivelAlfa]);
        transFinal.push(ingreso3);
        ingreso3=[];
        nivelAlfa++;
        if(nivelAlfa==alfaAux.length){
            nivelEstado++, nivelAlfa=0;
        }
    }while(nivelEstado<estadosFinal.length);
   
    
    if(estadosFinal.length==tamanoEstados || transFinal.length==transAux.length){
        console.log("El automata no se puede simplificar mas.");
    }else{
        console.log("La simplificación hizo que el automata finito determinista ingresado con "+tamanoEstados+" Estados y "+Trans.length+" Transiciones pasara a tener "+estadosFinal.length+" Estados y "+transFinal.length+" Transiciones.");
    }
    
    console.log(estadosFinal);
    console.log(transFinal);
    
    return [estadosFinal, transFinal];
}