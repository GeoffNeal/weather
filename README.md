# Weather App

A GraphQL server that generates some recommended activities based on a provided city, along with a basic frontend.

## Description

This app consists of two parts, the client (FE) and the server (BE)

The client is actually served from an express server that runs with `yarn start:client`

The reason I did it this way rather than using a framework like NextJS is that it seemed like overkill for the basic FE and would have been unnecessarily heavy and bloated.

The FE is built in React and uses Apollo client to call the BE which is a GraphQL server and will be running on http://localhost:4000

Both the server and client are compiled using separate webpack configs. The reason I took this approach was that it biundles everything into one file when it compiles the typescript, so I didn't need to put too much thought into making sure output files were output to the correct location and the paths matched up properly.

## Approach

I decided that the best way to provide different calculations based on the same data - while keeping it extensible - was to employ the factory pattern. So there is a class for each activity that adheres to an abstract class, ensuring that the call signature for all of them is the same, but we can provide different implementations for them for different calculations. It means we can add as many new activities as we like without affecting the implementation of the existing ones.

My calculations are detailed in the `Tradeoffs` section.

## Usage of AI

I haven't used AI for this project.

## Prerequisites

Make sure you have node and yarn installed on your machine, this app uses (as per package.json):

```json
{
  "engines": {
    "node": ">=20.19",
    "yarn": ">=4.0"
  }
}
```

## Setup

#### Environment

If you really want to, you can create a .env file and populate it. I added it as I thought I might need more but the only env varibale this app uses is `WEBSERVER_PORT` and that defaults to 8080 anyway. Up to you if you want to serve it on a different port.

#### Running the app

Make sure you are in the root directory

Install dependencies

```sh
yarn install
```

Run the app using:

```sh
yarn start
```

This should build and run the client and server together.

At this point, the FE should be running on port 8080 (or another port if you specified one in the .env file) and the server should be running on port 4000.

You can obviously visit the server directly if you want to test it without the FE.

- FE: http://localhost:8080
- BE: http://localhost:4000

From here it should just be a case of visiting the FE and inputting whatever city name you want into the input field.

## Tradeoffs

#### Dev mode

The way I've set this up means that whenever there's a change I have to restart the server and recompile. Obviously not ideal for development, but I decided I didn't want to spend my time making the developer experience perfect, though I absolutely would if I had time!

On the plus side it should just be a matter of running `yarn start` so it's not apocalyptic.

#### Calculations

As far as I'm aware, there is no algorithm or formula that can calculate an accurate ranking for activities based on a few weather data points. So I've opted for something pretty basic and probably quite inaccurate...

For one thing I've only used 3 data points from the API, temperature, windspeed and humidity. I could have added more but didn't see the point as it likely wouldn't have improved the accuracy that much, and I didn't want to waste time on it that being the case.

The way I've done it is just to take the average of all the data points provided and compare them to an optimum that I've arbitrarily decided on based on my own intuition, for example we'd assume that for skiing we wouldn't want temperatures of 40 degrees.

We can now compare the average to the optimum and record the distance between them. I've then just taken the minimum of this score and 100, from 100. So we'll have a score that is between 0 and 100 with 100 being the best and 0 being the worst.

#### Testing

Coverage could be better

#### Styling

Styling is pretty basic, I've resused the global stylesheet from one of my other projects so there are a few unused varibales in there as well.

#### FE features

I've actually provided the ability to specify the number of days to check over. But I didn't have time to implement that on the FE, so it just defaults to 7 days as that's what was specified.

Likewise we can specify in the query which activities to get rankings for, I've just added all of them to the query but technically we can add and remove as required.
