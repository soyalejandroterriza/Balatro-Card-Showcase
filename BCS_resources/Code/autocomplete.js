/*let availableKeywords = [
    "Foca",
    "Perro",
    "Gato",
    "León",
    "Tigre",
    "Elefante",
    "Oso",
    "Serpiente",
    "Ballena",
    "Delfín",
    "Caballo",
    "Cebra",
    "Jirafa",
    "Gorila",
    "Mono",
    "Lobo",
    "Koala",
    "Pingüino",
    "Águila",
    "Tiburón"
];*/

// Localizar caja de resultados, caja de input.
/*const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");*/


/*// Lanza la función al levantar una tecla en el campo de input.
inputBox.onkeyup = function(){
    let result = []; // Variable vacía para almacenar los resultados coincidentes.
    let input = inputBox.value; // Almacena lo que haya escrito en el input.

    

    
    if(input.length){ // Comprueba que el input no esté vacío
        result = availableKeywords.filter((keyword) =>{ //Rellena result con todos los resultados que devuelvan true en la función
            //Devuelve true o false, en cuestión de si alguno de los elementos almacenados en la variable incluye lo que está en el input. Ambos en minúscula.
            
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        
        //Saca por consola las sugerencias
        console.log("Sugerencias: " + result);
    }
    //Manda a rellenar el campo de sugerencias con lo que haya en resultado
    
    display(result);

    // Si no hay resultados coincidentes, elimina el contenido de resultsBox, invisibilizándolo.
    if(!result.length){
        resultsBox.innerHTML = "";
    }
}*/


/*
function display(result){ //Saca gráficamente por pantalla el contenido que se le pase, metiéndolo en resultsbox.

    //Map itera el array devolviendo un array duplicado donde cada elemento iterado, ha pasado por la función que se ha descrito. List es el nombre que le damos al elemento a iterar.
    const content = result.map((list)=>{
        //En este caso, el nuevo array estará lleno de código HTML donde cada elemento (llamado list) será envuelto en sus correspondientes etiquetas.
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });


    //Relleno resultsBox con el contenido, esta vez aplicando las etiquetas continentes.
    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}
*/

/*
function selectInput(list){ // En los elementos creados como HTML entre etiquetas LI de la función display, se les añade un evento onclick que lanza este método.
    //Este método permite clicar una de las sugerencias, colocarla en el input (lista para ser buscada) y vacía todo el campo de sugerencias.
    inputBox.value = list.innerHTML;
    resultsBox.innerHTML = "";
}
*/


/*
Falta un método que permita llenar availableKeywords con los elementos a sugerir que a mí me interesen. En este caso,
todos los nombres de las cartas del juego.
*/
