# Scraper

Scraper is a client - server application for scraping data from Capita snowboards site and save that data into MongoDB.
using JavaScript ES6, Node.js, Express and Mongoose.

## Installation

Clone or download this repository.
Use the package manager [npm](https://www.npmjs.com/get-npm) to install Scraper.
Open the console in the scraper directory and run the following command. 

```bash
npm install
```

Scraper uses MongoDB, so it has to be installed and running on port 27017 on the machine that will start the Application.

To run Scraper in developer mode first run the server with command in the terminal(console):
```bash
npm run server
```

Don't close the terminal window.
Next in other terminal(console) in the Scraper directory run 
```bash
npm run start
```
The application will start and will open default browser location http://localhost:8080.
If port 8080 is occupied it will run on different one which is available.

## Usage

On start of the Scraper in the browser there is only one button "Click me to Scrape data".
After clicking it the scraper will scrape the data from Capita Snowboards website and will render it on the screen and save the data to MongoDB.
Clicking edit button above you can edit snowboard and update name or production code.
Clicking update button on the modal you will update the view and the item value in the database.
Delete button will delete the item.



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
