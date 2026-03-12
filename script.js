import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("SCRIPT CARGADO");

const form = document.getElementById("alumnoForm");
const log = document.getElementById("log");
const boton = document.querySelector(".btn");

function mostrarMensaje(texto,tipo){

log.className="";

if(tipo==="error"){
log.classList.add("msg-error");
}

if(tipo==="success"){
log.classList.add("msg-success");
}

log.innerText = texto;

}

form.addEventListener("submit", async (e) => {

e.preventDefault();

const nombre = document.getElementById("nombre").value.trim();
const numero = document.getElementById("numero").value.trim();
const correo = document.getElementById("correo").value.trim();

/* VALIDACION */

if(!nombre || !numero || !correo){

mostrarMensaje("⚠️ Todos los campos son obligatorios.","error");

return;

}

/* BLOQUEAR BOTON */

boton.disabled=true;
boton.innerText="Guardando...";

const datos={
nombre,
numero,
correo,
fecha: serverTimestamp()
};

try{

await addDoc(collection(db,"messages"),datos);
await addDoc(collection(db,"alumnos"),datos);
await addDoc(collection(db,"alumno"),datos);

/* MENSAJE DE EXITO */

mostrarMensaje(
"✅ Guardado satisfactoriamente, te esperamos en agosto!!!!!",
"success"
);

form.reset();

/* ESPERA DE 10 SEGUNDOS */

let segundos=10;

const contador=setInterval(()=>{

boton.innerText=`Espera ${segundos}s`;

segundos--;

if(segundos<0){

clearInterval(contador);

boton.disabled=false;
boton.innerText="Guardar";

}

},1000);

}catch(error){

console.error(error);

mostrarMensaje("❌ Error al guardar. Intenta nuevamente.","error");

boton.disabled=false;
boton.innerText="Guardar";

}

});