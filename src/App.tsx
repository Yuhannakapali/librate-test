import React from "react";

const App: React.FunctionComponent = () => {

  return (
    <div className="pageWrapper">
      <p>Search Component</p>
      <input  />
      <p>List Component</p>
      <div className="listWrapper">
        <div>
          <p>Full name</p>
          <img className="flag" height={50} src="Flag src" alt="Flag alt" />
        </div>
      </div>
      <p>Found results: ?</p>
      <p>Total results: ?</p>
    </div>
  );
};

export default App;
