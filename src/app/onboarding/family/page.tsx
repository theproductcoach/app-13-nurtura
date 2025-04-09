"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./layout.module.css";

const CARE_NEEDS = [
  { id: "medication", label: "Medication Management" },
  { id: "mobility", label: "Mobility Assistance" },
  { id: "meals", label: "Meal Preparation" },
  { id: "companionship", label: "Companionship" },
  { id: "transport", label: "Transportation" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    yourName: "",
    parentName: "",
    parentAge: "",
    relationship: "",
    careNeeds: [] as string[],
    inviteEmails: [""],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const addEmailInput = () => {
    setFormData((prev) => ({
      ...prev,
      inviteEmails: [...prev.inviteEmails, ""],
    }));
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...formData.inviteEmails];
    newEmails[index] = value;
    setFormData((prev) => ({ ...prev, inviteEmails: newEmails }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.formGroup}>
            <label className={styles.label}>Your Name</label>
            <input
              type="text"
              className={styles.input}
              value={formData.yourName}
              onChange={(e) => updateFormData("yourName", e.target.value)}
              placeholder="Enter your name"
            />
          </div>
        );

      case 2:
        return (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Their Name</label>
              <input
                type="text"
                className={styles.input}
                value={formData.parentName}
                onChange={(e) => updateFormData("parentName", e.target.value)}
                placeholder="Enter their name"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Their Age</label>
              <input
                type="number"
                className={styles.input}
                value={formData.parentAge}
                onChange={(e) => updateFormData("parentAge", e.target.value)}
                placeholder="Enter their age"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Your Relationship</label>
              <input
                type="text"
                className={styles.input}
                value={formData.relationship}
                onChange={(e) => updateFormData("relationship", e.target.value)}
                placeholder="e.g. Son, Daughter"
              />
            </div>
          </>
        );

      case 3:
        return (
          <div className={styles.formGroup}>
            <label className={styles.label}>Care Needs</label>
            {CARE_NEEDS.map((need) => (
              <div key={need.id} className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id={need.id}
                  className={styles.checkbox}
                  checked={formData.careNeeds.includes(need.id)}
                  onChange={(e) => {
                    const updatedNeeds = e.target.checked
                      ? [...formData.careNeeds, need.id]
                      : formData.careNeeds.filter((id) => id !== need.id);
                    updateFormData("careNeeds", updatedNeeds);
                  }}
                />
                <label htmlFor={need.id}>{need.label}</label>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className={styles.formGroup}>
            <label className={styles.label}>Invite Others (Optional)</label>
            {formData.inviteEmails.map((email, index) => (
              <input
                key={index}
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => updateEmail(index, e.target.value)}
                placeholder="Enter email address"
              />
            ))}
            <button
              type="button"
              onClick={addEmailInput}
              className={styles.buttonAction}
            >
              Add another email
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Tell us about yourself",
    "Who are you caring for?",
    "What care is needed?",
    "Build your care team",
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{stepTitles[step - 1]}</h1>
        <div className={styles.progress}>
          {[1, 2, 3, 4].map((dot) => (
            <div
              key={dot}
              className={`${styles.progressDot} ${
                dot <= step ? styles.progressDotActive : ""
              }`}
            />
          ))}
        </div>
      </header>

      <main className={styles.main}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          {renderStep()}
          <div className={styles.navigation}>
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className={`${styles.button} ${styles.buttonSecondary}`}
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              {step === 4 ? "Complete" : "Next"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
