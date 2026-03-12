import { db } from "./firebase.js";
console.log("SCRIPT CARGADO");

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("alumnoForm");
const log = document.getElementById("log");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const nombre = document.getElementById("nombre").value;
const numero = document.getElementById("numero").value;
const correo = document.getElementById("correo").value;

const datos = {
nombre,
numero,
correo,
fecha: serverTimestamp()
};

try{

await addDoc(collection(db,"messages"),datos);
await addDoc(collection(db,"alumnos"),datos);
await addDoc(collection(db,"alumno"),datos);

log.innerHTML = "Registro guardado correctamente";
form.reset();

}catch(error){

console.error(error);
log.innerHTML = "Error al guardar";

}

});