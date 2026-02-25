"use client";
import HeadBanner from './_components/HeadBanner';

const banner = {
    id:'404-banner',
    title: "Ой, такої сторінки не існує",
    desc: `Можливо, ви помилилися з адресою або сторінка була видалена.`,
    src:'/assets/default-slide.png',
    photo:{
        url:'',
    },
    gradient:'light',
    color:'green',
    btn:[
        {
            id:'1',
            text:`повернутися на головну`,
            slug:'/'
        },

    ],

  }



export default function NotFound() {
  return (
    <main>  
        <section className='404'>
          <HeadBanner {...banner}/>
        </section>
    </main>
  )
}
