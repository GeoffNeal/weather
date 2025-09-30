import * as React from 'react';
import { useAtom } from 'jotai';
import throttle from 'lodash.throttle';
import { searchAtom } from '../atoms/search';
import styled from 'styled-components';

const Input = styled.input`
  appearance: none;
  border: 0;
  padding: var(--default-padding);
  margin: var(--default-margin);
  font-size: var(--font-size-md);

  @media (min-width: 768px) {
    border-radius: var(--default-border-radius);
  }
`;

const Search: React.FC = () => {
  const [search, setSearch] = useAtom(searchAtom);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div>
      <Input id="city" type="text" value={search} onChange={throttle(handleChange, 500)} />
    </div>
  );
};

export default Search;
