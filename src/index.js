let composant = document.getElementsByClassName("element");

function Sombre(){
    document.body.style.backgroundColor = "white";
    composant.style.backgroundColor = "white"
    composant.style.color = "black"

}

function Clair(){
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    composant.style.backgroundColor = "black"
    composant.style.color = "white"
    
}
