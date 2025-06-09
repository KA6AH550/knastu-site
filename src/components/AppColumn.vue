<template>
  <section class="column">
    <div class="column-header">
      <h2 class="column-title">{{ title }}</h2>
      <!-- Показываем кнопку, только если есть tooltip -->
      <button
        v-if="tooltip"
        class="tooltip-button"
        @click="showTooltipModal = true"
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
      <template v-for="(link, index) in links" :key="index">
        <!-- Если есть description, показываем кнопку для модалки -->
        <button
          v-if="link.description"
          class="link-button"
          @click="openLinkModal(link.description, link.text, link.additionalLinks)"
        >
          {{ link.text }}
        </button>
        <!-- Иначе показываем ссылку -->
        <a
          v-else
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="link-button"
        >
          {{ link.text }}
        </a>
      </template>
    </div>
    <!-- Модалка для tooltip -->
    <div v-if="showTooltipModal && tooltip" class="modal-overlay" @click="showTooltipModal = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showTooltipModal = false" aria-label="Закрыть">
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
        <h3>Подсказка: {{ title }}</h3>
        <p>{{ tooltip }}</p>
      </div>
    </div>
    <!-- Модалка для текста ссылки -->
    <div v-if="showLinkModal && selectedLinkText" class="modal-overlay" @click="showLinkModal = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showLinkModal = false" aria-label="Закрыть">
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
        <h3>{{ selectedLinkTitle }}</h3>
        <p>{{ selectedLinkText }}</p>
        <div v-if="additionalLinks && additionalLinks.length" class="modal-actions">
          <a
            v-for="(extraLink, index) in additionalLinks"
            :key="index"
            :href="extraLink.url"
            target="_blank"
            rel="noopener noreferrer"
            class="link-button"
          >
            {{ extraLink.text }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    links: Array,
    tooltip: String,
  },
  data() {
    return {
      showTooltipModal: false,
      showLinkModal: false,
      selectedLinkText: null,
      selectedLinkTitle: null,
      additionalLinks: [], // Добавляем для хранения дополнительных ссылок
    };
  },
  methods: {
    openLinkModal(description, text, extraLinks) {
      this.selectedLinkText = description;
      this.selectedLinkTitle = text;
      this.additionalLinks = extraLinks || []; // Передаем и сохраняем additionalLinks
      this.showLinkModal = true;
    },
  },
  created() {
    console.log('Props:', this.title, this.tooltip, this.links); // Для отладки
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

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}

/* Общие стили для .link-button */
.link-button {
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
  display: inline-block; /* Для корректного отображения как кнопки */
}

.link-button:hover {
  background-color: #00aaff;
  color: white;
}

/* Специфичные стили для .flex-grid */
.flex-grid .link-button {
  cursor: pointer;
}

.flex-grid a.link-button:hover,
.flex-grid .link-button:hover {
  background-color: #00aaff;
  color: white;
}

/* Специфичные стили для .grid-layout */
.grid-layout .link-button {
  width: 100%;
  cursor: pointer;
}

.grid-layout a.link-button:hover,
.grid-layout .link-button:hover {
  background-color: #00aaff;
  color: white;
}

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
  margin: 0 0 16px;
}

.modal-actions {
  margin-top: 16px;
}

.modal-actions .link-button {
  display: block; /* Каждая кнопка на новой строке */
  margin-bottom: 10px; /* Отступ между кнопками */
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