/*jshint esversion: 8 */

const srchbtn = document.getElementById("srchbtn");
const showmorebtn = document.getElementById("showmorebtn");
const favorBoxButton = document.getElementsByClassName("favorite_box")[0];
let index = 0;
if(!JSON.parse(localStorage.getItem('favoriteData'))) localStorage.setItem('favoriteData', JSON.stringify( [] ));
const favoriteData = JSON.parse(localStorage.getItem('favoriteData'));

function displaySearch(cityname) {
    localStorage.setItem('city',JSON.stringify(cityname));
    localStorage.setItem('requestNumber', 1);

    getData(cityname)
    .then(dataArr => {
        if(dataArr === "Unknown location") {
            let content = document.createElement("P");
            let block = document.getElementById("wrap");
    
            content.className = "unknown_request";

            content.textContent = "Unknown location";
            block.appendChild(content);
            document.getElementById("showmorebtn").style.display = 'none';
        }
        else {
            console.log(dataArr);
            
            displayRow(dataArr);
            document.getElementById("showmorebtn").style.display = "block";
        }
    });
}

async function getData(cityname, pageNumber) {
    if(!pageNumber) pageNumber = 1;
    let url = `https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&place_name=${cityname.toLowerCase()}&page=${pageNumber}&number_of_results=5`;
    let response = await fetch(url);
    let neededForm = await response.json();
    console.log(neededForm);

    return neededForm.response.application_response_code != 100 ? "Unknown location" : neededForm.response.listings;
}

function displayRow(array) {
    for (let i=0; i<5; i++) {
        displayElem(array[i]);
    }
    localStorage.setItem('requestNumber', JSON.parse(localStorage.getItem('requestNumber'))+1);
}

function displayElem(elem) {
    const item = document.createElement('div');
    const content = document.createElement('div');
    const contentTitle = document.createElement('a');
    const contentKeywords = document.createElement('div');
    const roomImage = document.createElement('img');
    const info = document.createElement('div');
    const wrap = document.getElementById('wrap');
    const favoriteImage = document.createElement('img');
    const favoriteButtonBox = document.createElement('div');
    const favoriteButtonText = document.createElement('span');

    item.className = 'list_item_new';
    roomImage.className = 'item_cover';
    content.className = 'item_content';
    info.className = 'item_info';
    contentTitle.className = 'content_title';
    contentKeywords.className = "content_keywords";
    favoriteButtonBox.className = "favorite_button_box";
    favoriteImage.className = 'star';
    favoriteButtonText.className = 'favorite_text';
    

    contentTitle.textContent = elem.title;
    contentKeywords.textContent = `${elem.size} sq.ft · ${elem.bedroom_number} Bedrooms · ${elem.bathroom_number} Baths · ` + elem.keywords.replace(/,/g, " · ");

    roomImage.src = elem.img_url;

    content.appendChild(contentTitle);
    content.appendChild(contentKeywords);

    
    if(JSON.parse( localStorage.getItem('favoriteData')).find( (present) =>  present.lister_url == elem.lister_url)) {
        favoriteButtonText.textContent = "Your Favorite!";
        favoriteImage.src = "https://www.clipartwiki.com/clipimg/detail/64-646573_free-stock-photo-yellow-star-transparent-background.png";
    } else {
        favoriteButtonText.textContent = "Add To Favorites";
        favoriteImage.src = "https://www.clipartwiki.com/clipimg/detail/239-2393343_tattoo-simple-star-tattoo-design.png";
    }
    favoriteButtonBox.appendChild(favoriteImage);
    favoriteButtonBox.appendChild(favoriteButtonText);
    favoriteButtonBox.addEventListener( 'click', () => {
        addOrRemove(elem);
        if(elem.added) {
            favoriteImage.src = "https://www.clipartwiki.com/clipimg/detail/64-646573_free-stock-photo-yellow-star-transparent-background.png";
            favoriteButtonText.textContent = "Your Favorite!";
        }
        else {
            favoriteImage.src = "https://www.clipartwiki.com/clipimg/detail/239-2393343_tattoo-simple-star-tattoo-design.png";
            favoriteButtonText.textContent = "Add To Favorites";
        }
    });

    info.appendChild(favoriteButtonBox);

    item.appendChild(roomImage);
    item.appendChild(content);
    item.appendChild(info);
    wrap.appendChild(item);
    contentTitle.addEventListener('click', () => openModalAdvert(elem, favoriteButtonBox));
}

function openModalAdvert(elem, favoriteButtonBox) {
    const box = document.getElementById("modalBox");
    const modalContent = document.getElementById("modal_content");
    const item = document.createElement('div');
    const content = document.createElement('div');
    const contentTitle = document.createElement('a');
    const contentKeywords = document.createElement('div');
    const contentDecription = document.createElement('span');
    const roomImage = document.createElement('img');
    const info = document.createElement('div');


    modalContent.className = 'modal-content';
    item.className = 'modal_item_new';
    content.className = 'item_content';
    info.className = 'item_info';
    contentTitle.className = 'content_title';
    contentKeywords.className = "content_keywords";
    // favoriteButtonBox.className = "favorite_button_box";
    // favoriteImage.className = 'star';
    // favoriteButtonText.className = 'favorite_text';
    roomImage.className = 'item_cover';

    roomImage.src = elem.img_url;

    contentTitle.textContent = elem.title;
    contentKeywords.textContent = `${elem.size} sq.ft · ${elem.bedroom_number} Bedrooms · ${elem.bathroom_number} Baths · ` + elem.keywords.replace(/,/g, " · ");
    contentDecription.textContent = elem.summary;
    content.appendChild(contentTitle);
    content.appendChild(contentKeywords);
    content.appendChild(document.createElement('br'));
    content.appendChild(contentDecription);

    let originalInfo = favoriteButtonBox.parentNode;
    info.appendChild(favoriteButtonBox);

    document.getElementById('closer').onclick = () => {
        modalContent.removeChild(item);
        box.style.display = 'none';
        originalInfo.appendChild(favoriteButtonBox);
        document.body.style.overflow = 'visible';
    };
    window.onclick = function(event) {
        if(event.target === box) {
            modalContent.removeChild(item);
            box.style.display = 'none';
            originalInfo.appendChild(favoriteButtonBox);
            document.body.style.overflow = 'visible';
        }
    };

    item.appendChild(roomImage);
    item.appendChild(content);
    item.appendChild(info);
    modalContent.appendChild(item);

    box.style.display = "block";
    document.body.style.overflow = 'hidden';
}

function openModalFavorite(elem) {
    const box = document.getElementById("modalBox");
    const modalContent = document.getElementById("modal_content");
    const item = document.createElement('div');
    const content = document.createElement('div');
    const contentTitle = document.createElement('a');
    const contentKeywords = document.createElement('div');
    const contentDecription = document.createElement('span');
    const roomImage = document.createElement('img');
    const info = document.createElement('div');
    const priceFormatted = document.createElement('p');
    const priceType = document.createElement('p');
    const advertLink = document.createElement('a');

    modalContent.className = "modal_content_favorite";
    item.className = 'modal_item_new';
    roomImage.className = 'item_cover';
    content.className = 'item_content';
    info.className = 'item_info';
    contentTitle.className = 'content_title';
    contentKeywords.className = "content_keywords";
    priceFormatted.className = "info_paragraph";
    priceType.className = "info_paragraph";
    advertLink.className = "info_link";

    roomImage.src = elem.img_url;

    contentTitle.textContent = elem.title;
    contentKeywords.textContent = `${elem.size} sq.ft · ${elem.bedroom_number} Bedrooms · ${elem.bathroom_number} Baths · ` + elem.keywords.replace(/,/g, " · ");
    contentDecription.textContent = elem.summary;
    content.appendChild(contentTitle);
    content.appendChild(contentKeywords);
    content.appendChild(document.createElement('br'));
    content.appendChild(contentDecription);

    priceFormatted.textContent = ` Price: ${elem.price_formatted} `;
    priceType.textContent = " Price type: " + capitalizeFirstLetter( elem.price_type );
    advertLink.href = elem.lister_url;
    advertLink.textContent = "Link";
    info.appendChild(priceFormatted);
    info.appendChild(priceType);
    info.appendChild(advertLink);

    item.appendChild(roomImage);
    item.appendChild(content);
    item.appendChild(info);
    modalContent.appendChild(item);
    

    document.getElementById('closer').onclick = () => {
        modalContent.innerHTML = "<span class='close' id='closer'>&times;</span>";
        box.style.display = 'none';
        document.body.style.overflow = 'visible';
    };
    window.onclick = function(event) {
        if(event.target === box) {
            modalContent.innerHTML = "<span class='close' id='closer'>&times;</span>";
            box.style.display = 'none';
            document.body.style.overflow = 'visible';
        }
    };

    box.style.display = "block";
    document.body.style.overflow = 'hidden';
}

function addOrRemove(elem) {
    const arrayInStorage =JSON.parse(localStorage.getItem('favoriteData'));
    let updatedArray;

    if(!elem.added) {
        elem.added = true;
        arrayInStorage.push(elem);
        updatedArray = arrayInStorage;
    }
    else {
        updatedArray = arrayInStorage.filter((present) => present.lister_url !== elem.lister_url);
        elem.added = false;
    }

    localStorage.setItem('favoriteData', JSON.stringify(updatedArray));
    console.log(JSON.parse(localStorage.getItem('favoriteData')));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

srchbtn.addEventListener('click', () => {
    document.getElementById('wrap').innerHTML = '';
    displaySearch(document.getElementsByName('textbox')[0].value);
});

showmorebtn.addEventListener('click', () => {
    getData( JSON.parse( localStorage.getItem('city') ), JSON.parse( localStorage.getItem('requestNumber')) )
    .then(dataArr => displayRow(dataArr)); 
});

favorBoxButton.addEventListener('click', () => {
    let arrayOfElements = JSON.parse(localStorage.getItem('favoriteData'));
    for(let i = 0; i < arrayOfElements.length; i++) {
        openModalFavorite(arrayOfElements[i]);
    }
});