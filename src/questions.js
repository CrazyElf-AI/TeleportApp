const QUESTIONS = {
  2: [
    {
      question: 'What is 12 × 15?',
      options: ['160', '180', '200', '175'],
      answer: 1,
    },
    {
      question: 'Solve for x: 3x + 7 = 22',
      options: ['x = 3', 'x = 5', 'x = 7', 'x = 4'],
      answer: 1,
    },
    {
      question: 'What is 144 ÷ 12?',
      options: ['14', '11', '12', '13'],
      answer: 2,
    },
  ],
  3: [
    {
      question: 'Solve: x² = 49',
      options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
      answer: 1,
    },
    {
      question: 'If f(x) = 2x + 3, what is f(10)?',
      options: ['20', '23', '25', '13'],
      answer: 1,
    },
    {
      question: 'Solve: 5x − 3 = 2x + 12',
      options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
      answer: 2,
    },
  ],
  4: [
    {
      question: 'What is log₁₀(1000)?',
      options: ['2', '3', '4', '10'],
      answer: 1,
    },
    {
      question: 'Solve: 2^x = 32',
      options: ['x = 4', 'x = 5', 'x = 6', 'x = 3'],
      answer: 1,
    },
    {
      question: 'What is √169?',
      options: ['11', '12', '13', '14'],
      answer: 2,
    },
  ],
  5: [
    {
      question: 'What is sin(90°)?',
      options: ['0', '1', '−1', '√2/2'],
      answer: 1,
    },
    {
      question: 'What is the derivative of x³?',
      options: ['x²', '3x', '3x²', '3x³'],
      answer: 2,
    },
    {
      question: 'What is cos(0)?',
      options: ['0', '1', '−1', 'π/2'],
      answer: 1,
    },
  ],
  6: [
    {
      question: 'What is the derivative of eˣ?',
      options: ['xeˣ⁻¹', 'eˣ', 'eˣ⁺¹', 'ln(eˣ)'],
      answer: 1,
    },
    {
      question: 'What is ∫ 2x dx?',
      options: ['x² + C', '2 + C', 'x² + x + C', '2x² + C'],
      answer: 0,
    },
    {
      question: 'What is lim(x→∞) (1 + 1/x)ˣ?',
      options: ['1', '∞', 'e', 'π'],
      answer: 2,
    },
  ],
  7: [
    {
      question: 'What is ∫₀¹ x² dx?',
      options: ['1/2', '1/3', '1/4', '2/3'],
      answer: 1,
    },
    {
      question: 'What is the derivative of ln(x²)?',
      options: ['1/x²', '2/x', '2ln(x)', 'x'],
      answer: 1,
    },
    {
      question: 'What is the second derivative of sin(x)?',
      options: ['sin(x)', 'cos(x)', '−sin(x)', '−cos(x)'],
      answer: 2,
    },
  ],
  8: [
    {
      question: 'What is the Laplacian of f(x,y) = x² + y²?',
      options: ['0', '2', '4', '2x + 2y'],
      answer: 2,
    },
    {
      question: 'Evaluate: ∫₀^∞ e^(−x²) dx',
      options: ['1', '√π/2', 'π/2', '√(2π)'],
      answer: 1,
    },
    {
      question: 'What is the curl of F = (y, −x, 0)?',
      options: ['(0, 0, 0)', '(0, 0, −2)', '(0, 0, 2)', '(−1, 1, 0)'],
      answer: 1,
    },
  ],
};

const FINAL_CALCULUS = [
  {
    question: 'Evaluate the contour integral ∮ z⁻¹ dz around the unit circle.',
    options: ['0', '2πi', 'πi', '−2πi'],
    answer: 1,
  },
  {
    question: 'What is the residue of f(z) = 1/(z−1)² at z = 1?',
    options: ['0', '1', '∞', '−1'],
    answer: 0,
  },
  {
    question: 'Solve: d²y/dx² + y = 0, y(0) = 1, y\'(0) = 0',
    options: ['y = sin(x)', 'y = cos(x)', 'y = eˣ', 'y = x²'],
    answer: 1,
  },
];

export function getQuestion(tier) {
  const pool = QUESTIONS[tier] || QUESTIONS[2];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getFinalQuestion() {
  return FINAL_CALCULUS[Math.floor(Math.random() * FINAL_CALCULUS.length)];
}
