"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";

export default function SideNav() {
  const router = useRouter()
 const {data: session} = useSession()
 console.log("session", session)


  return (
      <div className="sideNav">
        <div>
        <h2>Welcome {session?.user?.name && (session.user.name)}</h2>
        <h4>You're logged in as {session?.category?.name && (session.category.name)}</h4>
        </div>
        <ul>
          <li onClick={() => router.push("/dashboard")}>
            <AiOutlineDashboard
              style={{ fontSize: "30px", marginRight: "7px" }}
            />
            Dashboard
          </li>
            <li onClick={() => router.push("/addUser")}>
              <IoPeopleOutline style={{ fontSize: "30px", marginRight: "7px" }}/>
              Manage Employees
            </li>
            <li onClick={() => router.push("/addCategory")}>
              <BiCategoryAlt style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
              Category
            </li>

          <li onClick={() => router.push("/profile")}>
            <CiUser style={{ fontSize: "30px", marginRight: "7px" }} /> Profile
          </li>
          <li
            onClick={() => {
              signOut({redirect: true, callbackUrl: "/login"})
            }}
          >
            <HiOutlineLogout style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
            Logout
          </li>
        </ul>
      </div>
  );
}
