import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth,
signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("SCRIPT CARGADO");

const auth = getAuth();

const form = document.getElementById("alumnoForm");
const log = document.getElementById("log");
const boton = document.querySelector(".btn");

/* AUTENTICACION ANONIMA */

signInAnonymously(auth)
.then(()=>{
console.log("Usuario autenticado");
})
.catch((error)=>{
console.error("Error de autenticación:",error);
});

/* MENSAJES */

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

/* ENVIO FORMULARIO */

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

/* GUARDAR EN FIRESTORE */

await addDoc(collection(db,"alumnos"),datos);

mostrarMensaje(
"✅ Guardado satisfactoriamente, te esperamos en agosto!!!",
"success"
);

form.reset();

/* CONTADOR */

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

console.error("ERROR FIREBASE:",error);

if(error.code==="permission-denied"){

mostrarMensaje("❌ Permiso denegado en Firestore. Revisa las reglas.","error");

}else{

mostrarMensaje("❌ Error al guardar en la base de datos.","error");

}

boton.disabled=false;
boton.innerText="Guardar";

}

});