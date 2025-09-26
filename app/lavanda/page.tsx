'use client'

import HeadBanner from "../_components/HeadBanner"
import { FoodAndFun } from "../_components/WeHave"
import Image from "next/image"
import AnimatedOnScroll from "../_components/ui/AnimatedScroll"
import { banner, data1, data2, photos } from '../_components/data/Lavanda'
import StandartGallery from "../_components/StandartGallery"


 
export default function SeasonPage() {
    
  //get request
  return <main>
        <section className="mainBanner container animate fade-in-up">
          <HeadBanner {...banner} color="fiolet"/>
        </section>
        <section className="season">
          
          <div className="container">
            <AnimatedOnScroll animationClass="fade-in-up">
              <div className="text-block center">
                <h2>Волиньська лавандія</h2>
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
        <section className="gallery">
            <AnimatedOnScroll animationClass="fade-in-up">
              <StandartGallery images={photos} />
            </AnimatedOnScroll>
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



