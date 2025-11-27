<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();

function volver() {
  router.push("/");
}

// --- VARIABLES ---
const preguntas = ref([]);
const preguntasUsadas = ref([]);
const preguntasActuales = ref(null);
const historial = ref([]);
const respuestaSeleccionada = ref(null);
// NUEVA VARIABLE: Almacena la puntuación del examen
const puntuacionTotal = ref(0);
const examenTerminado = ref(false); // Indica si se ha llegado al final

// --- CARGA DE PREGUNTAS ---
onMounted(async () => {
  const respuesta = await fetch("./data/data1.json");
  const data = await respuesta.json();
  preguntas.value = data.preguntas;
  seleccionaPreguntas();
});

// NUEVA FUNCIÓN: Lógica para verificar y calificar la respuesta
function verificarRespuesta() {
  // Solo calificamos si hay una respuesta seleccionada
  if (respuestaSeleccionada.value === null) {
    return false; // No permite avanzar sin respuesta
  }

  const esCorrecta =
    preguntasActuales.value.respuesta.toString().toLowerCase() ===
    respuestaSeleccionada.value.toString().toLowerCase();

  // Guardar la respuesta y la calificación en el objeto de la pregunta actual
  preguntasActuales.value.respuestaUsuario = respuestaSeleccionada.value;
  preguntasActuales.value.correcta = esCorrecta;

  if (esCorrecta) {
    // Asumiendo que cada respuesta correcta vale 1 punto
    puntuacionTotal.value += 1;
  }

  return true; // La verificación fue exitosa
}

// --- SELECCIONAR PREGUNTA ---
function seleccionaPreguntas() {
  // 1. Verificar y calificar la pregunta actual antes de avanzar
  if (preguntasActuales.value && !verificarRespuesta()) {
    alert("Por favor, selecciona una respuesta antes de continuar.");
    return;
  }

  // 2. Comprobar si todas las preguntas han sido usadas
  if (preguntasUsadas.value.length === preguntas.value.length) {
    // Todas las preguntas contestadas, finalizar examen
    preguntasActuales.value = null;
    examenTerminado.value = true; // Activar estado de finalización
    return;
  }

  // 3. Seleccionar una pregunta aleatoria no usada
  let aleatorio;
  do {
    aleatorio =
      preguntas.value[Math.floor(Math.random() * preguntas.value.length)];
  } while (preguntasUsadas.value.includes(aleatorio.id));

  // 4. Guardar la pregunta actual en el historial
  if (preguntasActuales.value) {
    historial.value.push(preguntasActuales.value);
  }

  // 5. Preparar la nueva pregunta
  preguntasUsadas.value.push(aleatorio.id);
  preguntasActuales.value = aleatorio;
  // Reiniciar la selección para la nueva pregunta
  respuestaSeleccionada.value = null;
}

function regresarPreguntas() {
  if (historial.value.length === 0 || examenTerminado.value) return;

  // Antes de regresar, si la pregunta actual fue respondida y era correcta, restamos el punto
  if (preguntasActuales.value && preguntasActuales.value.correcta) {
    puntuacionTotal.value -= 1;
  }

  // Sacamos la pregunta anterior del historial
  const preguntaAnterior = historial.value.pop();

  // La pregunta anterior ya no debe contarse como usada para el reinicio
  const index = preguntasUsadas.value.indexOf(preguntaAnterior.id);
  if (index > -1) {
    preguntasUsadas.value.splice(index, 1);
  }

  // Carga la pregunta anterior
  preguntasActuales.value = preguntaAnterior;

  // Carga la respuesta previa para poder editarla
  respuestaSeleccionada.value = preguntaAnterior.respuestaUsuario || null;

  examenTerminado.value = false; // Desactivar si regresamos
}

// Función para manejar la selección de respuesta (igual que antes)
function seleccionarRespuesta(opcion) {
  respuestaSeleccionada.value = opcion;
}

// --- REINICIAR ---
function reiniciarExamen() {
  preguntasUsadas.value = [];
  historial.value = [];
  respuestaSeleccionada.value = null;
  puntuacionTotal.value = 0; // Reiniciar la puntuación
  examenTerminado.value = false; // Reiniciar el estado
  seleccionaPreguntas();
}
</script>

<template>
  <div class="contenedor exam-container">
    <header class="Encabezado">
      <h1 class="main-title">Examen Práctico</h1>
      <p style="color: white; margin: 0">
        Pregunta {{ preguntasUsadas.length }}/{{ preguntas.length }} |
        Puntuación: {{ puntuacionTotal }}
      </p>

      <button class="Btn-direccion" @click="volver">Volver al inicio</button>
    </header>

    <div class="exam-card" v-if="preguntasActuales">
      <h2 class="question-title">
        Pregunta #{{ preguntasUsadas.length }}: {{ preguntasActuales.pregunta }}
      </h2>

      <div
        v-if="
          preguntasActuales.tipo === 'opcion' || preguntasActuales.tipo === 'vf'
        "
      >
        <ul class="options-list">
          <li
            v-for="op in preguntasActuales.opciones"
            :key="op"
            @click="seleccionarRespuesta(op)"
            :class="{ 'opcion-seleccionada': respuestaSeleccionada === op }"
          >
            {{ op }}
          </li>
        </ul>
      </div>

      <div v-if="preguntasActuales.tipo === 'abierta'">
        <div v-for="preg in preguntasActuales.abiertas" :kei="preg">
          <p>{{ preg.texto }}</p>
          <input
            type="text"
            v-model="preg.respuestaSeleccionada"
            placeholder="Escribe tu respuesta"
            class="input-open"
          />
        </div>
      </div>

      <div class="exam-buttons">
        <button
          @click="regresarPreguntas"
          class="btn-secundario"
          :disabled="historial.length === 0"
        >
          Pregunta Anterior
        </button>

        <button
          @click="seleccionaPreguntas"
          class="Btn-direccion"
          :disabled="respuestaSeleccionada === null"
        >
          Siguiente Pregunta
        </button>

        <button @click="reiniciarExamen" class="btn-reset">
          Reiniciar Examen
        </button>
      </div>
    </div>

    <div class="exam-card" v-else-if="examenTerminado">
      <h2>🎉 ¡Has completado el examen!</h2>
      <p class="final-score">
        Tu puntuación final es:
        <strong>{{ puntuacionTotal }} / {{ preguntas.length }}</strong>
      </p>
      <button @click="reiniciarExamen" class="Btn-direccion">
        Volver a intentarlo
      </button>
      <button @click="volver" class="btn-secundario">Regresar al inicio</button>
    </div>
  </div>
</template>

<style>
/* CONTENEDOR GENERAL */
.exam-container {
  width: 100%;
  max-width: 900px;
  margin: auto;
}

/* TARJETA DEL EXAMEN */
.exam-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-top: 25px;
  border-left: 6px solid var(--color-primary);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
}

/* TITULO */
.question-title {
  font-size: 1.6rem;
  color: var(--color-secondary);
  margin-bottom: 15px;
}

/* LISTA DE OPCIONES */
.options-list {
  padding: 0;
  list-style: none;
}

.options-list li {
  background: var(--color-bg);
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 2px solid var(--color-primary);
}

/* RESPUESTA ABIERTA */
.input-open {
  width: 100%;
  height: 120px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid var(--color-primary);
  resize: none;
  outline: none;
}

/* BOTONES */
.exam-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.Btn-direccion {
  background-color: var(--color-primary);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.btn-secundario {
  background-color: var(--color-secondary);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.btn-reset {
  background-color: var(--color-accent);
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.options-list {
  padding: 0;
  list-style: none;
}

.options-list li {
  background: var(--color-bg);
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 2px solid var(--color-primary);
  cursor: pointer; /* Agregado para indicar que es seleccionable */
  transition: background 0.3s;
}

/* Estilo para la opción seleccionada */
.options-list li.opcion-seleccionada {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
</style>
