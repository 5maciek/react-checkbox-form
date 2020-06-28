import React from 'react';
import ListDepartments from './ListDepartments';

function Company(props) {
  const { company, handleCheckBox } = props;
  return (
    <li className="company">
      <h3>{company.name}</h3>
      <ul className="department__list">
        <ListDepartments
          departments={company.departments}
          uuid={company.uuid}
          handleCheckBox={handleCheckBox}
        />
      </ul>
    </li>
  );
}

export default Company;
