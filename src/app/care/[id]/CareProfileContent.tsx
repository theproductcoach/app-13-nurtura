"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

interface CareProfile {
  id: string;
  name: string;
  age: number;
  address: string;
  preferences: string[];
}

// Edit icon component
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="20"
    height="20"
  >
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>
);

interface CareProfileContentProps {
  initialProfile: CareProfile;
}

export default function CareProfileContent({
  initialProfile,
}: CareProfileContentProps) {
  const [profile, setProfile] = useState<CareProfile>(initialProfile);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [editedAddress, setEditedAddress] = useState(profile.address);
  const [editedPreferences, setEditedPreferences] = useState([
    ...profile.preferences,
  ]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSaveAddress = () => {
    setProfile((prev) => ({
      ...prev,
      address: editedAddress,
    }));
    setIsEditingAddress(false);
    showSaveConfirmation();
  };

  const handleSavePreferences = () => {
    setProfile((prev) => ({
      ...prev,
      preferences: editedPreferences.filter((pref) => pref.trim() !== ""),
    }));
    setIsEditingPreferences(false);
    showSaveConfirmation();
  };

  const handleAddPreference = () => {
    setEditedPreferences((prev) => [...prev, ""]);
  };

  const handleRemovePreference = (index: number) => {
    setEditedPreferences((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePreferenceChange = (index: number, value: string) => {
    setEditedPreferences((prev) =>
      prev.map((pref, i) => (i === index ? value : pref))
    );
  };

  const showSaveConfirmation = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className={styles.container}>
      {showConfirmation && (
        <div className={styles.confirmation}>Changes saved successfully!</div>
      )}

      <header className={styles.header}>
        <Link href="/dashboard" className={styles.backButton}>
          ← Back to Dashboard
        </Link>
        <h1 className={styles.profileName}>{profile.name}'s Care Profile</h1>
        <p className={styles.profileAge}>Age: {profile.age}</p>
      </header>

      <main>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Address</h2>
            {!isEditingAddress && (
              <button
                className={styles.editButton}
                onClick={() => {
                  setIsEditingAddress(true);
                  setEditedAddress(profile.address);
                }}
              >
                <EditIcon />
                Edit
              </button>
            )}
          </div>

          {isEditingAddress ? (
            <div className={styles.editForm}>
              <textarea
                className={styles.input}
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
                rows={3}
              />
              <div className={styles.editActions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setIsEditingAddress(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleSaveAddress}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <p className={styles.address}>{profile.address}</p>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Care Preferences</h2>
            {!isEditingPreferences && (
              <button
                className={styles.editButton}
                onClick={() => {
                  setIsEditingPreferences(true);
                  setEditedPreferences([...profile.preferences]);
                }}
              >
                <EditIcon />
                Edit
              </button>
            )}
          </div>

          {isEditingPreferences ? (
            <div className={styles.editForm}>
              {editedPreferences.map((preference, index) => (
                <div key={index} className={styles.preferenceInput}>
                  <textarea
                    className={styles.input}
                    value={preference}
                    onChange={(e) =>
                      handlePreferenceChange(index, e.target.value)
                    }
                    rows={2}
                  />
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemovePreference(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className={styles.addButton}
                onClick={handleAddPreference}
              >
                + Add Preference
              </button>
              <div className={styles.editActions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setIsEditingPreferences(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleSavePreferences}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.preferencesList}>
              {profile.preferences.map((preference, index) => (
                <p key={index} className={styles.preference}>
                  {preference}
                </p>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
