<script>
import { ref, onMounted } from "vue";

const preguntas = ref([]);

onMounted(async () => {
  const respuesta = await fetch("/data/daata1.json");
  const data = await respuesta.json();
  preguntas.value = data.preguntas;
});

const pregunasUsadas = ref([]);
const preguntasActuales = ref(null);
const historial = ref([]);

function seleccionaPreguntas() {
  if (preguntas.value.length === preguntas.value.length) {
    preguntasActuales.value = null;
    return;
  }

  let aleatorio;
  do {
    aleatorio =
      preguntas.value[Math.floor(Math.random() * preguntas.value.length)];
  } while (preguntasUsadas.value.includes(aleatorio.id));
  if (preguntasActuales.value) {
    historial.value.push(preguntasActuales.value);
  }

  preguntasUsadas.value.push(aleatorio.id);
  preguntasActuales.value = aleatorio;
}

function regresarPreguntas() {
  if (historial.value.length === 0) return;
}

function reiniciarExamen() {
  pregunasUsadas.value = [];
  seleccionaPreguntas();
}
</script>

<template>
  <div class="contenedor">
    <h2>Examen</h2>
    <div v-if="preguntasActuales">
      <h3>{{ preguntasActuales.preguntas }}</h3>

      <div v-if="preguntasActuales.tipo === 'opcion'">
        <ul>
          <li v-for="op in preguntasActuales.opciones" :key="op">
            {{ op }}
          </li>
        </ul>
      </div>

      <div v-if="preguntasActuales.tipo === 'abierta'">
        <textarea
          name="Pregunta"
          id="res_abierta"
          placeholder="Escribe tu respuesta"
        >
        </textarea>
      </div>

      <button @click="seleccionaPreguntas">Siguiente Pregunta</button>
      <button @click="regresarPreguntas">Pregunta Anterior</button>
      <button @click="reiniciarExamen">Reiniciar Examen</button>
    </div>

    <div v-else>
      <p>Has completado el examen.</p>
      <button @click="reiniciarExamen">Reiniciar Examen</button>
    </div>
  </div>
</template>

<style></style>
