function compararDestinos (matriz, estados){
    var arrayConjunto = [], estadoConjunto = [];
    var k = 0 ;
    var f = k+1 ;
    arrayConjunto=matriz, estadoConjunto=estados;
    do{
        if (JSON.stringify(arrayConjunto[k])==JSON.stringify(arrayConjunto[f])){
            var comparacion=estadoConjunto[f].length;
            var nuevoElemento = estadoConjunto[f].substr(1, comparacion);
            var nuevoNombre = estadoConjunto[k]+nuevoElemento;
            var q=0, d=0;
            do{
                for(var d=0;d<Alfabeto.length;d++){
                    if(arrayConjunto[q][d]==estadoConjunto[k] || arrayConjunto[q][d]==estadoConjunto[f]){
                        arrayConjunto[q].splice(d,1,nuevoNombre);
                        }
                    }
                    q++;
                }while(q<arrayConjunto.length);
            for(var w=0;w<estadoConjunto.length;w++){
                if(estadoConjunto[w]==estadoConjunto[k] || estadoConjunto[w]==estadoConjunto[f]){
                    estadoConjunto.splice(w,1,nuevoNombre);
                }
            }
            arrayConjunto.splice(f,1);
            estadoConjunto.splice(f,1);
        k=0, f=k+1;
        }else{
            f++;                    
        }
}while(k<arrayConjunto.length && f<arrayConjunto.length);

return [arrayConjunto,estadoConjunto];
}

/* function identificarAislados (estados, trans){//Solo funciona con matriz de direcciones y estados auxiliares.
   var transAislado =[], estadosAislado=[], fd=0, cv=0; aislado=0;
   transAislado=trans,estadosAislado=estados; 
   do{
       do{
       if(transAislado[fd][cv]==estadosAislado[fd]){
           aislado++, cv++;
       }
       }while(cv<Alfabeto.length);

       if(aislado==Alfabeto.length){
           transAislado.splice(fd, 1);
           estadosAislado.splice(fd, 1);
           aislado=0, cv=0, fd=0;
       }else{
           aislado=0, cv=0, fd=fd+1;
       }
   }while(fd<estadosAislado.length);
   return[estadosAislado, transAislado];
}*/

function simplificar (estadoAFD, transAFD, alfaAFD){
    var estadoAux = [], transAux = [], alfaAux=[];
    var C0= [];
    estadoAux=estadoAFD, transAux =transAFD, alfaAux=alfaAFD;
    
    for(var t=0; t<estadoAux.length;t++){
        C0.push(estadoAux[t][0]);
    }
    console.log("Estados Iniciales, no Finales y finales (C0)"+": "+C0);
    console.log("Alfabeto: "+alfaAux);

    var MatrizAux= [], ingreso =[], p=0, o=0, v=0;
    console.log("La matriz que contiene las direcciones debe ser de "+C0.length+" por "+alfaAux.length);
    
    do{
        do{
            if(transAux[o][0]==C0[p] && transAux[o][1]==alfaAux[v]){
                ingreso.push(transAux[o][2]);
                v++;
                o=0;
                }else{
                o++;
                }
            }while(v<alfaAux.length && o<transAux.length);
        MatrizAux.push(ingreso);
        ingreso=[];
        p++, v=0,o=0;
    }while(p<C0.length);
    /*const [medioDestino, medioEstado]=identificarAislados(MatrizAux,C0);*/
    const [nuevoDestino, nuevoEstado]=compararDestinos(/*medioDestino*/MatrizAux,/*medioEstado*/C0);
    console.log("Esta es la nueva matriz de destinos: "+nuevoDestino);
    console.log(nuevoDestino);
    console.log("Estos son los nuevos estados: "+nuevoEstado);

    var transFinal=[];
    var ingreso3=[], nivelEstado=0, nivelAlfa=0;
    do{
            ingreso3.push(nuevoEstado[nivelEstado]);
            ingreso3.push(alfaAux[nivelAlfa]);
            ingreso3.push(nuevoDestino[nivelEstado][nivelAlfa]);
            transFinal.push(ingreso3);
            ingreso3=[];
            nivelAlfa++;
        if(nivelAlfa==alfaAux.length){
            nivelEstado++, nivelAlfa=0;
        }
    }while(nivelEstado<nuevoEstado.length);
    console.log(transFinal);
    var estadosFinal=[], ingreso4=[],nivelCaracteristica=0, Inicio="I", noFinal="N", elFinal="F";
    do{
        if(nivelCaracteristica==0){
            ingreso4.push(nuevoEstado[nivelCaracteristica]);
            ingreso4.push(Inicio);
            estadosFinal.push(ingreso4);
            ingreso4=[];
            nivelCaracteristica++;
        }else{
        if(nivelCaracteristica==nuevoEstado.length-1){
            ingreso4.push(nuevoEstado[nivelCaracteristica]);
            ingreso4.push(elFinal);
            estadosFinal.push(ingreso4);
            ingreso4=[];
            nivelCaracteristica++;
        }else{
            ingreso4.push(nuevoEstado[nivelCaracteristica]);
            ingreso4.push(noFinal);
            estadosFinal.push(ingreso4);
            ingreso4=[];
            nivelCaracteristica++;
        }}
    }while(nivelCaracteristica<nuevoEstado.length);
    if(estadosFinal.length==estadoAux.length || transFinal.length==transAux.length){
        console.log("El automata no se puede simplificar mas.");
    }else{
        console.log("La simplificación hizo que el automata finito determinista ingresado con "+estadoAux.length+" Estados y "+transAux.length+" Transiciones pasara a tener "+estadosFinal.length+" Estados y "+transFinal.length+" Transiciones.");
    }
    console.log(nuevoEstado.length);
    console.log(estadosFinal);
}