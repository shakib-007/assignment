import React, { useState } from "react";

export default function UserForm() {

  const [inputList, setInputList] = useState([{ name: "", gender: "" }]);
  const [errors, setErrors] = useState([{ name: "", gender: "" }]);

  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return `${name} is Required`;
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = inputList.map(item => ({
      name: validateField("Name", item.name),
      gender: validateField("Gender", item.gender)
    }));
    setErrors(newErrors);
    return newErrors.every(error => !error.name && !error.gender);
  };

  const handleAddFields = () => {
    setInputList([...inputList, { name: "", gender: "" }]);
    setErrors([...errors, { name: "", gender: "" }]);
  };
 
  const handleRemoveFields = (index) => {
    console.log(index)
    const values = [...inputList];
    values.splice(index, 1);
    setInputList(values);
    
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    
    const newInputList = [...inputList];
    newInputList[index][name] = value;
    setInputList(newInputList);

    const newErrors = [...errors];
    newErrors[index][name] = validateField(name, value);
    setErrors(newErrors);
  };


  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", inputList);
    } else {
      console.log("Form has errors");
    }
  };
  
  return (
    <React.Fragment>
      <div className="card p-5 m-5">
        <div className="card-header">
          <h6 className="text-center">User Form</h6>
        </div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {inputList.map((item, index) => {
              return (
                <div className="row mb-3" key={index}>
                  <div className="col-md-4">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Your Name"
                      name="name"
                      value={inputList[index]?.name}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    {errors[index]?.name && (
                      <div className="text-danger">{errors[index].name}</div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      value={inputList[index]?.gender}
                      name="gender"
                      onChange={(event) => handleInputChange(index, event)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors[index]?.gender && (
                      <div className="text-danger">{errors[index].gender}</div>
                    )}
                  </div>
                  <div className="col-md-4" style={{ marginTop: "30px"}}>
                    {index === inputList.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={handleAddFields}
                    >
                      +
                    </button>)}
                    <button
                      color="danger"
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveFields(index)}
                      disabled={inputList.length === 1}
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
            <h3>{JSON.stringify(inputList)}</h3>
            <table className="table">
              <thead>  
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {inputList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
