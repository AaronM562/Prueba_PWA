<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function irAexamen() {
  if (confirm("¿Listo para comenzar?")) {
    router.push("/examen");
  }
}

function volver() {
  if (confirm("¿Regresar al inicio?")) {
    router.push("/");
  }
}
import { ref } from "vue";
import Examen from "./Examen.vue";

const n1 = ref("");
const n2 = ref("");
const res = ref("");
const Signo = ref("X");

function calcular() {
  const numero1 = parseFloat(n1.value);
  const numero2 = parseFloat(n2.value);

  if (isNaN(numero1) || isNaN(numero2)) {
    res.value = "Por favor ingresa números válidos.";
    return;
  }

  if (Signo.value === "X") {
    res.value = numero1 * numero2;
  } else if (Signo.value === "/") {
    if (numero2 === 0) {
      res.value = "Error: no se puede dividir entre 0.";
    } else {
      res.value = numero1 / numero2;
    }
  } else {
    res.value = "Signo no válido";
  }
}

function limpiar() {
  n1.value = "";
  n2.value = "";
  res.value = "";
  Signo.value = "X";
}
</script>

<template>
  <div class="contenedor">
    <h2 class="titulo">Ejemplo Práctico</h2>

    <section class="section">
      <div class="contenido">
        <input
          class="number_box"
          type="number"
          v-model="n1"
          placeholder="Número 1"
        />

        <select class="signo_box" v-model="Signo">
          <option value="X">Multiplicar (X)</option>
          <option value="/">Dividir (/)</option>
        </select>

        <input
          class="number_box"
          type="number"
          v-model="n2"
          placeholder="Número 2"
        />

        <button class="btn_calcular" @click="calcular">Calcular</button>
        <button class="btn_limpiar" @click="limpiar">Limpiar</button>

        <textarea class="resultado_box" v-model="res" readonly></textarea>

        <div
          style="
            display: flex;
            padding: 10px;
            flex-direction: row;
            align-items: center;
            gap: 15px;
          "
        >
          <button class="btn_calcular" @click="volver">Volver</button>
          <button class="btn_limpiar" @click="irAexamen">Examen</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
:root {
  --color-primary: #007bff;
  --color-secondary: #ff6b6b;
  --color-accent: #ffd93d;
}
.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.number_box {
  width: 220px;
  padding: 10px;
  border: 2px solid var(--color-primary);
  border-radius: 5px;
  font-size: 16px;
}
.signo_box {
  width: 220px;
  padding: 10px;
  font-size: 16px;
}
.btn_calcular,
.btn_limpiar {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: var(--color-secondary);
  color: white;
  border: none;
  border-radius: 8px;
}
.resultado_box {
  width: 260px;
  height: 120px;
  padding: 10px;
  font-size: 16px;
}
.titulo {
  font-size: 2rem;
  color: var(--color-primary);
}
.section {
  background: white;
  padding: 20px;
  border-left: 6px solid var(--color-primary);
  border-radius: 10px;
}
.contenido {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}
</style>
