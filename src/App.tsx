import React, { useEffect, useState } from "react";
import { getCountries, getPeople } from './DataApi';

const App: React.FunctionComponent = () => {

  interface People2 {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }


  useEffect(() => {
    if (search !== '') {
      getPeople({ search }).then((data) => {
        let { searchResultCount, totalResultCounter } = data;
        let searchResults = data.searchResults as People2[];
        searchResults.map(async (item) => {
          let countrylist = await getCountries({ search: item.country });
          item.countryDetail = countrylist.searchResults.find((country) => country.alpha2Code === item.country || country.alpha3Code === item.country);
        })
        setResults({ searchResultCount, totalResultCounter, searchResults });
      })
    }
  }, [search])

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
              {item.countryDetail.flag && <img className="flag" height={50} src={`${item.countryDetail?.flag}`} alt="Flag alt" />}
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
