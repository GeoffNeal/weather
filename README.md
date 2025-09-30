# Weather App

A GraphQL server that generates some recommended activities based on a provided city, along with a basic frontend.

## Description

This app consists of two parts, the client (FE) and the server (BE)

The client is actually served from an express server that runs with `yarn start:client`

The reason I did it this way rather than using a framework like NextJS is that it seemed like overkill for the basic FE and would have been unnecessarily heavy and bloated.

The FE is built in React and uses Apollo client to call the BE which is a GraphQL server and will be running on http://localhost:4000

Both the server and client are compiled using separate webpack configs. The reason I took this approach was that it bundles everything into one file when it compiles the typescript, so I didn't need to put too much thought into making sure output files were output to the correct location and the paths matched up properly.

## Approach

I decided that the best way to provide different calculations based on the same data - while keeping it extensible - was to employ the factory pattern. So there is a class for each activity that adheres to an abstract class, ensuring that the call signature for all of them is the same, but we can provide different implementations for them for different calculations. It means we can add as many new activities as we like without affecting the implementation of the existing ones. I applied the same concept to the weather data points themselves, perhaps a bit overkill in retrospect but it means whenever we want to add a new data point we can just create a new class and specify an optimum value, and the calculation shouldn't need to be touched.

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

I'm not aware of any formula to determine the optimum conditions of a specific activity...
So basically this is a completely arbitrary calculation based on what I think the values for these activities should _probably_ be.

The steps are as follows:

- Establish a range that is relevant for each measurement
  - For example snow_depth is measured in meters, so we're unlikely to find a scenario where we'd want 3m of snow. Therefore the range should be something like 0 - 2.
- From here, we'd select a target within the range that we consider optimal for this activity.
  - In the case of skiing for example we'd perhaps want something like 0.75 (I have no idea...)
- Now we express this as a percentage. In this case we'd do 0.75/2 = 0.375 (or 37.5%)
- So now we have the target, we need to see where the actual number falls. If the average snow_depth ends up being 0.5m then we know (using the same calculation) that this is equal to 25%.
- With this we can calculate the difference: Math.abs(0.25 - 0.375) = 0.125
  - The lower this number the better, as it means we are less distance from the target.
- Because we want a score where a higher value is better than a lower one (better from a user's perspective) we invert the score using 1 - 0.125 = 0.875, which we can then multiply by 100 to give 87.5, which will be our score for this data point.
- The sum of these scores (one for each weather data point) will be the total score.

There's probably a better way to do this, but I have no idea what it is...

For one thing I've only used a few data points from the API, temperature, windspeed and humidity and a few others. I could have added more but didn't see the point as it likely wouldn't have improved the accuracy that much, and I didn't want to waste time on it that being the case.

#### Testing

Coverage could be better

#### Styling

Styling is pretty basic, I've reused the global stylesheet from one of my other projects so there are a few unused varibales in there as well.

#### FE features

I've actually provided the ability to specify the number of days to check over. But I didn't have time to implement that on the FE, so it just defaults to 7 days as that's what was specified.

Likewise we can specify in the query which activities to get rankings for, I've just added all of them to the query but technically we can add and remove as required.
