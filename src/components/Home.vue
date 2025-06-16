<template>
  <main class="grid-container">
    <Column
      v-for="(column, index) in orderedColumns"
      :key="index"
      :title="column.title"
      :links="getLinksByTitle(column.title)"
      :tooltip="getTooltipByTitle(column.title)"
    />
  </main>
</template>

<script>
import Column from '@/components/AppColumn.vue';

export default {
  name: 'HomePage',
  components: {
    Column,
  },
  data() {
    return {
      dynamicLinks: [],
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
  },
  async created() {
    try {
      const res = await fetch('https://knastu-site.onrender.com/api/links');
      this.dynamicLinks = await res.json();
      console.log('Загруженные данные:', this.dynamicLinks);
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
    }
  },
};
</script>

<style scoped>
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