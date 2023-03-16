import { SearchOutlined } from '@ant-design/icons';
import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { Input } from '../Input';
import { css, cx } from '@emotion/css';

export default function SearchInput({
  label,
  type,
  setType,
  inputSearch,
  setInputSearch,
  setCurrentPage,
  setSearch,
  placeholder,
  menuItem,
}) {
  const [saveType, setSaveType] = useState(type)
  const handleChange = (event) => {
    setSaveType(event.target.value)
  };
  const handleClickSearch = () => {
    setSearch(inputSearch);
    setType(saveType);
    setCurrentPage(1);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearch(inputSearch);
    }
  };
  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('text/plain');
    const trimmedValue = pastedValue.trim();
    document.execCommand('insertText', false, trimmedValue);
    e.preventDefault();
  };
  const handleChangeSeach = (e) => {
    const newValue = e.target.value;
    if (newValue.length === 0) {
      setSearch('');
    }
    if (newValue.charAt(0) === ' ') {
      setInputSearch(newValue.trim());
    } else {
      setInputSearch(newValue);
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 relative w-[40%]">
      <Input
        placeholder={placeholder}
        onChange={handleChangeSeach}
        value={inputSearch}
        height="h-12 xsm:h-14"
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
      <div className="absolute flex items-center justify-center right-5 mb-4 gap-2">
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#50c3c5',
              },
              '&:hover fieldset': {
                borderColor: '#50c3c5',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#50c3c5',
              },
            },
            '& .MuiInputBase-input': {
              color: '#50c3c5',
            },
          }}
          size="medium"
        >
          {menuItem && (
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={saveType}
              label={label}
              onChange={handleChange}
            >
              {menuItem.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </FormControl>
        <SearchOutlined
          onClick={handleClickSearch}
          className={cx(
            'w-9 h-9 text-primary',
            css`
              svg {
                width: 100%;
                height: 100%;
              }
            `
          )}
        />
      </div>
    </div>
  );
}
