import type { LoginCredentials, AuthResponse } from "../types";
import { post } from "../../../services/api";

export const authApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const data = await post<any>('token/', credentials);
    
    // Ensure the response includes the username
    const authResponse: AuthResponse = {
      ...data,
      username: data.username || credentials.username
    };

    return authResponse;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};