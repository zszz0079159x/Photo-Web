import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Pictures from "../components/Pictures";

const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  const [current, setCurrent] = useState("");
  const auth = "563492ad6f9170000100000146ccb74e82ed41bebb31a07c9a4d53fb";
  const initialUrl = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchUrl = `https://api.pexels.com/v1/search?query=${current}&per_page=15&page=1`;

  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(parseData.photos);
  };

  const morepic = async () => {
    let newUrl;
    if (current === "") {
      newUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newUrl = `https://api.pexels.com/v1/search?query=${current}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(data.concat(parseData.photos));
  };

  useEffect(() => {
    console.log(initialUrl);
    search(initialUrl);
  }, []);

  useEffect(() => {
    if (current === "") {
      search(initialUrl);
    } else {
      search(searchUrl);
    }
  }, [current]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          setCurrent(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Pictures data={d} />;
          })}
      </div>

      <div className="more">
        <button onClick={morepic}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
