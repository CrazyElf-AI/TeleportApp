import { useState } from 'react';
import { getQuestion } from '../questions';

export default function LevelUp({ mageLevel, onLevelUp, onBack }) {
  const nextTier = mageLevel + 1;
  const [mode, setMode] = useState('choose'); // choose | quiz | pay | promo
  const [question] = useState(() => getQuestion(nextTier));
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleAnswer = () => {
    if (selected === null) return;
    if (selected === question.answer) {
      setFeedback('Correct. You have been promoted.');
      setTimeout(() => onLevelUp(nextTier), 1200);
    } else {
      const snark = [
        'Incorrect. The Conclave is disappointed.',
        'Wrong. Perhaps mathematics is not your calling.',
        'That is not even close. The Archive weeps.',
        'Incorrect. A first-year apprentice could have solved that.',
        'Wrong. The numbers reject your offering.',
      ];
      setFeedback(snark[Math.floor(Math.random() * snark.length)]);
      setSelected(null);
    }
  };

  const handlePay = () => {
    setFeedback('Payment of $100 processed. Promotion granted.');
    setTimeout(() => onLevelUp(nextTier), 1200);
  };

  const handlePromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'SHRTIM') {
      setFeedback('Promo code accepted. You have been promoted to Elder.');
      setTimeout(() => onLevelUp(8), 1200);
    } else {
      setPromoError('Invalid promo code. Nice try.');
    }
  };

  return (
    <div className="screen levelup">
      <div className="card">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">Level-Up Challenge</h1>
        <p className="subtitle">
          Advance from <strong>{TierName(mageLevel)}</strong> to{' '}
          <strong>{TierName(nextTier)}</strong>
        </p>

        {mode === 'choose' && (
          <div className="levelup-choices">
            <button className="btn primary" onClick={() => setMode('quiz')}>
              Solve a Mathematical Proof
            </button>
            <button className="btn pay-btn" onClick={() => setMode('pay')}>
              Pay $100 to Skip (Fake Currency)
            </button>
            <div className="promo-section">
              <button
                className="btn secondary"
                onClick={() => setMode('promo')}
              >
                Enter Promo Code
              </button>
            </div>
          </div>
        )}

        {mode === 'quiz' && (
          <div className="quiz-section">
            <p className="question">{question.question}</p>
            <div className="options">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  className={`option ${selected === i ? 'selected' : ''}`}
                  onClick={() => setSelected(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {feedback && (
              <p
                className={`feedback ${
                  feedback.includes('Correct') ? 'success' : 'error'
                }`}
              >
                {feedback}
              </p>
            )}
            {selected !== null && !feedback && (
              <button className="btn primary" onClick={handleAnswer}>
                Submit Answer
              </button>
            )}
            {!feedback && (
              <button
                className="btn secondary"
                onClick={() => setMode('choose')}
              >
                Choose a different path
              </button>
            )}
          </div>
        )}

        {mode === 'pay' && (
          <div className="pay-section">
            <div className="pay-card">
              <p className="pay-amount">$100</p>
              <p className="pay-desc">Instant promotion to {TierName(nextTier)}</p>
              <p className="pay-fine">*No real currency is exchanged.</p>
              {feedback ? (
                <p className="feedback success">{feedback}</p>
              ) : (
                <button className="btn primary" onClick={handlePay}>
                  Pay $100
                </button>
              )}
            </div>
          </div>
        )}

        {mode === 'promo' && (
          <div className="promo-section-inner">
            <p className="subtitle">
              Enter a valid Conclave promo code. Hint: there may be one that
              skips you straight to Elder.
            </p>
            <input
              type="text"
              className="promo-input"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoError('');
              }}
              placeholder="Enter code…"
              autoFocus
            />
            {promoError && <p className="error">{promoError}</p>}
            {feedback ? (
              <p className="feedback success">{feedback}</p>
            ) : (
              <button className="btn primary" onClick={handlePromo}>
                Redeem
              </button>
            )}
            {!feedback && (
              <button
                className="btn secondary"
                onClick={() => setMode('choose')}
              >
                Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TierName(level) {
  const names = [
    'Novice',
    'Trainee',
    'Journeyman',
    'Adept',
    'Expert',
    'Master',
    'Grand Master',
    'Elder',
  ];
  return names[level - 1] || 'Unknown';
}
