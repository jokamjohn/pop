# Population Management System

This is a system that contains a list of locations and the total 
number of residents broken down by gender.

## Setup
Install [mongodb]() and start its server using:

```angular2html
sudo mongod
```

create a database and add its url to the `.env`.

## Running the app

Ensure that you have [nodemon](https://nodemon.io/) installed and [yarn](https://yarnpkg.com/en/). `cd` into the pop folder and then install 
the app dependencies by running:

```angular2html
yarn install
``` 

To start the application run:

```angular2html
yarn start
```

## Adding a location

Send a `application/json` payload as shown in the example below to `/api/v1/location`
```angular2html
{
	"name": "Uganda",
	"female": 60,
	"male": 50
}
```

Response will be a `201` with a payload as shown in the 
example below.

```angular2html
{
    "status": "success",
    "data": {
        "name": "Uganda",
        "female": 60,
        "male": 50,
        "subLocations": []
    }
}
```


