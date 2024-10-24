import govBrService from '../services/govBrAuthService';

const useGovBrAuth = () => {
	const redirectToGovBr = () => {
		const url = govBrService.getGovBrAuthUrl();
		window.location.href = url; // Redireciona para o gov.br
	};

	return { redirectToGovBr };
};

export default useGovBrAuth;
