import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

const useTableFilter = ({
  filter,
  setFilter,
  timer = 300,
}) => {
  const [inputValue, setInputValue] = useState(filter);

  const onInputValueChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, timer);

  return { inputValue, setInputValue, onInputValueChange };
};

export default useTableFilter;
