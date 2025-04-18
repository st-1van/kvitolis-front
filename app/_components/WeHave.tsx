import Attraction from "./Attraction";
import CardItem from "./CardItem";
import { title, attractions, cards } from "./data/WeHave"

export default function WeHave(){
    
    return(
        <section className="weHave">
            <div className="container">
                <div className="content">
                    <div className="weHave__title">
                        <h2 >
                            {title}
                        </h2>
                        {/* <p>
                            {text}
                        </p> */}
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

