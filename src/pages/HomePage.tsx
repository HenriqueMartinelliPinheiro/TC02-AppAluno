import React from 'react';
import { Header } from '../utils/Header';
import EventList from '../components/event/EventList';

const HomePage: React.FC = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex flex-col items-center justify-center flex-grow p-4 sm:p-8'>
				<div className='w-full max-w-screen-lg mx-auto p-4'>
					<h2 className='text-2xl sm:text-3xl font-bold'>Gerenciador de Eventos</h2>
				</div>
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
