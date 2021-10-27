"use strict";

const MIN_ITEM_COUNT = 0;
const MAX_ITEM_COUNT = 7;

const MIN_PRICE = 250000;
const MAX_PRICE = 2000000;

const MIN_RATE = 1;
const MAX_RATE = 5;

const MIN_BUILD_NUMBER = 1;
const MAX_BUILD_NUMBER = 40;

const MIN_COUNT_ROOMS = 1;
const MAX_COUNT_ROOMS = 7;

const MIN_AREA = 30;
const MAX_AREA = 250;

const MIN_COUNT_PHOTOS = 1;
const MAX_COUNT_PHOTOS = 4;

const MILLISECONDS_IN_FIVE_DAYS = 432000000;

const names = [
    "Двушка в центре Питера",
    "Однушка в спальнике Питера",
    "Трешка рядом с Кремлём",
    "Студия для аскетов",
    "Апартаменты для фрилансера"
];

const descriptions = [
    "Студия с лаконичным дизайном возле Ангары.",
    "Трёхкомнатная квартира для большой семьи рядом с Кремлём.",
    "2 минуты до набережной и прекрасного вида на Волгу",
    "В квартире есть сауна, джакузи и домашний кинотеатр.Перепланировка согласована.",
    "Уютная однушка в тихом спальном районе. Рядом лес и озёра."
];

const categores = [
    "Недвижимость"
];

const fullname = [
    "Бюро Семёна",
    "Игнат-Агент",
    "Виталий Петрович",
    "Марья Андреевна"
];

const cites = [
    "Иркутск",
    "Москва",
    "Красноярск",
    "Минск"
];

const streets = [
    "ул. Шахтеров",
    "ул. Полярная",
    "ул. Лиственная",
    "ул. Мира",
    "ул. Советская"
];

const imagesNames = [
    "apt_1.png",
    "apt_2.png",
    "apt_3.png",
    "apt_4.png",
    "apt_5.png",
    "apt_6.png",
    "house_1.png",
    "house_2.png",
    "house_3.png",
    "house_4.png"
];

const types = [
    "Дом",
    "Апартаменты",
    "Квартира"
];

const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];

const dayNow = Date.now();


//--------------------------------------------------------------------------------------------------------------------------//


const catalogList = document.querySelector(".results__list");

// Создание элемента для помещения карточек и модалки
const getTeg = (template) => {
    const d = document.createElement('div');
    d.insertAdjacentHTML("beforeEnd", template);
    return d.firstElementChild;
}

// Случайное ЦЕЛОЕ число в диапазоне.
const getRandomIntNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Генерирование массива с уникальными фотографиями
const photosGenerateArray = () => {
    const photos = [];
    for (let index = 0; index < getRandomIntNumber(MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS); index++) {
        let imagesName = "";
        do {
            imagesName = `img/${imagesNames[getRandomIntNumber(0, imagesNames.length)]}`;
        } while (photos.includes(imagesName));
        photos.push(imagesName);
    }
    return photos;
};

//--------------------------------------------------------------------------------------------------------------------------//


// Генерирование даты публикации
const dateProducts = () => {
    const dayPast = Date.now() - MILLISECONDS_IN_FIVE_DAYS;
    return getRandomIntNumber(dayPast, dayNow);
}

// Создание объекта с информацией
const setListCards = () => {
    const catalogData = [];

    for (let i = 0; i < MAX_ITEM_COUNT; i++) {
        const price = Math.round((getRandomIntNumber(MIN_PRICE, MAX_PRICE) / 100)) * 100;

        const obj = {
            card_id: `card_${i}`,
            name: names[getRandomIntNumber(0, names.length)],
            description: descriptions[getRandomIntNumber(0, descriptions.length)],
            price: price,
            category: categores[getRandomIntNumber(0, categores.length)],
            seller: {
                fullname: fullname[getRandomIntNumber(0, fullname.length)],
                rating: getRandomIntNumber(MIN_RATE, MAX_RATE * 10) / 10
            },
            publishDate: dateProducts(),
            address: {
                city: cites[getRandomIntNumber(0, cites.length)],
                street: streets[getRandomIntNumber(0, streets.length)],
                building: getRandomIntNumber(MIN_BUILD_NUMBER, MAX_BUILD_NUMBER)
            },
            photos: photosGenerateArray(),
            filters: {
                type: types[getRandomIntNumber(0, types.length)],
                area: getRandomIntNumber(MIN_AREA, MAX_AREA),
                roomsCount: getRandomIntNumber(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS)
            }
        };

        catalogData.push(obj)
    };
    return catalogData;
};

const cardsList = setListCards();


cardsList.forEach(element => {
    console.log(element);
});

//--------------------------------------------------------------------------------------------------------------------------//


// Добавление пробела в цену
const priceTransform = (arg) => {
    return arg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Преобразование даты в нормальный вид
const dateTransform = (arg) => {
    const dateDifference = dayNow - arg;
    const day = 86400000;
    if (dateDifference <= day) {
        return "Сегодня";
    }
    if (dateDifference > day && dateDifference <= day * 2) {
        return "Вчера";
    } else {
        const resultDate = new Date(arg);
        return `${resultDate.getDate()} ${months[(resultDate.getUTCMonth())]} ${resultDate.getFullYear()}`;
    }
}

//Очистка каталога карточек
const clearItems = (item) => {
    item.innerHTML = "";
};

const getCardContentData = (list, id) => {
    for (let item of list) {
        if (item.card_id === id) {
            return item;
        }
    }
}

//--------------------------------------------------------------------------------------------------------------------------//


// Создание объекта (карточки товара) с информацией в HTML-разметке
const createCatalogItem = (obj) => {
    const template = `
        <li class="results__item product" id = "${obj.card_id}">
        <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="product__image">
            <img src="${obj.photos[0]}" width="318" height="220" alt="${obj.name}">
        </div>
        <div class="product__content">
            <h3 class="product__title">
                <a href="#">${obj.name}</a>
            </h3>
            <div class="product__price">${priceTransform(obj.price)} ₽</div>
            <div class="product__address">${obj.address.city}, ${obj.address.street} </div>
            <div class="product__date">${dateTransform(obj.publishDate)}</div>
        </div>
        </li>`;
    return template;
};

//--------------------------------------------------------------------------------------------------------------------------//



// Отлавливаем определенные элементы карточки и выполняем необходимый код для элемента
const cardClick = (evt) => {
    if (evt.target === evt.currentTarget.querySelector('img') || evt.target === evt.currentTarget.querySelector('a')) {
        evt.preventDefault();
        console.log(getCardContentData(cardsList, evt.currentTarget.id));
        openModal(getCardContentData(cardsList, evt.currentTarget.id));

    }
}

// Добавляем слушателей на событие клика по элементам карточки
const addEventListenerCards = cardsItems => {
    cardsItems.forEach(card => {
        card.addEventListener('click', cardClick)
    });
}

// Удаляляем слушателей на событие клика по элементам карточки
const removeEventListenerCards = cardsItems => {
    cardsItems.forEach(card => {
        card.removeEventListener('click', cardClick)
    });
}

//--------------------------------------------------------------------------------------------------------------------------//


const createModal = (obj) => {
        const template = `
    <div class="popup__inner">
      <button class="popup__close" type="button" aria-label="Закрыть">
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"/>
        </svg>
      </button>
      <div class="popup__date">${dateTransform(obj.publishDate)}</div>
      <h3 class="popup__title">${obj.name}</h3>
      <div class="popup__price">${priceTransform(obj.price)} ₽</div>
      <div class="popup__columns">
        <div class="popup__left">
          <div class="popup__gallery gallery">
            <button class="gallery__favourite fav-add">
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="gallery__main-pic">
              <img src="${obj.photos[0]}" width="520" height="340" alt="${obj.name}">
            </div>
            <ul class="gallery__list">
            ${renderPhotos(obj.photos, obj.name)}
            </ul>
          </div>
          <ul class="popup__chars chars">
            ${obj.filters.area != "" ?  
              `<li class="chars__item">
                <div class="chars__name">Площадь</div>
                <div class="chars__value">${obj.filters.area}</div>
              </li>`
              : ""
            }
            ${obj.filters.roomsCount != "" ?  
              `<li class="chars__item">
                <div class="chars__name">Количество комнат</div>
                <div class="chars__value">${obj.filters.roomsCount}</div>
              </li>`
              : ""
            }
            ${obj.filters.type != "" ?  
              `<li class="chars__item">
                <div class="chars__name">Тип недвижимости</div>
                <div class="chars__value">${obj.filters.type}</div>
              </li>`
              : ""
            }
          </ul>
          <div class="popup__seller seller seller--good">
            <h3>Продавец</h3>
            <div class="seller__inner">
              <a class="seller__name" href="#">${obj.seller.fullname}</a>
              <div class="seller__rating"><span>${obj.seller.rating}</span></div>
            </div>
          </div>
          <div class="popup__description">
            <h3>Описание товара</h3>
            <p>${obj.description}</p>
          </div>
        </div>
        <div class="popup__right">
          <div class="popup__map">
            <img src="img/map.jpg" width="268" height="180" alt="${obj.address.city}, ${obj.address.street}, дом ${obj.address.building}">
          </div>
          <div class="popup__address">${obj.address.city}, ${obj.address.street}, дом ${obj.address.building}</div>
        </div>
      </div>
    </div>
  `;
    return template;
  };

// Копирование объекта с информацией
let copyCatalogData = cardsList.slice();

//------------------------------------------    Сортировка    ---------------------------------------------------------------//


const sortPriceBtn = document.getElementById("sort-cheap");
const sortPopularBtn = document.getElementById("sort-popular");
const sortDateBtn = document.getElementById("sort-new");

const sortProductPrice = (firstElement, SecondElement) => {
    const firstElementSort = firstElement.price;
    const SecondElementSort = SecondElement.price;
    
    return firstElementSort-SecondElementSort;
  };
  const sortProductDate = (firstElement, SecondElement) => {
    const firstElementSort = firstElement.publishDate;
    const SecondElementSort = SecondElement.publishDate;
    
    return firstElementSort-SecondElementSort;
  };
  
  const onSortPriceBtnClick = () => {
    copyCatalogData = cardsList.slice();
    copyCatalogData.sort(sortProductPrice);
    renderCatalogList();
  };
  
  const onSortDateBtnClick = () => {
    copyCatalogData = cardsList.slice();
    copyCatalogData.sort(sortProductDate).reverse();
    renderCatalogList();
  };
  
  const onSortPopularBtnClick = () => {
    copyCatalogData = cardsList.slice();
    renderCatalogList();
  };


//--------------------------------------------------------------------------------------------------------------------------//

const modal = document.querySelector(".popup");

// Отрисовка картинок
const renderPhotos = (photos, name) => {
   let images = "";
   photos.forEach((element, index) => {
     images += `
       <li class="gallery__item ${ (index === 0) ? "gallery__item--active" : ""}">
         <img src="${element}" width="124" height="80" alt="${name}">
       </li>
     `;
   });
   return images;
};
  
  // Смена картинки 
const addSwapOnGalery = (evt) =>{
  const galeryMainImage = modal.querySelector(".gallery__main-pic");

  findGaleryImages().forEach(image => {
    image.classList.remove("gallery__item--active");
  });

  evt.currentTarget.classList.add("gallery__item--active");
  galeryMainImage.firstElementChild.src = evt.target.src;
};
  

  // Отрисовка модалки
const renderModalItemData = () =>{
  const fragment = document.createDocumentFragment();
  fragment.appendChild(getTeg(createModal(copyCatalogData)));

  modal.innerHTML = '';
  modal.appendChild(fragment);
};

const findCloseBtn = () => {
    const modalCloseButton = modal.querySelector(".popup__close");
    return modalCloseButton;
    
}

const findGaleryImages = () => {
    const galeryImages = modal.querySelectorAll(".gallery__item");
    return galeryImages;
  };

  const findCatalogItems = () => {
    const catalogItems = catalogList.querySelectorAll(".results__item");
    return catalogItems;
  }
  
  
// Для открытия модалки
const openModal = (cardData) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(getTeg(createModal(cardData)));
    clearItems(modal);
    modal.appendChild(fragment);
    modal.classList.add("popup--active");
    initModalListeners();
};


// Закрытие модалки по клику и кнопке
const closeModal = () => {
    modal.classList.remove("popup--active");
    removeModalListeners();
};

const onModalCloseKeydownEscape = evt => {
    if (evt.key === "Escape") {
        evt.preventDefault();
        closeModal();
    }
};
const onModalCloseButtonClick = evt => {
    evt.preventDefault();
    closeModal();
};

// Отслеживаем вхождение в пространство кнопки закрытия и выполняем определенные действия в нем
const onModalBtnOutClose = () => {
    document.removeEventListener('keydown', onModalCloseKeydownEnter);
    document.removeEventListener('mouseout', onModalBtnOutClose);
}

const onModalCloseKeydownEnter = evt => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        closeModal();
    }
};

const onModalOutLineClick = (evt) =>{
    if (evt.target === modal) {
        evt.preventDefault();
        closeModal();
    }
  };

const onCloseBtnOverClose = () => {
    document.addEventListener('keydown', onModalCloseKeydownEnter);
    document.addEventListener('mouseout', onModalBtnOutClose);
}


// Отрисовываем карточки
const renderCatalogList = () => {
    const fragment = document.createDocumentFragment();
    copyCatalogData.slice(MIN_ITEM_COUNT, MAX_ITEM_COUNT).forEach((it) => {
        fragment.appendChild(getTeg(createCatalogItem(it)));
    });
    clearItems(catalogList);
    catalogList.appendChild(fragment);
    addEventListenerCards(findCatalogItems());

};

renderCatalogList();

sortPriceBtn.addEventListener('click',onSortPriceBtnClick); 
sortDateBtn.addEventListener('click',onSortDateBtnClick); 
sortPopularBtn.addEventListener('click',onSortPopularBtnClick);


// Инициализаторы и ремуверы слушателей

const initModalListeners = () => {
    findGaleryImages().forEach(item => {
        item.addEventListener('click', addSwapOnGalery)
      });
    findCloseBtn().addEventListener("click", onModalCloseButtonClick);
    findCloseBtn().addEventListener("mouseover", onCloseBtnOverClose);
    findCloseBtn().addEventListener("click", onModalCloseButtonClick);
    document.addEventListener("keydown", onModalCloseKeydownEscape);
    document.addEventListener('mouseover', onModalCloseKeydownEnter);
    window.addEventListener("click",onModalOutLineClick);
};

const removeModalListeners = () => {
    findGaleryImages().forEach(item => {
        item.removeEventListener('click', addSwapOnGalery)
      });
    findCloseBtn().removeEventListener("click", onModalCloseButtonClick);
    findCloseBtn().removeEventListener("mouseover", onCloseBtnOverClose);
    findCloseBtn().removeEventListener("click", onModalCloseButtonClick);
    document.removeEventListener("keydown", onModalCloseKeydownEscape);
    document.removeEventListener('keydown', onModalCloseKeydownEnter);
    window.removeEventListener("click",onModalOutLineClick);
};


//----------------------------------------------  Фильтры  -----------------------------------------------------------------//


const filterBtn = document.querySelector(".filter__button");

const filterRoomsCount = document.getElementsByName("rooms");
const filterTypesBuild = document.getElementsByName("estate-type");
const filterMinArea = document.getElementById("square");


const getFilterRoomsResult = () =>{
  let count = 0;
  filterRoomsCount.forEach(element => {
      if (element.checked) {
        switch (element.value) {
          case "one":
            count = 1;
            break;
          case "two":
            count = 2;
            break;
          case "three":
            count = 3;
            break;
          case "four":
            count = 4;
            break;
          case "fivemore":
            count = 5;
            break;
        }
      }
  });
  return count;
};

const getElementsOnPrice = (min, max, elements) => {
  let arr =[];
  elements.forEach(element => {
    if (element.price > min && element.price < max) {
      arr.push(element);
    }
  });
  return arr;
};

const getTypes = (filtertypes) => {
  let arr = [];
  filtertypes.forEach(element => {
    if (element.checked) {
      arr.push(element.value);
    } 
  });
  return arr;
};

const getElementsOnType = (elements) => {
  let arr = [];
  const typesArr = getTypes(filterTypesBuild);
  elements.forEach(element => {
    if (typesArr.includes(element.filters.type)) {
      arr.push(element);
    }
  });
  return arr;
};

const getElementsOnMinArea = (elements) =>{
  let arr = [];
  elements.forEach(element => {
    if (element.filters.area > filterMinArea.value) {
      arr.push(element);
    }
  });
  return arr;
};

const getElementsOnCountRooms = (elements) => {
  let arr = [];
  const filterRooms = getFilterRoomsResult();
  if (filterRooms != 5) {
    elements.forEach(element => {
      if (element.filters.roomsCount === filterRooms) {
        arr.push(element);
      }
    });
  }
  else{
    elements.forEach(element => {
      if (element.filters.roomsCount >= filterRooms) {
        arr.push(element);
      }
    });
  }
  return arr;
};

const onFilterBtnClick = (evt) => {
  evt.preventDefault();
  let catalogFilterArr = cardsList.slice(MIN_ITEM_COUNT, MAX_ITEM_COUNT);
  catalogFilterArr = getElementsOnPrice(MIN_PRICE, MAX_PRICE, catalogFilterArr);
  if (getTypes(filterTypesBuild).length != 0) {
    catalogFilterArr = getElementsOnType(catalogFilterArr);
  }
  if (filterMinArea.value != "") {
    catalogFilterArr = getElementsOnMinArea(catalogFilterArr);
  }
  if (getFilterRoomsResult() != "") {
    catalogFilterArr = getElementsOnCountRooms(catalogFilterArr);
  }
  copyCatalogData = catalogFilterArr;
  renderCatalogList();

};

filterBtn.addEventListener("click", onFilterBtnClick);







var mySlider = new rSlider({
    target: '#sampleSlider',
    values: [10, 1000],
    range: true,
    tooltip: true,
    scale: true,
    labels: false,
    step: 100
});