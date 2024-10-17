import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { EventPage } from './pages/EventPage';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/home' element={<HomePage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/evento/:eventId' element={<EventPage />} />
			</Routes>
		</Router>
	);
};

export default App;
