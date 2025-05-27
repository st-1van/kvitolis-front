"use client";
import HeadBanner from './_components/HeadBanner';

export default function NotFound() {
  return (
    <main>
        <section className='404'>
          <HeadBanner 
            title="Ой, такої сторінки не існує"
            slug='/'
            button1='повернутися на головну'
            gradient='light'
            />
        </section>

    </main>
  )
}
