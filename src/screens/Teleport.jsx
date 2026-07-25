import { useState, useEffect, useRef } from 'react';
import { getFinalQuestion } from '../questions';

const FAILURES = [
  'Not enough AURA to go through.',
  'Height requirement unfulfilled.',
];

export default function Teleport({ profile, mana, setMana, onBack, onDenied }) {
  const [stage, setStage] = useState('channel'); // channel | full | fail | calculus
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
    setStage('calculus');
  };

  const handleFinalSubmit = () => {
    if (finalAnswer === null) return;
    setFinalFeedback('Processing...');
    setTimeout(() => {
      onDenied();
    }, 1500);
  };

  const handlePayMana = () => {
    setMana(1000);
    setStage('full');
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
              Channeling… Please wait while your mana reserves fill.
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

        {stage === 'calculus' && (
          <div className="calculus-section">
            <p className="calculus-header">
              Final Verification Required
            </p>
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
                Submit & Complete Teleportation
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
