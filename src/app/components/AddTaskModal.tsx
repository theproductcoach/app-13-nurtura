"use client";
import { useState } from "react";
import styles from "./Modal.module.css";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskData: {
    task: string;
    dueDate: string;
    assignedTo: string;
  }) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAddTask,
}: AddTaskModalProps) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({ task, dueDate, assignedTo });
    setTask("");
    setDueDate("");
    setAssignedTo("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add New Task</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="task" className={styles.label}>
              Task
            </label>
            <input
              type="text"
              id="task"
              className={styles.input}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              placeholder="Describe the task"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dueDate" className={styles.label}>
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className={styles.input}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="assignedTo" className={styles.label}>
              Assigned To
            </label>
            <input
              type="text"
              id="assignedTo"
              className={styles.input}
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Who should complete this task?"
              required
            />
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
