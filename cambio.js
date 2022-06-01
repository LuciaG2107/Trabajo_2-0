
/*cambiar boton*/
function cambiar () {
    
    var divObject = document.getElementById ("cambio");
    
    var newContent  =  '<h3>USUARIO</h3><p>Tu usuario es:</p>'+ req.session.usuario+'</p><a href="/login"><button>Ir<i class="bi bi-arrow-right-short"></i></button></a>';
    
    divObject.innerHTML = newContent;
    console.log("entra")
}
console.log("no entra")



/*function recargar(){
    document.getElementById("cambio").innerHTML = "<h3>USUARIO</h3><p>Tu usuario es:</p>"+ req.session.usuario+"</p><a href=/login'><button>Ir<i class='bi bi-arrow-right-short'></i></button></a>";
}*/