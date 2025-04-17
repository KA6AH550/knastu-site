<template>
  <div id="app">
    <Header />
    <main class="grid-container">
      <Column
        v-for="(column, index) in orderedColumns"
        :key="index"
        :title="column.title"
        :links="getLinksByTitle(column.title)"
      />
    </main>
  </div>
</template>

<script>
import Header from "@/components/AppHeader.vue";
import Column from "@/components/AppColumn.vue";

export default {
  components: {
    Header,
    Column,
  },
  data() {
    return {
      dynamicLinks: [],
      orderedColumns: [
        { title: "Учебная деятельность", class: "tall" },
        { title: "Университет", class: "wide" },
        { title: "Документы", class: "wide" },
        { title: "Учебно-методическая деятельность" },
        { title: "Социальная сфера" },
        { title: "Наука и инновации" },
        { title: "Трудоустройство" },
      ],
    };
  },
  methods: {
    getLinksByTitle(title) {
      const match = this.dynamicLinks.find(item => item.category.trim() === title.trim());
      return match ? match.links : [];
    },
  },
  async created() {
    try {
      const res = await fetch("https://knastu-site-production.up.railway.app/api/links");
      this.dynamicLinks = await res.json();
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
    }
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  overflow-x: hidden;
  background: url('@/assets/fon.svg') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: #ececec;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* или center */
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 20px; /* чтобы контент не прилипал к краям */
  overflow: hidden; /* важно */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 равные колонки */
  gap: 20px;
  padding: 20px;
  padding-top: 90px;  
  max-width: 1500px;
  margin: 0 auto;
}

/* Первая колонка (Учебная деятельность) — высокая, занимает 1 колонку и 2 строки */
.grid-container .column:nth-child(1) {
  grid-column: 1 / 2; /* Первая колонка */
  grid-row: 1 / 3; /* Занимает 2 строки */
}

/* Вторая колонка (Университет) — широкая, занимает 3 колонки */
.grid-container .column:nth-child(2) {
  grid-column: 2 / 5; /* Колонки 2, 3, 4 */
  grid-row: 1 / 2; /* Первая строка */
}

/* Третья колонка (Документы) — широкая, занимает 3 колонки */
.grid-container .column:nth-child(3) {
  grid-column: 2 / 5; /* Колонки 2, 3, 4 */
  grid-row: 2 / 3; /* Вторая строка */
}

/* Последние 4 колонки (4, 5, 6, 7) — в одном ряду, каждая занимает 1 колонку */
.grid-container .column:nth-child(4),
.grid-container .column:nth-child(5),
.grid-container .column:nth-child(6),
.grid-container .column:nth-child(7) {
  grid-column: auto; /* Автоматическое размещение в колонке */
  grid-row: 3 / 4; /* Третья строка */
}

/* Убедимся, что колонки Университет и Документы растягиваются */
.grid-container .column:nth-child(2),
.grid-container .column:nth-child(3) {
  width: 100%; /* Полная ширина доступного пространства */
  box-sizing: border-box;
}

/* Общее правило для всех колонок */
.grid-container .column {
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.81); /* белый с прозрачностью */
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>