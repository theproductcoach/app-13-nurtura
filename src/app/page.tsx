import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const features = [
  {
    title: "Schedule Visits",
    description:
      "Easily coordinate care visits and manage schedules in one place. Keep track of who's visiting and when.",
    icon: "📅",
  },
  {
    title: "Share Notes",
    description:
      "Keep all family members informed with shared notes and updates about your loved one's care journey.",
    icon: "📝",
  },
  {
    title: "Track Tasks",
    description:
      "Never miss important tasks or medications. Set reminders and track completion of daily activities.",
    icon: "✓",
  },
];

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/logged-out-background.png"
            alt=""
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
            role="presentation"
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Caring for your parents,
            <br />
            made easier.
          </h1>
          <p className={styles.heroSubtitle}>
            Nurtura helps you organise care, coordinate visits, and keep
            everyone in the loop.
          </p>
          <div className={styles.buttonContainer}>
            <Link href="/choose-role" className={styles.ctaButton}>
              Get Started
            </Link>
            <Link href="/login" className={styles.loginButton}>
              Log In
            </Link>
          </div>
        </div>
      </div>

      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <div className={styles.featureIcon} aria-hidden="true">
                {feature.icon}
              </div>
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Nurtura. Making care coordination easier.
        </p>
      </footer>
    </div>
  );
}
