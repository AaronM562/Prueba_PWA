<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function irAexamen() {
  if (confirm("¿Listo para comenzar?")) {
    router.push("/examen");
  }
}

function Ejemplo() {
  if (confirm("¿Practicar un poco?")) {
    router.push("/ejemplo");
  }
}
</script>

<template>
  <route-view />
  <div id="app">
    <div>
      <header class="Encabezado">
        <h1 class="main-title">
          Múltiplos y Divisores: Divisores de un mismo numero
        </h1>
        <div class="encabezado_options">
          <p
            style="
              color: aliceblue;
              font-weight: 100;
              font-family: Impact, Haettenschweiler, 'Arial Narrow Bold',
                sans-serif;
            "
          >
            Aprende los conceptos básicos de múltiplos y divisores
          </p>
          <button @click="irAexamen" class="btn_direccion">Ir a examen</button>
          <button @click="Ejemplo" class="btn_direccion">¿Practicar?</button>
        </div>
      </header>
    </div>
    <div class="contenedor">
      <!-- Múltiplos -->
      <section class="section">
        <h2 class="section-title">¿Qué son los múltiplos?</h2>
        <p>
          Un múltiplo es un número que obtenemos al multiplicar otro número.
        </p>

        <div class="card ejemplo">
          <p><strong>Ejemplo:</strong></p>
          <p>
            Los múltiplos de 5 son: <strong>5, 10, 15, 20, 25…</strong><br />
            (Porque: 5×1 = 5, 5×2 = 10, 5×3 = 15…)
          </p>
          <p>
            En resumen: un múltiplo es el resultado de multiplicar un número.
          </p>
        </div>
      </section>

      <!-- Divisores -->
      <section class="section">
        <h2 class="section-title">¿Qué es un divisor?</h2>
        <p>
          Un divisor es un número que divide a otro exactamente, sin dejar
          residuo.
        </p>

        <div class="card ejemplo">
          <p><strong>Ejemplo:</strong></p>
          <p>
            Los divisores de 12 son:
            <strong>1, 2, 3, 4, 6 y 12</strong><br />
            (Porque todas las divisiones dan exacto)
          </p>
        </div>
      </section>

      <!-- Pasos -->
      <section class="section">
        <h2 class="section-title">¿Cómo se hace?</h2>
        <p><strong>Pasos para encontrar los divisores:</strong></p>

        <ul class="Lib-ul">
          <li>Paso 1: Escribe el número (Ejemplo: 18).</li>
          <li>Paso 2: Divídelo entre todos los números empezando desde 1.</li>
          <li>Paso 3: Si la división es exacta, ese número es divisor.</li>
          <li>Paso 4: Detente cuando llegues al mismo número.</li>
        </ul>

        <div class="card ejemplo">
          <p><strong>Ejemplo práctico:</strong></p>
          <p>Divisores de 18:</p>

          <p>
            18 ÷ 1 = exacto → <strong>1</strong><br />
            18 ÷ 2 = exacto → <strong>2</strong><br />
            18 ÷ 3 = exacto → <strong>3</strong><br />
            18 ÷ 4 = NO exacto → ❌<br />
            18 ÷ 5 = NO exacto → ❌<br />
            18 ÷ 6 = exacto → <strong>6</strong><br />
            18 ÷ 9 = exacto → <strong>9</strong><br />
            18 ÷ 18 = exacto → <strong>18</strong><br />
          </p>

          <p><strong>Divisores de 18 = 1, 2, 3, 6, 9, 18</strong></p>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
/* ---------- COLORES BASE VIBRANTES ---------- */
:root {
  --color-primary: #007bff;
  --color-secondary: #ff6b6b;
  --color-accent: #ffd93d;
  --color-bg: #f2f2f2;
  --color-card-bg: white;
  --color-text: #333;
}

/* ---------- GENERAL ---------- */
body {
  background: var(--color-bg);
  font-family: "Segoe UI", sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  max-width: 95%;
  padding: 20px;
  align-items: center;
}

/* ---------- TITULOS ---------- */
.main-title {
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 30px;
  color: var(--color-bg);
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: var(--color-secondary);
}

/* ---------- SECCIONES ---------- */
.section {
  margin-bottom: 20px auto;
  padding: 20px;
  width: 100%;
  border-left: 6px solid var(--color-primary);
  background: white;
  border-radius: 10px;
  box-sizing: border-box;
}

/* ---------- TARJETAS ---------- */
.card {
  background: var(--color-card-bg);
  padding: 18px;
  border-radius: 10px;
  margin-top: 12px;
  border: 2px solid var(--color-primary);
}

/* ---------- GRID PARA NOTICIAS ---------- */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 16px;
}

.news-item {
  border-left: 6px solid var(--color-secondary);
}

/* ---------- LISTAS ---------- */
.Lib-ul li {
  margin-bottom: 8px;
  padding-left: 10px;
}

/* ---------- EJEMPLOS ---------- */
.ejemplo strong {
  color: var(--color-secondary);
}
.Encabezado {
  margin-bottom: 20px;
  flex-direction: row;
  background-color: var(--color-primary);
  height: 100%;
  padding: 20px;
  border-radius: 10px;
}
.encabezado_options {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: center;
}
.btn_direccion {
  background-color: var(--color-primary);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
</style>
