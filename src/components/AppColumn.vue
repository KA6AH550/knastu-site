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
    <div class="button-grid">
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
    links: Array
  }
};
</script>

<style scoped>
.column {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

}

.column-title {
  font-size: 22px;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
}

.column-image {
  width: auto;
  max-height: 160px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 16px;
  align-self: center;
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.button-grid a {
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

.button-grid a:hover {
  background-color: #00aaff;
  color: white;
}
</style>
