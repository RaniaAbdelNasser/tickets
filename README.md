


# Tickets - Reactjs Application
An application for create lots of tickets, see all Tickets ,and update Tickets .




## Getting started
To get the Project running locally:

- Clone this repo
- npm install to install all required dependencies
- ### `npm start` to start the local server

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Code Overview

### Built With

Reactjs

Mirage  - Mirage is a JavaScript library that lets frontend developers mock out backend APIs.

MUI - used to style the UI in Reactjs Proect.

## Application Structure

First routes:
- "/" - This route to home to see all Tickets.
- "/createTicket" - to create new ticket.
- "/viewTicket/:idTicket"  -to view  ticket.

Note : shouldn't tefresh the app if you add new data or update it becouse the server will refresh .

logic:

- use flux structure  to get the data from backend  (reducer, action, context )
- use react hooks to handel status 
- make component to generate (table view , list view , create ticket , view/edit ticket ) screens.







