import AlleyActualData from './data.json';
import peopleData from './people/peopleData';
import treeData from './tree.json'



if ((AlleyActualData.length !== peopleData.length)||(AlleyActualData.length !== treeData.length)) {
  console.warn('Кількість елементів у data.json і peopleData не збігається');
}

const actualData = AlleyActualData.map((alley, index) => ({
  ...alley,
  famousPeople: peopleData[index] ?? [],
  tree:treeData[index]??{}
}));

export default actualData;