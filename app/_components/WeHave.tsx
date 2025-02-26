import Attraction from "./Attraction";
import CardItem from "./CardItem";

const title = 'Що у нас є?';
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor '
const cards = [
    {
        title:'Фудкорт',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        src:'/assets/cards/card-1.jpg',
    },
    {
        title:'Атракціони',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        src:'/assets/cards/card-2.jpg',
    },
    {
        title:'Ярмарка',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        src:'/assets/cards/card-3.jpg',
    },
]

const attractions = [
    {
        title:'Відпочинок серед природи',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        src:'/assets/banners/banner-1.jpg',
        slug:'/attractions/rent',
        gradient:'dark'
    },
    {
        title:'Сад українства',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        src:'/assets/banners/banner-2.jpg',
        slug:'/attractions/sad-ukrainstva',
        gradient:'light'
    },
    {
        title:'Також ви можете провести',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        src:'/assets/banners/banner-3.jpg',
        slug:'/attractions/make-event',
        gradient:'light'
    },
]


export default function WeHave(){
    
    return(
        <section className="weHave">
            <div className="container">
                <div className="content">
                    <div className="weHave__title">
                        <h2 >
                            {title}
                        </h2>
                        <p>
                            {text}
                        </p>
                    </div>
                    <div className="weHave__cards">
                        {cards.map((card, index)=>(
                            <CardItem card={card} index={index} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container">
                {attractions.map((item)=>(
                    <Attraction 
                        key={item.title} 
                        title={item.title} 
                        desc={item.desc} 
                        src={item.src}
                        gradient={item.gradient}
                    />
                ))}
            </div>
        </section>
    )
}

