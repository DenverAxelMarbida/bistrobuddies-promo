import { apk } from '../../content/assets'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Features } from '../Features/Features'
import { Hero } from '../Hero/Hero'
import { HowItWorks } from '../HowItWorks/HowItWorks'
import { OriginStory } from '../OriginStory/OriginStory'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './PageShell.module.css'

export function PageShell() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <OriginStory />
      <HowItWorks />
      <Features />

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
