import React from 'react';
import Department from './Department';

function ListDepartments(props) {
  const { departments, handleCheckBox, uuid } = props;
  return (
    <>
      {departments.map((department) => (
        <Department
          key={department.code}
          uuid={uuid}
          handleCheckBox={handleCheckBox}
          department={department}
        />
      ))}
    </>
  );
}

export default ListDepartments;
