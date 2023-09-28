export interface ExerciseDto {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: {
    name: string;
  }
}