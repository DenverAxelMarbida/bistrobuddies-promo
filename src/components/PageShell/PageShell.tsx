import { apk } from '../../content/assets'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Hero } from '../Hero/Hero'
import { OriginStory } from '../OriginStory/OriginStory'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './PageShell.module.css'

const steps = [
  { title: 'Browse', detail: 'Look through the menu before signing in.' },
  { title: 'Customize', detail: 'Choose your size, sugar level, and quantity.' },
  { title: 'Review', detail: 'Check your drinks and quantities in the cart.' },
  { title: 'Confirm', detail: 'Place your order and see its summary.' },
  { title: 'Track', detail: 'Follow the status of your delivery order.' },
]

export function PageShell() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <OriginStory />

      <section className={styles.section} id="how-it-works" aria-labelledby="walkthrough-title">
        <Container>
          <SectionLabel>How it works</SectionLabel>
          <h2 id="walkthrough-title">Your order, step by step.</h2>
          <p className={styles.sectionIntro}>Browse first. Sign in when you are ready to order.</p>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={styles.features} id="features" aria-labelledby="features-title">
        <Container className={styles.editorial}>
          <div>
            <SectionLabel>Ordering features</SectionLabel>
            <h2 id="features-title">Make it your cup.</h2>
          </div>
          <dl className={styles.featureList}>
            <div><dt>Your size. Your sugar.</dt><dd>Small, Medium, or Large. No Sugar, Less Sugar, Regular, or Extra Sugar, with options shown for each drink.</dd></div>
            <div><dt>COD or GCash.</dt><dd>Pay cash when your order arrives, or follow the GCash instructions in the app and submit your payment proof.</dd></div>
            <div><dt>Orders you can follow.</dt><dd>Check order progress from Pending to Delivered, and revisit previous orders in My Orders.</dd></div>
          </dl>
        </Container>
      </section>

      <section className={styles.film} id="film" aria-labelledby="film-title">
        <Container className={styles.filmInner}>
          <div>
            <SectionLabel>The BistroBuddies film</SectionLabel>
            <h2 id="film-title">A closer look,<br />coming soon.</h2>
          </div>
          <p>The short app film is not available yet. In the meantime, browse the app preview or download BistroBuddies for Android.</p>
        </Container>
      </section>

      <section className={styles.downloadSection} id="download" aria-labelledby="download-title">
        <Container className={styles.editorial}>
          <div>
            <SectionLabel>For Android</SectionLabel>
            <h2 id="download-title">Ready for your<br />next coffee?</h2>
          </div>
          <div>
            <p>Download BistroBuddies to browse the menu and place your order.</p>
            <dl className={styles.downloadFacts}>
              <div><dt>Version</dt><dd>{apk.version}</dd></div>
              <div><dt>File size</dt><dd>{apk.sizeLabel}</dd></div>
              <div><dt>Requires</dt><dd>Android {apk.minAndroid}+</dd></div>
            </dl>
            <Button href={apk.href} download={apk.fileName} variant="accent">Download APK</Button>
            <p className={styles.installNote}>Open the downloaded APK on your Android device. Android may ask you to allow installs from your browser.</p>
          </div>
        </Container>
      </section>
    </main>
  )
}
