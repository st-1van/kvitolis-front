'use client'

import HeadBanner from "../_components/HeadBanner"
import { FoodAndFun } from "../_components/WeHave"
// import Image from "next/image"
import AnimatedOnScroll from "../_components/ui/AnimatedScroll"
import { banner, data1, EventsCallToAction, photos } from '../_components/data/Events'
import StandartGallery from "../_components/StandartGallery"
import CallToAction from "../_components/garden/CallToAction"


 
export default function EventsPage() {
    
  //get request
  return <main>
        <section className="mainBanner container animate fade-in-up">
          <HeadBanner {...banner} color="green"/>
        </section>

                <section className="gallery">
          <div className="container">
            <AnimatedOnScroll animationClass="fade-in-up">
              <div className="text-block center">
                <h2>У нас можна провести:</h2>
                <p>
            майстер-класи, кулінарні демонстрації та дегустації,
            йогу на світанку чи медитацію серед квітів,
            тренінги, 
            концерти,
            модні покази,
            різноманітні конкурси,
            сімейне свято та дні народження,
            освідчення та весільні церемонії з фотосесіями!
                </p>
              </div>
            </AnimatedOnScroll>
          </div>
            <AnimatedOnScroll animationClass="fade-in-up">
              <StandartGallery images={photos} />
            </AnimatedOnScroll>
        </section>

        <section id='about-events'>
          
          <div className="container">
            <AnimatedOnScroll animationClass="fade-in-up">
              <div className="text-block center">
                <h2>У нас є все необхідне для вашої події</h2>
              </div>
            </AnimatedOnScroll>
            <div className="content">
              <FoodAndFun 
                // desc="Щодня на вас чекають" 
                center="center" 
                style='rounded'
                data={data1}
              />
            </div>
          </div>
        </section>




        {/* <section className="tickets">
          <div className="container">
            <AnimatedOnScroll animationClass="fade-in-up">
              <div className="text-block center">
                <h2>І це лише за стандартну вартість квитків</h2>
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
        </section> */}
        <CallToAction {...EventsCallToAction} />
    </main>
}



