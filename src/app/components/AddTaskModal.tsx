import { useState } from "react";
import styles from "./AddVisitModal.module.css"; // Reusing the same styles

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: any) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onSave,
}: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    recipient: "",
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
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
          <h2 className={styles.title}>Add New Task</h2>
          <p className={styles.subtitle}>
            Create a new task for a care recipient
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
            <label htmlFor="title" className={styles.label}>
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={styles.input}
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className={styles.textarea}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dueDate" className={styles.label}>
              Due Date (Optional)
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className={styles.input}
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dueTime" className={styles.label}>
              Due Time (Optional)
            </label>
            <input
              type="time"
              id="dueTime"
              name="dueTime"
              className={styles.input}
              value={formData.dueTime}
              onChange={handleChange}
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
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
