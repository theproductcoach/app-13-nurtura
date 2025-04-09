"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function ChooseRole() {
  return (
    <div className={styles.container}>
      <div className={styles.decorativeImage}>
        <Image
          src="/role-selection-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          role="presentation"
        />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Who are you here as?</h1>
          <p className={styles.subtitle}>Choose your role to get started</p>
        </header>

        <main className={styles.main}>
          <Link href="/dashboard" className={styles.roleCard}>
            <span className={styles.roleIcon}>👨‍👩‍👧‍👦</span>
            <div className={styles.roleContent}>
              <h2 className={styles.roleTitle}>
                I'm organising care for a parent
              </h2>
              <p className={styles.roleDescription}>
                Set up and manage care schedules, coordinate with family
                members, and find the right carers for your loved ones.
              </p>
            </div>
          </Link>

          <Link href="/carer-onboarding" className={styles.roleCard}>
            <span className={styles.roleIcon}>👩‍⚕️</span>
            <div className={styles.roleContent}>
              <h2 className={styles.roleTitle}>
                I'm offering my services as a carer
              </h2>
              <p className={styles.roleDescription}>
                Create your profile, set your availability, and connect with
                families looking for quality care services.
              </p>
            </div>
          </Link>
        </main>
      </div>
    </div>
  );
}
