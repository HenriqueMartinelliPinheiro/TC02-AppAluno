import React from 'react';
import { Button } from '../components/ui/button';
import { LogOut } from 'lucide-react';
// import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
	// const { logout, loading } = useAuth();
	const navigate = useNavigate();

	// if (loading) {
	//   return null;
	// }

	return (
		<header className='w-full bg-green-300 shadow-md p-4'>
			<div className='flex flex-wrap justify-between items-center max-w-screen-xl mx-auto'>
				<a href='/home' className='mb-2 sm:mb-0'>
					<img
						src='/bannerIFC.png'
						alt='Banner IFC'
						className='h-12 w-auto object-contain sm:h-16'
					/>
				</a>
				<div className='flex items-center space-x-4'>
					{/* Botão de Logout */}
					<Button
						className='flex items-center bg-green-600 text-white hover:bg-gray-800 rounded-md px-4 py-2'
						onClick={() => {
							// logout();
							navigate('/home');
						}}>
						<LogOut className='px-1' /> Sair
					</Button>
				</div>
			</div>
		</header>
	);
};
