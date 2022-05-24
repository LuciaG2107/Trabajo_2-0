/**
 * Login
 * -> Se ccreara un apuntador para email y contraseña, 
 * y la funcionalidad al boton para poder agregar a la base de datos
 */
const email = document.querySelector("#correo")
const password = document.querySelector("#contra")
const btnAgregar = document.querySelector("#btn_agregar")

btnAgregar.addEventListener('click',function(){
    window.location.href = `login/${correo.value}/${contra.value}`
})