"use client"

import { CreateExerciseDto } from "@/dtos/create-exercise.dto";
import { UserDto } from "@/dtos/user.dto"
import { FormEvent, useId, useRef, useState } from "react"

interface ExerciseFormProps {
  users: UserDto[],
  onCreateExercise: (exercise: CreateExerciseDto) => Promise<void>
};

export default function ExerciseForm({users, onCreateExercise}: ExerciseFormProps) {
  const userId = useId();
  const contentId = useId();

  const userRef = useRef<HTMLSelectElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [isContentValid, setIsContentValid] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userRef.current && contentRef.current) {
      const exercise = {
        userId: userRef.current.value,
        content: contentRef.current.value,
      }

      setSubmitting(true);

      onCreateExercise(exercise).catch(() => {
        clearForm();
        setSubmitting(false);
      });
    }
  };

  const clearForm = () => {
    if (userRef.current) {
      userRef.current.selectedIndex = 0;
    }

    if (contentRef.current) {
      contentRef.current.value = "";
    }

    setIsContentValid(true);
  };

  const validateContent = () => {
    if (contentRef.current) {
      const isNewContentValid = contentRef.current.value.length <= 100;
      setIsContentValid(isNewContentValid);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor={userId} className="block text-sm font-medium leading-6 text-gray-900">
            Country
          </label>
          <div className="mt-2">
            <select
              ref={userRef}
              id={userId}
              name="user"
              autoComplete="country-name"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor={contentId} className="block text-sm font-medium leading-6 text-gray-900">
            Content
          </label>
          <div className="mt-2">
            <textarea
              ref={contentRef}
              id={contentId}
              name="content"
              rows={4}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={''}
              onChange={() => validateContent()}
            />
          </div>
          {isContentValid && (<p className="mt-3 text-sm leading-6 text-gray-600">Write the content of the exercise.</p>)}
          {!isContentValid && <p className="mt-3 text-sm leading-6 text-red-500 italic">Please shorten your exercise!</p>}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" disabled={submitting} onClick={() => clearForm()}>
          Cancel
        </button>
        <button
          type="submit"
          className="text-white bg-gray-400 not:disabled:hover:bg-gray-500 focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 disabled:opacity-50"
          disabled={submitting || !isContentValid}
        >
          Save
        </button>
      </div>
    </form>
  )
}