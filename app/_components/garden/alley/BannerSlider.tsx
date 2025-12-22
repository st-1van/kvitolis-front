import Link from "next/link";
// import Image from "next/image";
// import actualData from "../../../_components/data/alleyData/actualData";
// import { useRouter } from "next/navigation";

interface BannerSliderProps {
  id: string;
  title: string;
  src: string;
  desc: string;
  slug?: string;
  button1?:string;
  gradient: string;
}
// const AlleyData = actualData;

export default function BannerSlider(props: BannerSliderProps) {
  const { 
      // id,
      title,
      src,
      desc,
      slug,
      button1,
      gradient

   } = props;
  // const router = useRouter();


  // function handleMove(direction: "back" | "forward", id: string) {
  //   const currentIndex = AlleyData.findIndex(item => item.id === id);
  //   if (currentIndex === -1) return;
  
  //   const lastIndex = AlleyData.length - 1;
  
  //   const newIndex = direction === "back"
  //     ? (currentIndex === 0 ? lastIndex : currentIndex - 1)
  //     : (currentIndex === lastIndex ? 0 : currentIndex + 1);
  
  //   return AlleyData[newIndex]?.slug;
  // }
  
  return (
    <section className="bannerSlider">
      <div className="container">
        <div className="relative-wrapper">

          <div 
            className={`headBanner bannerSlider-body headBanner--${gradient}`} 
            style={{ backgroundImage: `url(${src})` }}
          >
            <div className={`headBanner__content headBanner__content--${gradient}`}>
              <h2 className="headBanner__headline">{title}</h2>
              <p className="headBanner__description">{desc}</p>
              <div>
                {src && (
                  <Link href={slug || '#'}>
                    <button className="btn btn--medium btn--green">{ button1 || `Більше`}</button>
                  </Link>
                )}

              </div>
            </div>


          </div>

          {/* <div className="headBanner__navigation">
            <div className="arrows">
              <div className="fade">
                <button
                    onClick={() => {
                      const newSlug = handleMove("back", id);
                      if (newSlug) router.push(newSlug);
                    }}
                  className="arrow left"
                >
                  <Image src="/assets/LeftArrow.svg" alt="arrowLeft" width={35} height={35} />
                </button>
              </div>
              <div className="fade">
                <button
                  onClick={() => {
                    const newSlug = handleMove("forward", id);
                    if (newSlug) router.push(newSlug);
                  }}
                  className="arrow right"
                >
                  <Image src="/assets/RightArrow.svg" alt="arrowRight" width={35} height={35} />
                </button>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </section>
  );
}