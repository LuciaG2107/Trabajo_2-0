/**COMUNICACION ENTRE EN BACKEND Y FRONTEND*/

const http = new XMLHttpRequest();


function btn_pruebaLogout() {
    console.log("llega aqui")
    http.open("GET", "/test");
    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
        }
    }
    http.send()
}

function btn_inicioMap() {
    //console.log("llega aqui")
    http.open("GET", "/map");
    http.send()
    http.onreadystatechange = function () {
        //var respText = this.responseText;

        if (this.readyState == 4 && this.status == 200) {

            //console.log(this.responseText)
            //var json = JSON.stringify(this.responseText);
            //var result = json.results;
            console.log(this.responseText)
            funcionre(this.responseText)
        }
        
       
    }
    console.log(results)

}

/*function btn_inicioMap(){
    
}
http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};
http.open("GET", '/map', true);
http.send();*/


