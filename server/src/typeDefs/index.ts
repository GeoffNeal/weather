const typeDefs = `#graphql
    # Extend this if we want to include more activities
    enum Activities {
        SKIING
        SURFING
        OUTDOOR_SIGHTSEEING
        INDOOR_SIGHTSEEING
    }

    # This "Book" type defines the queryable fields for every book in our data source.
    type Recommendation {
        key: String!
        ranking: Float!
    }

    type Recommendations {
        city: String!
        countryCode: String!
        results: [Recommendation]!
    }

    type Coordinates {
        lat: Float!
        lon: Float!
    }

    input RecommendationsInput {
        name: String!
        activities: [Activities!]!
        days: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        recommendations(input: RecommendationsInput!): [Recommendations]
    }
`;

export default typeDefs;
