import { useState, useEffect } from "react";

const questions = [
  {
    question: "¿Cuál describe mejor tu situación actual?",
    options: [
      { label: "Trabajo muchas horas y poco tiempo familia", score: 3 },
      { label: "Necesito ingresos sin más estrés", score: 3 },
      { label: "Quiero construir algo propio", score: 2 },
      { label: "Solo estoy explorando", score: 0 },
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
      { label: "Me incomoda insistir", score: 1 },
      { label: "No me siento muy hábil", score: 1 },
      { label: "Me preocupa el rechazo", score: 1 },
      { label: "Cómoda si me gusta", score: 3 },
    ],
  },
  {
    question: "¿Importancia de usar lo que recomiendas?",
    options: [
      { label: "Muy importante", score: 3 },
      { label: "Importante", score: 2 },
      { label: "Poco importante", score: 1 },
      { label: "No lo pensé", score: 0 },
    ],
  },
  {
    question: "¿Has emprendido antes?",
    options: [
      { label: "Sí y me fue bien", score: 3 },
      { label: "Sí, pero me sentí sola", score: 2 },
      { label: "Sí, no era para mi", score: 1 },
      { label: "No, Primera vez", score: 2 },
    ],
  },
  {
    question: "¿Cuándo quieres ingresos extra?",
    options: [
      { label: "Lo más pronto posible", score: 4 },
      { label: "En 3 meses", score: 3 },
      { label: "Este año", score: 1 },
      { label: "Solo viendo", score: 0 },
    ],
  },
  {
    question: "Tiempo semanal disponible",
    options: [
      { label: "5–7 horas", score: 4 },
      { label: "3–5 horas", score: 3 },
      { label: "1–2 horas", score: 1 },
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

function getColor(score) {
  if (score >= 18) return "verde";
  if (score >= 11) return "amarillo";
  return "rojo";
}

function getLabel(score) {
  if (score >= 18) return "🟢 LISTA";
  if (score >= 11) return "🟡 TIBIA";
  return "🔴 CURIOSA";
}

export default function App() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const [showLead, setShowLead] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const color = getColor(score);

useEffect(() => {
  if (step === questions.length) {
    setShowLead(true);
  }
}, [step]);


  const enviarAGoogleSheets = () => {
    const data = new URLSearchParams({
      "entry.NOMBRE": nombre,
      "entry.EMAIL": email,
      "entry.SCORE": score,
      "entry.COLOR": color,
    });

    fetch("PEGAR_AQUI_URL_FORM", {
      method: "POST",
      mode: "no-cors",
      body: data,
    });
  };

  const irWhatsApp = () => {
    const mensajes = {
      verde:
        "Hola, terminé el diagnóstico y salí PERFIL VERDE. Quiero iniciar cuanto antes.",
      amarillo:
        "Hola, terminé el diagnóstico y salí PERFIL AMARILLO. Quiero ver cómo funciona.",
      rojo:
        "Hola, terminé el diagnóstico y salí PERFIL ROJO. Quiero más información primero.",
    };

    const msg = encodeURIComponent(mensajes[color]);
    window.location.href = `https://wa.me/5218119113114?text=${msg}`;
`;
  };

if (step === questions.length && !showLead) {
  setShowLead(true);
}

  if (showLead) {
    return (
      <div style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
        <h2>Recibe tu resultado</h2>

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          style={{ width: "100%", padding: 12, marginBottom: 10 }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", padding: 12, marginBottom: 10 }}
        />

        <button
          onClick={() => {
            enviarAGoogleSheets();
            setShowLead(false);
          }}
          style={{ width: "100%", padding: 14 }}
        >
          Ver resultado
        </button>
      </div>
    );
  }

  if (step === questions.length) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h1>Resultado</h1>
        <h2>{getLabel(score)}</h2>
        <p>Puntaje: {score}/26</p>

        <button onClick={irWhatsApp} style={{ padding: 16 }}>
          Continuar por WhatsApp
        </button>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
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
          }}
        >
          {o.label}
        </button>
      ))}

      <p>Progreso {step + 1}/8</p>
    </div>
  );
}