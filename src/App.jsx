import React, { useState, useRef } from "react";
import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, editUser } from "./action/userActions";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const formikRef = useRef(null);
  const [editingUser, setEditingUser] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      avatar: "",
      id: Date.now(),
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
      age: Yup.number()
        .required("Age is required")
        .min(1, "Age must be greater than 0"),
      avatar: Yup.string()
        .required("Avatar URL is required")
        .url("Enter a valid URL"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingUser) {
        dispatch(editUser({ ...values, id: editingUser.id })); 
        setEditingUser(null); 
      } else {
        dispatch(addUser({ ...values, id: Date.now() })); 
      }
      resetForm();
      formikRef.current.reset();
      alert("Form submitted successfully!");
    },
  });

  const handleEdit = (user) => {
    formik.setValues(user); 
    setEditingUser(user);   
  };

  const handleRemove = (id) => {
    dispatch(removeUser(id));  
  };

  return (
    <div className="w-[800px] mx-auto mt-10 mb-10">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-[1px]"
        ref={formikRef}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">User Form</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name.."
            className={`input input-bordered w-full ${
              formik.touched.name && formik.errors.name ? "input-error" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="age">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="Enter age..."
            className={`input input-bordered w-full ${
              formik.touched.age && formik.errors.age ? "input-error" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
          />
          {formik.touched.age && formik.errors.age ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.age}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="avatar">
            Avatar URL
          </label>
          <input
            id="avatar"
            name="avatar"
            type="text"
            placeholder="Enter avatar images URL..."
            className={`input input-bordered w-full ${
              formik.touched.avatar && formik.errors.avatar ? "input-error" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.avatar}
          />
          {formik.touched.avatar && formik.errors.avatar ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.avatar}</p>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary">
          {editingUser ? "Update" : "Save"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-2 text-center">Users List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="card p-4 border rounded-lg shadow-md">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center">{user.name}</h3>
              <p className="text-center text-gray-600">Age: {user.age}</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(user.id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
