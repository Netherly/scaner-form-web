import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useAuth } from "../contexts/AuthContext";
import FormHeader from "../components/FormHeader";
import userPhoto from '../assets/user-photo.png';

import "../styles/FormsPage.css"; 

const formNames = {
  1: "formNames.1",
  2: "formNames.2",
  3: "formNames.3",
  4: "formNames.4",
};

function FormsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { 
    clientName, 
    formTypes, 
    isAdmin, 
    allUsers, 
    selectedUser, 
    selectUser,
    photoUrl 
  } = useAuth();

  const defaultPhoto = userPhoto;

  useEffect(() => {
  console.log("useEffect срабатывает:", { isAdmin, selectedUser, clientName, allUsers });

  if (isAdmin && !selectedUser && allUsers.length > 0) {
    const matchingAdmin = allUsers.find(user => user.name === clientName);
    if (matchingAdmin) {
      console.log("Найден совпадающий пользователь:", matchingAdmin);
      selectUser(matchingAdmin);
    }
  }
}, [isAdmin, selectedUser, allUsers, clientName, selectUser]);


  const handleFormClick = (formType) => {
    navigate(`/form/${formType}`);
  };

  return (
     <div className="forms-page">
      <FormHeader 
        title={selectedUser ? selectedUser.name : clientName} 
      />
      {isAdmin && (
        <div className="forms-list">
          <h3>{t("selectUser")}:</h3>
          <div className="form-card-list">
            {allUsers.map((user, index) => (
              <div
                key={index}
                className={`form-card ${selectedUser?.login === user.login && selectedUser?.name === user.name ? "form-card--selected" : ""}`}
                onClick={() => selectUser(user)}
              >
                <img 
                  src={user.photoUrl || defaultPhoto} 
                  alt={user.name}
                  className="user-photo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultPhoto;
                  }}
                />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="forms-list">
        <h3>{t("availableForms")}:</h3>
        <div className="form-card-list">
          {formTypes?.map((formType, index) => (
            <div
              key={index}
              className="form-card"
              onClick={() => handleFormClick(formType)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 48 48">
                  <linearGradient id="00wCqH7f0ElurH3hbcIXXa_E4VmOrv6BZqd_gr1" x1="-208.197" x2="-180.197" y1="-150.795" y2="-122.795" gradientTransform="translate(215.243 161.751)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#a235d4"></stop><stop offset="1" stopColor="#831bb3"></stop></linearGradient><path fill="url(#00wCqH7f0ElurH3hbcIXXa_E4VmOrv6BZqd_gr1)" d="M39.004,13.999v27c0,1.105-0.895,2-2,2h-26	c-1.105,0-2-0.895-2-2v-34c0-1.104,0.895-2,2-2h19.002l1.997,7L39.004,13.999z"></path><path fill="#ce97e6" fillRule="evenodd" d="M30.002,11.999l0.003-7	l8.999,8.999l-7.001,0.001L30.002,11.999z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M21.001,21.999v2.001	h10.001v-2.001H21.001z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M18.002,21.558	c0.795,0,1.44,0.647,1.44,1.441c0,0.795-0.645,1.441-1.44,1.441c-0.795,0-1.44-0.647-1.44-1.441	C16.562,22.205,17.207,21.558,18.002,21.558z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M21.001,26.999v2.001	h10.001v-2.001H21.001z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M18.002,26.558	c0.795,0,1.44,0.647,1.44,1.441c0,0.795-0.645,1.441-1.44,1.441c-0.795,0-1.44-0.647-1.44-1.441	C16.562,27.205,17.207,26.558,18.002,26.558z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M21.001,31.999v2.001	h10.001v-2.001H21.001z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M18.002,31.558	c0.795,0,1.44,0.647,1.44,1.441c0,0.795-0.645,1.441-1.44,1.441c-0.795,0-1.44-0.647-1.44-1.441	C16.562,32.205,17.207,31.558,18.002,31.558z" clipRule="evenodd"></path><path fill="#ce97e6" fillRule="evenodd" d="M32.002,9.998	c1.104,0,2.001,0.897,2.001,2.001s-0.897,2.001-2.001,2.001s-2.001-0.897-2.001-2.001S30.898,9.998,32.002,9.998z" clipRule="evenodd"></path>
              </svg>
              {t(formNames[formType])}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormsPage;
