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
  const [folderUrls, setFolderUrls] = useState({});

  const login = (name, types, reasonsList = [], links, admin = false, photo = null, users = [], folders = {}) => {
    setClientName(name);
    setFormTypes(types);
    setReasons(reasonsList);
    setFormLinks(links);
    setIsAdmin(admin);
    setPhotoUrl(photo);
    setAllUsers(users);
    setFolderUrls(folders);
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
    setFolderUrls({});
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
      folderUrls,
      selectUser,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
