import React, { useEffect } from 'react';
import { SearchIcon } from 'components/svg';

interface SearchInputProps {
  value: string;
  valueToFilter?: string;
  secondValueToFilter?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
  itemsToSearch?: any[];
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  valueToFilter = 'descri',
  secondValueToFilter = '',
  setValue,
  setResults,
  itemsToSearch,
  placeholder = 'Search',
}) => {
  useEffect(() => {
    //chose in props the filter condition
    const filterItems = (items: any[], value: string) => {
      return items.filter(item =>
        value.length
          ? secondValueToFilter.length
            ? item![valueToFilter][secondValueToFilter]
                ?.toLowerCase()
                .includes(value.toLowerCase())
            : item![valueToFilter]?.toLowerCase().includes(value.toLowerCase())
          : [],
      );
    };

    itemsToSearch && setResults(filterItems(itemsToSearch, value));
  }, [value, itemsToSearch]); // eslint-disable-line

  return itemsToSearch!.length ? (
    <div className="flex justify-start pt-10 pb-3 items-center pr-5">
      <div className="border bg-white-off rounded-md">
        <div className="flex items-center gap-2 px-2 bg-white">
          <SearchIcon />
          <input
            className="w-[300px] border h-full bg-white border-white focus:border-white focus:ring-0 shadow-2xl"
            type="search"
            placeholder={`${placeholder}...`}
            value={value}
            onChange={e => setValue((e.target as HTMLInputElement).value)}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default SearchInput;
