import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

import LanguageSwitcher from "../components/LanguageSwitcher";
import '../styles/LoginPage.css';

function LoginPage() {
    const { login: loginToContext } = useAuth(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        try {
            const res = await fetch(`https://script.google.com/macros/s/AKfycby6YKq9dhWdzNcG-g0Kb-dwaEoM-gOT6tp0Q-KeZR-punWWt1MFrwEvyCEUXr1xFIFj/exec?login=${username}&password=${password}`);
            const data = await res.json();

            if (data.success) {
                const folderUrls = {
                    confirmVehicle: data.folderUrl_confirmVehicle,
                    uncertTaken: data.folderUrl_uncertTaken,
                    disadvSave: data.folderUrl_disadvSave,
                    uncertCopack: data.folderUrl_uncertCopack
                };
                
                loginToContext(
                    data.clientName, 
                    data.formTypes, 
                    data.reasons, 
                    data.formLinks, 
                    data.isAdmin, 
                    data.photoUrl, 
                    data.allUsers,
                    folderUrls
                ); 
                navigate("/forms");
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError("Ошибка соединения с сервером.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-window">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-header">
                        <h2 className="login-header-title">{t("loginTitle")}</h2>
                        <div><LanguageSwitcher /></div>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                            placeholder={t("login")}
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            placeholder={t("password")}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? t("loading") : t("enter")}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;