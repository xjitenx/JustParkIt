# JustParkIt

A parking management server with user request limit cap based on IP Address.

Technology Used :- Node.Js (Express.Js) // VS Code // Git // CMD

Modules Used :-
    1. nodemon - For easy and simple server restart and testing
    2. dotenv - For handling environment variables from a file in root directory

Description :- Can handle a praking lot where cars are parked and unparked based on the request made by the user. It also provides the information using provided carNo or slotNo. The number of requests is limited to 10 req per 10 sec.

Instruction :-

1. Install Node.Js. Download the Zip File of the project.
2. Extract the zip file and copy the root directory path and change directory to that path.
3. run command - npm install
4. create a .env file in the root directory with the specified format line by line and save (if u dont have it):-
    PORT=3000
    LIMIT=120

5. run command - nodemon index.js
6. Make the specific Api calls (for detailed info open src/api.js) :-
    http://localhost:3000/api/parkcar?carNumber=1212
    http://localhost:3000/api/unparkcar?slotNumber=1
    http://localhost:3000/api/getInfo?carNumber=1201
    http://localhost:3000/api/getInfo?slotNumber=2

7. You can hit these URLs in your browser or using Postman.