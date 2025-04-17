<template>
  <section class="column">
    <h2 class="column-title">{{ title }}</h2>
    <!-- Показывать картинку только если заголовок — "Учебная деятельность" -->
    <img
      v-if="title === 'Учебная деятельность'"
      src="@/assets/teacher.svg"
      alt="column image"
      class="column-image"
      loading="lazy"
    />
    <div
      :class="['button-grid', {
        'flex-grid': ['Учебная деятельность', 'Университет', 'Документы'].includes(title),
        'grid-layout': !['Учебная деятельность', 'Университет', 'Документы'].includes(title)
      }]"
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
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    links: Array,
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

.column-title {
  font-size: 22px;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
  margin-top: 0;
}

.column-image {
  width: auto;
  max-height: 160px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 16px;
  align-self: center;
}

/* Стили для колонок с flex (Учебная деятельность, Университет, Документы) */
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

/* Стили для колонок с grid (остальные) */
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
</style>