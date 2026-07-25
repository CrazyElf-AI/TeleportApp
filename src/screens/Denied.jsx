export default function Denied({ profile, onTryAgain, onHome }) {
  return (
    <div className="screen denied">
      <div className="card denied-card">
        <div className="denied-icon">✕</div>
        <h1 className="denied-title">Teleportation Denied</h1>
        <p className="denied-message">
          Panvel has rejected your entry.
        </p>
        <p className="denied-detail">
          This decision is final and has been logged by the Interdimensional
          Transit Authority. Your mage credentials have been preserved. Your
          mana has been consumed. We thank you for your patience.
        </p>
        <p className="denied-footer">
          Reference: ITA/{profile.name.slice(0, 3).toUpperCase()}/
          {Math.floor(Math.random() * 9000 + 1000)}
        </p>
        <div className="denied-actions">
          <button className="btn primary" onClick={onTryAgain}>
            Try Again
          </button>
          <button className="btn secondary" onClick={onHome}>
            Return to Profile
          </button>
        </div>
      </div>
    </div>
  );
}
