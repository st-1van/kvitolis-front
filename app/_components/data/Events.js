
export const banner = {
    id:'events-banner',
    title: "Плануєте захід?",
    desc: `Це не лише місце, де можна зробити гарні фото. Це простір для творчості, відпочинку та натхнення!`,
    src:'/assets/banners/banner-3.jpg',
    photo:{
        url:'',
    },
    gradient:'light',
    color:'green',
    btn:[
        {
            id:'1',
            text:`Зв'язатися з нами`,
            slug:'#about-events'
        },
        {
            id:'2',
            text:'Дізнатися більше',
            slug:'#contacts',
        },
    ],

  }

export const data1 = [
    {
        title:'Квіткова локація',
        desc:'Місце, де природа розквітає яскравими барвами та дарує простір для відпочинку й натхнення.',
        src:'/assets/season/lavanda/photozone.png',
    },
    {
        title:'Облаштовані зони',
        desc:'Для вашого комфорту — затишне кафе, стильна лаунж-зона, м’які пуфи та гойдалки для відпочинку й атмосферних фото.',
        src:'/assets/cards/card-4.jpg',
    },
    // {
    //     title:'Вільний простір',
    //     desc:'Діти можуть безпечно бігати, а дорослі насолоджуватись спокоєм.',
    //     src:'/assets/cards/card-4.jpg',
    // },
    {
        title:'Наші послуги',
        desc:'Для вашої події ми допоможемо з організацією: надамо контакти перевірених фотографів, кейтерингу, декораторів та музичного супроводу.',
        src:'/assets/cards/card-6.jpg',
    },
]


export const photos = [
    {
      id:'events5',
      url:'/assets/events/5.jpg',
      title: 'events5',
    },
    {
      id:'events4',
      url:'/assets/events/4.jpg',
      title: 'events4',
    },
    {
      id:'events1',
      url:'/assets/events/1.jpg',
      title: 'events1',
    },
    {
      id:'events3',
      url:'/assets/events/3.jpg',
      title: 'events3',
    },
    {
      id:'events2',
      url:'/assets/events/2.jpg',
      title: 'events2',
    },

]

export const EventsCallToAction = {
    title: 'Що далі?',
    steps:[
        'Зателефонуйте нам або напишіть на пошту',
        'Ми узгоджуємо деталі: формат, дату, необхідну інфраструктуру та вартість',
        'Запускаємо подію!',
    ],
    btn: `зв'язататися`,
    slug:'tel:+380673330055',
}