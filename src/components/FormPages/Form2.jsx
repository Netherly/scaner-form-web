import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FormHeader from "../../components/FormHeader";
import { useAuth } from "../../contexts/AuthContext";

import "../../styles/FormPages.css";

function Form2() {
  const { clientName, isAdmin, selectedUser, folderUrls } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [article, setArticle] = useState("");
  const [sscc, setSSCC] = useState("");
  const [photos, setPhotos] = useState([]);
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

    const base64Photos = await toBase64Array(photos);

    const payload = {
      type: "form2",
      client: isAdmin && selectedUser ? selectedUser.name : clientName,
      invoice: number,
      article: article,
      sscc: sscc,
      discrepancyImages: base64Photos,
      folderUrls: folderUrls || {}
    };

    try {
      const res = await fetch("https://scaner-form-proxy.onrender.com/form2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("Результат:", result);

      if (result.result === "success") {
        alert("Форма успішно відправлена!");
      } else {
        alert("Помилка: " + (result.message || "невідома"));
      }
    } catch (err) {
      console.error("Помилка при відправці:", err);
      alert("Сталася помилка під час відправки форми.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = () => {
    setNumber("");
    setArticle("");
    setSSCC("");
    setPhotos([]);
    navigate("/forms");
  };

  return (
    <form onSubmit={handleSubmit} className="submit-form-container">
      <div className="submit-form-title">
        <FormHeader title={t("form2.title")} />
      </div>

      <div className="form-item">
        <label>{t("form2.number")}</label>
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
        <label>{t("form2.article")}</label>
        <input
          type="text"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          required
          className="form-input"
          placeholder={t("placeholderForm")}
        />
      </div>

      <div className="form-item">
        <label>{t("form2.sscc")}</label>
        <input
          type="text"
          value={sscc}
          onChange={(e) => setSSCC(e.target.value)}
          required
          className="form-input"
          placeholder={t("placeholderForm")}
        />
      </div>

      <div className="form-item">
        <label>{t("form2.photos")}</label>
        <label className="file-button">
          {t("form1.addPhoto")}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleFileChange(setPhotos)}
            hidden
          />
        </label>
        {renderPreview(photos, setPhotos)}
      </div>

      <div className="form-buttons">
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? t("form1.sending") : t("form2.submit")}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="submit-button"
          disabled={isSubmitting}
        >
          {t("form2.confirm")}
        </button>
      </div>
    </form>
  );
}

export default Form2;
