/**
 * Servicio API centralizado para todas las llamadas HTTP
 * Esta capa de abstracción maneja automáticamente las diferencias entre dev y producción
 */

// Obtener la URL base desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Opciones por defecto para fetch
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Función para realizar peticiones a la API
 * 
 * @param endpoint Endpoint relativo de la API (sin /api)
 * @param options Opciones para fetch
 * @returns Promise con la respuesta
 */
export const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  // Construye la URL basada en la configuración de entorno
  // Asegúrate que el endpoint no comience con /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Construye la URL completa
  let url = '';
  
  // Si estamos usando /api como base, simplemente concatenamos
  if (API_BASE_URL === '/api') {
    url = `${API_BASE_URL}/${normalizedEndpoint}`;
  } else {
    // Si es URL completa, asegúrate que el path esté correctamente formado
    url = `${API_BASE_URL}/${normalizedEndpoint}`;
  }

  // Combina las opciones predeterminadas con las proporcionadas
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Realiza la petición
  const response = await fetch(url, fetchOptions);

  // Si la respuesta no es exitosa, lanza un error
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  // Intenta parsear como JSON, si falla devuelve la respuesta directamente
  try {
    return await response.json() as T;
  } catch (error) {
    return response as unknown as T;
  }
};

// Helpers para métodos HTTP comunes
export const get = <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, { ...options, method: 'GET' });
};

export const post = <T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const put = <T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const del = <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
};
