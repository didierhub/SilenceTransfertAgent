import React from 'react';

 const FormInput = ({ label, id, type, value, onChange, required, placeholder }) => (
  <div className="grid gap-2">
    <label htmlFor={id} className="text-gray-500 text-sm">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="shadow-md  bg-transparent  rounded-md  pl-2 border-b-2 border-0 "
      placeholder={placeholder}
    />
  </div>
);

 const FormTextarea = ({ label, id, rows, value, onChange, required, placeholder }) => (
  <div className="grid gap-2">
    <label htmlFor={id} className="text-gray-500 text-sm">
      {label}
    </label>
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className=" shadow-md  bg-transparent rounded-md border-0  border-b-2 "
    ></textarea>
  </div>
);

const SelectInput = ({ label, id, value, onChange, required, options }) => {
    return (
      <div className="grid gap-2">
        <label htmlFor={id} className="text-gray-500 text-sm">
          {label}
        </label>
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className="shadow-md rounded-md"
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };







export{FormInput,FormTextarea,SelectInput}