import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: any;
    login: (userData: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(() => {
        // Retrieve user from local storage on first render
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        }
        return null;
    });

    const login = (userData: any) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user to local storage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user from local storage
    };

    useEffect(() => {
        // Update user on page reload
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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