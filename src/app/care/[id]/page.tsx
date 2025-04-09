import Link from "next/link";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

// Mock data for care profiles
const careProfiles = {
  mum: {
    id: "mum",
    name: "Margaret Wilson",
    age: 78,
    address: "42 Maple Street, Riverside, RV1 2AB",
    preferences: [
      "Prefers tea in the morning, coffee only after lunch",
      "Likes to watch the news at 6pm",
      "Enjoys a short walk after breakfast when weather permits",
      "Needs reminder for medication at meals",
      "Prefers to have bath in the evening",
    ],
    weeklySchedule: [
      {
        day: "Monday",
        visits: [
          {
            time: "9:00 AM",
            carer: "Sarah",
            tasks: "Morning routine, breakfast",
          },
          {
            time: "6:00 PM",
            carer: "Michael",
            tasks: "Dinner, evening medication",
          },
        ],
      },
      {
        day: "Tuesday",
        visits: [
          {
            time: "9:00 AM",
            carer: "Sarah",
            tasks: "Morning routine, breakfast",
          },
          { time: "2:00 PM", carer: "Emma", tasks: "Afternoon walk, tea" },
        ],
      },
      {
        day: "Wednesday",
        visits: [
          {
            time: "9:00 AM",
            carer: "Michael",
            tasks: "Morning routine, breakfast",
          },
          {
            time: "6:00 PM",
            carer: "Emma",
            tasks: "Dinner, evening medication",
          },
        ],
      },
      {
        day: "Thursday",
        visits: [
          {
            time: "9:00 AM",
            carer: "Sarah",
            tasks: "Morning routine, breakfast",
          },
          { time: "2:00 PM", carer: "Michael", tasks: "Doctor's appointment" },
        ],
      },
      {
        day: "Friday",
        visits: [
          {
            time: "9:00 AM",
            carer: "Emma",
            tasks: "Morning routine, breakfast",
          },
          {
            time: "6:00 PM",
            carer: "Sarah",
            tasks: "Dinner, evening medication",
          },
        ],
      },
      {
        day: "Saturday",
        visits: [
          {
            time: "10:00 AM",
            carer: "Michael",
            tasks: "Morning routine, breakfast",
          },
          {
            time: "5:00 PM",
            carer: "Emma",
            tasks: "Dinner, evening medication",
          },
        ],
      },
      {
        day: "Sunday",
        visits: [
          {
            time: "10:00 AM",
            carer: "Sarah",
            tasks: "Morning routine, breakfast",
          },
          {
            time: "5:00 PM",
            carer: "Michael",
            tasks: "Dinner, evening medication",
          },
        ],
      },
    ],
  },
  dad: {
    id: "dad",
    name: "Robert Wilson",
    age: 80,
    address: "42 Maple Street, Riverside, RV1 2AB",
    preferences: [
      "Strong coffee with breakfast",
      "Prefers showers to baths",
      "Likes to read the newspaper in the garden",
      "Needs assistance with mobility",
      "Enjoys watching sports on TV",
    ],
    weeklySchedule: [
      {
        day: "Monday",
        visits: [
          {
            time: "8:30 AM",
            carer: "Michael",
            tasks: "Morning routine, breakfast",
          },
          {
            time: "5:30 PM",
            carer: "Emma",
            tasks: "Dinner, evening medication",
          },
        ],
      },
      // ... similar schedule structure as mum's profile
    ],
  },
};

export default function CareProfile({ params }: { params: { id: string } }) {
  const profile = careProfiles[params.id as keyof typeof careProfiles];

  if (!profile) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/dashboard" className={styles.backButton}>
          ← Back to Dashboard
        </Link>
        <h1 className={styles.title}>{profile.name}'s Care Profile</h1>
        <p className={styles.subtitle}>Age: {profile.age}</p>
      </header>

      <main className={styles.main}>
        {profile.address && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Address</h2>
            <p className={styles.address}>{profile.address}</p>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Care Preferences</h2>
          <ul className={styles.preferencesList}>
            {profile.preferences.map((preference, index) => (
              <li key={index} className={styles.preferenceItem}>
                {preference}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Weekly Schedule</h2>
          <div className={styles.schedule}>
            {profile.weeklySchedule.map((day) => (
              <div key={day.day} className={styles.daySchedule}>
                <h3 className={styles.dayTitle}>{day.day}</h3>
                <ul className={styles.visitsList}>
                  {day.visits.map((visit, index) => (
                    <li key={index} className={styles.visitItem}>
                      <div className={styles.visitTime}>{visit.time}</div>
                      <div className={styles.visitDetails}>
                        <span className={styles.carerName}>{visit.carer}</span>
                        <span className={styles.visitTasks}>{visit.tasks}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
