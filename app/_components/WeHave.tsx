'use client';
import Attraction from "./Attraction";
import CardItem from "./CardItem";
// import { cards } from "./data/WeHave"
import AnimatedOnScroll from "./ui/AnimatedScroll";
import { CardProps } from "./CardItem";
import { FestivalProps } from "../festivals/[festival]/FestivalClient";
import { getImageUrl } from "@/lib/strapi";

type Props = {
  festivalData?: FestivalProps[];
  cardsData?: CardProps[];
};

export default function WeHave({
  festivalData = [],
  cardsData = [],
}: Props) {

    const attractions = festivalData.map(({aboutTitle, aboutDesc, slug, mainBanner})=>({
        id: mainBanner?.id || '',
        title: aboutTitle || '',
        desc: aboutDesc || '',
        src: getImageUrl(mainBanner?.photo.url) || '',
        gradient: mainBanner?.gradient || 'light',
        slug: `/festivals/${slug}` || '#',
    }))
    
    return(
        <section className="weHave" id='festivals'>
            <OtherAttraction 
                title='Наші фестивалі'
                desc='Щороку у Квітолісі проходить низка унікальних фестивалів, що відображають красу природи та культурну спадщину України.'
                attractions={attractions}
            />
            <FoodAndFun 
                title='Також' 
                // center='center' 
                data={cardsData}
            />
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
    title: string;
    desc?: string;
    attractions: AttractionType[];
}

export function OtherAttraction ({title, desc, attractions}: OtherAttractionProps){
    return (
            <AnimatedOnScroll animationClass="fade-sides">
                <div className="container">
                        <div className="weHave__title content center">
                            <h2>{title}</h2>      
                            {desc?<p>{desc}</p>:''}                   
                        </div>

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
