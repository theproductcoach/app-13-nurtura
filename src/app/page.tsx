import styles from "./page.module.css";

// Mock data for today's visits
const todaysVisits = [
  {
    time: "9:00 AM - 10:30 AM",
    carer: "Sarah Johnson",
    tasks: "Morning routine, medication, breakfast",
  },
  {
    time: "2:00 PM - 3:30 PM",
    carer: "Michael Chen",
    tasks: "Lunch, afternoon walk, vital signs check",
  },
  {
    time: "8:00 PM - 9:00 PM",
    carer: "Emma Williams",
    tasks: "Evening routine, medication, light dinner",
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.welcomeText}>Welcome to Nurtura</h1>
        <p className={styles.subtitle}>Caring for your loved ones, together.</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Today's Scheduled Visits</h2>
        <ul className={styles.visitList}>
          {todaysVisits.map((visit, index) => (
            <li key={index} className={styles.visitItem}>
              <div className={styles.visitTime}>{visit.time}</div>
              <div className={styles.visitCarer}>
                {visit.carer} · {visit.tasks}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.actionButtons}>
        <button className={styles.primaryButton}>Add Visit</button>
        <button className={styles.secondaryButton}>Add Task</button>
        <button className={styles.secondaryButton}>Add Family Member</button>
      </div>
    </div>
  );
}
