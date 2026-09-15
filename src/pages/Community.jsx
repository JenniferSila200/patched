import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'

async function readPhoto(file) {
  if (!file) return ''
  if (!file.type.startsWith('image/')) return ''
  const data = await file.arrayBuffer()
  const blob = new Blob([data], { type: file.type })
  const bitmap = await createImageBitmap(blob)
  const max = 900
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.72)
}

export default function Community() {
  const { stories, addStory, reviews } = useStore()
  const [error, setError] = useState('')

  return (
    <main className="section" style={{ paddingTop: 36 }}>
      <div className="wrap">
        <p className="label">Community</p>
        <h1 className="display">People in the beam.</h1>
        <p className="copy" style={{ maxWidth: 580 }}>
          PATCHED. is a club of people who move at night and still look like themselves. Stories and reviews here are only from people who posted — none are written for the page.
        </p>
        <p className="copy">
          {stories.length} {stories.length === 1 ? 'story' : 'stories'} · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </p>
      </div>
      <div className="wrap split" style={{ marginTop: 48, alignItems: 'start' }}>
        <div>
          <p className="label">Wall</p>
          {stories.length === 0 && (
            <p className="copy">Nothing on the wall yet. If you run, ride, walk or commute with PATCHED., this is the place.</p>
          )}
          <ul className="story-list">
            {stories.map((s) => (
              <li key={s.id} className="story">
                {s.photo && <img src={s.photo} alt="" />}
                <strong>{s.name}{s.city ? ` · ${s.city}` : ''}</strong>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <form
          className="review-form"
          onSubmit={async (e) => {
            e.preventDefault()
            setError('')
            const form = e.target
            const name = form.name.value.trim()
            const city = form.city.value.trim()
            const body = form.body.value.trim()
            if (!name || !body) return
            let photo = ''
            try {
              photo = await readPhoto(form.photo.files[0])
            } catch {
              setError('Photo skipped — the story can still go up.')
            }
            addStory({ name, city, body, photo })
            form.reset()
          }}
        >
          <span className="option-label">Share a night</span>
          <label>
            Name
            <input name="name" required maxLength={40} />
          </label>
          <label>
            City (optional)
            <input name="city" maxLength={40} />
          </label>
          <label>
            Story
            <textarea name="body" required rows={5} maxLength={800} />
          </label>
          <label>
            Photo (optional)
            <input name="photo" type="file" accept="image/*" />
          </label>
          {error && <p className="copy">{error}</p>}
          <button className="btn btn-dark" type="submit">Add to the wall</button>
        </form>
      </div>
      {reviews.length > 0 && (
        <div className="wrap" style={{ marginTop: 64 }}>
          <p className="label">Reviews</p>
          <h2 className="display" style={{ marginBottom: 20 }}>What members wrote.</h2>
          <ul className="review-list">
            {reviews.map((r) => (
              <li key={r.id} className="review">
                <strong>{r.name}</strong>
                <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <p>{r.body}</p>
                {r.photo && <img src={r.photo} alt="" />}
                <Link to={`/product/${r.productId}`} className="sub">View piece</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
