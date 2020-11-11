var alfabeto = []

function setAlfabeto() {
    var size = document.getElementById('size-alfabeto').value;
    var printAlfabeto = document.getElementById('alfabetoTabla');
    // Lo vacia para prevenir problemas
    printAlfabeto.innerHTML = "";
    alfabeto = []
    // Rellena el alfabeto original
    for (var i=0; i<size; i++) {
        // (if) var k = String.fromCharCode(65) + String.fromCharCode(66);
        alfabeto[i] = String.fromCharCode(97+i);
    }
    // Lo imprime por pantalla
    for (var i = 0; i<alfabeto.length; ) {
        var untr = document.createElement("tr");
        for (var k = 0; k<3; k++) {
            var untd = document.createElement("td");
            untd.textContent = alfabeto[i];
            untr.appendChild(untd);
            i++;
        }
        printAlfabeto.appendChild(untr);
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
    if (automata == 'automata1') {
        // Imprime el nombre
        var printNombreAutomata = document.getElementById("name-automata1");
        printNombreAutomata.innerHTML = document.getElementById("automataN1").value;
        // Imprime la tabla de estados y Alfabeto para el automata 1
        var estadosAutomata1 = document.getElementById("estadosA1").value;
        // var printTablaAutomata = document.getElementById("subformulario-tabla");
        // var mayor = 0;
        // if (estadosAutomata1 > alfabeto.length) {
        //     mayor = estadosAutomata1;
        // }
        // else {
        //     mayor = alfabeto.length;
        // }
        // for (var i = 0; i < mayor; ) {
        //     var untr = document.createElement("tr");
        //     for (var k = 0; k < 2; k++) {
        //         var untd1 = document.createElement("td");
        //         untd1.textContent = alfabeto[i];
        //         var untd2 = document.createElement("td");
        //         untd2.textContent = "q"+estados;
        //         untr.appendChild(untd1);
        //         untr.appendChild(untd2);
        //         i++;
        //     }
        //     printTablaAutomata.appendChild(untr);
        // }

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
        var printNombreAutomata = document.getElementById("name-automata2");
        printNombreAutomata.innerHTML = document.getElementById("automataN2").value;

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

function setTransiciones(){
    console.log("relleno");
}
