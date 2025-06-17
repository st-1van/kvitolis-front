'use client'
import { useState, useEffect} from "react";
import { BenefitsItems } from "../Benefits";
import { benefitsData } from "../../data/Garden";
import actualData from "../../data/alleyData/actualData";

const AlleyData = actualData;

export type FormProps = {
  chosenAlley?:string;
  chosenName?:string;
  handleAlleyChange: (newName: string) => void;
};

export default function PlantTreeForm({ chosenName, chosenAlley, handleAlleyChange }:FormProps) {

  const [formData, setFormData] = useState({
    tree: "",
    name: "",
    email: "",
    phone:'',
    treeNumber:''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Форма відправлена:", formData);
  };

  useEffect(() => {
    if (chosenAlley) {
      setFormData(prev => ({ ...prev, tree: chosenAlley }));
    }
  }, [chosenAlley]);

  return (
    <div className="plantTree__form light-green">
      <h2>Посадити дерево</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropdown для вибору дерева */}
        <label>
        <select
            name="tree"
            value={formData.tree}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, tree: value });
              handleAlleyChange(value);
            }}
          >
            {AlleyData.map((alley) => (
              <option key={alley.slug} value={alley.tree.name}>
                {alley.title}
              </option>
            ))}
          </select>
          <small>*Оберіть алею</small>
        </label>

        <label>
          <input 
            type="text" 
            name="treeNumber" 
            value={formData.treeNumber||chosenName} 
            onChange={handleChange}
            placeholder="Кількість дерев або імена діячів" 
            required />
          {/* <small>*Щоб </small> */}
        </label>

        {/* Ім'я */}
        <label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ваше ім'я" required />
          {/* <small>*Щоб </small> */}
        </label>

        <label>
          <input type="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Номер мобільного" required />
          <small>*Щоб ми могли з вами зв{"'"}язатися</small>
        </label>

        {/* Email */}
        <label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Електронна пошта" required />
          <small>*На неї буде надісланий сертифікат і майбутні запрошення</small>
        </label>


      </form>

      <BenefitsItems title='Ви також отримуєте:' benefits={benefitsData.benefits} type='no-padding'/>
      
      <div className="plantTree__trade">
        {/* <div>
          <p className="plantTree__label">Вартість саджанця</p>
          <p className="plantTree__price">4 500 грн</p>
        </div> */}
        {/* Кнопка */}
        <button type="submit" className="btn btn--green btn--medium">Залишити заявку</button>
      </div>
    </div>
  );
}
