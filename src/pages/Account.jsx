import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { PLAN, formatDay } from '../data/plan.js'
import { getCurrentDrop, getDrop, getUpcomingDrop } from '../data/drops.js'

export default function Account() {
  const { subscription, cancelSubscription, reactivateSubscription, isSubscriber } = useStore()
  const drop = getCurrentDrop()
  const upcoming = getUpcomingDrop()
  const assigned = subscription?.assignedDropId ? getDrop(subscription.assignedDropId) : drop

  if (!subscription) {
    return (
      <main className="wrap section">
        <p className="label">Account</p>
        <h1 className="display">No membership yet.</h1>
        <p className="copy">The club is the monthly relationship with PATCHED. — colour, set, early access.</p>
        <Link className="btn btn-dark" to="/club">Join the club</Link>
      </main>
    )
  }

  return (
    <main className="section" style={{ paddingTop: 36 }}>
      <div className="wrap">
        <p className="label">Account</p>
        <h1 className="display">{isSubscriber ? 'Active member.' : 'Membership cancelled.'}</h1>
        <p className="copy">
          {subscription.name} · {subscription.email}
        </p>
        <div className="steps two" style={{ marginTop: 36 }}>
          <article className="step">
            <h3>Plan</h3>
            <p>
              {PLAN.name} · €{PLAN.price} / month
              <br />
              Started {formatDay(new Date(subscription.startedAt))}
              {isSubscriber && subscription.renewsOn && (
                <>
                  <br />
                  Renews {formatDay(new Date(subscription.renewsOn))}
                </>
              )}
              {!isSubscriber && subscription.cancelledAt && (
                <>
                  <br />
                  Cancelled {formatDay(new Date(subscription.cancelledAt))}
                </>
              )}
            </p>
          </article>
          <article className="step">
            <h3>This cycle</h3>
            <p>
              {assigned ? `${assigned.name} · ${assigned.stickerSet}` : 'Next exclusive when the month opens.'}
              {upcoming ? ` Ahead: ${upcoming.name}.` : ''}
            </p>
          </article>
        </div>
        <ul className="include-list">
          {PLAN.includes.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
          {isSubscriber ? (
            <button className="btn btn-dark" type="button" onClick={cancelSubscription}>
              Cancel membership
            </button>
          ) : (
            <button className="btn btn-dark" type="button" onClick={reactivateSubscription}>
              Reactivate
            </button>
          )}
          <Link className="btn btn-ghost" to="/drops" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
            Drop archive
          </Link>
        </div>
        <p className="copy" style={{ marginTop: 20 }}>
          Cancelling stops the next renewal. You keep this month’s story; limited editions already bought stay yours.
        </p>
      </div>
    </main>
  )
}
