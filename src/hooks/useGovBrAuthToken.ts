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
				await fetchAccessToken(code);
				navigate('/', { replace: true });
			}
		};

		authenticate();
	}, [location, fetchAccessToken, navigate]);
};

export default useGovBrAuth;
