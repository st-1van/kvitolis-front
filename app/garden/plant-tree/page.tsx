// function generateStaticParams() {}

import PlantTreeForm from "@/app/_components/garden/alley/PlantTreeForm";
import { TreeVertical } from "@/app/_components/garden/alley/TreeDescription";

 
export default function PlantTree() {

    // const { alley } = useParams();
    // const alleyData = AlleysData.find((item) => item.slug === `/garden/${alley}`);


  const transformedData2 = {
    name:'Бук звичайний',
    desc:'Бук звичайний, лісовий або європейський (Fagus ylvatica L.) — вид квіткових рослин родини букових Це дерево заввишки 20–45 м. Стовбур вкритий гладенькою сріблясто-сірою корою. Пагони червонувато-бурі, молоді пагони волосисті з черговими загостреними коричневими бруньками. Розташування бруньок почергове. Листки яйцеподібні, цілокраї, майже шкірясті, зверху темно-зелені блискучі, зісподу світліші (4–40 см завдовжки і 2,5–7 см завширшки), короткочерешкові. Квітки одностатеві. ',
    src: '/assets/alleys/tree1.png',
    button1: "Посадити дерево",
  }

  return (
    <main>
    <section className="plantTree">
      <div className="container">
        <div className="row">
          <TreeVertical {...transformedData2} />
          <PlantTreeForm />
        </div>
      </div>
      {/* <div className="breadCrunches"></div> */}
    </section>
    </main>
  )
}