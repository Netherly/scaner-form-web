import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import FormHeader from "../../components/FormHeader";

import "../../styles/FormPages.css";

function Form4() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { reasons } = useAuth();
    const { clientName, isAdmin, selectedUser, folderUrls } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [number, setNumber] = useState("");
    const [article, setArticle] = useState("");
    const [batch, setBatch] = useState("");
    const [sscc, setSSCC] = useState("");
    const [qty, setQty] = useState("");
    const [reason, setReason] = useState("");
    const [photos, setPhotos] = useState([]);

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
        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
    
        const payload = {
            formType: "form4",
            client: isAdmin && selectedUser ? selectedUser.name : clientName, 
            date: formattedDate,
            number,
            article,
            sscc,
            party: batch,
            quantity: qty,
            reason,
            photos: base64Photos,
            folderUrls: folderUrls || {}
        };
        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbyF84i0Hi8NgvMEEtChvIbX9EoMkpk6B6Bf6Lq5tznXlb4ZVk2egQZ_oK_m2-aPvqUgxw/exec", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", 
                },
                body: JSON.stringify(payload),
              });
    
            const resultText = await response.text();
            const result = JSON.parse(resultText);
    
            console.log("Результат:", result);
    
            if (result.result === "success") {
                alert("Форму успішно надіслано!");
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
        setBatch("");
        setSSCC("");
        setQty("");
        setReason("");
        setPhotos([]);
        navigate("/forms");
    };

    return (
        <form onSubmit={handleSubmit} className="submit-form-container">
            <div className="submit-form-title">
                <FormHeader title={t("form4.title")} />
            </div>
            <div className="form-item">
                <label>{t("form4.number")}</label>
                <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="form-input"
                    placeholder={t("placeholderForm")}
                />
            </div>
            <div className="form-item">
                <label>{t("form4.article")}</label>
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
                <label>{t("form4.batch")}</label>
                <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    required
                    className="form-input"
                    placeholder={t("placeholderForm")}
                />
            </div>
            <div className="form-item">
                <label>{t("form4.sscc")}</label>
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
                <label>{t("form4.qty")}</label>
                <input
                    type="text"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    required
                    className="form-input"
                    placeholder={t("placeholderForm")}
                />
            </div>
            <div className="form-item">
                <label>{t("form4.reason")}</label>
                <select className="form-input" value={reason} onChange={(e) => setReason(e.target.value)} required>
                    <option value="" disabled hidden>{t("placeholderForm")}</option>
                    {reasons.map((r, index) => (
                        <option key={index} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            <div className="form-item">
                <label>{t("form4.photos")}</label>
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
                    className="submit-button"
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                >
                    {t("form2.confirm")}
                </button>
            </div>
        </form>
    );
}

export default Form4;
