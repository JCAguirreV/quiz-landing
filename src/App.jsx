import { useState } from "react";

const questions = [
  {
    question: "¿Cuál describe mejor tu situación actual?",
    options: [
      { label: "Trabajo muchas horas y poco tiempo familia", score: 3 },
      { label: "Necesito ingresos sin más estrés", score: 3 },
      { label: "Quiero algo propio", score: 2 },
      { label: "Solo explorando", score: 0 },
    ],
  },
  {
    question: "¿Has participado en multinivel?",
    options: [
      { label: "Sí", score: 2 },
      { label: "No", score: 1 },
    ],
  },
  {
    question: "¿Cómo te sientes recomendando productos?",
    options: [
      { label: "Incómoda", score: 1 },
      { label: "No hábil", score: 1 },
      { label: "Temor rechazo", score: 1 },
      { label: "Cómoda si me gusta", score: 3 },
    ],
  },
  {
    question: "¿Importancia de usar lo que recomiendas?",
    options: [
      { label: "Muy importante", score: 3 },
      { label: "Importante", score: 2 },
      { label: "Poco", score: 1 },
      { label: "No lo pensé", score: 0 },
    ],
  },
  {
    question: "¿Has emprendido antes?",
    options: [
      { label: "Sí y bien", score: 3 },
      { label: "Sí pero sola", score: 2 },
      { label: "Sí no era", score: 1 },
      { label: "Primera vez", score: 2 },
    ],
  },
  {
    question: "¿Cuándo quieres ingresos extra?",
    options: [
      { label: "Ya", score: 4 },
      { label: "3 meses", score: 3 },
      { label: "Este año", score: 1 },
      { label: "Solo viendo", score: 0 },
    ],
  },
  {
    question: "Tiempo semanal disponible",
    options: [
      { label: "5–7h", score: 4 },
      { label: "3–5h", score: 3 },
      { label: "1–2h", score: 1 },
      { label: "Casi nada", score: 0 },
    ],
  },
  {
    question: "¿Dispuesta a aprender con guía?",
    options: [
      { label: "Muy dispuesta", score: 4 },
      { label: "Dispuesta", score: 3 },
      { label: "No segura", score: 1 },
      { label: "Sin tiempo", score: 0 },
    ],
  },
];

function result(score) {
  if (score >= 18) return "🟢 LISTA";
  if (score >= 11) return "🟡 TIBIA";
  return "🔴 CURIOSA";
}

export default function App() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  if (step === questions.length) {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif", textAlign: "center" }}>
        <h1>Resultado</h1>
        <h2>{result(score)}</h2>
        <p>Puntaje: {score}/26</p>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <h2>{q.question}</h2>

      {q.options.map(o => (
        <button
          key={o.label}
          onClick={() => {
            setScore(score + o.score);
            setStep(step + 1);
          }}
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: 14,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          {o.label}
        </button>
      ))}

      <p>Progreso {step + 1}/8</p>
    </div>
  );
}