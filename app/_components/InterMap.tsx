import Image from "next/image";
import { MapLegend } from "./data/Map";

export default function InterMap() {
  return (
    <div className="interMap">
      
      <div className="interMap__title container">
        <div className="content">
        <h2>Мапа території</h2>
        </div>
      </div>
      
      <Image src="/assets/map/staticMap.svg" alt="map" className="interMap__map" width={1591} height={805}/>

      <div className="interMap__legend">
        <div className="container">
            <div className="interMap__legend-body">
              {MapLegend.map((item) => (
                <div key={item.name} className="interMap__item">
                  <Image width={31} height={50} src={item.pin} alt={item.name}/>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
