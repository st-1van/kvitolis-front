'use client'
import { useState, useEffect } from "react";
import { BenefitsItems } from "../Benefits";
import { benefitsData } from "../../data/Garden";
import actualData from "../../data/alleyData/actualData";

const AlleyData = actualData;

export type FormProps = {
  chosenAlley?: string;
  chosenName?: string;
  handleAlleyChange: (newName: string) => void;
};

type Errors = {
  tree?: string;
  treeNumber?: string;
  name?: string;
  email?: string;
  phone?: string;
};

const nameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'’\-\s]{1,80}$/u;
const phoneRegex = /^\+?\d{10,13}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const treeNumberRegex = /^[\d\s,а-яА-ЯёЁіІїЇєЄґҐa-zA-Z'’\-]{1,80}$/u;

export default function PlantTreeForm({ chosenName, chosenAlley, handleAlleyChange }: FormProps) {
  const [formData, setFormData] = useState({
    tree: "",
    name: "",
    email: "",
    phone: "",
    treeNumber: ""
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Errors = {};

    // Alley/tree validation
    if (!formData.tree) {
      newErrors.tree = "Оберіть алею";
    }

    // Tree number validation
    if (!formData.treeNumber) {
      newErrors.treeNumber = "Вкажіть кількість дерев або імена діячів";
    } else if (!treeNumberRegex.test(formData.treeNumber)) {
      newErrors.treeNumber = "Некоректний формат. Лише букви, цифри, коми, пробіли";
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
    if (name === "treeNumber") {
      sanitizedValue = sanitizedValue.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s,'’\-]/gu, "").slice(0, 80);
    }
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

    const { tree, name, email, phone, treeNumber } = formData;

    const message = `
      <p><strong>Обрана алея:</strong> ${tree}</p>
      <p><strong>Кількість дерев або імена діячів:</strong> ${treeNumber}</p>
      <p><strong>Ім’я:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;

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
          tree: "",
          name: "",
          email: "",
          phone: "",
          treeNumber: "",
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
      setFormData(prev => ({ ...prev, tree: chosenAlley }));
    }
  }, [chosenAlley]);


  return (
    <div className="plantTree__form light-green">
      <h2>Посадити дерево</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Dropdown для вибору дерева */}
        <label>
          <select
            name="tree"
            value={formData.tree}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, tree: value });
              handleAlleyChange(value);
              setErrors((prev) => ({ ...prev, tree: undefined }));
            }}
            className={errors.tree && submitted ? "input-error" : ""}
            required
          >
            <option value="">Оберіть алею</option>
            {AlleyData.map((alley) => (
              <option key={alley.slug} value={alley.tree.name}>
                {alley.title}
              </option>
            ))}
          </select>
          <small>*Оберіть алею</small>
          {errors.tree && submitted && <div className="error">{errors.tree}</div>}
        </label>

        <label>
          <input
            type="text"
            name="treeNumber"
            value={formData.treeNumber || chosenName || ""}
            onChange={handleChange}
            placeholder="Кількість дерев або імена діячів"
            required
            className={errors.treeNumber && submitted ? "input-error" : ""}
            maxLength={80}
            autoComplete="off"
          />
          {errors.treeNumber && submitted && <div className="error">{errors.treeNumber}</div>}
        </label>

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
