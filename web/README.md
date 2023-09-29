## Web
This is the frontend project. Before you run it, please make sure the backend service has been started.

### Local Setup
To set up the project locally, you will first need to open a terminal, and then install the node modules:

```bash
npm install
```

You will then need to create a local `.env`` file:

```bash
echo "NEXT_PUBLIC_API_URI=http://localhost:3000" > .env.local
```

### Starting the project
Once the project has been installed, you can start the web app with:

```bash
npm run dev
```