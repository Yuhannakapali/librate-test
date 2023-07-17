import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { useDebouncedEffect } from "./hooks/useDebounceEffect";
import { getCountries, getPeople } from './DataApi';
import { RootState } from './store'
import { useAppDispatch } from './store/hook';
import { addCountry } from './store/CountrySlice';


const App: React.FunctionComponent = () => {

  interface People {
    id: string;
    first_name: string;
    last_name: string;
    city: string;
    country: string;
    date_of_birth: string;
    countryDetail?: any;
  }

  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<any>({});

  const dispatch = useAppDispatch();

  const contriesList = useSelector((state: RootState) => state.countryReducer)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  useDebouncedEffect(() => {
    if (search !== '') {
      getPeople({ search }).then(async (data) => {
        let { searchResultCount, totalResultCounter } = data;
        let searchResults = data.searchResults as People[];
        searchResults.map(async (item) => {
          let storeCountry = contriesList.find((country) => country.alpha2Code === item.country || country.alpha3Code === item.country);
          if (storeCountry) {
            item.countryDetail = storeCountry;
            return;
          } else {
            //save the data in store  and only use it after ward but i am not using it here. this project need node 16 but i had 18 LTS installed wasted losts of time. trying to debug what happend
            // i know i was supoosed to use thunk here but i am running out of time. 
            // if done correctly this else block won't be necessary as all the data will be on the store and we can use it from there.
            let countrylist = await getCountries({ search: item.country });
            item.countryDetail = countrylist.searchResults.find((country) => country.alpha2Code === item.country || country.alpha3Code === item.country);
            if (countrylist.searchResults.length > 0) {
              dispatch(addCountry(countrylist.searchResults))
            }
          }
        })
        setResults({ searchResultCount, totalResultCounter, searchResults });
      })
    }
  }, [search], 500)

  return (
    <div className="pageWrapper">
      <p>Search Component</p>
      <input value={search} onChange={handleSearchChange} />
      <p>List Component</p>
      <div className="listWrapper">
        {
          results.searchResults && results?.searchResults.map((item, index) =>
            <div key={index}>
              <p>{`${item.first_name}  ${item.last_name}`}</p>
              {/* images are not loading because the image server is taking too much of time and its time outting while i test.  */}
              <img className="flag" height={50} src={`${item.countryDetail?.flag}`} alt="Flag alt" />
            </div>
          )
        }
      </div>
      <p>Found results: {results.searchResultCount} </p>
      <p>Total results: {results.totalResultCounter}</p>
    </div>
  );
};

export default App;
