import React from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ onInput }: Props) => {
  return (
    <TextField
      label='Search And Highlight'
      onInput={onInput}
      placeholder='search'
      style={{ width: '100%' }}
      color='secondary'
    />
  );
};

export default SearchBar;
