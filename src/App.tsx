import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

import './App.css';
import { getNumbers, preparePageItems } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const paginationOptions: number[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(
    Number(searchParams.get('perPage')) || paginationOptions[1],
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );

  const showItems = preparePageItems(items, perPage, currentPage);
  const pageHeader = `Page ${currentPage} (items ${perPage * (currentPage - 1) + 1} - ${Math.min(perPage * currentPage, items.length)} of ${items.length})`;

  const pageChangeHandler = (page: number) => {
    setCurrentPage(page);
    setSearchParams(`?page=${currentPage}&perPage=${perPage}`);
  };

  useEffect(() => {
    setSearchParams(`?page=${currentPage}&perPage=${perPage}`);
  }, [currentPage, perPage, setSearchParams, searchParams]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {pageHeader}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            {paginationOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          pageChangeHandler(page);
        }}
      />

      <ul>
        {showItems.map((item, i) => (
          <li key={i} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
