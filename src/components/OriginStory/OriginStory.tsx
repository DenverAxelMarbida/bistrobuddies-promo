import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { brand } from '../../content/assets'
import { gsap, revealOnScroll } from '../../lib/motion'
import { Container } from '../Container/Container'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './OriginStory.module.css'

export function OriginStory() {
  const section = useRef<HTMLElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      return revealOnScroll(section.current, '[data-origin-reveal]')
    })

    return () => media.revert()
  }, { scope: section })

  return (
    <section ref={section} className={styles.story} id="story" aria-labelledby="story-title">
      <Container className={styles.grid}>
        <div className={styles.mark} data-origin-reveal>
          <img
            src={brand.logoMedium.src}
            width={brand.logoMedium.width}
            height={brand.logoMedium.height}
            alt="BistroBuddies Coffee Shop"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={styles.statement} data-origin-reveal>
          <SectionLabel>Our story</SectionLabel>
          <h2 id="story-title">It started with<br />five coffee-loving friends.</h2>
        </div>
        <div className={styles.copy} data-origin-reveal>
          <p>BistroBuddies was created by five friends from the Technological Institute of the Philippines who share a love of coffee.</p>
          <p>Based in Quezon City, we make our coffee with fresh beans. The app brings the menu, your choices, and your order updates together.</p>
        </div>
      </Container>
    </section>
  )
}
