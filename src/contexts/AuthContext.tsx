import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
	studentCpf: string | null;
	isAuthenticated: boolean;
	setStudentCpf: (cpf: string) => void;
	clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [studentCpf, setStudentCpf] = useState<string | null>(null);
	const isAuthenticated = !!studentCpf;

	const clearAuthData = () => {
		setStudentCpf(null);
		localStorage.removeItem('studentCpf');
	};

	return (
		<AuthContext.Provider
			value={{ studentCpf, isAuthenticated, setStudentCpf, clearAuthData }}>
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
