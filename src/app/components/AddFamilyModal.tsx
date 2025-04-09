import { useState } from "react";
import styles from "./AddVisitModal.module.css"; // Reusing the same styles

interface AddFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (familyData: any) => void;
}

export default function AddFamilyModal({
  isOpen,
  onClose,
  onSave,
}: AddFamilyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    email: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const relationships = [
    "Daughter",
    "Son",
    "Sibling",
    "Partner",
    "Friend",
    "Other Family",
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Family Member</h2>
          <p className={styles.subtitle}>
            Invite a family member to join your care circle
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter family member's name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="relationship" className={styles.label}>
              Relationship
            </label>
            <select
              id="relationship"
              name="relationship"
              className={styles.select}
              value={formData.relationship}
              onChange={handleChange}
              required
            >
              <option value="">Select relationship</option>
              {relationships.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
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
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
