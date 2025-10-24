'use client'
import { useState, useEffect } from "react";
import { BenefitsItems } from "../Benefits";
import { benefitsData } from "../../data/Garden";
import MultiSelectChip from "./MultipleSelectChip";
import AlleySelect from "./AlleySelect";
import { PersonsDataProps } from "../alley/Persons";


export type FormProps = {
  AlleyData: { slug: string; alleyName: string }[];
  chosenAlley?: string;
  personsList?: PersonsDataProps[];
  handleAlleyChange: (newName: string) => void;
  queried: boolean;
};

type Errors = {
  alley?: string;
  name?: string;
  email?: string;
  phone?: string;
  chosenPersons?: string;
};

const nameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'’\-\s]{1,80}$/u;
const phoneRegex = /^\+?\d{10,13}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ChoseTreeForm({ AlleyData, chosenAlley, personsList, handleAlleyChange, queried }: FormProps) {
  const [formData, setFormData] = useState<{
    alley: string;
    chosenPersons: string[];
    name: string;
    email: string;
    phone: string;
  }>({
    alley: "",
    chosenPersons: [],
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);


  const validate = () => {
    const newErrors: Errors = {};

    // Alley validation
    if (!formData.alley) {
      newErrors.alley = "Оберіть алею";
    }

    if(!formData.chosenPersons || formData.chosenPersons.length <= 0){
      newErrors.chosenPersons = 'Оберіть діячів'
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = "Вкажіть ваше ім'я";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Некоректне ім'я. Лише букви, пробіли, апостроф, до 80 символів";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Вкажіть номер телефону";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Некоректний номер телефону";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Вкажіть електронну пошту";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Некоректна електронна пошта";
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Sanitize input
    let sanitizedValue = value;
    if (name === "name") {
      sanitizedValue = sanitizedValue.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'’\-\s]/gu, "").slice(0, 80);
    }
    // if (name === "treeNumber") {
    //   sanitizedValue = sanitizedValue.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s,'’\-]/gu, "").slice(0, 80);
    // }
    if (name === "phone") {
      sanitizedValue = sanitizedValue.replace(/[^\d+]/g, '').slice(0, 13);
    }
    if (name === "email") {
      sanitizedValue = sanitizedValue.replace(/[^\w@\.\-\_]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Remove error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const [lastSentForm, setLastSentForm] = useState<typeof formData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    // Перевірка на дублікати
    if (
      lastSentForm &&
      JSON.stringify(lastSentForm) === JSON.stringify(formData)
    ) {
      console.warn("⛔️ Повторна відправка однакових даних");
      alert("Ці дані вже були надіслані.");
      return;
    }

    const { alley, name, email, phone, chosenPersons } = formData;

    const message = `
      <p><strong>Обрана алея:</strong> ${alley}</p>
      <p><strong>Імена діячів:</strong> ${chosenPersons}</p>
      <p><strong>Ім’я:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;

    // return console.log("message:", message);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("✅ Успішно надіслано");
        alert("✅ Успішно надіслано");

        // Очищаємо форму
        setFormData({
          alley: "",
          name: "",
          chosenPersons: [],
          email: "",
          phone: "",
          // treeNumber: "",
        });

        // Скидаємо submitted, зберігаємо останню форму
        setSubmitted(false);
        setLastSentForm(formData);
      } else {
        console.error("❌ Помилка при відправці", data.error);
      }
    } catch (err) {
      console.error("❌ Сервер не відповідає:", err);
    }
  };

  useEffect(() => {
    if (chosenAlley) {
      setFormData(prev => ({ ...prev, alley: chosenAlley }));
    }
  }, [chosenAlley, formData.chosenPersons]);

  console.log('chosenAlley:', chosenAlley);


  return (
    <div className="plantTree__form light-green">
      <h1>Станьте меценатом</h1>
      <form onSubmit={handleSubmit} noValidate>

        {/* Dropdown для вибору алеї */}
        <AlleySelect 
          AlleyData={AlleyData} 
          formData={formData} 
          setFormData={setFormData} 
          submitted={submitted} 
          errors={errors} 
          handleAlleyChange={handleAlleyChange}
          disabled={queried?true:false}
        />

        {/* Дропдаун для вибору людей */}
        <MultiSelectChip 
          personsList={personsList ?? []} 
          formData={formData} 
          setFormData={setFormData} 
          errors={errors}
          submitted={submitted}
        />

        {/* Ім'я */}
        <label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ваше ім'я"
            required
            className={errors.name && submitted ? "input-error" : ""}
            maxLength={80}
            autoComplete="off"
          />
          {errors.name && submitted && <div className="error">{errors.name}</div>}
        </label>

        <label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Номер мобільного"
            required
            pattern="^\+?\d{10,13}$"
            title="Введіть коректний номер телефону"
            className={errors.phone && submitted ? "input-error" : ""}
            autoComplete="off"
          />
          <small>*Щоб ми могли з вами зв{"'"}язатися</small>
          {errors.phone && submitted && <div className="error">{errors.phone}</div>}
        </label>

        {/* Email */}
        <label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Електронна пошта"
            required
            className={errors.email && submitted ? "input-error" : ""}
            autoComplete="off"
          />
          <small>*На неї буде надісланий сертифікат і майбутні запрошення</small>
          {errors.email && submitted && <div className="error">{errors.email}</div>}
        </label>

        <div className="plantTree__trade">
          <button type="submit" className="btn btn--green btn--medium">Залишити заявку</button>
        </div>
      </form>

      <BenefitsItems title='Ви також отримуєте:' benefits={benefitsData.benefits} type='no-padding' />

      <style jsx>{`
        .input-error {
          border: 1px solid #e53935 !important;
          background: #fff6f6;
        }
        .error {
          color: #e53935;
          font-size: 0.9em;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}
