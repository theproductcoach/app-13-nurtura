"use client";
import { useState } from "react";
import styles from "./Modal.module.css";

interface AddVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVisit: (visitData: {
    date: string;
    time: string;
    carer: string;
    notes: string;
  }) => void;
}

export default function AddVisitModal({
  isOpen,
  onClose,
  onAddVisit,
}: AddVisitModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [carer, setCarer] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVisit({ date, time, carer, notes });
    setDate("");
    setTime("");
    setCarer("");
    setNotes("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Schedule a Visit</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Date
            </label>
            <input
              type="date"
              id="date"
              className={styles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="time" className={styles.label}>
              Time
            </label>
            <input
              type="time"
              id="time"
              className={styles.input}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="carer" className={styles.label}>
              Carer
            </label>
            <input
              type="text"
              id="carer"
              className={styles.input}
              value={carer}
              onChange={(e) => setCarer(e.target.value)}
              placeholder="Enter carer name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              className={styles.textarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes"
            ></textarea>
          </div>
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Schedule Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
