"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SideNav from "@/app/components/sideNav";

export default function AddEmployee() {
  const { data: Session } = useSession();
  const router = useRouter();
  const [categoryArray, setCategoryArray] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    jobTitle: "",
    password: "",
  });
  const [category, setCategory] = useState("");
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("");
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);

  const handleRoleChange = (e) => {
    const selectedValue = e.target.value;
    console.log("This is the selected value before", selectedValue);
    if (selectedValue === "employees") {
      setShowEmployeeDropdown(true);
      console.log("This is the selected value after", selectedValue);
      setCategory(selectedEmployeeRole);
      console.log("This is the category value ", category);
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: `${category}`,
      }));
    } else {
      setShowEmployeeDropdown(false);
      setCategory(selectedValue);
      setSelectedEmployeeRole("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: `${selectedValue}`,
      }));
      console.log("This tha category When its not employees", category);
    }
  };

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
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
      console.log("The selected employee role is:", selectedEmployeeRole);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <div className="dashBoardContainer">
      <SideNav />
      <div className="AddEmpContainer">
        <div className="navBar">
          <h1>Employees Management System</h1>
        </div>
        <form
          style={{ margin: "auto" }}
          className="form-container"
          onSubmit={handleSubmit}
        >
          <label style={{ color: "white" }}>
            Full Name:
            <input
              type="text"
              name="name"
              placeholder="Enter your full name ..."
              onChange={handleChange}
              required={true}
            />
          </label>
          <label style={{ color: "white" }}>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Enter your email ..."
              onChange={handleChange}
              required={true}
            />
          </label>
          <label style={{ color: "white" }}>
            Category:
            <div>
              <select name="category" onChange={handleChange} required={true}>
                <option value="">Select...</option>
                {categoryArray.map((cate) => {
                  return <option value={parseInt(cate.id)}>{cate.name}</option>;
                })}
              </select>
            </div>
          </label>
          <label style={{ color: "white" }}>
            Job Title:
            <input
              type="text"
              name="jobTitle"
              placeholder="Enter your job title ..."
              onChange={handleChange}
              required={true}
            />
          </label>
          <label style={{ color: "white" }}>
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
        </form>
      </div>
    </div>
  );
}
