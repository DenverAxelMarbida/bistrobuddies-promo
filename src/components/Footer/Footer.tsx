import { brand } from '../../content/assets'
import { navigation } from '../../content/navigation'
import { Container } from '../Container/Container'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.main}>
          <a href="#top" className={styles.brand} aria-label="BistroBuddies, back to top">
            <img src={brand.logoSmall.src} width={brand.logoSmall.width} height={brand.logoSmall.height} alt="BistroBuddies Coffee Shop" loading="lazy" />
          </a>
          <div className={styles.about}>
            <p>Coffee made with fresh beans.<br />Your next order, in your pocket.</p>
            <address>
              <span>{brand.location}</span>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </address>
          </div>
          <nav className={styles.navigation} aria-label="Footer navigation">
            <a href="#story">Our story</a>
            {navigation.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
            <a href="#download">Download for Android</a>
          </nav>
        </div>
        <div className={styles.bottom}>
          <small>© {new Date().getFullYear()} BistroBuddies</small>
          <a href="#top">Back to top</a>
        </div>
      </Container>
    </footer>
  )
}
