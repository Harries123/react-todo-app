import React from 'react';
import { getOptions } from '../../services/filter'; 

export default function Filter(props) {
  const { filter, changeFilter, sortListByDueDate, sortListByPriority } = props;
  const options = getOptions();

  const getClass = (key) => (key === filter ? 'selected' : '');

  const handleSortByDueDate = (order) => {

    if (sortListByDueDate) {
      sortListByDueDate(order);
    } else {
      console.error("sortListByDueDate function is not available.");
    }
  };

  const handleSortByPriority = () => {

    if (sortListByPriority) {
      sortListByPriority();
    } else {
      console.error("sortListByPriority function is not available.");
    }
  };

  return (
    <div>
      <ul className="filters list-unstyled clearfix">
        {Object.keys(options).map((key) => (
          <li key={key}>
            <a onClick={() => changeFilter(key)} className={getClass(key)}>
              {options[key]}
            </a>
          </li>
        ))}
      </ul>

      <div className="sorting-options">
        <span>Sort By:</span>
        <button onClick={() => handleSortByDueDate('asc')} className="btn btn-sort">
          Due Date (Asc)
        </button>
        <button onClick={() => handleSortByDueDate('desc')} className="btn btn-sort">
          Due Date (Desc)
        </button>
        <button onClick={() => handleSortByPriority('high-to-low')} className="btn btn-sort">
          Priority (High → Low)
        </button>
        <button onClick={() => handleSortByPriority('low-to-high')} className="btn btn-sort">
          Priority (Low → High)
        </button>
      </div>
    </div>
  );
}
