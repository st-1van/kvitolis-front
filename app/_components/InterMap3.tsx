'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// import { MapLegend } from './data/Map'
import MapData from './data/mapData.json';


type MapItem = {
  name: string;
  color: string;
  icon: string;
  pin: string;
};

type SVGElementWithHandlers = HTMLElement & {
  _hoverHandlers?: {
    handleEnter: () => void;
    handleLeave: () => void;
    handleClick: () => void;
  };
};

export function bindInteractivity(
  mapData: MapItem[],
  svg: SVGSVGElement,
  activeName: string,
  setActive: React.Dispatch<React.SetStateAction<MapItem>>
) {
  const allElements: SVGElementWithHandlers[] = [];

  mapData.forEach(({ name, color, icon, pin }) => {
    const zone = svg.querySelector(`[data-name="${name}"]`) as SVGElementWithHandlers | null;
    const pinEl = document.querySelector(`.pins [data-name="${name}"]`) as SVGElementWithHandlers | null;
    const legendItem = document.querySelector(`.interMap2__item[data-name="${name}"]`) as SVGElementWithHandlers | null;

    if (!zone) return;
    if (color) zone.style.fill = color;

    legendItem?.addEventListener("click", () => {
      console.log("Legend item clicked:", name);
      handleClick();
    });

    const setOpacity = () => {
      svg.querySelectorAll('[data-name]').forEach(el => {
        const elName = el.getAttribute("data-name");
        (el as HTMLElement).style.opacity = elName === name ? "0.7" : "1";
      });
    };

    const handleClick = () => {
      setActive({ name, color, icon, pin });
      setOpacity();
    };

    const handleEnter = () => {
      if (activeName !== name) zone.style.opacity = "0.7";
      if (pinEl) pinEl.style.transform = "translateY(-5px)";
    };

    const handleLeave = () => {
      if (activeName !== name) zone.style.opacity = "1";
      if (pinEl) pinEl.style.transform = "translateY(0)";
    };

    [zone, pinEl, legendItem].forEach(el => {
      if (!el) return;
      el.addEventListener("click", handleClick);
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
      el._hoverHandlers = { handleClick, handleEnter, handleLeave };
      allElements.push(el);
    });
  });

  return () => {
    allElements.forEach(el => {
      const handlers = el._hoverHandlers;
      if (!handlers) return;
      el.removeEventListener("click", handlers.handleClick);
      el.removeEventListener("mouseenter", handlers.handleEnter);
      el.removeEventListener("mouseleave", handlers.handleLeave);
    });
  };
}

export default function InterMap3 () {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [ active, setActive ] = useState({name:'', color:'', icon:'', pin:''}) 
  const legend = MapData;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const timeout = setTimeout(() => {
      const cleanup = bindInteractivity(MapData, svg, active.name, setActive);
      return cleanup;
    }, 0);
  
    return () => clearTimeout(timeout);
  }, [active.name]);

  return (
    <div className="interMap2">
      <div className="interMap2__title container">
        <div className="content">
          <h2>Мапа території</h2>
        </div>
      </div>
      <div className="wrap">
        <svg ref={svgRef} width="1591" height="805" viewBox="0 0 1591 805" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_787_45)">
            <path d="M344.777 398.231L434.488 559.861L388.912 572.841L353.255 582.067L341.038 579.561L267.946 459.66C267.946 459.66 274.822 450.894 290.926 431.544C306.712 412.576 344.777 398.231 344.777 398.231Z"
              fill="#A2A09D" 
              stroke="#B2B2B2"
              data-name="Парковка"
            />
            <path d="M434.483 560.036L344.783 398.276L390.836 372.831C390.836 372.831 431.879 396.132 433.803 396.559C435.727 396.987 487.337 384.794 487.337 384.794L562.556 507.595L487.248 537.838L434.483 560.036Z"
              fill="#9C51B6" 
              stroke="#B2B2B2"
              data-name="Розваги"
            />
            <path d="M632.725 487.578C616.823 493.865 577.757 506.415 562.668 508.19L487.38 384.961L501.884 360.339L582.833 310.758C582.833 310.758 564.495 362.354 588.904 370.12C613.312 377.887 622.295 360.339 622.295 360.339L651.977 417.003L646.243 455.791L632.725 487.578Z"
              fill="#E75481" 
              stroke="#B2B2B2"
              data-name="Тюльпанове поле"
            />
            <path d="M687.817 437.951C677.435 453.058 655.292 484.193 649.774 487.872L610.601 532.602L640.491 545.056L742.615 532.602V505.203L765.032 495.239H907.009L899.536 361.98L742.615 379.416L723.933 437.951H687.817Z"
              fill="#00C676" 
              stroke="#B2B2B2"
              data-name="Розсадник"
            />
            <path d="M1014.83 366.01L1023.37 506.832L949.354 499.611L946.843 466.665L905.204 469.38L899.017 382.409L897.456 361.832L1014.83 366.01ZM949.354 499.611L949.407 500.311L907.162 496.689L907.075 495.487L949.354 499.611ZM907.075 495.487L907.062 495.486L905.621 475.231L907.075 495.487ZM905.621 475.231L905.201 469.381L905.204 469.38L905.621 475.231Z"
              fill="#512789"
              data-name="Осінній парк"
            />
            <path d="M1166.59 362.217C1118.95 365.168 1019.88 366.757 1014.82 365.745L1018.61 437.904L1023.49 506.705L1103.35 527.886H1160.32L1166.59 362.217Z"
              fill="#009257" 
              stroke="#B2B2B2"
              data-name="Сад Українства"
            />
            <path d="M1272.39 381.081C1255.04 379.041 1208.94 371.591 1166.09 361.797L1160.42 491.177H1230.1C1234.61 491.177 1242.06 454.18 1245.44 435.932H1272.39L1280.75 390.463L1272.39 381.081Z"
              fill="#783FAA" 
              stroke="#B2B2B2"
              data-name="Лавандове поле"
            />
            <path d="M1160.05 527.886V491.051H1230.38L1222.56 505.19L1193.17 527.886H1160.05Z"
              fill="#FB004D" 
              stroke="#B2B2B2"
              data-name="Фудкорт"
            />
            <path d="M1138.99 509.078V527.886H1160.05V509.078H1138.99Z"
              fill="#A2A09D" 
              stroke="#B2B2B2"
              data-name="Туалет"
            />
            <path d="M905.2 469.382L907.162 496.69L949.407 500.311L946.842 466.666L905.2 469.382Z"
              fill="#A2A09D" 
              stroke="#B2B2B2"
              data-name="Парковка 2"
            />
            <path d="M328.923 589.221C350.294 586.847 411.149 570.113 435.884 562.693L559.064 512.233L634.753 489.972L757.934 498.876H908.011L946.692 500.182" 
              stroke="#979595" 
              stroke-width="7" 
              stroke-linecap="round"
              data-name=""
            />
            <path d="M947.572 500.359C948.839 500.5 998.9 505.111 1023.77 507.398L1103.15 528.806H1161.25" 
              stroke="#979595" 
              stroke-width="3"
              data-name=""
            />
            <path d="M653.934 489.158L680.484 453.696L1018.5 442" 
              stroke="#979595" 
              stroke-width="2"
              data-name=""
            />
            <path d="M392.5 485.5L514 434.5L642 398" 
              stroke="#979595" 
              stroke-width="2"
              data-name=""
            />
          </g>
        </svg>
        <div className="pins">
          {legend ? 
            <>
            {legend.map((pin)=>(
                <Image 
                  width={45} 
                  height={75} 
                  src={pin.pin} 
                  alt={pin.name}
                  key={pin.name}
                  data-name={pin.name}
                  style={{left:`${pin.left}`, bottom:`${pin.bottom}`}}
                />
            ))}
            </>
          :''}
        </div>
        <Image src={'/assets/map/bgMap3.png'} width={1590} height={812} alt='map' className="interMap2__bg" />
      </div>
      <div className="interMap2__legend">
                {legend ? 
                <>
                    <div className="container">
                        <div className="interMap2__legend-body">
                          {legend.map((item) => (
                            <div 
                              key={item.name} 
                              className={`interMap2__item`}
                              data-name={item.name}
                            >
                              <Image 
                                width={31} 
                                height={50} 
                                src={item.icon} 
                                alt={item.name}
                              />
                              <p>{item.name}</p>
                            </div>
                          ))}
                        </div>
                    </div>
                    {active.icon?
                    <div
                      className="interMap2__card" 
                      style={{backgroundColor: `${active.color}`}}
                    >
                        <Image
                          data-name={active.name}
                          src={active.icon}
                          alt={active.name || "Image"}
                          width={62}
                          height={62}
                        />

                        <p className="sub">{active.name}</p>
                        <p>опис зони</p>
                    </div> : ''}

                </>                   
                :''}
      </div>
    </div>
  );
};


