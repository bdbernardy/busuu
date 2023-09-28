import { CreateExerciseDto } from "@/dtos/create-exercise.dto";
import { ExerciseDto } from "@/dtos/exercise.dto";
import { UserDto } from "@/dtos/user.dto";

export async function getAllExercises(): Promise<ExerciseDto[]> {
  const url = new URL("/exercises", process.env.NEXT_PUBLIC_API_URI);
  const response = await fetch(url.toString(), { cache: 'no-store' });
  return await response.json();
}

export async function getAllUsers(): Promise<UserDto[]> {
  const url = new URL("/users", process.env.NEXT_PUBLIC_API_URI);
  const response = await fetch(url.toString(), { cache: 'no-store' });
  return await response.json();
}

export async function createExercise(exercise: CreateExerciseDto): Promise<ExerciseDto | {}> {
  const url = new URL("/exercises", process.env.NEXT_PUBLIC_API_URI);

  const response = await fetch(url, {
    method: "POST",
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: exercise.userId,
      content: exercise.content
    }), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}