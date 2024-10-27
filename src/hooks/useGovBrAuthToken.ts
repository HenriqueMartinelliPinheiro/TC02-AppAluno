// hooks/useGovBrAuth.ts
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthService } from '../services/authService';

const useGovBrAuth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { fetchAccessToken } = useAuthService();

	useEffect(() => {
		console.log('Running useGovBrAuth'); // Confirma se o hook está sendo executado

		const authenticate = async () => {
			const queryParams = new URLSearchParams(location.search);
			const code = queryParams.get('code');

			console.log('Code found in URL:', code); // Verifica o código

			if (code) {
				const success = await fetchAccessToken(code);
				console.log('Authentication success:', success); // Confirma sucesso ou falha

				if (success) {
					navigate('/', { replace: true });
				} else {
					console.error('Erro ao autenticar com gov.br.');
					navigate('/login', { replace: true });
				}
			} else {
				console.log('No code found in URL.'); // Confirma ausência de código
			}
		};

		authenticate();
	}, [location.search, fetchAccessToken, navigate]);
};

export default useGovBrAuth;
