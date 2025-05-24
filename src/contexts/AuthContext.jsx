import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [clientName, setClientName] = useState(null);
  const [formTypes, setFormTypes] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [formLinks, setFormLinks] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const login = (name, types, reasonsList = [], links, admin = false, photo = null, users = []) => {
    setClientName(name);
    setFormTypes(types);
    setReasons(reasonsList);
    setFormLinks(links);
    setIsAdmin(admin);
    setPhotoUrl(photo);
    setAllUsers(users);
  };

  const logout = () => {
    setClientName(null);
    setFormTypes([]);
    setReasons([]);
    setFormLinks({});
    setIsAdmin(false);
    setPhotoUrl(null);
    setAllUsers([]);
    setSelectedUser(null);
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setFormTypes(user.formTypes);
  };

  return (
    <AuthContext.Provider value={{ 
      clientName, 
      formTypes, 
      reasons, 
      formLinks, 
      isAdmin, 
      photoUrl, 
      allUsers, 
      selectedUser,
      selectUser,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
