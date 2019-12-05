/*jshint esversion: 8 */

const srchbtn = document.getElementById("srchbtn");
const showmorebtn = document.getElementById("showmorebtn");
let index = 0;

function displaySearch(cityname) {
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
            sessionStorage.setItem('rooms', JSON.stringify(dataArr));
            console.log(JSON.parse(sessionStorage.getItem('rooms')));
            
            displayRow(index,5,JSON.parse(sessionStorage.getItem('rooms')));
            document.getElementById("showmorebtn").style.display = "block";
            // for( let elem of dataarr) {
            //     displayElem(elem);
            // }
        }
    });
}

async function getData(cityname) {
    let url = `https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&place_name=${cityname.toLowerCase()}`;
    console.log(url);
    let response = await fetch(url);
    let neededForm = await response.json();
    console.log(neededForm);

    return neededForm.response.listings.length == 0 ? "Unknown location" : neededForm.response.listings;
}

function displayElem(elem) {
    let item = document.createElement('div'),
        content = document.createElement('div'),
        content_title = document.createElement('div'),
        content_keywords = document.createElement('div'),
        image = document.createElement('img'),
        info = document.createElement('div'),
        wrap = document.getElementById('wrap');

    function makeFavorBtn() {
        let favorite_button_box = document.createElement('div'),
            favorite_button = document.createElement('div'),
            favorite_button_animation = document.createElement('span');
        
        favorite_button_box.className = 'flexbox';
        favorite_button.className = 'fav-btn';
        favorite_button_animation.className = 'favme dashicons dashicons-heart';

        favorite_button.appendChild(favorite_button_animation);
        favorite_button_box.appendChild(favorite_button);

        return favorite_button_box;
    }

    


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

    info.textContent = "asfsdfdsf";

    item.appendChild(image);
    item.appendChild(content);
    item.appendChild(info);
    wrap.appendChild(item);
}

function displayRow(startIndex, num, array) {
    for (let i=0; i<num; i++) {
        displayElem(array[i+startIndex]);
    }
    index+=num;
}

srchbtn.addEventListener('click', () => displaySearch(document.getElementsByName('textbox')[0].value));
showmorebtn.addEventListener('click', () => displayRow(index,5,JSON.parse(sessionStorage.getItem('rooms'))));