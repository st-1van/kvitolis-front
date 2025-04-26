'use client'
import Image from "next/image";

type LegendProps = {
  name:string;
  pin:string;
}

type MapProps = {
  title?: string;
  src:string;
  legend?: LegendProps[];
};




export default function InterMap({ title, src, legend } : MapProps) {
  return (
    <div className="interMap">
      {title ?
      <div className="interMap__title container">
        <div className="content">
          <h2>{title}</h2>
        </div>
      </div>: ''}

      
      <Image src={src} alt={title||"map"} className="interMap__map" width={1591} height={805}/>
      {legend ? 
            <div className="interMap__legend">
            <div className="container">
                <div className="interMap__legend-body">
                  {legend.map((item) => (
                    <div key={item.name} className="interMap__item">
                      <Image width={31} height={50} src={item.pin} alt={item.name}/>
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
            </div>
          </div>
      :''}
    </div>
  );
}
