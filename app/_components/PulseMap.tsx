'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import actualData from "./data/alleyData/actualData";

const AlleyData = actualData

type Alley = {
  title: string;
  left: string;
  bottom: string;
  desc?: string;
};

// Визначення радіуса за шириною вікна
function getRadiusByWidth(width: number): number {
  if (width >= 1920) return 250;
  if (width >= 1440) return 187;
  if (width >= 1024) return 133;
  if (width >= 768) return 120;
  if (width <= 426) return 120;
  return 80;
}

// Хук для обчислення радіуса
function useResponsiveRadius(): number {
  const [radius, setRadius] = useState(150);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const r = getRadiusByWidth(width);
      setRadius(r);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return radius;
}


interface PulseMapProps {
    title?:string,
    desc?:string,
  }


export default function PulseMap({title, desc}:PulseMapProps) {
  const [active, setActive] = useState<Alley | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const radius = useResponsiveRadius();

  const circleCenter = {
    x: 45, // у відсотках
    y: 47,
  };

  const getAlleyXY = (index: number) => {
    const alleyNumber = 12;
    const angleStep = 360 / alleyNumber;
    const offset = -3; // зміщення першої точки
    let addOffset; //зміщення для деяких алей

    if (index > 3 && index < 8) {
      addOffset = -15;
    } else if(index===11){
      addOffset = -10;
    }else{
      addOffset = 0;
    }

    const currentAngle = index * angleStep + offset + addOffset;
    
    const angleInRadians = (currentAngle * Math.PI) / 180;
    const x = radius * Math.cos(angleInRadians);
    const y = radius * Math.sin(angleInRadians);

    return {
      left: `calc(${circleCenter.x}% + ${x}px)`,
      bottom: `calc(${circleCenter.y}% - ${y}px)`
    };
  };

  // Закриття по кліку поза точками
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.querySelector('.booble')?.contains(e.target as Node)
      ) {
        setActive(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [active]);

  return (
    <section id='alleysMap'>
    <div className="pulseMap" ref={containerRef}>
      <div className="pulseMap__title container">
        <div className="content">
          <p>{desc||''}</p>
          <h2>{title||''}</h2>
        </div>
      </div>

      <div className="map-wrapper">
        <div className="pulseMap__bg">
          <Image src='/assets/garden/map.jpg' width={1920} height={1080} alt='garden_map' />
        </div>

        <div className={`dark-overlay ${active ? 'active' : ''}`} />

        {/* <div className={`pulseMap__info-box ${active ? 'visible' : ''}`}>
          <h5>{active?.title}</h5>
          <p>{active?.desc || 'Короткий опис локації'}</p>
        </div> */}

        <div className="pulseMap__boobles">
          {AlleyData.map((alley, index) => (
            <div
              key={alley.title}
              className={`booble ${active?.title === alley.title ? '--chosen' : ''}`}
              style={getAlleyXY(index)}
            >
              <div className="text">
                <span>{alley.title}</span>
              </div>
              <div className="dot"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive({
                    title: alley.title,
                    desc: alley.desc,
                    ...getAlleyXY(index),
                  });
                }}
              >
                <div className="pulse pulse1" />
                <div className="pulse pulse2" />
                <div className="pulse pulse3" />
              </div>
            </div>
          ))}

          {/* Центр кола */}
          {/* <div
            className="circle-center-marker"
            style={{
              position: 'absolute',
              left: `${circleCenter.x}%`,
              bottom: `${circleCenter.y}%`,
              transform: 'translate(-50%, 50%)',
              width: '10px',
              height: '10px',
              background: 'red',
              borderRadius: '50%',
              zIndex: 10,
            }}
          /> */}
        </div>
      </div>
    </div>
    </section>
  );
}
