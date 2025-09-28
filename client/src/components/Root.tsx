import * as React from 'react';
import Search from './Search';
import Results from './Results';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Section = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Root: React.FC = () => {
  return (
    <Container>
      <Section>
        <Search />
      </Section>
      <Section>
        <Results />
      </Section>
    </Container>
  );
};

export default Root;
