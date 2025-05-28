import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../services/constants.tsx";
import SimpleNav from "../Navbar/Navbar.tsx";
import AdminUserList from "./Features/UserList.tsx";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(null); // Stan do przechowywania informacji o byciu adminem
  const [loading, setLoading] = useState(true); // Flaga do kontrolowania ładowania

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user-info/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        });
        const data = await response.json();
        setIsAdmin(data.is_admin); // Przechowuj status admina
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Możesz dodać spinner lub inne oznaczenie ładowania
  }

  if (isAdmin === null) {
    return <Navigate to="/login" />; // Jeśli użytkownik nie jest zalogowany, przekieruj go na stronę logowania
  }

  if (!isAdmin) {
    return <Navigate to="/" />; // Jeśli użytkownik nie jest adminem, przekieruj na główną stronę
  }

  return (
    <div>
      <SimpleNav></SimpleNav>
      {/* Zawartość strony admina */}
      <AdminUserList></AdminUserList>
    </div>
  );
};

export default AdminPage;
