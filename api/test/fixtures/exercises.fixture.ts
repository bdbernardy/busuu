import { USER_1, USER_2 } from './users.fixture';

export const EXERCISES = [
  {
    id: 'exercise_3_id',
    user: USER_2,
    content: 'user 2 - exercise 1',
    createdAt: new Date('2023/05/02'),
  },
  {
    id: 'exercise_2_id',
    user: USER_1,
    content: 'user 1 - exercise 2',
    createdAt: new Date('2023/01/02'),
  },
  {
    id: 'exercise_1_id',
    user: USER_1,
    content: 'user 1 - exercise 1',
    createdAt: new Date('2023/01/01'),
  },
];
