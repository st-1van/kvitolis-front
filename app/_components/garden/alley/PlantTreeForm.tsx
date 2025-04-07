'use client'
import { useState } from "react";
import { BenefitsItems } from "../Benefits";
import { benefitsData } from "../../data/Garden";

export default function PlantTreeForm() {
  const [formData, setFormData] = useState({
    tree: "",
    person: "",
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

  return (
    <div className="plantTree__form light-green">
      <h2>Посадити дерево</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropdown для вибору дерева */}
        <label>
          <select name="tree" value={formData.tree} onChange={handleChange}>
            <option value="">Оберіть алею</option>
            <option value="oak">Наукова алея</option>
            <option value="pine">Літературна алея</option>
            <option value="birch">Архітектурна алея</option>
          </select>
          {/* <small>*Алея №1 (Наука і культура)</small> */}
        </label>

        {/* Dropdown для вибору особи */}
        {/* <label>
          <select name="person" value={formData.person} onChange={handleChange}>
            <option value="">Оберіть діяча</option>
            <option value="lesya">Леся Українка</option>
            <option value="shevchenko">Тарас Шевченко</option>
            <option value="franko">Іван Франко</option>
          </select>
          <small>*Можна обрати лише з вільних діячів</small>
        </label> */}

        <label>
          <input type="text" name="treeNumber" value={formData.treeNumber} onChange={handleChange} placeholder="Кількість дерев" required />
          {/* <small>*Щоб </small> */}
        </label>

        {/* Ім'я */}
        <label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ваше ім'я" required />
          {/* <small>*Щоб </small> */}
        </label>

        <label>
          <input type="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Номер мобільного" required />
          <small>*Щоб ми могли з вами зв'язатися</small>
        </label>

        {/* Email */}
        <label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Електронна пошта" required />
          <small>*На неї буде надісланий сертифікат і майбутні запрошення</small>
        </label>


      </form>

      <BenefitsItems title='Ви також отримуєте:' benefits={benefitsData.benefits} type='no-padding'/>
      
      <div className="plantTree__trade">
        <div>
          <p className="plantTree__label">Вартість саджанця</p>
          <p className="plantTree__price">4 500 грн</p>
        </div>
        {/* Кнопка */}
        <button type="submit" className="btn btn--green btn--medium">Посадити дерево</button>
      </div>
    </div>
  );
}
