<template>
  <section class="column">
    <div class="column-header">
      <h2 class="column-title">{{ title }}</h2>
      <!-- Иконка подсказки только для "Учебная деятельность" -->
      <button
        v-if="title === 'Учебная деятельность'"
        class="tooltip-button"
        @click="showModal = true"
        aria-label="Открыть подсказку"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00aaff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v.01" />
          <path d="M12 8a2 2 0 0 1 2 2c0 1-.5 1.5-1 2-.5.5-1 1-1 2" />
        </svg>
      </button>
    </div>
    <!-- Показывать картинку только если заголовок — "Учебная деятельность" -->
    <img
      v-if="title === 'Учебная деятельность'"
      src="@/assets/teacher.svg"
      alt="column image"
      class="column-image"
      loading="lazy"
    />
    <div
      :class="[
        'button-grid',
        {
          'flex-grid': ['Учебная деятельность', 'Университет', 'Документы'].includes(title),
          'grid-layout': !['Учебная деятельность', 'Университет', 'Документы'].includes(title),
        },
      ]"
    >
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ link.text }}
      </a>
    </div>
    <!-- Модальное окно -->
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showModal = false" aria-label="Закрыть">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#212529"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <h3>Подсказка: Учебная деятельность</h3>
        <p>
          Раздел «Учебная деятельность» содержит информацию и ресурсы для организации учебного процесса.
          Здесь вы найдете доступ к личному кабинету, расписанию занятий, учебным материалам, электронным платформам университета.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    links: Array,
  },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style scoped>
.column {
  background: rgba(255, 255, 255, 0.81);
  border-radius: 12px;
  padding: 12px 20px 20px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.column-title {
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #222;
  margin: 0;
}

.tooltip-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.column-image {
  width: auto;
  max-height: 160px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 16px;
  align-self: center;
}

.flex-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.flex-grid a {
  padding: 10px 14px;
  border: 1.8px solid #00aaff;
  border-radius: 8px;
  color: #00aaff;
  font-size: 14px;
  font-weight: 500;
  background-color: white;
  text-decoration: none;
  transition: all 0.25s ease;
  text-align: center;
}

.flex-grid a:hover {
  background-color: #00aaff;
  color: white;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}

.grid-layout a {
  width: 100%;
  padding: 10px 14px;
  border: 1.8px solid #00aaff;
  border-radius: 8px;
  color: #00aaff;
  font-size: 14px;
  font-weight: 500;
  background-color: white;
  text-decoration: none;
  text-align: center;
  transition: all 0.25s ease;
  box-sizing: border-box;
}

.grid-layout a:hover {
  background-color: #00aaff;
  color: white;
}

/* Стили для модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  position: relative;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.modal-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin: 0 0 12px;
}

.modal-content p {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin: 0;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.modal-close:hover svg {
  stroke: #00aaff;
}
</style>