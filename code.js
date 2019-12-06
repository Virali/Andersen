/*jshint esversion: 8 */

const srchbtn = document.getElementById("srchbtn");
const showmorebtn = document.getElementById("showmorebtn");
let index = 0;
localStorage.setItem('favoriteData', JSON.stringify([]));

function displaySearch(cityname) {
    localStorage.setItem('city',JSON.stringify(cityname));
    localStorage.setItem('requestNumber', 1);

    getData(cityname)
    .then(dataArr => {
        if(dataArr == "Unknown location") {
            let content = document.createElement("P");
            let block = document.getElementById("wrap");
    
            content.innerText = "Unknown location";
            block.appendChild(content);
            block.innerText = "Unknown location";
        }
        else {
            console.log(dataArr);
            // localStorage.setItem('rooms', JSON.stringify(dataArr));
            // console.log(JSON.parse(localStorage.getItem('rooms')));
            
            displayRow(dataArr);
            document.getElementById("showmorebtn").style.display = "block";
            // for( let elem of dataarr) {
            //     displayElem(elem);
            // }
        }
    });
}

async function getData(cityname, pageNumber) {
    if(!pageNumber) pageNumber = 1;
    let url = `https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&place_name=${cityname.toLowerCase()}&page=${pageNumber}&number_of_results=5`;
    console.log(url);
    let response = await fetch(url);
    let neededForm = await response.json();
    console.log(neededForm);

    return neededForm.response.listings.length == 0 ? "Unknown location" : neededForm.response.listings;
}

function displayElem(elem) {
    const item = document.createElement('div');
    const content = document.createElement('div');
    const content_title = document.createElement('div');
    const content_keywords = document.createElement('div');
    const image = document.createElement('img');
    const info = document.createElement('div');
    const wrap = document.getElementById('wrap');
    const emptystar_image = document.createElement('image');
    const info_button_box = document.createElement('a');


    item.className = 'list_item_new';
    image.className = 'item_cover';
    content.className = 'item_content';
    info.className = 'item_info';
    content_title.className = 'content_title';
    content_keywords.className = "content_keywords";
    

    content_title.textContent = elem.title;
    content_keywords.textContent = `${elem.size} sq.ft · ${elem.bedroom_number} Bedrooms · ${elem.bathroom_number} Baths · ` + elem.keywords.replace(/,/g, " · ");

    image.src = elem.img_url;

    content.appendChild(content_title);
    content.appendChild(content_keywords);

    emptystar_image.className = 'emptystar';
    //emptystar_image.content = url("https://www.clipartwiki.com/clipimg/detail/239-2393343_tattoo-simple-star-tattoo-design.png");
    //emptystar_image.style.height = "44px";
    info_button_box.appendChild(emptystar_image);
    info_button_box.textContent = "Add To Favorites";
    info_button_box.addEventListener( 'click',()=> addToFavorite(elem));

    info.appendChild(info_button_box);
    info.appendChild(emptystar_image);

    item.appendChild(image);
    item.appendChild(content);
    item.appendChild(info);
    wrap.appendChild(item);
}

function displayRow(array) {
    for (let i=0; i<5; i++) {
        displayElem(array[i]);
    }
    localStorage.setItem('requestNumber', JSON.parse(localStorage.getItem('requestNumber'))+1);
}

function addToFavorite(elem) {
    let arrayInStorage =JSON.parse(localStorage.getItem('favoriteData'));

    arrayInStorage.push(elem);
    console.log('pushed');
}


srchbtn.addEventListener('click', () => displaySearch(document.getElementsByName('textbox')[0].value));
showmorebtn.addEventListener('click', () => {
    getData( JSON.parse( localStorage.getItem('city') ), JSON.parse( localStorage.getItem('requestNumber')+1))
    .then(dataArr => displayRow(dataArr)); 
});