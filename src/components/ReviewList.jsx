import { useState } from 'react'
import { useStore } from '../context/StoreContext.jsx'

async function readPhoto(file) {
  if (!file) return ''
  if (!file.type.startsWith('image/')) return ''
  const data = await file.arrayBuffer()
  const blob = new Blob([data], { type: file.type })
  const bitmap = await createImageBitmap(blob)
  const max = 720
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.72)
}

export default function ReviewList({ productId }) {
  const { reviewsFor, addReview } = useStore()
  const list = reviewsFor(productId)
  const [error, setError] = useState('')

  const average =
    list.length === 0 ? null : Math.round((list.reduce((n, r) => n + r.rating, 0) / list.length) * 10) / 10

  return (
    <section className="reviews">
      <p className="label">From the community</p>
      <h2 className="display" style={{ fontSize: 28, marginBottom: 8 }}>Reviews</h2>
      {list.length === 0 ? (
        <p className="copy">No reviews yet. If you wear this drop, say how it sits on your night.</p>
      ) : (
        <p className="copy">
          {average} / 5 · {list.length} {list.length === 1 ? 'review' : 'reviews'}
        </p>
      )}
      <ul className="review-list">
        {list.map((r) => (
          <li key={r.id} className="review">
            <strong>{r.name}</strong>
            <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            <p>{r.body}</p>
            {r.photo && <img src={r.photo} alt="" />}
          </li>
        ))}
      </ul>
      <form
        className="review-form"
        onSubmit={async (e) => {
          e.preventDefault()
          setError('')
          const form = e.target
          const name = form.name.value.trim()
          const body = form.body.value.trim()
          const rating = Number(form.rating.value)
          if (!name || !body) return
          let photo = ''
          try {
            photo = await readPhoto(form.photo.files[0])
          } catch {
            setError('That photo could not be added. The review can still go in without it.')
          }
          addReview({ productId, name, body, rating, photo })
          form.reset()
        }}
      >
        <span className="option-label">Leave a review</span>
        <label>
          Name
          <input name="name" required maxLength={40} />
        </label>
        <label>
          Rating
          <select name="rating" defaultValue="5">
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>
        <label>
          Review
          <textarea name="body" required rows={3} maxLength={600} />
        </label>
        <label>
          Photo (optional)
          <input name="photo" type="file" accept="image/*" />
        </label>
        {error && <p className="copy">{error}</p>}
        <button className="btn btn-dark" type="submit">
          Publish review
        </button>
      </form>
    </section>
  )
}
