<template>
  <div class="moderator-page">
    <h1>Панель модератора</h1>
    <section class="add-column">
      <h2>Добавить новую колонку</h2>
      <form @submit.prevent="addColumn">
        <input v-model="newColumn.category" placeholder="Название колонки" required />
        <textarea v-model="newColumn.tooltip" placeholder="Подсказка (необязательно)"></textarea>
        <button type="submit">Добавить колонку</button>
      </form>
    </section>
    <section class="columns-list">
      <div v-for="column in columns" :key="column._id" class="column-item">
        <h3>{{ column.category }}</h3>
        <p>{{ column.tooltip || 'Нет подсказки' }}</p>
        <div class="links">
          <div v-for="(link, index) in column.links" :key="index">
            <p>{{ link.text }} - {{ link.url || link.description }}</p>
            <button @click="editLink(column._id, index, link)">Редактировать</button>
            <button @click="deleteLink(column._id, index)">Удалить</button>
          </div>
          <form @submit.prevent="addLink(column._id)">
            <input v-model="newLink.text" placeholder="Текст ссылки" required />
            <input v-model="newLink.url" placeholder="URL (необязательно)" />
            <textarea v-model="newLink.description" placeholder="Описание (необязательно)"></textarea>
            <button type="submit">Добавить ссылку</button>
          </form>
        </div>
        <button @click="deleteColumn(column._id)">Удалить колонку</button>
      </div>
    </section>
    <!-- Модальное окно для редактирования ссылки -->
    <div v-if="showEditModal" class="modal-overlay" @click="showEditModal = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showEditModal = false" aria-label="Закрыть">
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
        <h3>Редактировать ссылку</h3>
        <form @submit.prevent="saveEditedLink">
          <input v-model="editLink.text" placeholder="Текст ссылки" required />
          <input v-model="editLink.url" placeholder="URL" />
          <textarea v-model="editLink.description" placeholder="Описание"></textarea>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [], // Список колонок
      newColumn: { category: '', tooltip: '' }, // Новая колонка
      newLink: { text: '', url: '', description: '' }, // Новая ссылка
      showEditModal: false, // Флаг для модального окна
      editableLink: { text: '', url: '', description: '' }, // Данные редактируемой ссылки
      editColumnId: null, // ID колонки для редактирования
      editLinkIndex: null, // Индекс редактируемой ссылки
    };
  },
  async created() {
    await this.fetchColumns();
  },
  methods: {
    async fetchColumns() {
      try {
        const res = await fetch('https://knastu-site.onrender.com/api/links');
        this.columns = await res.json();
      } catch (err) {
        console.error('Ошибка загрузки колонок:', err);
      }
    },
    async addColumn() {
      try {
        await fetch('https://knastu-site.onrender.com/api/links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newColumn),
        });
        this.newColumn = { category: '', tooltip: '' };
        await this.fetchColumns();
      } catch (err) {
        console.error('Ошибка добавления колонки:', err);
      }
    },
    async addLink(columnId) {
      try {
        await fetch(`https://knastu-site.onrender.com/api/links/${columnId}/links`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newLink),
        });
        this.newLink = { text: '', url: '', description: '' };
        await this.fetchColumns();
      } catch (err) {
        console.error('Ошибка добавления ссылки:', err);
      }
    },
    async deleteColumn(columnId) {
      try {
        await fetch(`https://knastu-site.onrender.com/api/links/${columnId}`, {
          method: 'DELETE',
        });
        await this.fetchColumns();
      } catch (err) {
        console.error('Ошибка удаления колонки:', err);
      }
    },
    async deleteLink(columnId, linkIndex) {
      try {
        await fetch(`https://knastu-site.onrender.com/api/links/${columnId}/links/${linkIndex}`, {
          method: 'DELETE',
        });
        await this.fetchColumns();
      } catch (err) {
        console.error('Ошибка удаления ссылки:', err);
      }
    },
    editLink(columnId, linkIndex, link) {
      this.editColumnId = columnId;
      this.editLinkIndex = linkIndex;
      this.editableLink = { ...link };
      this.showEditModal = true;
    },
    async saveEditedLink() {
      try {
        await fetch(`https://knastu-site.onrender.com/api/links/${this.editColumnId}/links/${this.editLinkIndex}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editableLink),
        });
        this.showEditModal = false;
        this.editableLink = { text: '', url: '', description: '' };
        await this.fetchColumns();
      } catch (err) {
        console.error('Ошибка сохранения ссылки:', err);
      }
    },
  },
};
</script>

<style scoped>
.moderator-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background: url('@/assets/fon.svg') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: #ececec;
}
.add-column,
.columns-list {
  margin-bottom: 20px;
}
.column-item {
  background: rgba(255, 255, 255, 0.81);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
}
button {
  padding: 10px 14px;
  border: 1.8px solid #00aaff;
  border-radius: 8px;
  color: #00aaff;
  background-color: white;
  cursor: pointer;
  margin: 4px;
  transition: all 0.25s ease;
}
button:hover {
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