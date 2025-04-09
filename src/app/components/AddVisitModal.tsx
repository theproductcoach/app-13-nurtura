import { useState } from "react";
import styles from "./AddVisitModal.module.css";

interface AddVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (visitData: any) => void;
}

export default function AddVisitModal({
  isOpen,
  onClose,
  onSave,
}: AddVisitModalProps) {
  const [formData, setFormData] = useState({
    recipient: "",
    date: "",
    time: "",
    carerName: "",
    tasks: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Schedule a New Visit</h2>
          <p className={styles.subtitle}>
            Fill in the details below to schedule a new care visit
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="recipient" className={styles.label}>
              Care Recipient
            </label>
            <select
              id="recipient"
              name="recipient"
              className={styles.select}
              value={formData.recipient}
              onChange={handleChange}
              required
            >
              <option value="">Select a care recipient</option>
              <option value="Margaret Wilson">Margaret Wilson</option>
              <option value="Robert Wilson">Robert Wilson</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className={styles.input}
              value={formData.date}
              onChange={handleChange}
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
              name="time"
              className={styles.input}
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="carerName" className={styles.label}>
              Carer Name
            </label>
            <input
              type="text"
              id="carerName"
              name="carerName"
              className={styles.input}
              value={formData.carerName}
              onChange={handleChange}
              placeholder="Enter carer name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tasks" className={styles.label}>
              Tasks
            </label>
            <textarea
              id="tasks"
              name="tasks"
              className={styles.textarea}
              value={formData.tasks}
              onChange={handleChange}
              placeholder="Enter tasks for this visit"
              required
            />
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
