import { useRef, type MouseEvent } from 'react'
import { film } from '../../content/assets'
import { Container } from '../Container/Container'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './Film.module.css'

export function Film() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  function openFilm() {
    const dialog = dialogRef.current
    if (!dialog) return
    if (typeof dialog.showModal === 'function') dialog.showModal()
    else dialog.setAttribute('open', '')
    void videoRef.current?.play().catch(() => {})
  }

  function closeFilm() {
    dialogRef.current?.close()
  }

  function handleClose() {
    videoRef.current?.pause()
  }

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) closeFilm()
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
          type="button"
          className={styles.posterButton}
          onClick={openFilm}
          aria-describedby="film-description"
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
        className={styles.dialog}
        aria-labelledby="film-dialog-title"
        onClose={handleClose}
        onClick={handleDialogClick}
      >
        <div className={styles.panel}>
          <div className={styles.head}>
            <h2 id="film-dialog-title">BistroBuddies film</h2>
            <button type="button" className={styles.close} onClick={closeFilm} aria-label="Close film">
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
