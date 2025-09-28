import * as React from 'react';
import { useAtom } from 'jotai';
import { searchAtom } from '../atoms/search';

const Search: React.FC = () => {
  const [search, setSearch] = useAtom(searchAtom);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleChange} />
    </div>
  );
};

export default Search;
