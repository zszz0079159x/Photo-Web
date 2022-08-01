import React from "react";

const Search = ({ search, setInput }) => {
  const InputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input className="input" onChange={InputHandler} type="text" />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
