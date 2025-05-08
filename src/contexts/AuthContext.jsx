import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [clientName, setClientName] = useState(null);
  const [formTypes, setFormTypes] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [formLinks, setFormLinks] = useState({});

  const login = (name, types, reasonsList = [], links) => {
    setClientName(name);
    setFormTypes(types);
    setReasons(reasonsList);
    setFormLinks(links);
  };

  const logout = () => {
    setClientName(null);
    setFormTypes([]);
    setReasons([]);
    setFormLinks({});
  };

  return (
    <AuthContext.Provider value={{ clientName, formTypes, reasons, formLinks, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
