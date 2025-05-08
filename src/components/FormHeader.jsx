import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

import "../styles/FormHeader.css"

const FormHeader = ({ title }) => {

    const { t } = useTranslation();


    return (
        <div className="form-header-container">
            <h2 className="form-header-title">{title}</h2>
            <LanguageSwitcher />
        </div>
    )
}
export default FormHeader;