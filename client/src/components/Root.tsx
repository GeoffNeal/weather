import * as React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

type Recommendation = {
  key: string;
  ranking: number;
};

type RecommendationsReponse = {
  recommendations: Recommendation[];
};

const GET_RECOMMENDATIONS = gql`
  query GetRecommendations($input: RecommendationsInput!) {
    recommendations(input: $input) {
      key
      ranking
    }
  }
`;

const Root: React.FC = () => {
  const { loading, error, data } = useQuery<RecommendationsReponse>(GET_RECOMMENDATIONS, {
    variables: {
      input: {
        coordinates: {
          lat: 48.8251439,
          lon: 2.3786705,
        },
        activities: ['SKIING', 'OUTDOOR_SIGHTSEEING', 'SURFING', 'INDOOR_SIGHTSEEING'],
        days: '15',
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h1>My App</h1>

      <div>
        {data.recommendations.map((recommendation) => (
          <div key={recommendation.key}>
            <p>{recommendation.key}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Root;
