import React from 'react';

function Department(props) {
  const { department, handleCheckBox, uuid } = props;
  return (
    <li key={department.code} className="department__item">
      <input
        type="checkbox"
        id={department.code}
        checked={department.required}
        onChange={(event) => handleCheckBox(event, uuid, department.code)}
      />
      <label htmlFor={department.code}>{department.label}</label>
    </li>
  );
}

export default Department;
