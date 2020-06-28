import React from 'react';
import Company from './Company';

function ListCompanies(props) {
  const { data, handleCheckBox } = props;
  return (
    <>
      {data.map((company) => (
        <Company
          key={company.uuid}
          company={company}
          handleCheckBox={handleCheckBox}
        />
      ))}
    </>
  );
}

export default ListCompanies;
