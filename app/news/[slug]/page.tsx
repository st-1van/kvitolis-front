// function generateStaticParams() {}
const itemData = {
    title: "Сезон лаванди у квітолісі",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "14.02.2025",
    src: "/assets/news/news-1.jpg",
    slug: "/news/1",
  }
 
export default function SingleNewsPage() {
    
    if (!itemData) {
      return  <main><p>Сторінка не знайдена</p>;</main>
    }

  //get request
  return <main>
      <h1>{itemData.title}</h1>
      <p>{itemData.desc}</p>
    </main>
}