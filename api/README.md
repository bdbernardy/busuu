## API
This is the backend project.


### Local Setup
To set up the project locally, you will first need to open a terminal, and then install the node modules:

```bash
npm install
```

### Starting the project
Once the project has been installed, you can start the api app with:

```bash
npm run start
```

The project was configured to create a SQLLite database in the `./data` folder at startup. The database will also be seeded with fake users.

### Tests
The project has automated tests for the api's main features. These are integrations tests that will create a SQLLIte database in the `./data` folder. To run the tests, open a terminal and run the following command:

```bash
npm run test
```

### Resetting the Database
To reset the database, stop the api app if it's running, and then delete the `./data` folder.