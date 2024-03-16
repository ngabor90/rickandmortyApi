var usp = new URLSearchParams(window.location.search);
var pageNumber = Number(usp.get("page"));

if (pageNumber == 0) {
    pageNumber = 1
}

var xhr = new XMLHttpRequest();
xhr.open("get", "https://rickandmortyapi.com/api/character?page=" + pageNumber);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        //console.log(json);

        /*
        <div class="col-12 col-md-6 col-lg-3">
        <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-success">Profile</a>
        </div>
      </div>
    </div>
    */

        /*paginateButton*/
        var maxPageNumber = json.info.pages;
        var buttonLoc = document.getElementById("paginateButton");

        for (var i = pageNumber - 1; i <= pageNumber + 1; i++) {

            if (i >= 1 && i <= maxPageNumber) {
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

        for (var i = 0; i < json.results.length; i++) {
            // console.log(json.results[i]);

            var col = document.createElement("div");
            col.setAttribute("class", "col-12 col-md-6 col-lg-3 my-3");

            var card = document.createElement("div");
            card.setAttribute("class", "card w-100 h-100");
            card.setAttribute("style", "width: 18rem;")

            var img = document.createElement("img");
            img.setAttribute("class", "card-img-top");
            img.setAttribute("src", json.results[i].image);
            img.setAttribute("alt", json.results[i].name);

            var cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            var color = "";
            switch (String(json.results[i].status)) {
                case "Alive":
                    color = "green";
                    break;

                case "Dead":
                    color = "red";
                    break;

                case "unknown":
                    color = "black";
                    break;
            }

            var h5 = document.createElement("h5");
            h5.setAttribute("class", "card-title");
            h5.setAttribute("style", `color: ${color}`);
            h5.innerHTML = json.results[i].name;


            var ul = document.createElement("ul");
            var li1 = document.createElement("li");
            var li2 = document.createElement("li");
            var li3 = document.createElement("li");

            var span1 = document.createElement("span");
            var span2 = document.createElement("span");
            var span3 = document.createElement("span");

            span1.appendChild(document.createTextNode("Gender: "))
            span2.appendChild(document.createTextNode("Status: "))
            span3.appendChild(document.createTextNode("Species: "))

            span1.setAttribute("style", "font-weight: bold;");
            span2.setAttribute("style", "font-weight: bold;");
            span3.setAttribute("style", "font-weight: bold;");

            li1.appendChild(span1);
            li2.appendChild(span2);
            li3.appendChild(span3);

            li1.appendChild(document.createTextNode(json.results[i].gender));
            li2.appendChild(document.createTextNode(json.results[i].status));
            li3.appendChild(document.createTextNode(json.results[i].species));

            var a = document.createElement("a");
            a.setAttribute("href", "/profile.html?id=" + json.results[i].id + "&back=" + pageNumber);
            a.setAttribute("class", "btn btn-success w-100");
            a.innerHTML = "Profile";

            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(li3);

            cardBody.appendChild(h5);
            cardBody.appendChild(ul);
            cardBody.appendChild(a);

            card.appendChild(img);
            card.appendChild(cardBody);

            col.appendChild(card);

            tBody.appendChild(col);

        }
    }
};
xhr.send(null);