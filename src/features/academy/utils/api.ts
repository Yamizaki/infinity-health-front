import { apiRequest } from '../../../services/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('accessToken');
  
  try {
    // Usamos la capa centralizada de API
    const res = await apiRequest<T>(path, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...options,
    });
    
    return res;
  } catch (error) {
    console.error(`Error en la API de Academy:`, error);
    throw error;
  }
}

export interface ZoomSessionData {
  course_instructor: string;
  course_title: string;
  meeting_number: string;
  meeting_password: string;
  meeting_user: string;
}

export function getZoomSession(courseId: number): Promise<{ status: string; data: ZoomSessionData }> {
  return request(`/zoom/course/${courseId}/`);
}
