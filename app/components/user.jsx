"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SideNav from "./sideNav";

export default function User({ id }) {
  const [user, setUser] = useState(null);
  const [userContract, setUserContract] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        const foundUser = data.find((user) => user.id === parseInt(id));
        if (foundUser) {
          // Format the contract dates after fetching the user
          const formattedContract = foundUser.contracts.map((contract) => ({
            ...contract,
            startDate: formatDate(contract.startDate),
            endDate: formatDate(contract.endDate),
          }));

          setUser(foundUser);
          setUserContract(formattedContract[0]); // Assuming you want the first contract
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUser();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="dashBoardContainer">
      <SideNav />
      <div className="tablesContainer">
        <div className="navBar">
          <h1>Employees Management System</h1>
        </div>
        <div className="usersProfile">
          <h1>About {user?.name}</h1>
          <div className="userDetails">
            <p>
              Name: <span>{user?.name}</span>
            </p>
            <p>
              Email: <span>{user?.email}</span>
            </p>
            <p>
              Job Title: <span>{user?.jobTitle}</span>
            </p>
            <p>
              Category: <span>{user?.category.name}</span>
            </p>
            <p>
              Salary: <span>{userContract?.salary}$</span>
            </p>
            <p>
              Start Date: <span>{userContract?.startDate}</span>
            </p>
            <p>
              End Date: <span>{userContract?.endDate}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
