## Welcome to indorse Challenge1 Backend.


1. Clone this Repo and `cd` to api.
2. Run `yarn install` to install all required dependencies.
3. Create `.env` file and copy variables from `.env.example`.
    - Make sure you have Sendgrid Account. `Create for free`.
    - Add your sendgrid email as your `SENDERS_EMAIL`.
4. Run `sequelize db:migrate`. Ensure you have sequelize installed or use `npx sequelize-cli db:migrate` to create migrations.
5. Use postman to test the endpoints.
    - signup ```http://localhost:3000/api/auth/signup```.
    - login ```http://localhost:3000/api/auth/login```.
    - Verify account ```http://localhost:3000/api/auth/verify-account```.
    - Create a location ```http://localhost:3001/api/location``` >> Change the method to `Post` in Postman
    - Get all location ```http://localhost:3001/api/location```
    - Get one location ```http://localhost:3001/api/location/locationName```>> Change the method to `Get` in Postman
    - Delete location ```http://localhost:3001/api/location``` >> Change the method to `Delete` in Postman

The Payload for creating a location is:

    ```
        {
            "locationName": "LocationName",
            "femalePopulation": 1000,
            "malePopulation": 100,
            "under18Population": 20,
            "over18Population": 400
        }
    ```

NOTE: Once you signup, you will receive a validation email that will open the browser once clicked  and validate the account.
- Check email in your spam folder if you don't receive it.


