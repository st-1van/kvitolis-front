import Attraction from "./Attraction";
import CardItem from "./CardItem";
import { title, attractions, cards } from "./data/WeHave"
import AnimatedOnScroll from "./ui/AnimatedScroll";
import { CardProps } from "./CardItem";

export default function WeHave(){
    
    return(

        <section className="weHave">
            <FoodAndFun title={title} data={cards}/>
            <OtherAttraction attractions={attractions} />
        </section>
    )
}

type FoodAndFunProps<T extends CardProps> = {
    title?:string,
    desc?:string,
    center?:string,
    style?:string,
    data: T[];
}


export function FoodAndFun<T extends CardProps>({title, desc, center, style, data}: FoodAndFunProps<T>){
    return(
            <AnimatedOnScroll animationClass="fade-in-up">
                <div className="container">
                    <div className="content">
                        <div className={`weHave__title ${center||''}`}>
                            {title?<h2>{title}</h2>:''}
                            {desc?<p className="sub">{desc}</p>:''}                            
                        </div>
                        <div className="weHave__cards">
                            {data.map((card, index)=>(
                                <CardItem card={card} index={index} key={index} style={style}/>
                            ))}
                        </div>
                    </div>
                </div>
            </AnimatedOnScroll>
    )
}

interface AttractionType {
    title: string;
    desc?: string;
    src: string;
    gradient: string;
    slug?: string;
}

interface OtherAttractionProps {
    attractions: AttractionType[];
}

export function OtherAttraction ({attractions}: OtherAttractionProps){
    return (
            <AnimatedOnScroll animationClass="fade-sides">
                <div className="container">
                    {attractions.map((item)=>(
                        <Attraction 
                            key={item.title} 
                            title={item.title} 
                            desc={item.desc ?? ''} 
                            src={item.src}
                            gradient={item.gradient}
                            slug={item.slug}
                        />
                    ))}
                </div>
            </AnimatedOnScroll>
    )
}
