<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// ------ VARIABLES DEL JUEGO ------
const juegoActivo = ref(false);
const modo = ref(""); // "multiplicar" o "dividir"
const numero1 = ref(0);
const numero2 = ref(0);
const respuestaUsuario = ref("");
const explicacion = ref("");
const mensaje = ref("");
const puntos = ref(0);
const pasoAPaso = ref([]);
const mostrarResultado = ref(false);

// ------ INICIAR JUEGO ------
function iniciarJuego(seleccion) {
  modo.value = seleccion;
  juegoActivo.value = true;
  puntos.value = 0;
  siguienteEjercicio();
}

// ------ GENERAR NUEVO EJERCICIO ------
function siguienteEjercicio() {
  respuestaUsuario.value = "";
  explicacion.value = "";
  mostrarResultado.value = false;

  if (modo.value === "multiplicar") {
    numero1.value = Math.floor(Math.random() * 20) + 10; // 2 dígitos
    numero2.value = Math.floor(Math.random() * 20) + 10;
  } else {
    numero1.value = Math.floor(Math.random() * 100) + 100; // 3 dígitos
    numero2.value = Math.floor(Math.random() * 40) + 2; // divisor 2–80
  }

  pasoAPaso.value = [];
}

// ------ VERIFICAR RESPUESTA ------
function verificar() {
  const user = Number(respuestaUsuario.value);

  if (modo.value === "multiplicar") {
    const correcto = numero1.value * numero2.value;

    if (user === correcto) {
      puntos.value++;
      mensaje.value = "¡Correcto! 🎉 Muy bien.";
    } else {
      mensaje.value = "Incorrecto ❌. Mira cómo se hace:";
    }

    generarExplicacionMultiplicacion(correcto);
  }

  if (modo.value === "dividir") {
    const correcto = Math.floor(numero1.value / numero2.value);

    if (user === correcto) {
      puntos.value++;
      mensaje.value = "¡Correcto! 🎉 Excelente.";
    } else {
      mensaje.value = "Incorrecto ❌. Ve el procedimiento:";
    }

    generarExplicacionDivision(correcto);
  }

  mostrarResultado.value = true;
}

// ------ EXPLICACIÓN – MULTIPLICACIÓN PASO A PASO ------
function generarExplicacionMultiplicacion(resultado) {
  pasoAPaso.value = [];
  const n1 = numero1.value.toString().split("").reverse();
  const n2 = numero2.value.toString().split("").reverse();

  let productosParciales = [];

  n2.forEach((d2, index2) => {
    let parcial = 0;
    parcial = Number(numero1.value) * Number(d2);

    productosParciales.push({
      texto: `${numero1.value} × ${d2} = ${parcial}`,
      desplazamiento: index2,
    });
  });

  pasoAPaso.value.push(...productosParciales);
  pasoAPaso.value.push({
    texto: `Resultado final: ${resultado}`,
    final: true,
  });

  explicacion.value =
    "Multiplicamos cada dígito del segundo número por el primero y acomodamos según la posición.";
}

// ------ EXPLICACIÓN – DIVISIÓN PASO A PASO ------
function generarExplicacionDivision(cociente) {
  pasoAPaso.value = [];

  const dividendo = numero1.value;
  const divisor = numero2.value;

  const resto = dividendo % divisor;

  pasoAPaso.value.push({
    texto: `${dividendo} ÷ ${divisor} = ${cociente}`,
  });

  pasoAPaso.value.push({
    texto: `${cociente} × ${divisor} = ${cociente * divisor}`,
  });

  pasoAPaso.value.push({
    texto: `Resto: ${resto}`,
  });

  explicacion.value =
    "Dividimos, multiplicamos el cociente por el divisor y restamos para obtener el residuo.";
}

// ------ NAVEGACIÓN ------
function volver() {
  router.push("/");
}

function irAexamen() {
  router.push("/examen");
}
</script>

<template>
  <div class="contenedor">
    <h2 class="titulo">MiniJuego Educativo</h2>

    <!-- SELECCIÓN DE MODO -->
    <div v-if="!juegoActivo" class="modo-selector">
      <h3>¿Qué quieres practicar?</h3>
      <button class="btn_modo" @click="iniciarJuego('multiplicar')">
        Multiplicación ✖️
      </button>
      <button class="btn_modo" @click="iniciarJuego('dividir')">
        División ➗
      </button>
    </div>

    <!-- JUEGO ACTIVO -->
    <div v-if="juegoActivo" class="section">
      <h3 v-if="modo === 'multiplicar'">
        Multiplica: {{ numero1 }} × {{ numero2 }}
      </h3>
      <h3 v-if="modo === 'dividir'">Divide: {{ numero1 }} ÷ {{ numero2 }}</h3>

      <input
        type="number"
        class="number_box"
        v-model="respuestaUsuario"
        placeholder="Tu respuesta"
      />

      <button class="btn_calcular" @click="verificar">Verificar</button>

      <p class="mensaje">{{ mensaje }}</p>

      <div v-if="mostrarResultado" class="resultado">
        <h4>Explicación paso a paso:</h4>

        <ul>
          <li v-for="(p, index) in pasoAPaso" :key="index">
            {{ p.texto }}
          </li>
        </ul>

        <p class="explicacion">{{ explicacion }}</p>

        <button class="btn_siguiente" @click="siguienteEjercicio">
          Siguiente ejercicio →
        </button>
      </div>

      <p class="puntaje">Puntos: {{ puntos }}</p>

      <div style="display: flex; gap: 15px; margin-top: 15px">
        <button class="btn_volver" @click="volver">Volver</button>
        <button class="btn_examen" @click="irAexamen">Examen</button>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --color-primary: #007bff;
  --color-secondary: #ff6b6b;
  --color-accent: #ffd93d;
}

/* Estilos generales */
.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.titulo {
  font-size: 2rem;
  color: var(--color-primary);
}

/* Selector de modo */
.modo-selector {
  text-align: center;
}

.btn_modo {
  padding: 12px 20px;
  font-size: 18px;
  margin: 10px;
  border-radius: 10px;
  background: var(--color-primary);
  border: none;
  color: white;
  cursor: pointer;
}

/* Juego */
.section {
  background: white;
  padding: 20px;
  width: 350px;
  border-left: 6px solid var(--color-primary);
  border-radius: 10px;
}

.number_box {
  width: 260px;
  padding: 10px;
  border: 2px solid var(--color-primary);
  border-radius: 5px;
  font-size: 16px;
}

.btn_calcular,
.btn_siguiente,
.btn_volver,
.btn_examen {
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  color: white;
  background-color: var(--color-secondary);
  border: none;
}

.puntaje {
  font-size: 18px;
  color: var(--color-primary);
}

.mensaje {
  margin-top: 10px;
  font-weight: bold;
}

.resultado ul {
  padding-left: 20px;
}

.explicacion {
  margin-top: 10px;
  font-style: italic;
  color: #444;
}
</style>
