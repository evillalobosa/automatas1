const Estados1 =[["q0","i"],["q1","n"],["q2","n"],["q3","f"]];
const Trans = [["q0","a","q1"],["q0","a","q3"],["q0","a","q0"],["q0","b","q2"],["q0","c","q0"],["q1","c","q1"],["q1","b","q1"],["q2","a","q2"],["q2","b","q3"],["q3","a","q3"],["q3","b","q3"]];
const Alfa1 = ["E","a","b", "c"];

function agregaEstados(matrizD, estadoD, alfaD){
    var matrizDES=[], estadoDES=[], alfaDES=[], guardaNombre=[], a=0, b=0, esCombinado=0, guardaEstado=[], ingreso="k";
    matrizDES=matrizD, estadoDES=estadoD, alfaDES=alfaD;

    do{
    for(var c=0;c<estadoDES.length;c++){
            if(matrizDES[a][b]==estadoDES[c][0]){
            esCombinado=1;
        }
    }
        if(esCombinado==0){
            estadoDES.push([matrizDES[a][b],"n"]);
                guardaNombre=matrizDES[a][b].split("");
                var var1=0;
                do{
                    for(var pot=0;pot<guardaNombre.length;pot++){
                        if(guardaNombre[pot]==";"){
                            var1=1;
                        }
                    }
                    if(var1==1){
                        for(var twerk=0;guardaNombre[twerk]!=";";twerk++){
                            ingreso=ingreso+guardaNombre[twerk];
                        }
                        var algo=ingreso.slice(1, ingreso.length);
                        guardaEstado.push(algo);
                        do{
                            guardaNombre.splice(0,1);
                        }while(guardaNombre[1]==";");
                        guardaNombre.splice(0,1);
                        ingreso="k", var1=0;
                    }else{
                        if(var1==0){
                            var algo2="k";
                            for(var ser=0;ser<guardaNombre.length;ser++){
                                algo2=algo2+guardaNombre[ser];
                            }
                            var algo3=algo2.slice(1, algo2.length);
                            guardaEstado.push(algo3);
                            guardaNombre.splice(0, guardaNombre.length);
                        }
                    }
                }while(guardaNombre.length!=0);

                guardaEstado
            
                var tro=0, tra=0, tru=0, validadorDelNombre=0, guardaLlegada=[], ingresaLlegada=[], ingresoalgo="k";
                do{
                    do{
                        do{
                    if(guardaEstado[tro]==estadoDES[tra][0]){
                        var analisis=matrizDES[tra][tru].split("");
                        for(var two=0;two<analisis.length;two++){
                            if(analisis[two]==";"){
                                validadorDelNombre=1;
                            }
                        }
                            if(validadorDelNombre==1){
                                var var3=0;
                                do{
                                    for(var wq=0;wq<analisis.length;wq++){
                                        if(analisis[wq]==";"){
                                            var3=1;
                                        }
                                    }
                                    if(var3==1){
                                        for(var twerk=0;analisis[twerk]!=";";twerk++){
                                            ingresoalgo=ingresoalgo+analisis[twerk];
                                        }
                                        var algo=ingresoalgo.slice(1, ingresoalgo.length);
                                        guardaLlegada.push(algo);
                                        do{
                                            analisis.splice(0,1);
                                        }while(analisis[1]==";");
                                        analisis.splice(0,1);
                                        ingresoalgo="k", var3=0;
                                    }else{
                                        if(var3==0){
                                            var algo2="k";
                                            for(var ser=0;ser<analisis.length;ser++){
                                                algo2=algo2+analisis[ser];
                                            }
                                            var algo3=algo2.slice(1, algo2.length);
                                            guardaLlegada.push(algo3);
                                            analisis.splice(0, analisis.length); 
                                            var3=2; 
                                        }
                                    }
                                }while(var3!=2);
                                tra++;
                            }else{
                                if(validadorDelNombre==0){
                                    guardaLlegada.push(matrizDES[tra][tru]);
                                }
                                tra++;
                            }
                        }else{
                            tra++;
                        }
                    }while(tra<estadoDES.length);
                        tro++, tra=0;
                    }while(tro<guardaEstado.length);
                    guardaLlegada.sort();
                    var unicos = Array.from(new Set(guardaLlegada));
                    var ka="k";
                    for(var twf=0;twf<unicos.length;twf++){
                        ka=ka+";"+unicos[twf];
                    }
                    var ahoraSi=ka.slice(2, ka.length);
                    ingresaLlegada.push(ahoraSi);
                    guardaLlegada=[];
                    tru++, tra=0, tro=0;
                }while(tru<alfaDES.length);
                matrizDES.push(ingresaLlegada);
            }else{
                if(esCombinado==0){
                    b++;
                    if(b<alfaDES.length){
                        a++;
                        b=0;
                    }
                }
            }
            b++;
                if(b<alfaDES.length){
                    a++;
                    b=0;
                }
        }while(a<matrizDES.length);
        matrizDES
    return[matrizDES, estadoDES];
}



function convertirAFND (estadoAFND, transAFND){//Solo ingresar automatas finitos no deterministas
    var eAUX=[], tranAUX=[], aAUX=[];
    eAUX=estadoAFND, tranAUX=transAFND;
    for(var ret=1; ret<Alfa1.length;ret++){
        aAUX.push(Alfa1[ret]);
    }

    var matrizDestinos=[]; ingresoDestino=[], validaAlfabeto=[], v=0, x=0, k=0, cont1=0;
    do{
        do{
            for(x;x<tranAUX.length;x++){
                if(eAUX[v][0]==tranAUX[x][0] && aAUX[k]==tranAUX[x][1]){
                    cont1++;
                }
            }
            validaAlfabeto.push(cont1);
            cont1=0,x=0, k++;
        }while(k<aAUX.length);
        console.log(validaAlfabeto);
        k=0, x=0;
        var n=0;
        do{
            if(validaAlfabeto[n]==0){
                ingresoDestino.push("NX");
                n++;
            }else{
                if(validaAlfabeto[n]==1){
                    var ñ=0
                    do{
                        if(eAUX[v][0]==tranAUX[x][0] && aAUX[n]==tranAUX[x][1]){
                            ingresoDestino.push(tranAUX[x][2]);
                            ñ=1;
                        }else{
                            x++;
                        }
                    }while(ñ==0);
                    x=0, n++;
                }
                else{
                    if(validaAlfabeto[n]>1){
                        var NNombre="k", estadosMM=[];
                        do{
                            if(eAUX[v][0]==tranAUX[x][0] && aAUX[n]==tranAUX[x][1]){
                                estadosMM.push(tranAUX[x][2]);
                                x++;
                            }else{
                                x++;
                            }
                        }while(x<tranAUX.length);
                        estadosMM.sort();
                        for(var por=0;por<estadosMM.length;por++){
                            NNombre=NNombre+";"+estadosMM[por];
                        }
                        var Nombre=NNombre.slice(2);
                        estadosMM=[];
                        ingresoDestino.push(Nombre), NNombre="k", x=0, n++;
                    }
                }
            }
        }while(n<validaAlfabeto.length);
    matrizDestinos.push(ingresoDestino);
        ingresoDestino=[], validaAlfabeto=[], x=0, n=0, k=0, v++;
    }while(v<eAUX.length);

    console.log(matrizDestinos);
    console.log(eAUX);

    var ingresoVariable=[], teo=0, wet=0, contador=1;
    do{
        if(matrizDestinos[teo][wet]=="NX"){
            matrizDestinos[teo].splice(wet, 1, "Nuevo"+contador);
            for(var hg=0; hg<aAUX.length;hg++){
                ingresoVariable.push("Nuevo"+contador);
            }
            matrizDestinos.push(ingresoVariable);
            eAUX.push(["Nuevo"+contador,"n"]);
            ingresoVariable=[];
            wet++, contador++;
            if(wet>aAUX.length){
                wet=0, teo++;
            }
        }else{
            wet++;
            if(wet>aAUX.length){
                wet=0, teo++;
            }
        }
    }while(teo<matrizDestinos.length);
    console.log(matrizDestinos);
    console.log(eAUX);

    const [matrizConvertida, estadoConvertido]=agregaEstados(matrizDestinos, eAUX, aAUX);
    
    var transFinalAFND=[];
    var ingreso3=[], nivelEstado=0, nivelAlfa=0;
    do{
        ingreso3.push(estadoConvertido[nivelEstado][0]);
        ingreso3.push(aAUX[nivelAlfa]);
        ingreso3.push(matrizConvertida[nivelEstado][nivelAlfa]);
        transFinalAFND.push(ingreso3);
        ingreso3=[];
        nivelAlfa++;
        if(nivelAlfa==aAUX.length){
            nivelEstado++, nivelAlfa=0;
        }
    }while(nivelEstado<estadoConvertido.length);

    matrizDestinos

    console.log(transFinalAFND);
}
convertirAFND(Estados1, Trans);