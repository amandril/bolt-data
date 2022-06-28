import { useEffect, useState } from "react";

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  // {
  //   name: 'wes',
  //   description: 'nice shoes',
  //   price: 1000
  // }

  function addFields() {
    let newField = { name: "", age: "" };
    setInputs([...inputs, newField]);
  }

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function handleDuplicateChange(e, ref) {
    //  [READ FIRST] we might not need this function at all - just make sure to copy the values from inputs and trigger an event handler

    // We need 'e' to figure out which input we want to duplicate

    // We need ref so we pass the fields we're working with

    let { value, name, type } = e.target;
    // setInputs({
    //   ...inputs,
    //   [name]: value,
    // });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    handleDuplicateChange,
    resetForm,
    clearForm,
  };
}
