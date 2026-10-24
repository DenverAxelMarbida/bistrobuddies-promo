import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent, type SyntheticEvent } from 'react'
import { film } from '../../content/assets'
import { gsap } from '../../lib/motion'
import { Container } from '../Container/Container'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './Film.module.css'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function Film() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playButtonRef = useRef<HTMLButtonElement>(null)
  const motionRef = useRef<ReturnType<typeof gsap.timeline> | null>(null)
  const closingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    const dialog = dialogRef.current

    return () => {
      motionRef.current?.kill()
      motionRef.current = null
      video?.pause()
      if (dialog?.open) dialog.close()
    }
  }, [])

  function openFilm() {
    const dialog = dialogRef.current
    const panel = panelRef.current
    if (!dialog || !panel || dialog.open) return

    const reduce = prefersReducedMotion()
    closingRef.current = false
    motionRef.current?.kill()
    motionRef.current = null

    if (!reduce) {
      gsap.set(panel, { autoAlpha: 0, scale: 0.96, y: 14, transformOrigin: '50% 50%' })
    }

    dialog.dataset.state = 'opening'
    if (typeof dialog.showModal === 'function') dialog.showModal()
    else dialog.setAttribute('open', '')

    void dialog.offsetWidth
    dialog.dataset.state = 'open'

    if (reduce) {
      gsap.set(panel, { autoAlpha: 1, scale: 1, y: 0 })
    } else {
      motionRef.current = gsap.timeline().to(panel, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      })
    }

    void videoRef.current?.play().catch(() => {})
  }

  function handleClosed() {
    motionRef.current?.kill()
    motionRef.current = null
    closingRef.current = false
    const dialog = dialogRef.current
    if (dialog) delete dialog.dataset.state
    if (panelRef.current) {
      gsap.set(panelRef.current, { clearProps: 'opacity,visibility,transform,transformOrigin' })
    }
    videoRef.current?.pause()
  }

  function finishClose() {
    const dialog = dialogRef.current
    motionRef.current = null
    if (!dialog) return

    if (dialog.open) {
      if (typeof dialog.close === 'function') dialog.close()
      else {
        dialog.removeAttribute('open')
        handleClosed()
      }
    }

    playButtonRef.current?.focus({ preventScroll: true })
  }

  function beginClose() {
    const dialog = dialogRef.current
    const panel = panelRef.current
    if (!dialog || !panel || !dialog.open || closingRef.current) return

    closingRef.current = true
    videoRef.current?.pause()
    motionRef.current?.kill()
    motionRef.current = null

    if (prefersReducedMotion()) {
      finishClose()
      return
    }

    dialog.dataset.state = 'closing'
    motionRef.current = gsap.timeline({ onComplete: finishClose }).to(panel, {
      autoAlpha: 0,
      scale: 0.97,
      duration: 0.3,
      ease: 'power2.inOut',
    })
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault()
    beginClose()
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'Escape' && closingRef.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) beginClose()
  }

  return (
    <section className={styles.film} id="film" aria-labelledby="film-title">
      <Container className={styles.inner}>
        <div>
          <SectionLabel>The BistroBuddies film</SectionLabel>
          <h2 id="film-title">Twenty-five seconds<br />inside the app.</h2>
          <p className={styles.lede}>The menu, the cart, and the order tracker, cut to an original score. Sound on.</p>
          <p className={styles.description} id="film-description">
            The film shows the BistroBuddies name, the menu, a product with size and sugar options, the cart, an order
            confirmation, and the order tracker. It ends on the logo and the Android download invitation.
          </p>
        </div>

        <button
          ref={playButtonRef}
          type="button"
          className={styles.posterButton}
          onClick={openFilm}
          aria-describedby="film-description"
          aria-haspopup="dialog"
          aria-controls="film-dialog"
        >
          <img
            src={film.poster.src}
            width={film.poster.width}
            height={film.poster.height}
            alt=""
          />
          <span className={styles.playBadge} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8.5 5.2 19 12 8.5 18.8Z" />
            </svg>
          </span>
          <span className={styles.playLabel}>
            Watch the film
            <span className={styles.duration}>{film.duration}</span>
          </span>
        </button>
      </Container>

      <dialog
        ref={dialogRef}
        id="film-dialog"
        className={styles.dialog}
        aria-labelledby="film-dialog-title"
        onCancel={handleCancel}
        onClose={handleClosed}
        onKeyDown={handleKeyDown}
        onClick={handleDialogClick}
      >
        <div ref={panelRef} className={styles.panel}>
          <div className={styles.head}>
            <h2 id="film-dialog-title">BistroBuddies film</h2>
            <button type="button" className={styles.close} onClick={beginClose} aria-label="Close film">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <video
            ref={videoRef}
            className={styles.video}
            controls
            playsInline
            preload="none"
            aria-label="BistroBuddies film, 25 seconds, no dialogue"
            poster={film.poster.src}
            width={film.poster.width}
            height={film.poster.height}
          >
            <source src={film.video} type="video/mp4" />
            Your browser cannot play this film. <a href={film.video}>Download the film as an MP4 file</a>.
          </video>
          <p className={styles.note}>
            No dialogue. A short look at browsing, ordering, and tracking a delivery.
          </p>
        </div>
      </dialog>
    </section>
  )
}
