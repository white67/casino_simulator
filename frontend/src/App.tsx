import {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./containers/UserAuth/Login";
import Register from "./containers/UserAuth/Register";
import ErrorPage from "./containers/Default/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Roulette from "./containers/Roulette/Roulette";
import Blackjack from "./containers/Blackjack/Blackjack";
import Admin from "./containers/Admin/Admin";

function Logout() {
    localStorage.clear();
    return <Navigate to="/login"/>;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register/>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Roulette/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/roulette"
                    element={
                        <ProtectedRoute>
                            <Roulette/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/blackjack"
                    element={
                        <ProtectedRoute>
                            <Blackjack/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Admin/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/register" element={<RegisterAndLogout/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
