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
	const [studentCpf, setStudentCpf] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const savedCpf = localStorage.getItem('studentCpf');
		if (savedCpf) {
			setStudentCpf(savedCpf);
		}
		setLoading(false);
	}, []);

	const isAuthenticated = !!studentCpf;

	const logout = () => {
		setStudentCpf(null);
		localStorage.removeItem('studentCpf');
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
