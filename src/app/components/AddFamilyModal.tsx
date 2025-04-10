"use client";
import { useState } from "react";
import styles from "./Modal.module.css";

interface AddFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFamily: (familyData: {
    name: string;
    age: string;
    relationship: string;
  }) => void;
}

export default function AddFamilyModal({
  isOpen,
  onClose,
  onAddFamily,
}: AddFamilyModalProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [relationship, setRelationship] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFamily({ name, age, relationship });
    setName("");
    setAge("");
    setRelationship("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add a Family Member</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="age" className={styles.label}>
              Age
            </label>
            <input
              type="number"
              id="age"
              className={styles.input}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="relationship" className={styles.label}>
              Relationship
            </label>
            <input
              type="text"
              id="relationship"
              className={styles.input}
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              required
              placeholder="e.g. Mother, Father"
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
              Add Family Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
