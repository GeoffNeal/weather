import * as React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { searchAtom } from '../atoms/search';

type Recommendation = {
  city: string;
  countryCode: string;
  results: {
    key: string;
    ranking: number;
  }[];
};

type RecommendationsReponse = {
  recommendations: Recommendation[];
};

const GET_RECOMMENDATIONS = gql`
  query GetRecommendations($input: RecommendationsInput!) {
    recommendations(input: $input) {
      city
      countryCode
      results {
        key
        ranking
      }
    }
  }
`;

const Container = styled.div`
  flex: 1;
  height: 100vh;
  overflow-y: scroll;
`;

const Result = styled.div`
  padding: var(--default-padding);
  margin: var(--default-margin);
  box-shadow: var(--default-box-shadow);
`;

const Details = styled.div`
  display: flex;
`;

const Recommendation = styled.div`
  padding: var(--default-padding);
`;

const Results: React.FC = () => {
  const [search] = useAtom(searchAtom);
  const { loading, error, data } = useQuery<RecommendationsReponse>(GET_RECOMMENDATIONS, {
    variables: {
      input: {
        name: search,
        activities: ['SKIING', 'OUTDOOR_SIGHTSEEING', 'SURFING', 'INDOOR_SIGHTSEEING'],
        days: '15',
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (!data?.recommendations?.length) {
    return <h3>No results</h3>;
  }

  return (
    <Container>
      {data.recommendations.map((recommendation) => (
        <Result key={`${recommendation.city}-${recommendation.countryCode}`}>
          <h3>
            {recommendation.city} - {recommendation.countryCode}
          </h3>
          <Details>
            {recommendation.results.map((result, i) => (
              <Recommendation key={result.key}>
                <p>{`(${i + 1}) - ${result.key}`}</p>
                <span>{result.ranking.toFixed(2)}</span>
              </Recommendation>
            ))}
          </Details>
        </Result>
      ))}
    </Container>
  );
};

export default Results;
