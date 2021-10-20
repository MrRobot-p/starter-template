"use strict";

var mySlider = new rSlider({
    target: '#sampleSlider',
    values: [10000, 1000000],
    range: true,
    tooltip: true,
    scale: true,
    labels: false,
    step: 10000
});


const ITEM_COUNT_INIT = 7;

const MIN_PRICE = 250000;
const MAX_PRICE = 2000000;

const MIN_RATE = 1;
const MAX_RATE = 5;

const MIN_BUILD = 1;
const MAX_BUILD = 40;

const MIN_ROOM = 1;
const MAX_ROOM = 7;

const MIN_AREA = 30;
const MAX_AREA = 250;

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

const city = [
    "Иркутск",
    "Москва",
    "Красноярск",
    "Минск"
];

const street = [
    "ул. Шахтеров",
    "ул. Полярная",
    "ул. Лиственная",
    "ул. Мира",
    "ул. Советская"
];

const images = [
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

// Случайное ЦЕЛОЕ число в диапазоне, включая минимальное и максимальное.
const getRandomIntNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Округление числа до x=10 - десятков, x=100 - сотен

//const roundToX = (val, x) => {
//   return Math.round(val / x) * x;
//};

// Генерация случайного числа с одним числом после запятой (десятые)

const roundToFract = (min, max) => {
    return Math.floor((Math.random() * (max - min) + min) * Math.pow(10, 1)) / Math.pow(10, 1);
};

const catalog = [];

//const catalogFragment = document.createDocumentFragment();

for (let i = 0; i < ITEM_COUNT_INIT; i++) {
    const price = Math.round((getRandomIntNumber(MIN_PRICE, MAX_PRICE) / 100)) * 100;
    const time = Date.now();

    const obj = {
        name: names[getRandomIntNumber(0, names.length)],
        description: descriptions[getRandomIntNumber(0, descriptions.length)],
        price: price + " BYN",
        category: categores[getRandomIntNumber(0, categores.length)],
        seller: {
            fullname: fullname[getRandomIntNumber(0, fullname.length)],
            rating: roundToFract(MIN_RATE, MAX_RATE)
        },
        publishDate: time,
        photos: [
            "img/" + images[getRandomIntNumber(0, images.length)],
            "img/" + images[getRandomIntNumber(0, images.length)],
            "img/" + images[getRandomIntNumber(0, images.length)],
            "img/" + images[getRandomIntNumber(0, images.length)]
        ],
        filters: {
            type: types[getRandomIntNumber(0, types.length)],
            area: getRandomIntNumber(MIN_AREA, MAX_AREA),
            roomsCount: getRandomIntNumber(MIN_ROOM, MAX_ROOM)
        }
    };

    catalog.push(obj)

}

console.log(catalog);

//const renderCatalog = (catalog) => {
//    catalog.forEach((item) => {
//        const catalogItem = createCatalogItem(item);
//       catalogFragment.appendChild(catalogItem);
//   })
//   catalogList.appendChild(catalogFragment);
//};

//renderCatalog(catalog);