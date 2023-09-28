export interface ExerciseDto {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: {
    name: string;
  }
}

export async function getAllExercises(): Promise<ExerciseDto[]> {
  const uri = new URL("/exercises", process.env.NEXT_PUBLIC_API_URI);
  const response = await fetch(uri.toString(), { cache: 'no-store' });
  return await response.json();
}

export async function createExercise(): Promise<void> {
  
}