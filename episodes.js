var usp = new URLSearchParams(window.location.search);
var pageNumber = Number(usp.get("page"));

if(pageNumber == 0){
    pageNumber = 1
}

var xhr = new XMLHttpRequest();
xhr.open("get", "https://rickandmortyapi.com/api/episode?page=" + pageNumber);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        var json = JSON.parse(xhr.responseText);
        //console.log(json);

        var maxPageNumber = json.info.pages;
        var buttonLoc = document.getElementById("paginationButton");

    for(var i = pageNumber - 1; i <= pageNumber + 1; i++){

        if(i >= 1 && i <= maxPageNumber){
            var li = document.createElement("li");
            li.setAttribute("class", "page-item");
    
            var a = document.createElement("a");
            a.setAttribute("class", "page-link");
            a.setAttribute("href", "?page=" + i);
            a.innerHTML = i;
    
            li.appendChild(a);
            buttonLoc.appendChild(li);
        }
        //<li class="page-item"><a class="page-link" href="#">1</a></li>
        
    }

/*<li class="page-item">
<a class="page-link" href="#" aria-label="Next">
<span aria-hidden="true"></span>
</a>
</li>*/

    var liLastPage = document.createElement("li");
    liLastPage.setAttribute("class", "page-item");

    var aLastPage = document.createElement("a");
    aLastPage.setAttribute("class", "page-link");
    aLastPage.setAttribute("href", "?page=" + maxPageNumber);

    var spanLastPage = document.createElement("span");
    spanLastPage.innerHTML = "&raquo;";

    aLastPage.appendChild(spanLastPage);
    liLastPage.appendChild(aLastPage);

    buttonLoc.appendChild(liLastPage);

        for(var i = 0; i < json.results.length; i++){
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            
            td1.appendChild(document.createTextNode(json.results[i].name));
            td2.appendChild(document.createTextNode(json.results[i].air_date));
            td3.appendChild(document.createTextNode(json.results[i].episode));

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            document.getElementById("tBody").appendChild(tr);
        }
    }
};
xhr.send(null);