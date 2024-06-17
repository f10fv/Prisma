"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Login() {
  const [email, setEmail] = useState("youssef@gmail.com");
  const [password, setPassword] = useState("123123");
  const router = useRouter();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        alert("invalid credentials");
        return;
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginPageContainer">
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <br />
        <Link
          style={{ textDecoration: "none", color: "black" }}
          href="/register"
        >
          <p>
            Don't have in account..? <span>Sign Up</span>{" "}
          </p>
        </Link>
      </form>
    </div>
  );
}
