import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    role: '',
    login: () => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');

    useEffect(() => {
        // Initialize authentication state from localStorage
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setIsAuthenticated(true);
        }
    }, []);

    // Login function to set authentication state and role
    const login = () => {
        setIsAuthenticated(true);
        setRole('admin'); // Replace with actual role logic
    };

    // Logout function to clear authentication state and role
    const logout = () => {
        setIsAuthenticated(false);
        setRole('');
        localStorage.removeItem('jwtToken'); // Remove token from localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
