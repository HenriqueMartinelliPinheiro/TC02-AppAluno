const govBrService = {
	getGovBrAuthUrl: (): string => {
		const baseUrl = `${import.meta.env.REACT_APP_GOVBR_URL_PROVIDER}` || '';
		const clientId = `${import.meta.env.REACT_APP_GOVBR_CLIENT_ID}` || '';
		const redirectUri = `${import.meta.env.REACT_APP_GOVBR_REDIRECT_URI}` || '';
		const scopes = `${import.meta.env.REACT_APP_GOVBR_SCOPES}` || '';

		if (!baseUrl || !clientId || !redirectUri || !scopes) {
			console.error('Variáveis de ambiente não estão definidas corretamente.');
		}

		return `${baseUrl}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
			redirectUri
		)}&scope=${scopes}`;
	},
};

export default govBrService;
