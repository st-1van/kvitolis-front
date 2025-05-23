import Attraction from "./Attraction";
import CardItem from "./CardItem";
import { title, attractions, cards } from "./data/WeHave"
import AnimatedOnScroll from "./ui/AnimatedScroll";

export default function WeHave(){
    
    return(
        
        <section className="weHave">
            <AnimatedOnScroll animationClass="fade-in-up">
                <div className="container">
                    <div className="content">
                        <div className="weHave__title">
                            <h2 >
                                {title}
                            </h2>
                        </div>
                        <div className="weHave__cards">
                            {cards.map((card, index)=>(
                                <CardItem card={card} index={index} key={index}/>
                            ))}
                        </div>
                    </div>
                </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll animationClass="fade-sides">
            <div className="container">
                {attractions.map((item)=>(
                    <Attraction 
                        key={item.title} 
                        title={item.title} 
                        desc={item.desc} 
                        src={item.src}
                        gradient={item.gradient}
                        slug={item.slug}
                    />
                ))}
            </div>
            </AnimatedOnScroll>
        </section>
        
    )
}

