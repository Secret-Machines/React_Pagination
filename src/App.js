import React, { useState, useEffect } from "react";
import Pagination from "react-hooks-paginator";

function App() {
  const pageLimit = 20;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows/757/episodes")
      .then(response => response.json())
      .then(data => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    setCurrentData(data.slice(offset, offset + pageLimit));
  }, [offset, data]);

  return (
    <div>
      <ul>
        {currentData.map(data => (
          <li key={data.id}>{data.name}</li>
        ))}
      </ul>
      <Pagination
        totalRecords={data.length}
        pageLimit={pageLimit}
        pageNeighbours={2}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
