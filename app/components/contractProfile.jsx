"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SideNav from "./sideNav";

export default function ContractProfile({ id }) {
  const [userContract, setUserContract] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchContract() {
      try {
        const res = await fetch("/api/contracts");
        const data = await res.json();
        const foundContract = data.find((contract) => contract.id === parseInt(id));

        if (foundContract) {
          const formattedContract = {
            ...foundContract,
            startDate: formatDate(foundContract.startDate),
            endDate: formatDate(foundContract.endDate),
          };

          setUserContract(formattedContract);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchContract();
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
          <h1>About {userContract?.user?.name}</h1>
          <div className="userDetails">
            <p>
              Name: <span>{userContract?.user?.name}</span>
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
