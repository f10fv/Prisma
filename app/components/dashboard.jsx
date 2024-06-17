"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import SideNav from "@/app/components/sideNav";

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    fetch("api/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data);
        setUsers(data);
        setReload(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reload]);

  useEffect(() => {
    fetch("api/contracts", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data);
        setContracts(data);
        setReload(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reload]);

  const handleDeleteClick = async (user) => {
    console.log("this the id", user.id);
    try {
      const res = await fetch(`/api/users`, {
        method: "DELETE",
        body: JSON.stringify({ id: user.id }),
      });
      console.log(res.status);
      const resBody = await res.json();
      if (res.status === 400) {
        alert(resBody.message);
        return;
      }
      if (res.ok) {
        setReload(true);
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleEditClick = (user) => {
    router.push(`/addContract/${user.id}`);
  };

  const handleViewClick = (user) => {
    router.push(`/employeeProfiles/${user.id}`);
  };

  const handleContractDeleteClick = async (contract) => {
    try {
      const res = await fetch(`/api/contracts`, {
        method: "DELETE",
        body: JSON.stringify({ id: contract.id }),
      });
      console.log(res.status);
      const resBody = await res.json();
      if (res.status === 400) {
        alert(resBody.message);
        return;
      }
      if (res.ok) {
        setReload(true);
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleContractViewClick = (contract) => {
    router.push(`/contractProfile/${contract.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const formatContractsDates = (contracts) => {
    return contracts.map(contract => ({
      ...contract,
      startDate: formatDate(contract.startDate),
      endDate: formatDate(contract.endDate),
    }));
  };
  const formattedContracts = formatContractsDates(contracts);
  
  return (
    <div className="dashBoardContainer">
      <SideNav />
      <div className="tablesContainer">
        <div className="navBar">
          <h1>Employees Management System</h1>
        </div>
        <div className="usersTable">
          <center>
            <h1>Our Employees</h1>
          </center>
          <table>
            <thead>
              <tr className="TrThead">
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.category.name}</td>
                    <td className="actions">
                      <MdDelete
                        onClick={() => handleDeleteClick(user)}
                        style={{
                          fontSize: "1.3rem",
                          paddingRight: "7px",
                          cursor: "pointer",
                        }}
                      />{" "}
                      <FaEdit
                        onClick={() => handleEditClick(user)}
                        style={{
                          fontSize: "1.3rem",
                          paddingRight: "7px",
                          cursor: "pointer",
                        }}
                      />
                      <FaEye
                        onClick={() => handleViewClick(user)}
                        style={{ fontSize: "1.3rem", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="contractsTable">
          <center>
            <h1>Contracts</h1>
          </center>
          <table>
            <thead>
              <tr className="TrThead">
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Salary</th>
                <th>Actions</th>
                {console.log("Contracts", contracts)}
              </tr>
            </thead>
            <tbody>
              {formattedContracts.map((contract) => {
                return (
                  <tr key={contract.id}>
                    <td>{contract.user.name}</td>
                    <td>{contract.startDate}</td>
                    <td>{contract.endDate}</td>
                    <td>{contract.salary}</td>
                    <td className="actions">
                      <MdDelete
                        onClick={() => handleContractDeleteClick(contract)}
                        style={{
                          fontSize: "1.3rem",
                          paddingRight: "7px",
                          cursor: "pointer",
                        }}
                      />{" "}
                      <FaEdit
                        onClick={() => date()}
                        style={{
                          fontSize: "1.3rem",
                          paddingRight: "7px",
                          cursor: "pointer",
                        }}
                      />
                      <FaEye
                        onClick={() => handleContractViewClick(contract)}
                        style={{ fontSize: "1.3rem", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
