import React, { useState, useEffect } from 'react';

const useValidate = (values) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errors = {

    };

    setErrors({
      errors: {}
    })
  }, [values]);

  return {
    isErrors: true,
    errors,
  };
};

const useFormInput = (initialState) => {
  const [inputs, setInputs] = useState(initialState);

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  return {
    onChange: onChange,
    ...inputs,
  };
};

const useFormSubmit = (values) => {
  const onClick = () => {

  };

  return {
    onClick: onClick
  }
};

export default (props) => {
  const formInput = useFormInput({
    username: '',
    email: '',
    options: '',
  });

  console.log(formInput)

  const formSubmit = useFormSubmit();

  return <form>
    <div>
      <label>username</label>
      <input name="username" {...formInput} />
    </div>
    <div>
      <label>email</label>
      <input name="email" {...formInput} />
    </div>
    <div>
      <label>options</label>
      <select name="options" {...formInput}>
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
    </div>
    <div>
      <button {...formSubmit}>Submit</button>
    </div>
  </form>
}
