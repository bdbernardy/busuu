## Busuu Code Assignment
I created two projects for the assignment: a NestJs app for the backend (`/api`) and a NextJs app for the frontend (`web`). Both projects must be installed properly and running for the application to work. Each folder has a `README.md` file with instructions on how to set up the project.

### Frameworks
I choose NestJs for the backend because it’s the framework I use everyday, I had plenty of code samples I could reuse, and it comes with everything I needed for the assignment out of the box: Typescript, routing, validation, serialization, ORM-support, and a testing framework.

For the frontend, I went with NextJs because it had everything I needed: routing, error boundaries, loading screens, and an optimized bundler. In retrospect, I should probably have used Vite. NextJs has multiple built-in cache layers that are perfect for landing pages, but cumbersome for dynamic pages.

For the styling, I picked Tailwind because I have access to the Tailwind UI component library. I needed building blocks to quickly spin up a layout and design that doesn’t look hideous.

### Time Spent
I spent `1h30 on the backend`. I had working examples of everything that was required. I mostly adapted existing code to complete the assignment. I would have spent a lot more time without the examples.

I spent `3h30 on the frontend` (including 2h on the styling). I have been working with a Design System for the past 2 years, and I rarely have to write CSS. Having the Tailwind UI components for inspiration helped, but not as much as I had hoped for.

### Improvements
With more time, I would have added the following:
- Better isolate UI components. Tailwind css is verbose. The recommended approach is to create component libraries. I would have created separate components for the links button, the buttons, etc. with a proper styling.
- Add tests to the frontend project. I would have used React Testing Library and nock.
- Improve the exercise creation form. An used a fairly old school approach because it’s the one I’m most comfortable with. I’m sure there are better ways to create React forms in 2023 (like Formik).
- I didn’t have time to implement the loading pages and the error boundaries. I would have used NextJs’s built-in mechanism with more time.

### Fake Users
The exercise didn’t mention where the users should be taken from or how to create them. In a real application, this would have been done with a sign in page or a user creation form. To keep things simple, the backend project creates fake users at startup.
