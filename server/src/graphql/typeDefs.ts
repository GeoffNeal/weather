const typeDefs = `#graphql
    # Extend this if we want to include more activities
    enum Activities {
        SKIING
        SURFING
        OUTDOOR_SIGHTSEEING
        INDOOR_SIGHTSEEING
    }

    # Contains the score for this activity
    type Recommendation {
        key: String!
        label: String!
        ranking: Float!
    }

    # Contains the data for the specified city
    type Recommendations {
        city: String!
        countryCode: String!
        results: [Recommendation]!
    }

    # Provide the name of the city and the activities you want rankings for
    # as well as the number of days you want to check over
    input RecommendationsInput {
        name: String!
        activities: [Activities!]!
        days: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "recommendations" query returns an array of zero or more Recommendations (defined above).
    type Query {
        recommendations(input: RecommendationsInput!): [Recommendations]
    }
`;

export default typeDefs;
