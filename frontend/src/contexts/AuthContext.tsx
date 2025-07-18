import { useState, useEffect, useContext, createContext } from "react";
import type { ReactNode } from "react";
import axiosClient from "../api/axiosClient";
import type { IUser, IContent } from "../types";

interface AuthContextType {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    content: IContent[] | null;
    setContent: React.Dispatch<React.SetStateAction<IContent[] | null>>;
    toast: (message: string, type: "success" | "error") => void;
    toastMsg: {
        message: string;
        type: "success" | "error";
    } | null;
    login: (token: string, user: IUser) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [content, setContent] = useState<IContent[] | null>(null);
    // Initialize token from localStorage
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [loading, setLoading] = useState<boolean>(true);
    const [toastMsg, setToastMsg] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);
    

    useEffect(() => {
        // Load user from token when component mounts or token changes
        const loadUser = async () => {
            setLoading(true);
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const res = await axiosClient.get("/auth/me");
                const data = res.data as { user: IUser };
                setUser(data.user);
                setContent(data.user?.content || []);
                // // console.log("User loaded from token:", data.user);
            } catch (error) {
                toast('Session expired. Please log in again.', 'error');
                // console.error("Failed to load user from token:", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [token]);

    const login = (newToken: string, userData: IUser) => {
        // console.log("Logging in user:", userData);
        // console.log("Setting token:", newToken);
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const toast = (message: string, type: "success" | "error") => {
        setToastMsg({ message, type });
         // Clear toast after 30 seconds
        setTimeout(() => setToastMsg(null), 30000);
    };

    return (
        <AuthContext.Provider value={{ toast, toastMsg, user, setUser, content, setContent, token, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
