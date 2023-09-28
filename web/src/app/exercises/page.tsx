import ExerciseCards from "@/components/exercise-cards";
import { getAllExercises } from "../../services/api"
import Link from 'next/link'
import PageHeading from "@/components/page-heading";

export default async function Exercises() {
  const exercises = await getAllExercises();
  
  return (
    <>
      <PageHeading title="Exercises" />
      <div className="py-6">
        <Link href="/create" className="inline-block text-white bg-gray-400 hover:bg-gray-500 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
          Create
        </Link>
      </div>
      <ExerciseCards exercises={exercises} />
    </>
  );
}