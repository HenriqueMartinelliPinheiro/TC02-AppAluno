// hooks/useGovBrAuth.ts
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Acesso direto ao contexto
import { apiRoutes } from '@/config/apiRoutes';

const useGovBrAuth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { setStudentCpf } = useAuth();
	useEffect(() => {
		const authenticate = async () => {
			const queryParams = new URLSearchParams(location.search);
			const code = queryParams.get('code');
			console.log('Code found in URL:', code);

			if (code) {
				try {
					const response = await fetch(`${apiRoutes.getGovbrToken}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ code }),
					});

					console.log('Fetch response status:', response.status);

					if (response.ok) {
						const data = await response.json();
						console.log('Response data:', data);
						if (data.studentCpf) {
							setStudentCpf(data.studentCpf); // Definição direta no contexto
							console.log('studentCpf set in fetchAccessToken:', data.studentCpf);
							navigate('/', { replace: true });
						} else {
							console.error('studentCpf not found in response data.');
							navigate('/login', { replace: true });
						}
					} else {
						console.error('Erro ao obter o token de acesso:', response.statusText);
						navigate('/login', { replace: true });
					}
				} catch (error) {
					console.error('Erro na requisição ao backend:', error);
					navigate('/login', { replace: true });
				}
			} else {
				console.log('No code found in URL.');
			}
		};

		authenticate();
	}, [location.search, setStudentCpf, navigate]);
};

export default useGovBrAuth;
