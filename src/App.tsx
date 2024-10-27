import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { EventPage } from './pages/EventPage';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<AuthProvider>
					<Route path='/home' element={<PrivateRoute element={<HomePage />} />} />
					<Route
						path='/evento/:eventId'
						element={<PrivateRoute element={<EventPage />} />}
					/>

					<Route path='/' element={<PrivateRoute element={<HomePage />} />} />
				</AuthProvider>
			</Routes>
		</Router>
	);
};

export default App;
