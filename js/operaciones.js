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
        }
        else {
            if (E[i][1] == 'n'){
                E[i][1] = 'f'
            }
            else {
                if (E[i][1] == 'i') {
                    E[i][1] = 'if';
                }
                else {
                    if (E[i][1] == 'if') {
                        E[i][1] = 'i';
                    }
                }
            }
        }
    }

    return E;
}

/** 2.b.2 Unión */
function union (Estados1, Estados2, Alfabeto1, Alfabeto2, Transicion1, Transicion2) {
    //Nuevo Automata
    var neoEstados = [['qE', 'i']], neoAlfabeto = ['E'], neoTransicion = [];
    
    let aux = [], i;

    /* Dejamos el Alfabeto en el nuevo Automata */
    // Antes de todo, identifiquemos si los Alfabetos son iguales.
    var cont_1 = 0;
    for (let i = 0; i < Alfabeto1.length; i++) {
        for (let k = 0; k < Alfabeto2.length; k++) {
            if (Alfabeto1[i] === Alfabeto2[k]) {
                cont_1++;
            }
        }
    }
    if (cont_1 == Alfabeto1.length) {
        aux = Alfabeto1.slice();
        for (let i = 1; aux.length != 0; i++) {
            neoAlfabeto[i] = aux.shift();
        }
    }
    // Si no son iguales, procedemos a juntar ambos Alfabetos.
    else {
        //Primero con el Automata N°1.
        aux = Alfabeto1.slice();
        for (i = 1; aux.length != 0; i++) {
            neoAlfabeto[i] = aux.shift();
        }
        //Luego, con el Automata N°2.
        aux = Alfabeto2.slice();
        for (i = 0; i < neoAlfabeto.length; i++) {
            for (let k = 0; k < aux.length; k++) {
                if (neoAlfabeto[i] == aux[k]) {
                    aux.splice(k, 1);
                }
            }
        }
        for (i = neoAlfabeto.length; aux.length != 0; i++) {
            neoAlfabeto[i] = aux.shift();
        }
    }
    
    /* Dejamos los Estados en el nuevo Automata */
    //Además, cambiamos los Iniciales por No Finales.
    //Primero con el Automata N°1.
    for (i = 0; i < Estados1.length; i++) {
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
    //Luego, con el Automata N°2.
    for (i = 0; i < Estados2.length; i++) {
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
    
    /* Dejamos las transiciones en el nuevo Automata */
    //Primero con el Automata N°1.
    aux = Transicion1.slice();
    for (i = 0; aux.length != 0; i++) {
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
    for (i = neoTransicion.length; aux.length != 0; i++) {
        neoTransicion[i] = aux.shift();
    }

    return [neoEstados, neoAlfabeto, neoTransicion];
}

/** 2.b.3 Concatenación */
function Concatenacion (Automata_1, Automata_2) {
    var neoEstados = [], neoAlfabeto = [], neoTransiciones = [];

    // Guardamos los Estados y las Transiciones del Automata 1 en el nuevo Automata.
    neoEstados = Automata_1[0].slice();
    neoTransiciones = Automata_1[2].slice();

    /** ---- */
    // Guardamos el Alfabeto
    neoAlfabeto = Automata_1[1].slice();

    /** ---- */
    //Procedemos a generar las nuevas Transiciones
    let aux_estados = Automata_2[0].slice();
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
    for (let i = 0; i < Automata_2[2].length; i++) {
        neoTransiciones.push(Automata_2[2][i]);
    }
    
    /** ---- */
    // Guardamos el resto de los Estados.
    console.log(aux_estados[0][1])
    for (let i = neoEstados.length; aux_estados != 0; i++) {
        neoEstados[i] = aux_estados.shift();
        if (neoEstados[i][1] == 'i') {
            neoEstados[i][1] = 'n';
        }
    }
    
    // Si el Automata 2 posee un Estado Inicial Final dejamos todo como está, a excepción del Estado Inicial que pasa a ser No Final.
    // En caso contrario, los Estados Finales del Automata 1 pasan a ser No Finales.
    aux_estados = Automata_2[0].slice();
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
    return [neoEstados, neoAlfabeto, neoTransiciones];
}

/** 2.b.4 Intersección */ 
function Interseccion (Automata_1, Automata_2) {
    var Estados_1 = [], Alfabeto_1 = [], Transiciones_1 = [];
    var Estados_2 = [], Alfabeto_2 = [], Transiciones_2 = [];
    var Estados_3 = [], Alfabeto_3 = [], Transiciones_3 = [];
        // Guardamos los datos en variables separaas.
        Estados_1 = Automata_1[0];
        Alfabeto_1 = Automata_1[1];
        Transiciones_1 = Automata_1[2]
        Estados_2 = Automata_2[0];
        Alfabeto_2 = Automata_2[1];
        Transiciones_2 = Automata_2[2];

        // Para obtener la intersección procedemos a calcular por separado.
        // Obtenemos los complementos de ambos Estados.
        Estados_1 = complemento(Estados_1);
        console.log(Estados_1);

        Estados_2 = complemento(Estados_2);
        console.log(Estados_2);

        // Luego, calculamos la Unión.
        Automata_3 = union (Estados_1, Estados_2, Alfabeto_1, Alfabeto_2, Transiciones_1, Transiciones_2);
        Estados_3 = Automata_3[0];
        Alfabeto_3 = Automata_3[1];
        Transiciones_3 = Automata_3[2];

        // Para finaliza, obtenemos el complemento del Automata Final.
        Estados_3 = complemento(Estados_3);
        
        return Automata_3;
}