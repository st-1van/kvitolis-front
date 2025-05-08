'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      <svg ref={svgRef} width="1600" height="805" viewBox="0 0 1600 805" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M347.95 398.231L437.661 559.861L392.085 572.841L356.428 582.067L344.211 579.561L271.119 459.66C271.119 459.66 277.995 450.894 294.099 431.544C309.885 412.576 347.95 398.231 347.95 398.231Z" 
            fill="#A2A09D" 
            stroke="#B2B2B2"
            data-name='Парковка'
          />
          <path d="M437.656 560.036L347.956 398.276L394.009 372.831C394.009 372.831 435.052 396.132 436.976 396.559C438.9 396.987 490.509 384.794 490.509 384.794L565.729 507.595L490.421 537.838L437.656 560.036Z" 
            fill="#9C51B6" 
            stroke="#B2B2B2"
            data-name='Розваги'
          />
          <path d="M635.898 487.578C619.996 493.865 580.93 506.415 565.841 508.19L490.553 384.961L505.057 360.339L586.006 310.758C586.006 310.758 567.668 362.354 592.077 370.12C616.485 377.887 625.468 360.339 625.468 360.339L655.15 417.003L649.416 455.791L635.898 487.578Z" 
            fill="#E75481" 
            stroke="#B2B2B2"
            data-name='Тюльпанове поле'
          />
          <path d="M690.989 437.951C680.608 453.058 658.465 484.193 652.947 487.872L613.774 532.602L643.664 545.056L745.787 532.602V505.203L768.205 495.239H910.182L902.709 361.98L745.787 379.416L727.106 437.951H690.989Z" 
            fill="#00C676" 
            stroke="#B2B2B2"
            data-name='Розсадник'
          />
          <path d="M910.235 495.486L902.19 382.409L900.629 361.832L1018 366.01L1026.54 506.832L910.235 495.486Z" 
            fill="#E75481"
            data-name='Осінній парк'
          />
          <path d="M1169.76 362.217C1122.12 365.168 1023.05 366.757 1017.99 365.745L1021.78 437.904L1026.66 506.705L1106.53 527.886H1163.49L1169.76 362.217Z" 
            fill="#009257" 
            stroke="#B2B2B2"
            data-name='Сад Українства'
          />
          <path d="M1275.56 381.081C1258.22 379.041 1212.11 371.591 1169.26 361.797L1163.59 491.177H1233.27C1237.78 491.177 1245.24 454.18 1248.62 435.932H1275.56L1283.92 390.463L1275.56 381.081Z" 
            fill="#783FAA" 
            stroke="#B2B2B2"
            data-name='Лавандове поле'
          />
          <path d="M1163.23 527.886V491.051H1233.55L1225.73 505.19L1196.34 527.886H1163.23Z" 
            fill="#FB004D" 
            stroke="#B2B2B2"
            data-name='Фудкорт'
          />
          <path d="M1142.16 509.078V527.886H1163.23V509.078H1142.16Z" 
            fill="#A2A09D" 
            stroke="#B2B2B2"
            data-name='Парковка 2'
          />
          <path d="M908.373 469.382L910.334 496.69L952.58 500.311L950.015 466.666L908.373 469.382Z" 
            fill="#A2A09D" 
            stroke="#B2B2B2"
            data-name='Туалет'
          />
          <path d="M332.096 589.221C353.467 586.847 414.322 570.113 439.057 562.693L562.237 512.233L637.926 489.972L761.106 498.876H911.184L949.865 500.182" 
            stroke="#979595" 
            stroke-width="7" 
            stroke-linecap="round"
            data-name=''
          />
          <path d="M950.745 500.359C952.012 500.5 1002.07 505.111 1026.94 507.398L1106.32 528.806H1164.42" 
            stroke="#979595" 
            stroke-width="3"
            data-name=''
          />
          <path d="M657.106 489.158L683.657 453.696L1021.67 442" 
            stroke="#979595" 
            stroke-width="2"
            data-name=''
          />
          <path d="M395.673 485.5L517.173 434.5L645.173 398" 
            stroke="#979595" 
            stroke-width="2"
            data-name=''
          />
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
        <Image src={'/assets/map/map_bg.svg'} width={1600} height={805} alt='map' className="interMap2__bg"/>
      </div>
      <div className="interMap2__legend">
                {legend ? 
                <>
                  {/* легенда з іконками */}
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
                              <p className="--hiden">{item.name}</p>
                            </div>
                          ))}
                        </div>
                  {/* інтерактивна картка */}
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
                        <p>Щось цікаве про локацію</p>
                    </div> : ''}

                </>                   
                :''}
      </div>
    </div>
  );
};


