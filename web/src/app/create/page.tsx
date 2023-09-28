"use client"

import ExerciseForm from "@/components/exercise-form";
import PageHeading from "@/components/page-heading";
import { CreateExerciseDto } from "@/dtos/create-exercise.dto";
import { UserDto } from "@/dtos/user.dto";
import { createExercise, getAllUsers } from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function CreateExercise() {
  const [users, setUsers] = useState<UserDto[] | null>(null);
  const router = useRouter()

  useEffect(() => {
    getAllUsers().then(apiUsers => {
      setUsers(apiUsers);
    });
    
  }, [setUsers]);

  const handleCreateExercise = useCallback(async (exercise: CreateExerciseDto) => {
    createExercise(exercise).then(() => {
      router.push("/exercises");
      router.refresh();
    })
  }, [router]);

  return (
    <>
    <PageHeading title="New Exercise" />
      {users && <ExerciseForm users={users} onCreateExercise={handleCreateExercise}/>}
    </>
  );
}