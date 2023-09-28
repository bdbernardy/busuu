import { ExerciseDto } from "@/dtos/exercise.dto";
import dayjs from "dayjs";

interface ExerciseCardsProps {
  exercises: ExerciseDto[]
}

export default function ExerciseCards({exercises}: ExerciseCardsProps) {
  return (
    <ul role="list" className="grid gap-6 grid-cols-card1 sm:grid-cols-card2 md:grid-cols-card3">
    {exercises.map((exercise) => (
      <li
        key={exercise.id}
        className="flex flex-col rounded-lg bg-gray-100 aspect-square shadow p-6 gap-1"
      >
          <h2 className="text-2xl">{exercise.user.name}</h2>
          <p className="text-sm text-gray-500">{`Created at ${dayjs(exercise.created_at).format("DD/MM/YYYY hh:mm")}`}</p>
          <p className="mt-1">{exercise.content}</p>
      </li>
    ))}
  </ul>
  );
}