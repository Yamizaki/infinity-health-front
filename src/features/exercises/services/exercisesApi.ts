import type { Exercise } from "../types/exercise";
import { get } from "../../../services/api";

export async function fetchExercises(): Promise<Exercise[]> {
  const token = localStorage.getItem('accessToken');
  
  try {
    const data = await get<Exercise[]>('fit-bibliotec/exercises', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
    
    console.log("[exercisesApi] fetchExercises data:", data);
    return data;
  } catch (error) {
    console.error("[exercisesApi] Error fetching exercises:", error);
    throw new Error("Error al obtener los ejercicios");
  }
}