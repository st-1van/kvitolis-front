'use client'

import HeadBanner from "../_components/HeadBanner"
import { FoodAndFun } from "../_components/WeHave"
import Image from "next/image"
import AnimatedOnScroll from "../_components/ui/AnimatedScroll"

const itemData = {
    title: "Сезон лаванди у Квітолісі відкрито!",
    desc: <div>
            <p>Запрошуємо відвідати довгоочікуваний фестиваль «Волинська Лавандія»</p>
            <p className="subp sub--green">З 27.06 по 20.07</p>
          </div>,
    src:'/assets/banners/lavanda-banner.jpg',
    slug:'/lavanda',
    gradient:'light'
  }
 
export default function SeasonPage() {
    
  //get request
  return <main>
        <section className="mainBanner container animate fade-in-up">
          <HeadBanner {...itemData} />
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
                <h2> з 27 червня по 20 липня</h2>
                <p>
                  Окрім лавандової краси ми здивуємо вас цвітінням 6 тисяч прекрасних лілій та інших літніх квітів, які створять неймовірний тандем на квітковій локації.
                </p>
              </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll animationClass="fade-sides">
              <div className="content">
                <div className="col col-sm green data-card">
                  <Image src='/assets/icons/calendar.svg' width={70} height={61} alt='icon-calendar' />
                  <p className="subp">з вівторка по неділю</p>
                </div>
                <div className="col col-sm green data-card">
                  <Image src='/assets/icons/clock.svg' width={65} height={65} alt='icon-clock' />
                  <p className="subp">з 10:00 <br/>до 22:00</p>
                </div>
              </div>
            </AnimatedOnScroll>
          </div>
        </section>
        <section className="tickets">
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
        desc:'Облаштовані зони відпочинку у затінку',
        src:'/assets/season/lavanda/image.png',
    },
    {
        title:'Класні фото',
        desc:'Безліч нових тематичних фотозон для ваших неймовірних світлин;',
        src:'/assets/season/lavanda/photozone.png',
    },
    {
        title:'Квіти додому',
        desc:'Зона торгівлі, де можна придбати лаванду в горщиках, букетики, лілії.',
        src:'/assets/season/lavanda/image-2.png',
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
        desc:'Для діток — море радості, сміху та безпечних розваг.',
        src:'/assets/season/lavanda/image-3.png',
    },
    {
        title:'Жива музика',
        desc:'Створить затишну атмосферу для відпочинку всією родиною.',
        src:'/assets/season/lavanda/image-4.png',
    },
]