import { MAGE_TIERS } from '../state';

export default function Home({
  profile,
  mageLevel,
  mageTierName,
  isElder,
  onLevelUp,
  onTeleport,
}) {
  const progress = ((mageLevel - 1) / 7) * 100;

  return (
    <div className="screen home">
      <div className="card">
        <p className="greeting">Welcome back,</p>
        <h1 className="title">{profile.name}</h1>
        <div className="profile-stats">
          <span>Age {profile.age}</span>
          <span className="dot">·</span>
          <span>{profile.height} cm</span>
        </div>

        <div className="mage-card">
          <p className="mage-label">Mage Tier</p>
          <h2 className="mage-tier">{mageTierName}</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="progress-text">
            {mageLevel < 8
              ? `Tier ${mageLevel} of 8 — ${8 -mageLevel} tier${8 -mageLevel !== 1 ? 's' : ''} to Elder`
              : 'Maximum tier attained. You are ready.'}
          </p>
        </div>

        <div className="actions">
          {mageLevel < 8 && (
            <button className="btn primary" onClick={onLevelUp}>
              Attempt Level-Up Challenge
            </button>
          )}
          <button
            className={`btn teleport-btn ${isElder ? 'ready' : 'locked'}`}
            onClick={isElder ? onTeleport : undefined}
            title={isElder ? 'Open the Portal' : 'Elder tier required to teleport.'}
          >
            ⚡ Teleport to Panvel
          </button>
          {!isElder && (
            <p className="locked-hint">
              Elder tier is required to access the Portal.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
