import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../utils/Header';
import EventList from '../components/event/EventList';
import { apiRoutes } from '@/config/apiRoutes';

const HomePage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		console.log('useEffect disparado, verificando a URL');
		const queryParams = new URLSearchParams(location.search);
		const code = queryParams.get('code');

		if (code) {
			console.log('Code:', code);
			fetchAccessToken(code);
		} else {
			console.log('Nenhum código encontrado na URL.');
		}
	}, [location]);

	const fetchAccessToken = async (code: string) => {
		try {
			console.log(code);
			const response = await fetch(`${apiRoutes.getGovbrToken}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code }),
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Token de acesso recebido:', data);

				// Aqui você pode armazenar o token no localStorage ou em um estado global
				localStorage.setItem('govbr_access_token', data.access_token);

				// Redirecionar para a Home sem o parâmetro `code` na URL
				navigate('/', { replace: true });
			} else {
				console.error('Erro ao obter o token de acesso:', response.statusText);
			}
		} catch (error) {
			console.error('Erro na requisição ao backend:', error);
		}
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex flex-col items-center justify-center flex-grow p-4 sm:p-8'>
				<main className='flex-grow w-full'>
					<div className='w-full max-w-screen-lg mx-auto p-4 max-w-full'>
						<EventList />
					</div>
				</main>
			</div>
		</div>
	);
};

export default HomePage;
