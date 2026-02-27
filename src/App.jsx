import { useState } from "react";


// --- ESTILOS (Aquí integré tu código .container y más) ---
const styles = {
  container: {
    maxWidth: "640px",
    width: "100%",
    margin: "0 auto",
    padding: "16px",
    fontFamily: "sans-serif",
    textAlign: "center"
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  button: {
    display: "block",
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box"
  }
};



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
  const [pendingStep, setPendingStep] = useState(null);
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showLead, setShowLead] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const LEAD_STEP = 3;
  const [enviando, setEnviando] = useState(false);
  const color = getColor(score);

const enviarAGoogleSheets = async () => {

  const payload = {
    nombre,
    telefono,
    score,
    color
  };

  const url = "https://script.google.com/macros/s/AKfycbzxT0rdZcmyItMdP5UzALNHi59ibdZY2lNy5ikAaGGbslam7cYTzruz1yS5WPCLY9j9/exec";

  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

};
               

  const irWhatsApp = () => { 
    const mensajes = { 
      verde: "Hola, terminé el diagnóstico y salí PERFIL VERDE. Quiero empezar cuanto antes, ¿me orientas?.", 
      amarillo: "Hola, terminé el diagnóstico y salí PERFIL AMARILLO. Quiero ver cómo funciona.", 
      rojo: "Hola, terminé el diagnóstico y salí PERFIL ROJO. Quiero más información primero.", 
    }; 
    const msg = encodeURIComponent(mensajes[color]);
    window.location.href = `https://wa.me/5218119113114?text=${msg}`;
  };

if (!started) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Descubre si este modelo es adecuado para ti</h2>

        <p>
          Este diagnóstico toma menos de 2 minutos y te mostrará si tu perfil es apto para generar ingresos con joyería.
        </p>

        <p style={{ fontWeight: "bold" }}>
          No todos CALIFICAN.
        </p>

        <button
          style={styles.button}
          onClick={() => setStarted(true)}
        >
          Comenzar diagnóstico
        </button>
      </div>
    </div>
  );
}
  // Pantalla de Formulario (Lead)
  if (showLead) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <iframe name="hidden_iframe" style={{ display: "none" }} />

            <h2>Para mostrarte tu resultado, </h2>

            <p style={{fontWeight:"bold"}}>
               ¿A donde te lo enviamos?.
            </p>

            <p>
               Deja tu nombre y WhatsApp para recibir la recomendación.
            </p>

            <p style={{fontSize:"14px", opacity:0.7}}>
               No spam. Solo tu resultado y orientación.
            </p>
     
          <input
           id="nombre"
           name="nombre"
           type="text"
           autoComplete="given-name"
           style={styles.input}
           placeholder="Nombre"
           value={nombre}
           onChange={e => setNombre(e.target.value)}
           />
          <input
           id="telefono"
           name="telefono"
           type="tel"
           autoComplete="tel"
           style={styles.input}
           placeholder="WhatsApp"
           value={telefono}
           onChange={e => setTelefono(e.target.value)}
/>
   
          <button
            style={styles.button}
            onClick={async () => {

              if (enviando) return;

               if (!nombre || !telefono) {
                 alert("Completa nombre y teléfono");
                 return;
               }

               setEnviando(true);


               setTimeout(() => {
               setShowLead(false);
               setStep(pendingStep);
               setEnviando(false); // CLAVE
               }, 600);
             }}
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de Resultados
  if (step === questions.length) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>Tu Perfil es:</h1>
          <h2 style={{ fontSize: "2rem" }}>{getLabel(score)}</h2>
<p>VERSION 3.3</p>
          <p>Puntaje obtenido: <strong>{score}/26</strong></p>
          <hr />
          <p>Haz clic abajo para recibir tu asesoría personalizada:</p>
<button 
  style={{ ...styles.button, backgroundColor: "#25D366" }} 

onClick={async () => {

  if (enviando) return;

  setEnviando(true);

  await enviarAGoogleSheets(); // 👈 ahora espera

  irWhatsApp();

}}
>
  Recibir asesoría
</button>
        </div>
      </div>
    );
  }

// Pantalla de Preguntas
const q = questions[step];
return (
  <div style={styles.container}>
    <div style={styles.card}>

      <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
        Diagnóstico gratis — resultado en menos de 2 minutos
      </p>
      <p style={{ color: "#666" }}>Progreso {step + 1} de {questions.length}</p>
      <h2 style={{ marginBottom: "20px" }}>{q.question}</h2>
        {q.options.map(o => (
          <button
            key={o.label}
            style={styles.button}
            onClick={() => {
              const newStep = step + 1;
               
              setScore(prevScore => prevScore + o.score);
              
              if (newStep === LEAD_STEP && !nombre && !telefono) {
                setPendingStep(newStep); // GUARDAMOS el siguiente step
                setShowLead(true);
              } else {
                setStep(newStep);
              }
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}





