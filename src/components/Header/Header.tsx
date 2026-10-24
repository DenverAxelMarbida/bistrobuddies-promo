import { brand } from '../../content/assets'
import { navigation } from '../../content/navigation'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="BistroBuddies, back to top">
          <img src={brand.logoSmall.src} width={brand.logoSmall.width} height={brand.logoSmall.height} alt="BistroBuddies Coffee Shop" />
        </a>
        <nav className={styles.navigation} aria-label="Main navigation">
          {navigation.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <Button href="#download" className={styles.download}>Download app</Button>
      </Container>
    </header>
  )
}
