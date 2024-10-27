// hooks/useGovBrAuth.ts
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthService } from '../services/authService';

const useGovBrAuth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { fetchAccessToken } = useAuthService();

	useEffect(() => {
		const authenticate = async () => {
			const queryParams = new URLSearchParams(location.search);
			const code = queryParams.get('code');

			if (code) {
				const success = await fetchAccessToken(code);

				if (success) {
					console.log('Autenticado com gov.br.');
					navigate('/', { replace: true });
				} else {
					console.error('Erro ao autenticar com gov.br.');
					navigate('/login', { replace: true });
				}
			}
		};

		authenticate();
	}, [location.search, fetchAccessToken, navigate]);
};

export default useGovBrAuth;
