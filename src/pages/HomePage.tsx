import React from 'react';
import { Header } from '../utils/Header';
import EventList from '../components/event/ListEvent';

const HomePage: React.FC = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex flex-col items-center justify-center flex-grow p-4 sm:p-8'>
				<div className='mb-6 sm:mb-12 text-center'>
					<h2 className='text-2xl sm:text-3xl font-bold'>Gerenciador de Eventos</h2>
				</div>
				<main className='flex-grow w-full'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center'>
						Bem-vindo à Home Page
					</h1>
					<div className='w-full max-w-screen-lg mx-auto p-4'>
						<EventList />
					</div>
				</main>
			</div>
		</div>
	);
};

export default HomePage;
