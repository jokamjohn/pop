# Population Management System

This is a system that contains a list of locations and the total 
number of residents broken down by gender.

## Documentation
Find the full documentation [here](https://documenter.getpostman.com/view/86315/RWgjaMgb)

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

Send a `POST` request with the `application/json` payload as shown in the example below to 
```angular2html
/api/v1/location
```

```angular2html
{
	"name": "Uganda",
	"female": 60,
	"male": 50,
	"total": 110
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
        "total": 110,
        "subLocations": []
    }
}
```

## Add a sub location to a location

Send a `POST` request with the location details to the url below replacing `:location_id`
with the location id.

```angular2html
/api/v1/add/sub/location/:location_id
```

## Get a location with its sub locations
Send a `GET` request to the endpoint below

```angular2html
/api/v1/location/:location_id
```
and a response will be returned as shown below

```angular2html
{
    "id": "5baa1fe39980437cf3766821",
    "name": "kagga",
    "female": 50,
    "male": 50,
    "total": 100,
    "subLocations": [
        {
            "id": "5bab932d1a2202a61e934970",
            "name": "JK",
            "female": 70,
            "male": 80,
            "total": 150,
            "subLocations": []
        },
        {
            "id": "5bab93b8f71da3a66869ded5",
            "name": "JoK",
            "female": 70,
            "male": 80,
            "total": 150,
            "subLocations": []
        },
    ]
}    
```

## Get all locations with sub locations

Send a `GET` request to the endpoint below

```angular2html
/api/v1/locations
```

### Update a location
Send a `PUT` request with a location data payload to teh endpoint below

```angular2html
/api/v1/locations/:id
```



