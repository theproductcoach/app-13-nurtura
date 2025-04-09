"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import AddVisitModal from "../components/AddVisitModal";
import AddTaskModal from "../components/AddTaskModal";
import AddFamilyModal from "../components/AddFamilyModal";

// Icons
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
      clipRule="evenodd"
    />
  </svg>
);

const TaskIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 5a1.875 1.875 0 00-1.875 1.875v1.875c0 1.035.84 1.875 1.875 1.875h3.75A1.875 1.875 0 0015 8.75V6.875A1.875 1.875 0 0013.125 5h-3.75zM6.25 8.75a1.875 1.875 0 011.875-1.875h1.875V5h-1.875A3.75 3.75 0 004.375 8.75v1.875h1.875V8.75zM13.125 17.5a1.875 1.875 0 001.875-1.875v-1.875h-1.875v1.875a1.875 1.875 0 01-1.875 1.875h-3.75A1.875 1.875 0 015.625 15v-1.875H3.75V15a3.75 3.75 0 003.75 3.75h5.625z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 013.042-3.042 1.724 1.724 0 00.172 0 11.955 11.955 0 017.956 0c.058.002.115.002.172 0a3 3 0 013.042 3.042.78.78 0 01-.358.442l-.34.19a1.2 1.2 0 01-.614.166H2.458a1.2 1.2 0 01-.614-.166l-.34-.19z" />
  </svg>
);

const getInitials = (name: string) => {
  return name.split(" ")[0][0];
};

// Mock data
const careRecipients = [
  {
    id: "mum",
    name: "Margaret Wilson",
    age: 78,
    nextVisit: {
      time: "9:00 AM Today",
      carer: "Sarah",
    },
  },
  {
    id: "dad",
    name: "Robert Wilson",
    age: 80,
    nextVisit: {
      time: "2:00 PM Today",
      carer: "Michael",
    },
  },
];

const todaysVisits = [
  {
    time: "9:00 AM",
    recipient: "Margaret Wilson",
    carer: "Sarah",
    tasks: "Morning routine, breakfast",
  },
  {
    time: "2:00 PM",
    recipient: "Robert Wilson",
    carer: "Michael",
    tasks: "Afternoon check-in, medication",
  },
  {
    time: "6:00 PM",
    recipient: "Margaret Wilson",
    carer: "Emma",
    tasks: "Dinner preparation, evening routine",
  },
];

export default function Dashboard() {
  const [isAddVisitModalOpen, setIsAddVisitModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSaveVisit = (visitData: any) => {
    console.log("New visit data:", visitData);
    setConfirmationMessage("Visit scheduled successfully!");
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleSaveTask = (taskData: any) => {
    console.log("New task data:", taskData);
    setConfirmationMessage("Task added successfully!");
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleSaveFamily = (familyData: any) => {
    console.log("New family member data:", familyData);
    setConfirmationMessage(
      `Invitation sent to ${familyData.name}${
        familyData.email ? ` (${familyData.email})` : ""
      }`
    );
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className={styles.container}>
      {showConfirmation && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            background: "#3ba99c",
            color: "white",
            padding: "1rem 1.5rem",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          {confirmationMessage}
        </div>
      )}

      <header className={styles.header}>
        <h1 className={styles.welcomeText}>Welcome Back, Jeannie</h1>
        <p className={styles.welcomeSubtext}>Here's your overview for today</p>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleRow}>
            <h2 className={styles.sectionTitle}>Care Recipients</h2>
          </div>
          <div className={styles.buttonRow}>
            <button
              className={styles.actionButton}
              onClick={() => setIsAddFamilyModalOpen(true)}
            >
              <UserGroupIcon />
              Add Family Member
            </button>
          </div>
        </div>
        <div className={styles.recipientGrid}>
          {careRecipients.map((recipient) => (
            <Link
              key={recipient.id}
              href={`/care/${recipient.id}`}
              className={styles.recipientCard}
            >
              <div className={styles.avatar}>{getInitials(recipient.name)}</div>
              <div className={styles.recipientInfo}>
                <h3 className={styles.recipientName}>{recipient.name}</h3>
                <p className={styles.recipientAge}>{recipient.age} years old</p>
                <div className={styles.nextVisit}>
                  <p className={styles.nextVisitLabel}>Next Visit</p>
                  <p className={styles.nextVisitTime}>
                    {recipient.nextVisit.time}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleRow}>
            <h2 className={styles.sectionTitle}>Today's Scheduled Visits</h2>
          </div>
          <div className={styles.buttonRow}>
            <button
              className={styles.actionButton}
              onClick={() => setIsAddVisitModalOpen(true)}
            >
              <CalendarIcon />
              Add Visit
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => setIsAddTaskModalOpen(true)}
            >
              <TaskIcon />
              Add Task
            </button>
          </div>
        </div>
        <div className={styles.visitsList}>
          {todaysVisits.map((visit, index) => (
            <div key={index} className={styles.visitEntry}>
              <p className={styles.visitTime}>{visit.time}</p>
              <p className={styles.visitRecipient}>{visit.recipient}</p>
            </div>
          ))}
        </div>
      </section>

      <AddVisitModal
        isOpen={isAddVisitModalOpen}
        onClose={() => setIsAddVisitModalOpen(false)}
        onSave={handleSaveVisit}
      />

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSave={handleSaveTask}
      />

      <AddFamilyModal
        isOpen={isAddFamilyModalOpen}
        onClose={() => setIsAddFamilyModalOpen(false)}
        onSave={handleSaveFamily}
      />
    </div>
  );
}
