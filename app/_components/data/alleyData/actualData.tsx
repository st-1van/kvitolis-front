import AlleyActualData from './data.json';
import peopleData from './people/peopleData';
import treeData from './tree.json'



if ((AlleyActualData.length !== peopleData.length)||(AlleyActualData.length !== treeData.length)) {
  console.warn('Кількість елементів у data.json і peopleData не збігається');
}
// мапляться актуальні дані статичі, але відповідно елементи мають бути в правильному порядку
// додам адмінку з базою де будуть усі зв'язки
const actualData = AlleyActualData.map((alley, index) => ({
  ...alley,
  famousPeople: peopleData[index] ?? [],
  tree:treeData[index]??{}
}));

export default actualData;