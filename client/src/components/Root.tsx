import * as React from 'react';
import Search from './Search';
import Results from './Results';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Section = styled.section<{ bgColor: string }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.bgColor};
`;

const Root: React.FC = () => {
  return (
    <Container>
      <Section bgColor="var(--brand-01-100)">
        <Search />
      </Section>
      <Section bgColor="var(--off-white)">
        <Results />
      </Section>
    </Container>
  );
};

export default Root;
