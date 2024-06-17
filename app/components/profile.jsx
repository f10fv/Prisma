"use client";

import SideNav from "@/app/components/sideNav";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <div className="dashBoardContainer">
      <SideNav />
      <div className="tablesContainer">
        <div className="navBar">
          <h1>Employees Management System</h1>
        </div>
        <div className="usersProfile">
          <h1>About {session?.user?.name}</h1>
          <div className="userDetails">
            <p>
              Name: <span>{session?.user?.name}</span>
            </p>
            <p>
              Email: <span>{session?.user?.email}</span>
            </p>
            <p>
              Category: <span>{session?.category.name}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
