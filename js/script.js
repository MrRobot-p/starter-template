"use strict";

const ITEM_COUNT_INIT = 7;

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

const MAX_MILLISECONDS = 432000000;

const page = 0;
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

const images_names = [
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
    "house",
    "apartments",
    "flat"
];

const catalogFragment = document.createDocumentFragment();
const catalogList = document.querySelector(".results__list");
const popup = document.querySelector(".popup");


// Случайное ЦЕЛОЕ число в диапазоне.
const getRandomIntNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Генерирование массива с фотографиями
const photosGenerateArray = () => {
    const numberPhotos = getRandomIntNumber(MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS);
    const photosArray = [];

    for (let i = 0; i < numberPhotos; i++) {
        photosArray.push("img/" + images_names[getRandomIntNumber(0, images_names.length)]);

    }
    return photosArray;
};


// Создание объекта с информацией
const catalogData = [];

for (let i = 0; i < ITEM_COUNT_INIT; i++) {
    const price = Math.round((getRandomIntNumber(MIN_PRICE, MAX_PRICE) / 100)) * 100;

    const obj = {
        name: names[getRandomIntNumber(0, names.length)],
        description: descriptions[getRandomIntNumber(0, descriptions.length)],
        price: price,
        category: categores[getRandomIntNumber(0, categores.length)],
        seller: {
            fullname: fullname[getRandomIntNumber(0, fullname.length)],
            rating: getRandomIntNumber(MIN_RATE, MAX_RATE * 10) / 10
        },
        publishDate: getRandomIntNumber(Date.now() - MAX_MILLISECONDS, Date.now()),
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
}

// Копирование объекта с информацией
const copyCatalogData = catalogData.slice();

// Добавление пробела в цену
const priceTransform = (arg) => {
    let argString = arg.toString().split('');
    if (argString.length > 3) {
        for (let i = argString.length - 3; i >= 0; i -= 3) {
            argString[i] = ` ${argString[i]}`;
        }
    }
    return argString.join('').trim();
};
//Очистка каталога карточек
const clearItems = () => {
    catalogList.innerHTML = "";
};

// Обновление и отрисовка новых карточек
const refreshProductsCatalog = () => {
    const firstItemInPage = page * ITEM_COUNT_INIT;
    clearItems();
    catalogList.append(
        createCatalogItem(
            copyCatalogData.slice(firstItemInPage, firstItemInPage + ITEM_COUNT_INIT)
        )
    );
};

// Создание объекта с информацией в HTML-разметке
const createCatalogItem = obj => {
    obj.forEach(currentCard => {
        const li = document.createElement("li");
        li.classList.add('results__item');
        li.classList.add('product');
        const { name, description, price, category, seller, publishDate, address, photos, filters } = currentCard;

        const template = `
        <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="product__image">
            <img src="${photos[0]}" width="318" height="220" alt="${name}">
        </div>
        <div class="product__content">
            <h3 class="product__title">
                <a href="#">${name}</a>
            </h3>
            <div class="product__price">${priceTransform(price)} ₽</div>
            <div class="product__address">${address.city}, ${address.street} </div>
            <div class="product__date">${publishDate}</div>
        </div>`;

        li.innerHTML = template;
        catalogFragment.appendChild(li);
    });
    return catalogFragment;
};

refreshProductsCatalog();

const modalOpenImgs = document.querySelectorAll(".product__image");
const modalOpenLinks = document.querySelectorAll(".product__title");
const modalCloseButton = document.querySelector(".popup__close");

// Открытие модального окна и добавление слушателя кнопки ESC по нажатию на картинку
modalOpenImgs.forEach(img => img.addEventListener('click', () =>
    popup.classList.add('popup--active') &
    initModalListeners()
));

// Открытие модального окна и добавление слушателя кнопки ESC по нажатию на ссылку
modalOpenLinks.forEach(link => link.addEventListener('click', () =>
    popup.classList.add('popup--active') &
    initModalListeners()
));

// Закрытие модалки по клику и кнопке
const closeModal = () => {
    popup.classList.remove("popup--active");
    removeModalListeners();
};

const onModalCloseKeydown = evt => {
    if (evt.key === "Escape") {
        evt.preventDefault();
        closeModal();
    }
};
const onModalCloseButtonClick = evt => {
    evt.preventDefault();
    closeModal();
};

const onModalCloseKeyEnter = evt => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        closeModal();
    }
};

// Для наводки мыши и срабатывания клика "Enter"
modalCloseButton.onmouseover = function(event) {
    let target = event.target;
    document.addEventListener('keydown', onModalCloseKeyEnter);
};

modalCloseButton.onmouseout = function(event) {
    let target = event.target;
    document.removeEventListener('keydown', onModalCloseKeyEnter);
};


// Инициализаторы и ремуверы слушателей
const initModalListeners = () => {
    modalCloseButton.addEventListener("click", onModalCloseButtonClick);
    document.addEventListener("keydown", onModalCloseKeydown);
};

const removeModalListeners = () => {
    modalCloseButton.removeEventListener("click", onModalCloseButtonClick);
    document.removeEventListener("keydown", onModalCloseKeydown);
};



var mySlider = new rSlider({
    target: '#sampleSlider',
    values: [10000, 1000000],
    range: true,
    tooltip: true,
    scale: true,
    labels: false,
    step: 10000
});