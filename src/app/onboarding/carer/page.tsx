"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./layout.module.css";

const QUALIFICATIONS = [
  "Healthcare Assistant Certificate",
  "First Aid Certification",
  "Dementia Care Training",
  "Manual Handling Certificate",
  "Medication Management Training",
  "Elder Care Specialist",
  "Registered Nurse",
];

const AVAILABILITY_SLOTS = [
  { id: "weekday-mornings", label: "Weekday Mornings" },
  { id: "weekday-afternoons", label: "Weekday Afternoons" },
  { id: "weekday-evenings", label: "Weekday Evenings" },
  { id: "weekend-mornings", label: "Weekend Mornings" },
  { id: "weekend-afternoons", label: "Weekend Afternoons" },
  { id: "weekend-evenings", label: "Weekend Evenings" },
];

const CARE_CAPABILITIES = [
  { id: "mobility", label: "Mobility Support" },
  { id: "personal-care", label: "Personal Care" },
  { id: "companionship", label: "Companionship" },
  { id: "cooking", label: "Meal Preparation" },
  { id: "transport", label: "Transportation" },
  { id: "medication", label: "Medication Management" },
  { id: "housekeeping", label: "Light Housekeeping" },
  { id: "exercise", label: "Exercise Assistance" },
];

export default function CarerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    photo: null as string | null,
    bio: "",
    yearsExperience: "",
    qualifications: [] as string[],
    availability: [] as string[],
    capabilities: [] as string[],
  });
  const [showWelcome, setShowWelcome] = useState(false);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setShowWelcome(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData("photo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Your Name</label>
              <input
                type="text"
                className={styles.input}
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Profile Photo (Optional)</label>
              <label className={styles.photoUpload}>
                <div className={styles.photoPreview}>
                  {formData.photo ? (
                    <img src={formData.photo} alt="Profile preview" />
                  ) : (
                    <span className={styles.photoIcon}>📷</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: "none" }}
                />
                <span>Click to upload a photo</span>
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Short Bio</label>
              <textarea
                className={styles.textarea}
                value={formData.bio}
                onChange={(e) => updateFormData("bio", e.target.value)}
                placeholder="Tell us about yourself and your care experience..."
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Years of Experience</label>
              <input
                type="number"
                className={styles.input}
                value={formData.yearsExperience}
                onChange={(e) =>
                  updateFormData("yearsExperience", e.target.value)
                }
                placeholder="Enter number of years"
                min="0"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Qualifications</label>
              {QUALIFICATIONS.map((qual) => (
                <div key={qual} className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id={qual}
                    className={styles.checkbox}
                    checked={formData.qualifications.includes(qual)}
                    onChange={(e) => {
                      const updatedQuals = e.target.checked
                        ? [...formData.qualifications, qual]
                        : formData.qualifications.filter((q) => q !== qual);
                      updateFormData("qualifications", updatedQuals);
                    }}
                  />
                  <label htmlFor={qual}>{qual}</label>
                </div>
              ))}
            </div>
          </>
        );

      case 3:
        return (
          <div className={styles.formGroup}>
            <label className={styles.label}>Weekly Availability</label>
            <div className={styles.availabilityGrid}>
              {AVAILABILITY_SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  className={`${styles.availabilityCard} ${
                    formData.availability.includes(slot.id)
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => {
                    const updatedSlots = formData.availability.includes(slot.id)
                      ? formData.availability.filter((id) => id !== slot.id)
                      : [...formData.availability, slot.id];
                    updateFormData("availability", updatedSlots);
                  }}
                >
                  {slot.label}
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className={styles.formGroup}>
            <label className={styles.label}>Care Services You Offer</label>
            {CARE_CAPABILITIES.map((capability) => (
              <div key={capability.id} className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id={capability.id}
                  className={styles.checkbox}
                  checked={formData.capabilities.includes(capability.id)}
                  onChange={(e) => {
                    const updatedCaps = e.target.checked
                      ? [...formData.capabilities, capability.id]
                      : formData.capabilities.filter(
                          (id) => id !== capability.id
                        );
                    updateFormData("capabilities", updatedCaps);
                  }}
                />
                <label htmlFor={capability.id}>{capability.label}</label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Tell us about yourself",
    "Your experience",
    "Your availability",
    "Services you offer",
  ];

  if (showWelcome) {
    return (
      <div className={styles.container}>
        <div className={styles.welcomeScreen}>
          <h1 className={styles.welcomeTitle}>Welcome, {formData.name}!</h1>
          <p className={styles.welcomeMessage}>
            Your profile has been created. You can now start connecting with
            families looking for care.
          </p>
          <button
            onClick={() => router.push("/carer-dashboard")}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            View Your Dashboard
          </button>
        </div>
      </div>
    );
  }

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
