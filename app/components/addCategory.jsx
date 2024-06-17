"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SideNav from "@/app/components/sideNav";

export default function AddCategory() {
  const [categoryArray, setCategoryArray] = useState({});
  const router = useRouter();

  const handAddCategory = (e) => {
    setCategoryArray({ name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryArray) {
      alert("All fields are necessary");
      return;
    }
    console.log("categoryArray ", categoryArray);
    try {
      let data = await fetch("/api/category", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(categoryArray),
      });
      console.log(data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error registering the category:", error);
    }
  };

  return (
    <div className="dashBoardContainer">
      <SideNav />
      <div className="AddEmpContainer">
        <div className="navBar">
          <h1>Employees Management System</h1>
        </div>
        <div className="addCategory">
          <form onSubmit={handleSubmit} className="CategoryForm">
            <label>
              Add a Category :
              <input
                onChange={handAddCategory}
                type="text"
                placeholder="Enter Category Name"
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
