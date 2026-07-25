import { useState } from 'react';

export default function Onboarding({ onComplete }) {
  const [form, setForm] = useState({ name: '', age: '', sex: '', height: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Name is required.');
    if (!form.age || Number(form.age) < 1 || Number(form.age) > 200)
      return setError('A valid age is required.');
    if (!form.sex) return setError('Please select your sex.');
    if (!form.height || Number(form.height) < 1)
      return setError('A valid height is required.');
    setError('');
    onComplete({
      name: form.name.trim(),
      age: Number(form.age),
      sex: form.sex,
      height: Number(form.height),
    });
  };

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="screen onboarding">
      <div className="card">
        <h1 className="title">Welcome, Initiates</h1>
        <p className="subtitle">
          Before you may attempt the sacred art of teleportation, the
          Conclave requires basic identification.
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="Your true name"
              autoFocus
            />
          </label>
          <label>
            Age
            <input
              type="number"
              value={form.age}
              onChange={update('age')}
              placeholder="Years since birth"
              min="1"
              max="200"
            />
          </label>
          <label>
            Sex
            <select value={form.sex} onChange={update('sex')}>
              <option value="">Select…</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Height (cm)
            <input
              type="number"
              value={form.height}
              onChange={update('height')}
              placeholder="In centimetres"
              min="1"
              max="300"
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn primary">
            Register with the Conclave
          </button>
        </form>
      </div>
    </div>
  );
}
