"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Role = "family" | "carer" | null;

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === "family") {
      router.push("/dashboard");
    } else if (selectedRole === "carer") {
      router.push("/carer-dashboard");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log in to Nurtura</h1>

        <div className={styles.roleSelector}>
          <div
            className={`${styles.roleOption} ${
              selectedRole === "family" ? styles.selected : ""
            }`}
            onClick={() => setSelectedRole("family")}
          >
            <span className={styles.roleIcon}>👨‍👩‍👧‍👦</span>
            <span className={styles.roleText}>
              I&apos;m organising care for a parent
            </span>
          </div>

          <div
            className={`${styles.roleOption} ${
              selectedRole === "carer" ? styles.selected : ""
            }`}
            onClick={() => setSelectedRole("carer")}
          >
            <span className={styles.roleIcon}>👩‍⚕️</span>
            <span className={styles.roleText}>
              I&apos;m a carer offering my services
            </span>
          </div>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!selectedRole}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
