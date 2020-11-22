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
4. create a .env file in the root directory with the specified format line by line and save:-
    PORT=3000
    LIMIT=120

5. run command - nodemon index.js
6. Make the specific Api calls (for detailed info open src/api.js) :-
    http://localhost:3000/api/parkcar?carNumber=1212
    http://localhost:3000/api/unparkcar?slotNumber=1
    http://localhost:3000/api/getInfo?carNumber=1201
    http://localhost:3000/api/getInfo?slotNumber=2

7. You can hit these URLs in your browser or using Postman.

Solution :- 
The server allows any user to make a request which can be to park a car or un-park a car or getinfo of parking. All these requests fall into a request cap based on IP Address which is the user is not allowed to make more then 10 requests per 10 seconds and this is applied to all kind of requests the user can make with a thrown mesaage that follows that you have exceeded the limit. So if the user passes the IP Request Cap validation he is allowed to make the request which are as below :-
    Park a Car (/api/parkcar?carNumber=2255) :- The server takes the input car number using the query parameter and validates if the input is a number and if that passes it checks if the parking lot has any slot that was vacated and occupies that but if not it gives a freash slot. But if all the slots have run out and no vacated slots are left we show an error message that we have run out of space.

    Un-Park a Car (/api/unparkcar?slotNumber=4) :- The server takes slot number as a query parameter from the user and validates that if that is a number, after the validation passes we look for the slot and unpark it but if that slot is not occupied we throw a message saying that the slot is already empty.

    Get Info (/api/getInfo?carNumber=1201 or /api/getInfo?slotNumber=2) :- The server takes car number or slot number as a query parameter and validates if that is a number and if the validation passes we fetch for the data based on the parameter passed. If nothing is found we throw a message for the specified value not found.