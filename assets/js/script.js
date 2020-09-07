let FavList = [];

const rescontainer = document.getElementById('result-container');
const containerele = document.getElementById('fav-list-container');

async function searchApi(val) {
    try {
        const res = await fetch(`https://superheroapi.com/api.php/10157143645741244/search/${val}`);
        const data = await res.json();

        if (data.response !== 'error') {
            init(data);
        } else {
            hideList();
        }
    }
    catch (err) {
        console.log("Lo aa gaya Error", err);
    }
}

//creating the search list item
function init(data) {
    rescontainer.style.visibility = "visible";
    rescontainer.style.opacity = "1";
    let res = data.results;
    res.map((item) => {

        let ele = document.createElement("div");

        ele.classList.add("ele-div");

        let image = document.createElement("img");
        image.setAttribute("src", item.image.url);
        image.classList.add("hero-img");

        let txtele = document.createElement("div");
        txtele.classList.add("ele-div__title");

        let title = document.createElement("span");
        title.innerText = item.name;
        title.classList.add("title");

        let favBtn = document.createElement("button");
        favBtn.innerText = "Fav";
        favBtn.classList.add("fav-btn");

        txtele.appendChild(title);
        txtele.appendChild(favBtn);

        ele.appendChild(image);
        ele.prepend(txtele);

        // rescontainer.appendChild(ele);
        rescontainer.prepend(ele);

        favBtn.addEventListener('click', (e) => {

            FavList.push(item);
            console.log("FavList Array", FavList);
            localStorage.setItem('FavList', JSON.stringify(FavList));
            console.log("After setitem : ", FavList);
            openFav(item);
        });
    })
}



function openFav(item) {

    //Hide Search list when added item to fav
    hideList();

    console.log("Inside Fav List function", item);

    // let containerele = document.createElement("div");
    containerele.classList.add("fav-list");

    //inner container for items
    let favListInsideContainer = document.createElement("div");
    favListInsideContainer.classList.add("fav-list-container__item");

    let favImg = document.createElement("img");
    favImg.setAttribute("src", item.image.url);
    favImg.classList.add("fav-list-container__item-img");

    let titleEle = document.createElement("div");
    titleEle.classList.add("fav-list__title");

    let titletxt = document.createElement("span");
    titletxt.innerText = item.name;
    titleEle.appendChild(titletxt);

    let bioInfo = document.createElement("p");
    bioInfo.innerText = "Full Name : " + item.biography["full-name"];

    titleEle.appendChild(bioInfo);

    let combat = document.createElement("p");
    combat.innerText = "combat : " + item.powerstats["combat"];
    titleEle.appendChild(combat);

    let power = document.createElement("p");
    power.innerText = "Power : " + item.powerstats["power"];
    titleEle.appendChild(power);

    let removefromFavBtn = document.createElement("button");
    removefromFavBtn.innerText = "UnFav";
    // removefromFavBtn.setAttribute("id", index);
    titleEle.appendChild(removefromFavBtn);

    favListInsideContainer.appendChild(favImg);
    favListInsideContainer.appendChild(titleEle);
    containerele.prepend(favListInsideContainer);

    //remove favor from Fav list
    removefromFavBtn.addEventListener('click', function () {

        const index = FavList.indexOf(item);

        if (index > -1) {
            FavList.splice(index, 1);
        }

        containerele.removeChild(favListInsideContainer);



        console.log(index);
        console.log(FavList);

        localStorage.setItem('FavList', JSON.stringify(FavList));


    })

    // console.log("Called");
    // if (containerele !== 'undefined') {
    //     saveResultHtml = containerele.innerHTML;
    // }


}

function hideList() {
    rescontainer.style.visibility = "hidden";
    rescontainer.style.opacity = "0";

    let inputCont = document.getElementById('search-input');
    inputCont.value = '';
}

window.onload = () => {

    // document.getElementById('fav-list-container').innerHTML = localStorage.getItem('FavList');

    //parsing saved list into arrayList

    console.log("Inside Onload");

    let saved = JSON.parse(localStorage.getItem('FavList'));

    console.log("FavList on Load after saving saved from LocalStorage");
    if (saved !== null) {
        FavList = saved;

        saved.map((item) => {
            // openFav(item, index);
            openFav(item);
        })
    }
}


clearLS = () => {
    localStorage.clear();
}