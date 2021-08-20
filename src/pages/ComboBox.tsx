import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import nodes from '../data/nodes.data';

const ComboBox = () => {
  return (
    <Autocomplete
      id='combo-box-demo'
      options={nodes}
      getOptionLabel={(option) => option.text}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label='Combo box' variant='outlined' />
      )}
    />
  );
};

export default ComboBox;
