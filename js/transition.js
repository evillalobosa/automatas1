// ADD transition
var addT = function() {
  var added = document.createElement("div");
  document.getElementById("sub-transicion").appendChild(added);
  // set div ID: Trans
  added.setAttribute("id", "Trans " + document.getElementById("sub-transicion").childElementCount);
  added.setAttribute("style", "padding:10px 0px");

  // set inputs: inicio
  var inicio = document.createElement("input")
  inicio.setAttribute("id", "inicio " + document.getElementById("sub-transicion").childElementCount);
  inicio.setAttribute("type","text");
  inicio.setAttribute("placeholder", "inicio");
  inicio.setAttribute("style", "padding:10px");

  // set inputs: alfabeto
  var alfabeto = document.createElement("input")
  alfabeto.setAttribute("id", "alfabeto " + document.getElementById("sub-transicion").childElementCount);
  alfabeto.setAttribute("type","text");
  alfabeto.setAttribute("placeholder", "alfabeto");
  alfabeto.setAttribute("style", "padding:10px");


  // set inputs: termino
  var termino = document.createElement("input")
  termino.setAttribute("id", "termino " + document.getElementById("sub-transicion").childElementCount);
  termino.setAttribute("type","text");
  termino.setAttribute("placeholder", "termino");
  termino.setAttribute("style", "padding:10px");


  // append inputs
  added.appendChild(inicio);
  added.appendChild(alfabeto);
  added.appendChild(termino);
};
