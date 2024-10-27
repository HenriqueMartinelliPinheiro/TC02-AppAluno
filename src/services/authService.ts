import { apiRoutes } from '@/config/apiRoutes';
import { useAuth } from '../contexts/AuthContext';

export const useAuthService = () => {
	const { setStudentCpf } = useAuth();

	const fetchAccessToken = async (code: string): Promise<void> => {
		try {
			const response = await fetch(`${apiRoutes.getGovbrToken}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code }),
			});

			if (response.ok) {
				const data = await response.json();
				setStudentCpf(data.studentCpf);
			} else {
				console.error('Erro ao obter o token de acesso:', response.statusText);
			}
		} catch (error) {
			console.error('Erro na requisição ao backend:', error);
		}
	};

	return { fetchAccessToken };
};
