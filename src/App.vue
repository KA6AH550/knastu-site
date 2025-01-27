<template>
  <div id="app">
    <Header />
    <main class="main">
      <Column
        v-for="(column, index) in columns"
        :key="index"
        :title="column.title"
        :links="column.links"
      />
    </main>
    <!--<CommentForm />-->
  </div>
</template>

<script>
import Header from "@/components/AppHeader.vue";
import Column from "@/components/AppColumn.vue";
//import CommentForm from "@/components/CommentForm.vue";

export default {
  components: {
    Header,
    Column,
    //CommentForm,
  },
  data() {
    return {
      columns: [],
    };
  },
  async created() {
    try {
      const response = await fetch('https://knastu-site-production.up.railway.app/api/links');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.columns = data.map((item) => ({
        title: item.category,
        links: item.links,
      }));
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  },
};
</script>

<style>
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  align-items: flex-start; /* Для выравнивания по верхнему краю */
}

a {
  color: inherit; /* Или ваш цвет */
  text-decoration: none;
}

a:visited {
  color: inherit;
}

a:hover {
  color: #007BFF;
  text-decoration: underline;
}

a:active {
  color: inherit;
}

body {
  font-family: "radiance-ultralightitalic", sans-serif; /* Укажите основной шрифт и запасной */
}
</style>
