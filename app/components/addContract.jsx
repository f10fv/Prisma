"use client";

import { signOut, useSession } from "next-auth/react";
import SideNav from "./sideNav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddContract({ id }) {
  const [user, setUser] = useState(null);
  const [contractData, setContractData] = useState({
    startDate: "",
    endDate: "",
    salary: "",
    userId: id,
  });
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        const foundUser = data.find((user) => user.id === parseInt(id));
        setUser(foundUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const value =
      e.target.name === "startDate" || e.target.name === "endDate"
        ? new Date(e.target.value).toISOString()
        : e.target.value;

    setContractData({
      ...contractData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const salary = parseInt(contractData.salary);
      const contractDataToSend = {
        ...contractData,
        salary: isNaN(salary) ? 0 : salary,
      };
      const response = await fetch("/api/contracts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractDataToSend),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="dashBoardContainer">
      <SideNav />
      <div className="tablesContainer">
        <div className="navBar">
          <h1>Employees Management System</h1>
        </div>
        <form style={{marginTop: "25vh"}} className="form-container" onSubmit={handleSubmit}>
          <label style={{color: "white"}}>
            Start Date:
            <input
              type="date"
              name="startDate"
              placeholder="Enter the start date ..."
              onChange={handleChange}
              required={true}
            />
          </label>
          <label style={{color: "white"}}>
            End Date:
            <input
              type="date"
              name="endDate"
              placeholder="Enter the end date ..."
              onChange={handleChange}
              required={true}
            />
          </label>
          <label style={{color: "white"}}>
            Salary:
            <input
              type="number"
              name="salary"
              placeholder="Enter the salary ..."
              onChange={handleChange}
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
