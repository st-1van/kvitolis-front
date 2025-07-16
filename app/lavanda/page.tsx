'use client'

import HeadBanner from "../_components/HeadBanner"
import { FoodAndFun } from "../_components/WeHave"
import Image from "next/image"
import AnimatedOnScroll from "../_components/ui/AnimatedScroll"
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';


const itemData = {
    title: "Сезон лаванди у Квітолісі відкрито!",
    desc: <div>
            <p>Запрошуємо відвідати довгоочікуваний фестиваль «Волинська Лавандія»</p>
            <p className="subp sub--fiolet">З 27.06 по 27.07</p>
          </div>,
    src:'/assets/banners/lavanda-banner1.jpg',
    slug:'/lavanda',
    gradient:'light',
  }
 
export default function SeasonPage() {
    
  //get request
  return <main>
        <section className="mainBanner container animate fade-in-up">
          <HeadBanner {...itemData} color="fiolet"/>
        </section>
        <section className="season">
          
          <div className="container">
            <AnimatedOnScroll animationClass="fade-in-up">
              <div className="text-block center">
                <h2>Волинська лавандія</h2>
                <p>
                  Тут понад 4 га квітучого поля в оточенні прадавнього волинського лісу створюють особливу атмосферу — місце, де хочеться усміхатись, мовчати і просто бути.
                </p>
              </div>
            </AnimatedOnScroll>
            <div className="content">
              <FoodAndFun 
                desc="Щодня на вас чекають" 
                center="center" 
                style='rounded'
                data={data1}
              />
            </div>
          </div>
        </section>
        <section className="season">
          <div className="container">
            <div className="content">
              <FoodAndFun 
                desc="У вихідних ще більше розваг" 
                center="center" 
                style='rounded'
                data={data2}
                />
            </div>
          </div>
        </section>
        <section className="date">
          <div className="container">
            <AnimatedOnScroll animationClass="fade-in-up">
              <div className="text-block center">
                <p>чекаємо на вас</p>
                <h2> з 27 червня по 27 липня</h2>
                <p>
                  Окрім лавандової краси ми здивуємо вас цвітінням 6 тисяч прекрасних лілій та інших літніх квітів, які створять неймовірний тандем на квітковій локації.
                </p>
              </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll animationClass="fade-sides">
              <div className="content">
                {/* <div className="col col-sm green data-card">
                  <Image src='/assets/icons/calendar.svg' width={70} height={61} alt='icon-calendar' />
                  <p className="subp">щодня</p>
                </div> */}
                <div className="col col-sm green data-card">
                  <Image src='/assets/icons/clock.svg' width={65} height={65} alt='icon-clock' />
                  <p className="subp">Будні:<br/> 10:00 до 20:00</p>
                </div>
                <div className="col col-sm green data-card">
                  <Image src='/assets/icons/clock.svg' width={65} height={65} alt='icon-clock' />
                  <p className="subp">Вихідні:<br/> 10:00 до 22:00</p>
                </div>
              </div>
            </AnimatedOnScroll>
          </div>
        </section>
        <section className="tickets">
                    {/* <AnimatedOnScroll animationClass="fade-in-up">
              <StandardImageList images={photos} />
            </AnimatedOnScroll> */}
          <div className="container">
            <AnimatedOnScroll animationClass="fade-in-up">
              <div className="text-block center">
                <h2>Вартість квитків</h2>
              </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll animationClass="fade-sides">
              <div className="content"> 
                  <div className="col col-bg grey cost-card">
                    <div>
                      <p className="subp">БУДНІ ДНІ:</p>
                      <Image src='/assets/icons/tickets.svg' width={70} height={61} alt='icon-calendar' />
                    </div>
                    <p>Дорослий - 150 грн;<br/>Дитячий - 100 грн (від 7-14 років).<br/>Діти до 7 років - БЕЗКОШТОВНО!</p>
                  </div>
                  <div className="col col-bg grey cost-card">
                    <div>
                      <p className="subp">ВИХІДНІ ДНІ:</p>
                      <Image src='/assets/icons/tickets.svg' width={70} height={61} alt='icon-calendar' />
                    </div>
                    <p>Дорослий - 200 грн;<br/>Дитячий - 100 грн (від 7-14 років).<br/>Діти до 7 років - БЕЗКОШТОВНО!</p>
                  </div>
              </div>
            </AnimatedOnScroll>
          </div>
        </section>
    </main>
}


const data1 = [
    {
        title:'Відпочинок',
        desc:'На вас чекають облаштовані зони відпочинку у затінку, затишні лаунж-зони, літнє кафе, бесідки з мангалами на фоні лаванди.',
        src:'/assets/season/lavanda/image.png',
    },
    {
        title:'Класні фото',
        desc:'Ми підготували атмосферні фотозони, де кожен кадр виглядає, як з обкладинки. Лавандове поле це ідеальне місце для love story, сімейного альбому, портретів і просто — магічних спогадів про літо.',
        src:'/assets/season/lavanda/photozone.png',
    },
    {
        title:'Квіти додому',
        desc:'На фестивалі працює спеціальна локація, де можна придбати різноманітні рослини. Лаванду, букетики, лілії, цибулини та інше.',
        src:'/assets/cards/card-3.jpg',
    },
]

const data2 = [
    {
        title:'Фудкорт',
        desc:'Cтрави з мангалу, бургери, картопля фрі, прохолодні напої, морозиво, кава та солодощі.',
        src:'/assets/season/lavanda/image-5.png',
    },
    {
        title:'Розваги',
        desc:'Розваги для дітей і дорослих, гойдалки серед квітів, прогулянки на гольфкарах які подарують яскраві миті. Для малечі — дитячі атракціони, майстер класи, аквагрим та ласощі.',
        src:'/assets/season/lavanda/image-3.png',
    },
    {
        title:'Жива музика',
        desc:'Створить затишну атмосферу для відпочинку всією родиною.',
        src:'/assets/season/lavanda/image-4.png',
    },
]

// const photos = [
//     {
//       src:'/assets/season/lavanda/gallery/img1.jpg',
//       title: 'Lavender Field',
//     },
//     {
//       src:'/assets/season/lavanda/gallery/img2.jpg',
//       title: 'Lavender Field1',
//     },
//     {
//       src:'/assets/season/lavanda/gallery/img3.jpg',
//       title: 'Lavender Field3',
//     },
//     {
//       src:'/assets/season/lavanda/gallery/img4.jpg',
//       title: 'Lavender Field4',
//     },
//     {
//       src:'/assets/season/lavanda/gallery/img5.jpg',
//       title: 'Lavender Field5',
//     },

// ]


// type ImageItem = {
//   src: string;
//   title: string;
// };

// function StandardImageList({images}: { images: ImageItem }) {
//   return (
//     <ImageList 
//         // sx={{ width: 500, height: 450 }} 
//         cols={5} 
//         rowHeight={500}
//       >
//       {images.map((item) => (
//         <ImageListItem key={item.src} sx={{ position: 'relative', width: '100%', height: '100%' }}>
//           <Image
//             src={item.src}
//             alt={item.title}
//             // width={164}
//             // height={164}
//             fill={true}
//             style={{ objectFit: 'cover', width: '100%', height: '100%' }}
//             loading="lazy"
//             />
//         </ImageListItem>
//       ))}
//     </ImageList>
//   );
// }
