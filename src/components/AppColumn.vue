
<template>
  <div class="column">
    <h2 class="column-title">{{ title }}</h2>
    <div class="column-buttons">
      <button
        v-for="(link, index) in links"
        :key="index"
        class="link-button"
        @click="openLink(link.url)"
      >
        {{ link.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    links: Array,
  },
  methods: {
    openLink(url) {
      window.open(url, "_blank"); // Открыть сайт в новой вкладке
    },
  },
};
</script>

<style scoped>
/* Стили для столбца */
.column {
  flex: 1 1 auto;
  min-width: 200px;
  max-width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: #007bff;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
}

.column-title {
  font-size: 1.5em;
  margin-bottom: 15px;
}

.column-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link-button {
  padding: 10px 15px;
  font-size: 1em;
  color: #000000;
  background-color: #fff;
  border: 2px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.link-button:hover {
  background-color: #007bff;
  color: #fff;
}
</style>
