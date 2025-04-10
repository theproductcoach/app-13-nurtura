"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// Logout Icon SVG
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.logoutIcon}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

// Mock data for demonstration
const MOCK_CLIENTS = [
  {
    id: "client-1",
    name: "Ellen Johnson",
    age: 78,
    careType: "Daily visits",
    nextVisit: "Tomorrow, 10:00 AM",
    address: "24 Maple Street, Greenview",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

// Updated interface to match client structure
interface Client {
  id: string;
  name: string;
  age: number;
  careType: string;
  nextVisit: string;
  address: string;
  image: string;
}

interface Request {
  id: string;
  name: string;
  age: number;
  careNeeds: string;
  frequency: string;
  startDate: string;
  image: string;
}

const MOCK_REQUESTS: Request[] = [
  {
    id: "req-1",
    name: "Robert Williams",
    age: 82,
    careNeeds: "Mobility assistance, medication reminders",
    frequency: "3 times per week",
    startDate: "Next Monday",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: "req-2",
    name: "Patricia Davis",
    age: 75,
    careNeeds: "Companionship, light housekeeping",
    frequency: "Twice weekly",
    startDate: "Next Wednesday",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
  },
];

const AVAILABILITY_SLOTS = [
  { id: "mon-am", day: "Monday", time: "Morning (8am-12pm)", available: true },
  {
    id: "mon-pm",
    day: "Monday",
    time: "Afternoon (1pm-5pm)",
    available: false,
  },
  { id: "tue-am", day: "Tuesday", time: "Morning (8am-12pm)", available: true },
  {
    id: "tue-pm",
    day: "Tuesday",
    time: "Afternoon (1pm-5pm)",
    available: true,
  },
  {
    id: "wed-am",
    day: "Wednesday",
    time: "Morning (8am-12pm)",
    available: true,
  },
  {
    id: "wed-pm",
    day: "Wednesday",
    time: "Afternoon (1pm-5pm)",
    available: false,
  },
  {
    id: "thu-am",
    day: "Thursday",
    time: "Morning (8am-12pm)",
    available: false,
  },
  {
    id: "thu-pm",
    day: "Thursday",
    time: "Afternoon (1pm-5pm)",
    available: true,
  },
  { id: "fri-am", day: "Friday", time: "Morning (8am-12pm)", available: true },
  { id: "fri-pm", day: "Friday", time: "Afternoon (1pm-5pm)", available: true },
];

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    // Prevent scrolling on the body when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the modal
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default function CarerDashboardPage() {
  const router = useRouter();
  const [activeClients, setActiveClients] = useState<Client[]>(MOCK_CLIENTS);
  const [pendingRequests, setPendingRequests] =
    useState<Request[]>(MOCK_REQUESTS);
  const [availability, setAvailability] = useState(AVAILABILITY_SLOTS);
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);

  // Modal states
  const [activeModal, setActiveModal] = useState<
    "clients" | "requests" | "availability" | null
  >(null);

  // Handle logout
  const handleLogout = () => {
    router.push("/");
  };

  // Handle request action (approve/reject)
  const handleRequestAction = (
    requestId: string,
    action: "approve" | "reject"
  ) => {
    if (action === "approve") {
      // Add as client and remove from requests
      const approvedRequest = pendingRequests.find(
        (req) => req.id === requestId
      );
      if (approvedRequest) {
        const newClient: Client = {
          id: approvedRequest.id,
          name: approvedRequest.name,
          age: approvedRequest.age,
          image: approvedRequest.image,
          careType: `${approvedRequest.frequency} - ${approvedRequest.careNeeds}`,
          nextVisit: "Next Monday, 10:00 AM",
          address: "15 Oak Lane, Riverdale",
        };
        setActiveClients([...activeClients, newClient]);
      }
    }
    // Remove from pending requests in both cases
    setPendingRequests(pendingRequests.filter((req) => req.id !== requestId));
  };

  // Toggle availability slot
  const toggleAvailability = (slotId: string) => {
    setAvailability(
      availability.map((slot) =>
        slot.id === slotId ? { ...slot, available: !slot.available } : slot
      )
    );
  };

  // Toggle expanded request
  const toggleRequest = (requestId: string) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  // Close modal handler
  const closeModal = () => {
    setActiveModal(null);
    setExpandedRequest(null);
  };

  // Render clients modal content
  const renderClientsModal = () => (
    <>
      {activeClients.length === 0 ? (
        <p className={styles.emptyState}>
          You don&apos;t have any active clients yet.
        </p>
      ) : (
        activeClients.map((client) => (
          <div key={client.id} className={styles.clientCard}>
            <div className={styles.clientHeader}>
              <div className={styles.clientProfile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.image}
                  alt={client.name}
                  className={styles.clientImage}
                />
                <div>
                  <h4 className={styles.clientName}>{client.name}</h4>
                  <p className={styles.clientAge}>{client.age} years old</p>
                </div>
              </div>
              <div className={styles.clientCareType}>{client.careType}</div>
            </div>

            <div className={styles.clientDetails}>
              <div className={styles.clientDetail}>
                <span className={styles.detailLabel}>Next Visit:</span>
                <span className={styles.detailValue}>{client.nextVisit}</span>
              </div>
              <div className={styles.clientDetail}>
                <span className={styles.detailLabel}>Address:</span>
                <span className={styles.detailValue}>{client.address}</span>
              </div>
            </div>

            <div className={styles.clientActions}>
              <button className={styles.actionButton}>View Care Plan</button>
              <button
                className={`${styles.actionButton} ${styles.secondaryButton}`}
              >
                Contact Family
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );

  // Render requests modal content
  const renderRequestsModal = () => (
    <>
      {pendingRequests.length === 0 ? (
        <p className={styles.emptyState}>
          You don&apos;t have any pending requests at the moment.
        </p>
      ) : (
        pendingRequests.map((request) => (
          <div key={request.id} className={styles.requestCard}>
            <div
              className={styles.requestHeader}
              onClick={() => toggleRequest(request.id)}
            >
              <div className={styles.clientProfile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={request.image}
                  alt={request.name}
                  className={styles.clientImage}
                />
                <div>
                  <h4 className={styles.clientName}>{request.name}</h4>
                  <p className={styles.clientAge}>{request.age} years old</p>
                </div>
              </div>
              <div
                className={`${styles.expandIcon} ${
                  expandedRequest === request.id ? styles.expanded : ""
                }`}
              >
                ▼
              </div>
            </div>

            {expandedRequest === request.id && (
              <>
                <div className={styles.requestDetails}>
                  <div className={styles.clientDetail}>
                    <span className={styles.detailLabel}>Care Needs:</span>
                    <span className={styles.detailValue}>
                      {request.careNeeds}
                    </span>
                  </div>
                  <div className={styles.clientDetail}>
                    <span className={styles.detailLabel}>Frequency:</span>
                    <span className={styles.detailValue}>
                      {request.frequency}
                    </span>
                  </div>
                  <div className={styles.clientDetail}>
                    <span className={styles.detailLabel}>Start Date:</span>
                    <span className={styles.detailValue}>
                      {request.startDate}
                    </span>
                  </div>
                </div>

                <div className={styles.requestActions}>
                  <button
                    className={`${styles.actionButton} ${styles.approveButton}`}
                    onClick={() => handleRequestAction(request.id, "approve")}
                  >
                    Approve Request
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.rejectButton}`}
                    onClick={() => handleRequestAction(request.id, "reject")}
                  >
                    Decline
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </>
  );

  // Render availability modal content
  const renderAvailabilityModal = () => (
    <>
      <p className={styles.availabilityInstructions}>
        Click on a time slot to toggle its availability status.
      </p>

      <div className={styles.availabilityGrid}>
        {availability.map((slot) => (
          <div
            key={slot.id}
            className={`${styles.availabilitySlot} ${
              slot.available ? styles.available : styles.unavailable
            }`}
            onClick={() => toggleAvailability(slot.id)}
          >
            <div className={styles.slotDay}>{slot.day}</div>
            <div className={styles.slotTime}>{slot.time}</div>
            <div className={styles.slotStatus}>
              {slot.available ? "Available" : "Unavailable"}
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.actionButton} ${styles.saveButton}`}>
        Save Availability
      </button>
    </>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Carer Dashboard</h1>
          <p className={styles.subtitle}>
            Manage your care services and clients
          </p>
        </div>
        <button
          className={styles.logoutButton}
          onClick={handleLogout}
          title="Logout"
        >
          <LogoutIcon />
        </button>
      </header>

      <div className={styles.welcomeCard}>
        <h2 className={styles.welcomeTitle}>Welcome to your dashboard!</h2>
        <p className={styles.welcomeText}>
          Your profile is now live. Families can find and connect with you based
          on your profile information and availability.
        </p>
      </div>

      <div className={styles.cardsGrid}>
        <div
          className={`${styles.dashboardCard} ${styles.clickableCard}`}
          onClick={() => setActiveModal("clients")}
        >
          <h3 className={styles.cardTitle}>Active Clients</h3>
          <div className={styles.statNumber}>{activeClients.length}</div>
          <div className={styles.statLabel}>Current clients</div>
        </div>

        <div
          className={`${styles.dashboardCard} ${styles.clickableCard}`}
          onClick={() => setActiveModal("requests")}
        >
          <h3 className={styles.cardTitle}>Pending Requests</h3>
          <div className={styles.statNumber}>{pendingRequests.length}</div>
          <div className={styles.statLabel}>Families interested</div>
        </div>

        <div
          className={`${styles.dashboardCard} ${styles.clickableCard}`}
          onClick={() => setActiveModal("availability")}
        >
          <h3 className={styles.cardTitle}>Your Availability</h3>
          <div className={styles.statNumber}>
            {availability.filter((slot) => slot.available).length}
          </div>
          <div className={styles.statLabel}>Time slots available</div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === "clients"}
        onClose={closeModal}
        title="Your Active Clients"
      >
        {renderClientsModal()}
      </Modal>

      <Modal
        isOpen={activeModal === "requests"}
        onClose={closeModal}
        title="Pending Care Requests"
      >
        {renderRequestsModal()}
      </Modal>

      <Modal
        isOpen={activeModal === "availability"}
        onClose={closeModal}
        title="Manage Your Availability"
      >
        {renderAvailabilityModal()}
      </Modal>

      <div className={styles.dashboardCard}>
        <h3 className={styles.cardTitle}>Next Steps</h3>
        <ul className={styles.nextStepsList}>
          <li>Review and respond to care requests</li>
          <li>Update your weekly availability</li>
          <li>Prepare for your upcoming client visits</li>
        </ul>
      </div>
    </div>
  );
}
