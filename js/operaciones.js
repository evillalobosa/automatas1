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
            estado1= [];
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
            estado2= [];
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
           console.log("Se ha ingresado correctamente la etiqueta para el automata 1");
           console.log(estado1);
       }
   }
   else {
    //    Si es automata 2
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
           console.log("Se ha ingresado correctamente la etiqueta para el automata 2");
           console.log(estado2);
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
               console.error("Cantidad de transiciones con concuerda que el tipo de automata");
               alert("Cantidad de transiciones con concuerda que el tipo de automata");
           }
           for(i=1;i<alfabeto.length;i++){
               for(j=0;j<transicion1.length;j++){
                   if(alfabeto[i] == transicion1[j][1]){
                       cont++;
                   }
               }
               if(cont != estado1.length){
                   validacion=0;
                   console.error("Cantidad de transiciones con concuerda que el tipo de automata");
                   alert("Cantidad de transiciones con concuerda que el tipo de automata");
               }
               cont=0;
           }
        }
        var aux1=0;
        var aux2=0;
        var aux3=0;

      for(i=0;i<transicion1.length;i++){
        for(j=0;j<estado1.length;j++){
          if(transicion1[i][0]==estado1[j][0]){
            aux1++;
          }
          if(transicion1[i][2]==estado1[j][0]){
            aux2++;
          }
        }
        for(k=0;k<alfabeto.length;k++){
          if(transicion1[i][1]==alfabeto[k]){
            aux3++;
          }
        }
        if((aux1==0) || (aux2==0) || (aux3==0)){
          validacion=0;
          console.error("Elemento no presente en datos previamente guardados");
          alert("Elemento no presente en datos previamente guardados");
        }
        aux1=0;
        aux2=0;
        aux3=0;
      }
   }
   else{
       if(T2BOOL == false){
           if(contadorBoton != ((estado2.length)*(alfabeto.length - 1))){
               validacion==0;
               console.error("Cantidad de transiciones con concuerda que el tipo de automata");
               alert("Cantidad de transiciones con concuerda que el tipo de automata");
           }
           for(i=1;i<alfabeto.length;i++){
               for(j=0;j<transicion2.length;j++){
                   if(alfabeto[i] == transicion2[j][1]){
                       cont++;
                   }
               }
               if(cont != estado2.length){
                   validacion=0;
                   console.error("Cantidad de transiciones con concuerda que el tipo de automata");
                   alert("Cantidad de transiciones con concuerda que el tipo de automata");
               }
               cont=0;
           }
       }
        var aux1=0;
        var aux2=0;
        var aux3=0;

      for(i=0;i<transicion2.length;i++){
        for(j=0;j<estado2.length;j++){
          if(transicion2[i][0] == estado2[j][0]){
            aux1++;
          }
          if(transicion2[i][2] == estado2[j][0]){
            aux2++;
          }
        }
        for(k=0;k<alfabeto.length;k++){
          if(transicion2[i][1] == alfabeto[k]){
            aux3++;
          }
        }
        if((aux1==0) || (aux2==0) || (aux3==0)){
          validacion=0;
          console.error("Elemento no presente en datos previamente guardados");
          alert("Elemento no presente en datos previamente guardados");
        }
        aux1=0;
        aux2=0;
        aux3=0;
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
           console.log("Se han ingreasdo transiciones al automata 1: ");
           console.log(transicion1);
       }else{
           console.log("Se han ingreasdo transiciones al automata 2: ");
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

// Funcion cuando se oprime 'Añadir transiciones de estado'
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
            untd2.textContent = estado1[i];
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
        IngresarEstados("automata2");
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
            untd2.textContent = estado2[i];
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
