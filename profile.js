var usp = new URLSearchParams(window.location.search);
var id = usp.get("id");
var back = usp.get("back");

console.log(id);

var xhr = new XMLHttpRequest();
xhr.open("get", "https://rickandmortyapi.com/api/character/" + id);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        var json = JSON.parse(xhr.responseText);
        //console.log(json);
    
        document.getElementById("name").innerHTML = json.name;
        document.getElementById("gender").innerHTML = json.gender;
        document.getElementById("status").innerHTML = json.status;
        document.getElementById("species").innerHTML = json.species;

        var kep = document.getElementById("kep");
        kep.setAttribute("src", json.image);
        kep.setAttribute("alt", json.name);
        kep.setAttribute("name", json.name);
        kep.setAttribute("class", "w-100");

        document.getElementById("backButton").setAttribute("href", "index.html?page=" + back);
    }   
};
xhr.send(null);