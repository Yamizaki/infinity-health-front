export interface ExerciseProgressPayload {
  exerciseId: number | string;
  repetitions: string;
  weight: string;
  comment?: string;
  date: string;
}

import { post } from '../../../services/api';

export async function sendExerciseProgress(payload: ExerciseProgressPayload) {
  try {
    return await post<any>('exercise-progress', payload);
  } catch (error) {
    console.error('Error al guardar el progreso:', error);
    throw new Error('Error al guardar el progreso');
  }
}