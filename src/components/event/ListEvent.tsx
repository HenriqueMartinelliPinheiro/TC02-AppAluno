import React, { useEffect } from 'react';
import { useFetchAllEvents } from '../../hooks/useFetchAllEvents';
import { Event } from '@/interfaces/EventInterface';

const EventList: React.FC = () => {
	const { loading, error, data, handleFetchAllEvents } = useFetchAllEvents();

	useEffect(() => {
		handleFetchAllEvents();
	}, []);

	if (loading) {
		return <div>Carregando eventos...</div>;
	}

	if (error) {
		return <div>Erro ao carregar eventos: {error}</div>;
	}

	return (
		<div>
			<h3 className='text-2xl font-semibold mb-4'>Eventos Atuais</h3>
			{data && data.events.length > 0 ? (
				<ul>
					{data.events.map((event: Event) => (
						<li key={event.eventId} className='mb-4 p-4 bg-gray-100 rounded shadow-md'>
							<h4 className='text-xl font-bold mb-2'>{event.eventTitle}</h4>
							<p>
								<strong>Início:</strong>{' '}
								{new Date(event.eventStartDate).toLocaleDateString()}
							</p>
							<p>
								<strong>Fim:</strong> {new Date(event.eventEndDate).toLocaleDateString()}
							</p>
						</li>
					))}
				</ul>
			) : (
				<div>Nenhum evento disponível no momento.</div>
			)}
		</div>
	);
};

export default EventList;
