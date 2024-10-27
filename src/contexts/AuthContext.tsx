// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
	studentCpf: string | null;
	isAuthenticated: boolean;
	setStudentCpf: (cpf: string) => void;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [studentCpf, setStudentCpfState] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

const setStudentCpf = (cpf: string | null) => {
    setStudentCpfState(cpf);
    if (cpf) {
        localStorage.setItem('studentCpf', cpf);
        console.log('studentCpf saved to localStorage:', cpf); // Log para confirmação
    } else {
        localStorage.removeItem('studentCpf');
        console.log('studentCpf removed from localStorage'); // Confirmação de remoção
    }
};


	useEffect(() => {
		const savedCpf = localStorage.getItem('studentCpf');
		if (savedCpf) {
			setStudentCpfState(savedCpf);
			console.log('studentCpf loaded from localStorage:', savedCpf);
		} else {
			console.log('No studentCpf found in localStorage');
		}
		setLoading(false);
		console.log('Loading complete');
	}, []);

	const isAuthenticated = !!studentCpf;
	console.log('Auth status:', { isAuthenticated, studentCpf, loading });

	const logout = () => {
		setStudentCpf(null);
	};

	return (
		<AuthContext.Provider
			value={{ studentCpf, isAuthenticated, setStudentCpf, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider');
	}
	return context;
};
