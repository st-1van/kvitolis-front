import Link from "next/link";
import Image from "next/image";
import { AlleysData } from '../../../_components/data/AlleysData'
import { useRouter } from "next/navigation";

interface BannerSliderProps {
  id:number,
  title: string;
  src: string;
  desc: string;
  slug?: string;
  button1?:string;
  gradient: string; 
}

export default function BannerSlider(props: BannerSliderProps) {
  const { id, title, src, desc, slug, button1, gradient } = props;
  const router = useRouter();


  function handleMove(direction: "back" | "forward", id: number) {
    const lastId = AlleysData.length;
    let newId = id;
  
    if (direction === "back") {
      newId = id - 1;
      if (newId < 1) newId = lastId; 
    } else {
      newId = id + 1;
      if (newId > lastId) newId = 1; 
    }
  
    const alleyData = AlleysData.find((item) => Number(item.id) === newId);
    return alleyData?.slug;
  }
  
  return (
    <section className="container">
        <div 
          className={`bannerSlider bannerSlider--${gradient}`} 
          style={{ backgroundImage: `url(${src})` }}
        >


          <div className="bannerSlider__overlay"></div>
          <div className="bannerSlider__content">
            <h2 className="bannerSlider__headline">{title}</h2>
            <p className="bannerSlider__description">{desc}</p>
            <div>
              {src && (
                <Link href={slug || '#'}>
                  <button className="btn btn--medium btn--green">{ button1 || `Більше`}</button>
                </Link>
              )}

            </div>
          </div>


        </div>
        <div className="bannerSlider__arrows">
              <button 
                className="alleys__arrow left"
                onClick={() => {
                  const newSlug = handleMove("back", id);
                  if (newSlug) router.push(newSlug);
                }}
              >
                  <Image src="/assets/LeftArrow.svg" alt="arrowLeft" width={35} height={35} />
              </button>
              <button 
                className="alleys__arrow right"
                onClick={() => {
                  const newSlug = handleMove("forward", id);
                  if (newSlug) router.push(newSlug);
                }}
              >
                  <Image src="/assets/RightArrow.svg" alt="arrowRight" width={35} height={35} />
              </button>
        </div>
    </section>
  );
}