import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetEventById } from '../hooks/useGetEventById';
import { Header } from '../utils/Header';
import { EventActivity } from '@/interfaces/EventActivityInterface';

const EventPage: React.FC = () => {
	const { eventId } = useParams<{ eventId: string }>();
	const { event, loading, error } = useGetEventById(Number(eventId));

	const currentDate = new Date();

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex flex-col items-center justify-center flex-grow p-4 sm:p-8'>
				<div className='w-full max-w-screen-lg mx-auto p-4'>
					{loading ? (
						<div>Carregando evento...</div>
					) : error ? (
						<div>Erro ao carregar evento: {error}</div>
					) : event ? (
						<div>
							<h1 className='text-3xl font-bold mb-6 text-center'>{event.eventTitle}</h1>
							<p>
								<strong>Início:</strong>{' '}
								{new Date(event.eventStartDate).toLocaleDateString()}
							</p>
							<p>
								<strong>Fim:</strong> {new Date(event.eventEndDate).toLocaleDateString()}
							</p>
							<h2 className='text-2xl mt-4 font-semibold'>Atividades</h2>
							{event.eventActivity && event.eventActivity.length > 0 ? (
								<ul>
									{event.eventActivity
										.filter(
											(activity: EventActivity) =>
												currentDate >= new Date(activity.eventActivityStartDate) &&
												currentDate <= new Date(activity.eventActivityEndDate)
										)
										.map((activity: EventActivity) => (
											<li
												key={activity.eventActivityId}
												className='mb-4 p-4 bg-gray-100 rounded shadow-md'>
												<h3 className='text-xl font-semibold'>
													{activity.eventActivityTitle}
												</h3>
												<p>{activity.eventActivityDescription}</p>
												<p>
													<strong>Início:</strong>{' '}
													{new Date(activity.eventActivityStartDate).toLocaleString()}
												</p>
												<p>
													<strong>Fim:</strong>{' '}
													{new Date(activity.eventActivityEndDate).toLocaleString()}
												</p>
											</li>
										))}
								</ul>
							) : (
								<p>Nenhuma atividade disponível.</p>
							)}
						</div>
					) : (
						<p>Evento não encontrado.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventPage;
