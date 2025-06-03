<template>
  <div id="app">
    <Header @toggle-moderator="toggleModerator" />
    <main v-if="!isModerator" class="grid-container">
      <Column
        v-for="(column, index) in orderedColumns"
        :key="index"
        :title="column.title"
        :links="getLinksByTitle(column.title)"
        :tooltip="getTooltipByTitle(column.title)"
      />
    </main>
    <ModeratorPage v-else />
  </div>
</template>

<script>
import Header from "@/components/AppHeader.vue";
import Column from "@/components/AppColumn.vue";
import ModeratorPage from "@/components/ModeratorPage.vue";

export default {
  components: {
    Header,
    Column,
    ModeratorPage,
  },
  data() {
    return {
      dynamicLinks: [],
      isModerator: false,
    };
  },
  computed: {
    orderedColumns() {
      return this.dynamicLinks.map(item => ({
        title: item.category,
        links: item.links || [],
        tooltip: item.tooltip || null,
      }));
    },
  },
  methods: {
    getLinksByTitle(title) {
      const match = this.dynamicLinks.find(
        item => item.category.trim() === title.trim()
      );
      return match ? match.links : [];
    },
    getTooltipByTitle(title) {
      const match = this.dynamicLinks.find(
        item => item.category.trim() === title.trim()
      );
      return match ? match.tooltip : null;
    },
    toggleModerator() {
      this.isModerator = !this.isModerator;
    },
  },
  async created() {
    try {
      const res = await fetch("https://knastu-site.onrender.com/api/links");
      this.dynamicLinks = await res.json();
      console.log("Загруженные данные:", this.dynamicLinks);
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

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
body {
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
}
*, *::before, *::after {
  box-sizing: inherit;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  overflow: hidden;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  padding-top: 90px;
  max-width: 1530px;
  margin: 0 auto;
}

.grid-container .column:nth-child(1) {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.grid-container .column:nth-child(2) {
  grid-column: 2 / 5;
  grid-row: 1 / 2;
}

.grid-container .column:nth-child(3) {
  grid-column: 2 / 5;
  grid-row: 2 / 3;
}

.grid-container .column:nth-child(4),
.grid-container .column:nth-child(5),
.grid-container .column:nth-child(6),
.grid-container .column:nth-child(7) {
  grid-column: auto;
  grid-row: 3 / 4;
}

.grid-container .column:nth-child(2),
.grid-container .column:nth-child(3) {
  width: 100%;
  box-sizing: border-box;
}

.grid-container .column {
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.81);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>