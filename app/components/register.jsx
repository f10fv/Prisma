"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [categoryArray, setCategoryArray] = useState([]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    jobTitle: "",
    password: "",
  });

  useEffect(() => {
    fetch("api/category", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data);
        setCategoryArray(data);
        console.log("This the category array", categoryArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const userIsAlreadyExist = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const { user } = await userIsAlreadyExist.json();

      if (user) {
        alert("User already exists.");
        return;
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      return;
    }
    try {
      let data = await fetch("/api/users", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      console.log(data);
      router.push(`/login`);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="loginPageContainer">
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            placeholder="Enter your full name ..."
            onChange={handleChange}
            required={true}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter your email ..."
            onChange={handleChange}
            required={true}
          />
        </label>
        <label>
          Category:
          <div>
            <select name="category" onChange={handleChange} required={true}>
              <option value="">Select...</option>
              {categoryArray.map((cate) => {
                return <option key={cate.id} value={parseInt(cate.id)}>{cate.name}</option>;
              })}
            </select>
          </div>
        </label>
        <label>
          Job Title:
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter your job title ..."
            onChange={handleChange}
            required={true}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password ..."
            required={true}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <br />
        <Link style={{ textDecoration: "none", color: "black" }} href="/login">
          <p>
            Already have an account..? <span>Sign Up</span>
          </p>
        </Link>
      </form>
    </div>
  );
}
