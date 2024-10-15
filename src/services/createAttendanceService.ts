import { apiRoutes } from '../config/apiRoutes';

export interface CreateAttendanceRequest {
	studentName: string;
	studentRegistration: string;
	eventActivityId: string;
	studentCpf: string;
	eventId: string;
	latitude: number;
	longitude: number;
}

export interface CreateAttendanceResponse {
	event: any;
	msg: string;
}

export const createAttendance = async (
	attendanceData: CreateAttendanceRequest
): Promise<CreateAttendanceResponse> => {
	try {
		const response = await fetch(apiRoutes.createAttendance, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(attendanceData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.msg || 'Erro ao registrar presença. Tente novamente.');
		}

		const data: CreateAttendanceResponse = await response.json();
		return data;
	} catch (error: any) {
		throw new Error(error.message || 'Erro ao registrar presença. Tente novamente.');
	}
};