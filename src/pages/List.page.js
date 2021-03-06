import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { ItemList } from "../components/ItemList";

import { getBeers, searchBeers } from "../../lib/beer.api";
import { Loading } from "../components/Loading";
import { SearchBar } from "../components/SearchBar";

export const ListPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBeers()
      .then(list => setList(list))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async query => {
    const res = await searchBeers(query);
    if (res.status === 200) setList(res.data);
    else console.log(res.data.message);
  };

  return (
    <>
      {loading && <Loading />}
      <SearchBar setSearch={query => handleSearch(query)} />
      <div className="list-group">
        {list.map(e => (
          <Link
            key={e._id}
            to={`/detail/${e._id}`}
            className="list-group-item list-group-item-action"
          >
            <ItemList>{e}</ItemList>
          </Link>
        ))}
      </div>
    </>
  );
};
