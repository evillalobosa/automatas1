var alfabeto=[];
var estado1=[];
var estado2=[];
var transicion1=[];
var transicion2=[];
var T1BOOL;
var T2BOOL;
var contadorBoton = 0;


function setAlfabeto() {
    var size = document.getElementById('size-alfabeto').value;
    var printAlfabeto = document.getElementById('alfabetoTabla');
    // Lo vacia para prevenir problemas
    printAlfabeto.innerHTML = "";
    alfabeto = []

    // Rellena el alfabeto original
    if(size > 0){
       alfabeto.push("E");
       var aux;
       var Textaux;
       var textaux2;
       for(i=0;i<size;i++){
           if(i <= 25){
               aux=97+i;
               aux=String.fromCharCode(aux);
           }
           else {
               textaux=96+(Math.trunc(i/26));
               textaux=String.fromCharCode(textaux);
               textaux2=97+(i-(26*(Math.trunc(i/26))));
               textaux2=String.fromCharCode(textaux2);
               aux=textaux.concat(textaux2);
           }
           alfabeto.push(aux);
       }
       console.log("Se ha ingresado el alfabeto\n");
       console.log(alfabeto);
   }
   else{
       console.error("Debe ingresar un número mayor a 1");
       alert("Debe ingresar un número mayor a 1");
   }

    // Lo imprime la tabla por pantalla
    for (var i = 0; i<alfabeto.length; i++) {
        var untr = document.createElement("tr");
        var untd = document.createElement("td");
        untd.textContent = alfabeto[i];
        untr.appendChild(untd);
        printAlfabeto.appendChild(untr);
    }
}

function IngresarEstados(automata) {
    var validacion=0;
    var Textaux;
    // Si el automata ingresado es 1
    if(automata == "automata1"){
        var NumeroIngresado = document.getElementById("estadosA1").value;
        if(NumeroIngresado >= 1){
            estados1= [];
            validacion = 1;
        }
        else {
            alert("Numero menor a 1 o letra");
            console.error("Numero menor a 1 o letra");
            return false;
        }

        if(validacion == 1){
            var letra ="q";
            for(i=0;i<NumeroIngresado;i++){
                Textaux=letra.concat(i);
                estado1.push([Textaux,"n"]);
            }
        }
    }
    else {
        // Sino el automata ingresado es 2
        var NumeroIngresado = document.getElementById("estadosA2").value;
        if(NumeroIngresado >= 1){
            estados2= [];
            validacion = 1;
        }
        else {
            alert("Numero menor a 1 o letra");
            console.error("Numero menor a 1 o letra");
            return false;
        }
        if(validacion == 1){
            var letra ="r";
            for(i=0;i<NumeroIngresado;i++){
                Textaux=letra.concat(i);
                estado2.push([Textaux,"n"]);
            }
        }
    }

    if(automata == "automata1"){
        T1BOOL = document.getElementById("afdA1").checked;
        if (T1BOOL == false) {
            console.log("[Automata 1]\n\tTipo: AFD\n\tSe han ingresado: "+estado1.length+" estados")
        }
        else {
            console.log("[Automata 1]\n\tTipo: ANFD\n\tSe han ingresado: "+estado1.length+" estados")
        }
        console.log(estado1);
    }
    else {
        T2BOOL = document.getElementById("afdA2").checked;
        if (T2BOOL == false) {
            console.log("[Automata 2]\n\tTipo: AFD\n\tSe han ingresado: "+estado2.length+" estados")
        }
        else {
            console.log("[Automata 2]\n\tTipo: ANFD\n\tSe han ingresado: "+estado2.length+" estados")
        }
        console.log(estado2);
    }
}

function IngresarEtiquetas(automata){
   var validacion=0;

   if(automata=="automata1"){
       var NumeroIngresado = document.getElementById("etiquetaA1").value;
       var BoolIngresado = document.getElementById("etiquetaB1").checked;

       if(estado1.length > NumeroIngresado){
           validacion=1;
       }
       else{
           console.error("Numero de estados finales mayor al maximo posible")
           alert("Numero de estados finales mayor al maximo posible");
       }

       if(validacion==1){
           for(i=0;i<estado1.length;i++){
               if(i==0){
                   if(BoolIngresado==true){
                       estado1[i][1]="if";
                   }
                   else{
                       estado1[i][1]="i";
                   }
               }
               if(i>=((estado1.length)-NumeroIngresado)){
                   estado1[i][1]="f";
               }
           }
       }
   }
   else {
       var NumeroIngresado = document.getElementById("etiquetaA2").value;
       var BoolIngresado = document.getElementById("etiquetaB2").value;

       if(estado1.length > NumeroIngresado){
           validacion=1;
       }
       else{
           console.error("Numero de estados finales mayor al maximo posible")
           alert("Numero de estados finales mayor al maximo posible");
       }

       if( validacion == 1){
           for(i=0;i<estado2.length;i++){
               if(i==0){
                   if(BoolIngresado==true){
                       estado2[i][1]="if";
                   }
                   else{
                       estado2[i][1]="i";
                   }
               }
               if(i>=((estado2.length)-NumeroIngresado)){
                   estado2[i][1]="f";
               }
           }
       }
   }
}

function setTransiciones(automata){
    var cont=1;
    var validacion=1;

    do{
        var Estado1Ingresado = document.getElementById("inicio"+cont).value;
        var Estado2Ingresado = document.getElementById("termino"+cont).value;
        var ABCIngresado = document.getElementById("alfabeto"+cont).value;

        if(automata == "automata1"){
            transicion1.push([Estado1Ingresado,ABCIngresado,Estado2Ingresado]);
        }
        else {
            // Automata 2
            transicion2.push([Estado1Ingresado,ABCIngresado,Estado2Ingresado]);
        }
        cont++;
    }while(cont <= contadorBoton);

    cont=0;
    if(automata == "automata1"){
        if(T1BOOL == false){
            if(contadorBoton != ((estado1.length)*(alfabeto.length - 1))){
               validacion==0;
               console.error("cantidad de transiciones con concuerda que el tipo de automata");
               alert("cantidad de transiciones con concuerda que el tipo de automata");
           }
           for(i=1;i<alfabeto.length;i++){
               for(j=0;j<transicion1.length;j++){
                   if(alfabeto[i] == transicion1[j][1]){
                       cont++;
                   }
               }
               if(cont != estados1.length){
                   validacion=0;
                   console.error("cantidad de transiciones con concuerda que el tipo de automata");
                   alert("cantidad de transiciones con concuerda que el tipo de automata");
               }
               cont=0;
           }
       }
   }
   else{
       if(T2BOOL == false){
           if(contadorBoton != ((estado2.length)*(alfabeto.length - 1))){
               validacion==0;
               console.error("cantidad de transiciones con concuerda que el tipo de automata");
               alert("cantidad de transiciones con concuerda que el tipo de automata");
           }
           for(i=1;i<alfabeto.length;i++){
               for(j=0;j<transicion2.length;j++){
                   if(alfabeto[i] == transicion2[j][1]){
                       cont++;
                   }
               }
               if(cont != estados2.length){
                   validacion=0;
                   console.error("cantidad de transiciones con concuerda que el tipo de automata");
                   alert("cantidad de transiciones con concuerda que el tipo de automata");
               }
               cont=0;
           }
       }
   }
   if(validacion == 0){
       if(automata == "automata1"){
           transicion1=[]
       }else{
           transicion2=[]
       }
   }else{
       if(automata == "automata1"){
           console.log("Se han ingreasdo transiciones al automta 1: ");
           console.log(transicion1);
       }else{
           console.log("Se han ingreasdo transiciones al automta 2");
           console.log(transicion2);
       }
   }
}

 // Transiciones AFD
var addTransicionAFD = function (estados,id) {
    // Si es AFD el numero de transiciones esta limitado al numero de estados
    for(var i=0; i<estados*alfabeto.length; i++){
        addTransicionANFD(id);
    }
};

// Añadir transicion para un anfd con un tamaño indeterminado
var addTransicionANFD = function(transicion) {
    contadorBoton++;

    var div = document.createElement("div");
    document.getElementById(transicion).appendChild(div);
    // Set div ID: Trans+#n
    div.setAttribute("id", "Trans" + document.getElementById(transicion).childElementCount);
    div.setAttribute("style", "padding:10px 0px; display:flex;");

    // Set inputs: inicio
    var inicio = document.createElement("input")
    inicio.setAttribute("id", "inicio" + document.getElementById(transicion).childElementCount);
    inicio.setAttribute("type","text");
    inicio.setAttribute("placeholder", "inicio");
    inicio.setAttribute("style", "padding:10px; width:100px;");

    // Set inputs: alfabeto
    var alfabeto = document.createElement("input")
    alfabeto.setAttribute("id", "alfabeto" + document.getElementById(transicion).childElementCount);
    alfabeto.setAttribute("type","text");
    alfabeto.setAttribute("placeholder", "alfabeto");
    alfabeto.setAttribute("style", "padding:10px; width:100px;");

    // Set inputs: termino
    var termino = document.createElement("input")
    termino.setAttribute("id", "termino" + document.getElementById(transicion).childElementCount);
    termino.setAttribute("type","text");
    termino.setAttribute("placeholder", "termino");
    termino.setAttribute("style", "padding:10px; width:100px;");

    // Append inputs
    div.appendChild(inicio);
    div.appendChild(alfabeto);
    div.appendChild(termino);
};

function afdAnfd(automata) {
    contadorBoton = 0;

    if (automata == 'automata1') {
        IngresarEstados("automata1")
        // Imprime el nombre del automata
        var printNombreAutomata = document.getElementById("name-automata1");
        printNombreAutomata.innerHTML = document.getElementById("automataN1").value;
        // Imprime la tabla de estados y Alfabeto para el automata 1
        var estadosAutomata1 = document.getElementById("estadosA1").value;
        var printTablaAutomata = document.getElementById("automata1-tabla");
        printTablaAutomata.innerHTML = "";
        var mayor = 0;
        if (estadosAutomata1 > alfabeto.length) {
            mayor = estadosAutomata1;
        }
        else {
            mayor = alfabeto.length;
        }
        for (var i = 0; i < mayor; i++) {
            var untr = document.createElement("tr");
            var untd1 = document.createElement("td");
            untd1.textContent = alfabeto[i];
            var untd2 = document.createElement("td");
            untd2.textContent = "q"+estadosAutomata1;
            untr.appendChild(untd1);
            untr.appendChild(untd2);
            printTablaAutomata.appendChild(untr);
        }

        // Procede a crear las casillas para las transiciones
        var boolAFD1 = document.getElementById("afdA1").checked;
        // Determina si el automata 1 es afd sino es anfd (false=afd; true=anfd)
        if (boolAFD1 == false) {
            // Limpia el area de ingreso previo en caso de cambio
            document.getElementById("transicion-input1").innerHTML = '';
            document.getElementById("sub-transicion1").innerHTML = '';
            // Crea tantas transiciones como estados tenga el automata y los deja en el div con id:sub-transicion1
            addTransicionAFD(estadosAutomata1,'sub-transicion1');
        }
        else {
            // Limpia el area de ingreso previo en caso de cambio
            document.getElementById("sub-transicion1").innerHTML = '';
            // Crea el boton para Añadir
            anadir = ['<button type=button onclick=addTransicionANFD("sub-transicion1")>Añadir</button>']
            // Lo ingresa en la  pagina
            var addHtml = document.getElementById("transicion-input1");
            addHtml.innerHTML = anadir;
        }
    }
    else {
        // Si es automata 2
        IngresarEstados("automata2")
        // Imprime el nombre del automata
        var printNombreAutomata = document.getElementById("name-automata2");
        printNombreAutomata.innerHTML = document.getElementById("automataN2").value;
        // Imprime la tabla de estados y Alfabeto para el automata 1
        var estadosAutomata1 = document.getElementById("estadosA2").value;
        var printTablaAutomata = document.getElementById("automata2-tabla");
        printTablaAutomata.innerHTML = "";
        var mayor = 0;
        if (estadosAutomata1 > alfabeto.length) {
            mayor = estadosAutomata1;
        }
        else {
            mayor = alfabeto.length;
        }
        for (var i = 0; i < mayor; i++) {
            var untr = document.createElement("tr");
            var untd1 = document.createElement("td");
            untd1.textContent = alfabeto[i];
            var untd2 = document.createElement("td");
            untd2.textContent = "q"+estadosAutomata1;
            untr.appendChild(untd1);
            untr.appendChild(untd2);
            printTablaAutomata.appendChild(untr);
        }

        // Procede a crear las casillas para las transiciones
        var boolAFD2 = document.getElementById("afdA2").checked;
        // Determina si el automata 2 es afd sino es anfd (false=afd; true=anfd)
        if (boolAFD2 == false) {
            // Limpia el area de ingreso previo en caso de cambio
            document.getElementById("transicion-input2").innerHTML = '';
            document.getElementById("sub-transicion2").innerHTML = '';
            // Crea tantas transiciones como estados tenga el automata y los deja en el div con id:sub-transicion2
            var estadosAutomata2 = document.getElementById("estadosA2").value;
            addTransicionAFD(estadosAutomata2,'sub-transicion2');
        }
        else {
            // Limpia el area de ingreso previo en caso de cambio
            document.getElementById("sub-transicion2").innerHTML = '';
            // Crea el boton para Añadir
            anadir = ['<button type=button onclick=addTransicionANFD("sub-transicion2")>Añadir</button>']
            // Lo ingresa en la  pagina
            var addHtml = document.getElementById("transicion-input2");
            addHtml.innerHTML = anadir;
        }
    }
}

/** PARTE 2.b */
/** 2.b.1 Complemento */
function complemento (E) {
    for (let i = 0; i < E.length; i++) {
        if (E[i][1] == 'f') {
            E[i][1] = 'n';
            console.log(E[i] + " pasó de Final a No Final");
        }
        else {
            if (E[i][1] == 'n'){
                E[i][1] = 'f'
                console.log(E[i] + " pasó de No Final a Final");
            }
            else {
                if (E[i][1] == 'i') {
                    E[i][1] = 'if';
                    console.log(E[i] + " pasó de Inicial a Inicial Final");
                }
                else {
                    if (E[i][1] == 'if') {
                        E[i][1] = 'i';
                        console.log(E[i] + " pasó de Inicial Final a Inicial");
                    }
                }
            }
        }
    }

    return E;
}

/** 2.b.2 Unión */
function union (Estados1, Estados2, Alfabeto, Transicion1, Transicion2) {
    //Nuevo Automata
    var neoEstados = [['qE', 'i']], neoAlfabeto = [], neoTransicion = [];

    /* Dejamos el Alfabeto en el nuevo Automata */
    neoAlfabeto = Alfabeto.slice();
    
    
    /* Dejamos los Estados en el nuevo Automata */
    //Además, cambiamos los Iniciales por No Finales.
    //Primero con el Automata N°1.
    for (let i = 0; i < Estados1.length; i++) {
        if (Estados1[i][1] === 'i') {
            aux = Estados1[i];
            aux[1] = 'n';
            neoEstados.push(aux);
        }
        else {
            if (Estados1[i][1] === 'if') {
                aux = Estados1[i];
                aux[1] = 'f';
                neoEstados.push(aux);
            }
            else {
                neoEstados.push(Estados1[i]);
            }
        }
        
    }
    console.log("Guardamos los primeros Estados a nuestro nuevo Automata : [" + neoEstados + "]");
    //Luego, con el Automata N°2.
    for (let i = 0; i < Estados2.length; i++) {
        if (Estados2[i][1] === 'i') {
            aux = Estados2[i];
            aux[1] = 'n';
            neoEstados.push(aux);
        }
        else {
            if (Estados2[i][1] === 'if') {
                aux = Estados2[i];
                aux[1] = 'f';
                neoEstados.push(aux);
            }
            else {
                neoEstados.push(Estados2[i]);
            }
        }
    }
	console.log("Y listo, nuestro Automata posee todos los Estados que necesitamos : [" + neoEstados + "]");

    /* Dejamos las transiciones en el nuevo Automata */
    //Primero con el Automata N°1.
    aux = Transicion1.slice();
    for (let i = 0; aux.length != 0; i++) {
        if (i === 0){
            neoTransicion[i] = [neoEstados[0][0], 'E', Estados1[0][0]];
            i++;
            neoTransicion[i] = [neoEstados[0][0], 'E', Estados2[0][0]];
        }
        else 
            neoTransicion[i] = aux.shift();
    }
    //Luego, con el Automata N°2. 
    aux = Transicion2.slice();
    for (let i = neoTransicion.length; aux.length != 0; i++) {
        neoTransicion[i] = aux.shift();
    }
    console.log("Obtenemos todas las transciones para nuestro nuevo Automata : [" + neoTransicion + "]");

    return [neoEstados, neoAlfabeto, neoTransicion];
}

/** 2.b.3 Concatenación */
function Concatenacion (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2) {
    var neoEstados = [], neoAlfabeto = [], neoTransiciones = [];

    // Guardamos los Estados y las Transiciones del Automata 1 en el nuevo Automata.
    neoEstados = Estado_1.slice();
    neoTransiciones = Transicion_1.slice();

    /** ---- */
    // Guardamos el Alfabeto
    neoAlfabeto = Alfabeto.slice();

    /** ---- */
    //Procedemos a generar las nuevas Transiciones
    let aux_estados = Estado_2.slice();
    for (let i = 0; i < aux_estados.length; i++) {
        for (let k = 0; k < neoAlfabeto.length; k++) {
            for (let q = 0; q < neoEstados.length; q++) {
                if (neoEstados[q][1] == 'f' || neoEstados[q][1] == 'if') {
                    if (neoTransiciones[i][1] != neoAlfabeto[k]) {
                        var aux_transiciones = [neoEstados[q][0], neoAlfabeto[k], aux_estados[i][0]];
                        neoTransiciones.push(aux_transiciones);
                    }
                }
            }
        }
    }
    // Luego guardamos el resto de Transiciones.
    for (let i = 0; i < Transicion_2.length; i++) {
        neoTransiciones.push(Transicion_2[i]);
    }
    console.log("Así es como queda la nueva Transición : [" + neoTransiciones + "]");

    /** ---- */
    // Guardamos el resto de los Estados.
    console.log(aux_estados[0][1])
    for (let i = neoEstados.length; aux_estados != 0; i++) {
        neoEstados[i] = aux_estados.shift();
        if (neoEstados[i][1] == 'i') {
            neoEstados[i][1] = 'n';
        }
    }
    console.log("Continuamos con como queda los nuevos Estados : [" + neoEstados + "]");

    // Si el Automata 2 posee un Estado Inicial Final dejamos todo como está, a excepción del Estado Inicial que pasa a ser No Final.
    // En caso contrario, los Estados Finales del Automata 1 pasan a ser No Finales.
    aux_estados = Estado_2.slice();
    if (aux_estados[0][1] != 'if') {
        for (let i = 0; i < neoEstados.length - aux_estados.length; i++) {
            if (neoEstados[i][1] == 'f') {
                neoEstados[i][1] = 'n';
                
            }
            else {
                if (neoEstados[i][1] == 'if') {
                    neoEstados[i][1] = 'i';
                }
            }
        }
    }
    else {
        for (let i = 0; i < neoEstados.length; i++) {
            if (aux_estados[0] == neoEstados[i]) {
                neoEstados[i][1] = 'f';
            }
        }
    }

    /** ---- */
    // Retornamos el nuevo Automata.
    console.log("Después de todos los cambios, así queda nuestro Automata : ");
    console.log("[" + neoEstados + "], [" + neoAlfabeto + "], [" + neoTransiciones + "]");
    return [neoEstados, neoAlfabeto, neoTransiciones];
}

/** 2.b.4 Intersección */ 
function Interseccion (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2) {
    var Automata_neo = [], Estados_neo = [], Alfabeto_neo = [], Transicion_neo = [];
    
    // Para obtener la intersección debemos calcular lo siguiente:
    // (L1 ∩ L2) = (L1^c ∪ L2^c)^c
    // Obtenemos los complementos de ambos Estados.
    Estado_1 = complemento(Estado_1);
    console.log("Estos son los elementos del Estado 1 : [" + Estados_1 + "]");

    Estado_2 = complemento(Estado_2);
    console.log("Estos son los elementos del Estado 2 : [" + Estados_1 + "]");

    // Luego, calculamos la Unión.
    Automata_neo = union (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2);
    Estados_neo = Automata_neo;
    
    // Para finaliza, obtenemos el complemento del Automata Final.
    Estados_neo = complemento(Estados_3);
    Alfabeto_neo = Automata_neo;
    Transicion_neo = Automata_neo;

    return [Estados_neo, Alfabeto_neo, Transicion_neo];
}