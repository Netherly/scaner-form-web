import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FormHeader from "../../components/FormHeader";
import { useAuth } from "../../contexts/AuthContext";


import "../../styles/FormPages.css";

function Form1({ onSubmit }) {
  const { clientName } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [sealPhotos, setSealPhotos] = useState([]);
  const [carPhotos, setCarPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleFileChange = (setter) => (e) => {
    const files = Array.from(e.target.files);
    setter((prev) => [...prev, ...files]);
  };

  const handleImageDelete = (index, setter) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const renderPreview = (photos, setter) => (
    <div className="preview-container">
      {photos.map((file, index) => (
        <img
          key={index}
          src={URL.createObjectURL(file)}
          alt="preview"
          onClick={() => handleImageDelete(index, setter)}
          className="preview-image"
        />
      ))}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const toBase64Array = async (files) => {
      const promises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]); 
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      return Promise.all(promises);
    };
  
    const sealBase64 = await toBase64Array(sealPhotos);
    const carBase64 = await toBase64Array(carPhotos);

    const payload = {
      type: "form1",
      client: clientName, 
      invoice: number,
      sealImages: sealBase64,
      carImages: carBase64,
      discrepancyImages: [] 
    };
  
    // 3. Отправить на скрипт
    try {
      const res = await fetch("https://scaner-form-proxy.onrender.com/form1", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload),
      });
      
  
      const result = await res.json();
      console.log("Результат:", result);
  
      alert("Форма успішно відправлена!");
      navigate("/forms");
    } catch (err) {
      console.error("Помилка при відправці:", err);
      alert("Сталася помилка під час відправки форми.");
    } finally {
      setIsSubmitting(false); 
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="submit-form-container">
      <div className="submit-form-title">
        <FormHeader title={t("form1.title")} />
      </div>

      <div className="form-item">
        <label>{t("form1.receiptNumber")}</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="form-input"
          placeholder={t("placeholderForm")}
        />
      </div>

      <div className="form-item">
        <label>{t("form1.sealPhotos")}</label>
        <label className="file-button">
        {t("form1.addPhoto")}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleFileChange(setSealPhotos)}
            hidden
          />
        </label>
        {renderPreview(sealPhotos, setSealPhotos)}
      </div>

      <div className="form-item">
        <label>{t("form1.carPhotos")}</label>
        <label className="file-button">
          {t("form1.addPhoto")}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleFileChange(setCarPhotos)}
            hidden
          />
        </label>
        {renderPreview(carPhotos, setCarPhotos)}
      </div>

      <button type="submit" className="submit-button-single" disabled={isSubmitting}>
        {isSubmitting ? t("form1.sending") : t("form1.submit")}
      </button>

    </form>
  );
}

export default Form1;
