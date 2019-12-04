# RecLeagues
# Running Angular App for Basic Home Page
cd into poc-app    
run `ng serve --open`     
the angular app will run on localhost:4200

# Running Angular App for Basic Calendar Usage
cd into cal-app    
run `ng serve --open`     
the angular app will run on localhost:4200

# For PoC and to be able to add players to db:
nodejs server needs to run to add players to db. In another terminal cd into backend and create a .env file. There add DATABASE_URL = <db_link>. This step is required to connect to the remote database. After doing this run nodemon server.js and the server should start running locally on port 4000.
