import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { apk } from '../../content/assets'
import { gsap } from '../../lib/motion'
import { Button } from '../Button/Button'
import { CoffeeRing } from '../CoffeeRing/CoffeeRing'
import { Container } from '../Container/Container'
import { ScreenshotFrame } from '../ScreenshotFrame/ScreenshotFrame'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './Hero.module.css'

export function Hero() {
  const section = useRef<HTMLElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

      timeline
        .from('[data-hero-copy]', {
          autoAlpha: 0,
          y: 14,
          duration: 0.45,
          stagger: 0.06,
          clearProps: 'opacity,transform,visibility',
        })
        .from('[data-hero-visual]', {
          y: 18,
          duration: 0.6,
          clearProps: 'transform',
        }, 0.12)
    })

    return () => media.revert()
  }, { scope: section })

  return (
    <section ref={section} className={styles.hero} aria-labelledby="hero-title">
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <SectionLabel data-hero-copy>BistroBuddies Coffee Shop</SectionLabel>
          <h1 id="hero-title" data-hero-copy>Bistro<wbr />Buddies,<br /><span>in your pocket.</span></h1>
          <p className={styles.intro} data-hero-copy>Browse the menu, customize your drink, and place your coffee order from the Android app.</p>
          <div className={styles.actions} data-hero-copy>
            <Button href={apk.href} download={apk.fileName}>Download the Android app</Button>
            <a className={styles.textLink} href="#how-it-works">See how it works</a>
          </div>
          <p className={styles.meta} data-hero-copy>Version {apk.version} · {apk.sizeLabel} · Android {apk.minAndroid}+</p>
        </div>
        <div className={styles.visual} data-hero-visual>
          <CoffeeRing className={styles.ring} />
          <ScreenshotFrame screenshot="menu-1" priority className={styles.screen} caption="A look inside the BistroBuddies app." />
        </div>
      </Container>
    </section>
  )
}
