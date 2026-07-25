import { useState, useEffect, useRef } from 'react';
import { getFinalQuestion } from '../questions';

const FAILURES = [
  'Not enough AURA to go through.',
  'Height requirement unfulfilled.',
];

export default function Teleport({ profile, mana, setMana, onBack, onDenied }) {
  const [stage, setStage] = useState('channel');
  const [failureMsg] = useState(
    () => FAILURES[Math.floor(Math.random() * FAILURES.length)]
  );
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [finalQ] = useState(() => getFinalQuestion());
  const [finalAnswer, setFinalAnswer] = useState(null);
  const [finalFeedback, setFinalFeedback] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (stage === 'channel' && mana < 1000) {
      intervalRef.current = setInterval(() => {
        const next = mana + Math.floor(Math.random() * 3) + 1;
        setMana(next >= 1000 ? 1000 : next);
      }, 80);
    }
    return () => clearInterval(intervalRef.current);
  }, [stage, mana, setMana]);

  useEffect(() => {
    if (mana >= 1000 && stage === 'channel') {
      clearInterval(intervalRef.current);
      setStage('full');
    }
  }, [mana, stage]);

  const handleChannelise = () => {
    setStage('fail');
  };

  const handleProceed = () => {
    setStage('warning');
  };

  const handleAcceptRisk = () => {
    setStage('calculus');
  };

  const handleSellSoul = () => {
    setStage('demon_contact');
    setTimeout(() => {
      setStage('demon_offer');
    }, 2500);
  };

  const handleConfirmSellSoul = () => {
    setStage('demon_processing');
    setTimeout(() => {
      setStage('demon_reject');
    }, 3000);
  };

  const handleFinalSubmit = () => {
    if (finalAnswer === null) return;
    setFinalFeedback('Processing...');
    setTimeout(() => {
      onDenied();
    }, 1500);
  };

  const handlePromoMana = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'URSHRT') {
      setMana(1000);
      setStage('full');
    } else {
      setPromoError('Invalid promo code.');
    }
  };

  return (
    <div className="screen teleport">
      <div className="card">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">The Portal</h1>
        <p className="subtitle">
          Channel your mana to open the gateway to Panvel.
        </p>

        {stage === 'channel' && (
          <div className="mana-section">
            <div className="mana-bar-container">
              <div className="mana-bar">
                <div
                  className="mana-fill"
                  style={{ width: `${(mana / 1000) * 100}%` }}
                />
              </div>
              <p className="mana-text">{mana} / 1000 MP</p>
            </div>
            <p className="channeling-hint">
              Channeling... Please wait while your mana reserves fill.
            </p>
          </div>
        )}

        {stage === 'full' && (
          <div className="mana-full-section">
            <div className="mana-bar-container">
              <div className="mana-bar full">
                <div className="mana-fill" style={{ width: '100%' }} />
              </div>
              <p className="mana-text">1000 / 1000 MP — Full</p>
            </div>
            <button className="btn primary channelise" onClick={handleChannelise}>
              Channelise
            </button>
          </div>
        )}

        {stage === 'fail' && (
          <div className="fail-section">
            <div className="fail-box">
              <p className="fail-label">Channelisation Failed</p>
              <p className="fail-message">{failureMsg}</p>
            </div>
            <div className="fail-actions">
              <button className="btn proceed-btn" onClick={handleProceed}>
                Proceed anyway
              </button>
            </div>
          </div>
        )}

        {stage === 'warning' && (
          <div className="warning-section">
            <div className="warning-box">
              <p className="warning-label">Warning</p>
              <p className="warning-message">
                Proceeding outside standard protocol is <strong>risky</strong>.
                You might lose even more aura. This decision cannot be undone.
              </p>
              <p className="warning-sub">Do you accept?</p>
            </div>
            <div className="warning-actions">
              <button className="btn proceed-btn" onClick={handleAcceptRisk}>
                Accept Risk
              </button>
              <button className="btn demon-btn" onClick={handleSellSoul}>
                Guaranteed Teleport (Sell Soul to the Demon)
              </button>
              <button
                className="btn secondary"
                onClick={() => setStage('fail')}
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {stage === 'demon_contact' && (
          <div className="demon-section">
            <div className="loading-box">
              <div className="spinner demon-spinner" />
              <p className="demon-loading-text">Contacting Demon...</p>
            </div>
          </div>
        )}

        {stage === 'demon_offer' && (
          <div className="demon-section">
            <div className="demon-box">
              <p className="demon-avatar">&#x1F608;</p>
              <p className="demon-speaks">Diablo here.</p>
              <p className="demon-sub">
                I sense a soul ripe for the taking. Speak — what do you desire?
              </p>
              <button className="btn demon-btn" onClick={handleConfirmSellSoul}>
                SELL SOUL
              </button>
            </div>
          </div>
        )}

        {stage === 'demon_processing' && (
          <div className="demon-section">
            <div className="loading-box">
              <div className="spinner demon-spinner" />
              <p className="demon-loading-text">Processing soul transaction...</p>
            </div>
          </div>
        )}

        {stage === 'demon_reject' && (
          <div className="demon-section">
            <div className="demon-box reject">
              <p className="demon-avatar">&#x1F608;</p>
              <p className="demon-speaks reject-title">Nope.</p>
              <p className="demon-sub reject-msg">
                Diablo says: <strong>Your soul is tainted.</strong>
              </p>
              <p className="demon-sub">
                Souls tainted with Dalit energy are not permitted to be reaped.
                They don't bring much profit. Soul rejected.
              </p>
              <button
                className="btn primary"
                onClick={() => {
                  setStage('fail');
                }}
              >
                Return to Portal
              </button>
            </div>
          </div>
        )}

        {stage === 'calculus' && (
          <div className="calculus-section">
            <p className="calculus-header">Final Verification Required</p>
            <p className="question">{finalQ.question}</p>
            <div className="options">
              {finalQ.options.map((opt, i) => (
                <button
                  key={i}
                  className={`option ${finalAnswer === i ? 'selected' : ''}`}
                  onClick={() => setFinalAnswer(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {finalFeedback ? (
              <p className="feedback success">{finalFeedback}</p>
            ) : (
              <button
                className="btn primary"
                onClick={handleFinalSubmit}
                disabled={finalAnswer === null}
              >
                Submit and Complete Teleportation
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
