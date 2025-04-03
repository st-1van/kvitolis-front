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
      
      <Image fill={true} src="/assets/map.png" alt="map" className="interMap__map" />

      <div className="interMap__legend">
        <div className="container grey">
            <div className="interMap__legend-body">
              {MapLegend.map((item) => (
                <div key={item.slug} className="interMap__items">
                  <Image src={item.icon} width={40} height={40} alt={item.text} />
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
