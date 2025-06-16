<template>
  <div class="moderator-page">
    <h1>Панель модератора</h1>
    <button @click="goToHome">Вернуться на онбординг</button>
    <section class="add-column">
      <h2>Добавить новую колонку</h2>
      <form @submit.prevent="addColumn">
        <input v-model="newColumn.category" placeholder="Название колонки" required />
        <textarea v-model="newColumn.tooltip" placeholder="Подсказка (необязательно)"></textarea>
        <button type="submit">Добавить колонку</button>
      </form>
    </section>
    <section class="columns-table">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="column in columns" :key="column._id">
            <td>{{ column.category }}</td>
            <td>{{ column.tooltip || 'Нет подсказки' }}</td>
            <td>
              <button @click="openEditColumnModal(column)" class="edit-btn">Редактировать колонку</button>
              <button @click="openLinksModal(column)" class="edit-btn">Редактировать ссылки</button>
              <button @click="confirmDeleteColumn(column._id, column.category)" class="delete-btn">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Модальное окно для редактирования колонки -->
    <div v-if="showEditColumnModal" class="modal-overlay" @click="closeEditColumnModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeEditColumnModal" aria-label="Закрыть">
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
            <path d="M18 6 L6 18" />
            <path d="m6 6 l12 12" />
          </svg>
        </button>
        <h3>Редактировать колонку</h3>
        <form @submit.prevent="saveEditedColumn">
          <input v-model="editableColumn.category" placeholder="Название колонки" required />
          <textarea v-model="editableColumn.tooltip" placeholder="Подсказка (необязательно)"></textarea>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>

    <!-- Модальное окно для подтверждения удаления колонки -->
    <div v-if="showDeleteConfirmModal" class="modal-overlay" @click="closeDeleteConfirmModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeDeleteConfirmModal" aria-label="Закрыть">
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
            <path d="M18 6 L6 18" />
            <path d="m6 6 l12 12" />
          </svg>
        </button>
        <h3>Подтверждение удаления</h3>
        <p>Вы уверены, что хотите удалить колонку "{{ columnToDeleteName }}"?</p>
        <div class="modal-actions">
          <button @click="closeDeleteConfirmModal" class="cancel-btn">Отмена</button>
          <button @click="deleteColumnConfirmed" class="delete-btn">Удалить</button>
        </div>
      </div>
    </div>

    <!-- Модальное окно для управления ссылками -->
    <div v-if="showLinksModal" class="modal-overlay" @click="closeLinksModal">
      <div class="modal-content links-modal" @click.stop>
        <button class="modal-close" @click="closeLinksModal" aria-label="Закрыть">
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
            <path d="M18 6 L6 18" />
            <path d="m6 6 l12 12" />
          </svg>
        </button>
        <h3>Управление ссылками для "{{ selectedColumn.category }}"</h3>
        <div class="links-list">
          <div v-for="(link, index) in selectedColumn.links" :key="index" class="link-item">
            <p>{{ link.text }} - {{ link.url || link.description }}</p>
            <div class="link-actions">
              <button @click="openEditLinkModal(link, index)" class="edit-btn">Редактировать</button>
              <button @click="deleteLink(selectedColumn._id, index)" class="delete-btn">Удалить</button>
            </div>
          </div>
          <form @submit.prevent="addLink(selectedColumn._id)">
            <input v-model="newLink.text" placeholder="Текст ссылки" required />
            <input v-model="newLink.url" placeholder="URL (необязательно)" />
            <textarea v-model="newLink.description" placeholder="Описание (необязательно)"></textarea>
            <!-- Поле для добавления additionalLinks -->
            <div class="additional-links">
              <h4>Дополнительные ссылки (для модального окна)</h4>
              <div v-for="(extraLink, idx) in newLink.additionalLinks" :key="idx" class="additional-link-item">
                <input v-model="extraLink.text" placeholder="Текст ссылки" required />
                <input v-model="extraLink.url" placeholder="URL ссылки" required />
                <button type="button" class="delete-btn" @click="removeAdditionalLink(idx)">Удалить</button>
              </div>
              <button type="button" class="add-btn" @click="addAdditionalLink">Добавить дополнительную ссылку</button>
            </div>
            <button type="submit">Добавить ссылку</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Модальное окно для редактирования ссылки -->
    <div v-if="showEditLinkModal" class="modal-overlay" @click="closeEditLinkModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeEditLinkModal" aria-label="Закрыть">
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
            <path d="M18 6 L6 18" />
            <path d="m6 6 l12 12" />
          </svg>
        </button>
        <h3>Редактировать ссылку</h3>
        <form @submit.prevent="saveEditedLink">
          <input v-model="editableLink.text" placeholder="Текст ссылки" required />
          <input v-model="editableLink.url" placeholder="URL" />
          <textarea v-model="editableLink.description" placeholder="Описание"></textarea>
          <!-- Поле для редактирования additionalLinks -->
          <div class="additional-links">
            <h4>Дополнительные ссылки (для модального окна)</h4>
            <div v-for="(extraLink, idx) in editableLink.additionalLinks" :key="idx" class="additional-link-item">
              <input v-model="extraLink.text" placeholder="Текст ссылки" required />
              <input v-model="extraLink.url" placeholder="URL ссылки" required />
              <button type="button" class="delete-btn" @click="removeEditableAdditionalLink(idx)">Удалить</button>
            </div>
            <button type="button" class="add-btn" @click="addEditableAdditionalLink">Добавить дополнительную ссылку</button>
          </div>
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
      newLink: { text: '', url: '', description: '', additionalLinks: [] }, // Новая ссылка для модального окна
      showLinksModal: false, // Флаг для модального окна ссылок
      selectedColumn: null, // Выбранная колонка для управления ссылками
      showEditLinkModal: false, // Флаг для модального окна редактирования ссылки
      editableLink: { text: '', url: '', description: '', additionalLinks: [] }, // Данные редактируемой ссылки
      editColumnId: null, // ID колонки для редактирования
      editLinkIndex: null, // Индекс редактируемой ссылки
      showEditColumnModal: false, // Флаг для модального окна редактирования колонки
      editableColumn: { category: '', tooltip: '' }, // Данные редактируемой колонки
      showDeleteConfirmModal: false, // Флаг для модального окна подтверждения удаления
      columnToDeleteId: null, // ID колонки для удаления
      columnToDeleteName: '' // Название колонки для отображения в модальном окне
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
        this.newLink = { text: '', url: '', description: '', additionalLinks: [] };
        await this.fetchColumns();
        // Обновляем selectedColumn
        this.selectedColumn = this.columns.find(col => col._id === columnId);
      } catch (err) {
        console.error('Ошибка добавления ссылки:', err);
      }
    },
    confirmDeleteColumn(columnId, columnName) {
      this.columnToDeleteId = columnId;
      this.columnToDeleteName = columnName;
      this.showDeleteConfirmModal = true;
    },
    closeDeleteConfirmModal() {
      this.showDeleteConfirmModal = false;
      this.columnToDeleteId = null;
      this.columnToDeleteName = '';
    },
    async deleteColumnConfirmed() {
      try {
        await fetch(`https://knastu-site.onrender.com/api/links/${this.columnToDeleteId}`, {
          method: 'DELETE',
        });
        this.closeDeleteConfirmModal();
        await this.fetchColumns();
      } catch (err) {
        console.error('Ошибка удаления колонки:', err);
        this.closeDeleteConfirmModal();
      }
    },
    async deleteLink(columnId, linkIndex) {
      try {
        await fetch(`https://knastu-site.onrender.com/api/links/${columnId}/links/${linkIndex}`, {
          method: 'DELETE',
        });
        await this.fetchColumns();
        // Обновляем selectedColumn
        this.selectedColumn = this.columns.find(col => col._id === columnId);
      } catch (err) {
        console.error('Ошибка удаления ссылки:', err);
      }
    },
    openLinksModal(column) {
      this.selectedColumn = { ...column };
      this.showLinksModal = true;
    },
    closeLinksModal() {
      this.showLinksModal = false;
      this.selectedColumn = null;
      this.newLink = { text: '', url: '', description: '', additionalLinks: [] };
    },
    openEditLinkModal(link, index) {
      this.editableLink = { ...link, additionalLinks: link.additionalLinks || [] };
      this.editColumnId = this.selectedColumn._id;
      this.editLinkIndex = index;
      this.showEditLinkModal = true;
    },
    closeEditLinkModal() {
      this.showEditLinkModal = false;
      this.editableLink = { text: '', url: '', description: '', additionalLinks: [] };
    },
    async saveEditedLink() {
      try {
        // Логируем, что отправляем
        console.log('Отправляемые данные ссылки:', this.editableLink);
        const response = await fetch(`https://knastu-site.onrender.com/api/links/${this.editColumnId}/links/${this.editLinkIndex}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editableLink),
        });
        if (!response.ok) {
          throw new Error('Ошибка сервера: ' + response.status);
        }
        this.showEditLinkModal = false;
        this.editableLink = { text: '', url: '', description: '', additionalLinks: [] };
        await this.fetchColumns();
        // Обновляем selectedColumn
        this.selectedColumn = this.columns.find(col => col._id === this.editColumnId);
      } catch (err) {
        console.error('Ошибка сохранения ссылки:', err);
        alert('Не удалось сохранить ссылку: ' + err.message);
      }
    },
    addAdditionalLink() {
      this.newLink.additionalLinks.push({ text: '', url: '' });
    },
    removeAdditionalLink(index) {
      this.newLink.additionalLinks.splice(index, 1);
    },
    addEditableAdditionalLink() {
      this.editableLink.additionalLinks.push({ text: '', url: '' });
    },
    removeEditableAdditionalLink(index) {
      this.editableLink.additionalLinks.splice(index, 1);
    },
    openEditColumnModal(column) {
      this.editableColumn = {
        category: column.category,
        tooltip: column.tooltip || '',
        links: column.links || []
      };
      this.editColumnId = column._id;
      this.showEditColumnModal = true;
    },
    closeEditColumnModal() {
      this.showEditColumnModal = false;
      this.editableColumn = { category: '', tooltip: '' };
      this.editColumnId = null;
    },
    async saveEditedColumn() {
      try {
        // Логируем, что отправляем
        console.log('Отправляемые данные колонки:', {
          category: this.editableColumn.category,
          tooltip: this.editableColumn.tooltip,
          links: this.editableColumn.links
        });
        const response = await fetch(`https://knastu-site.onrender.com/api/links/${this.editColumnId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: this.editableColumn.category,
            tooltip: this.editableColumn.tooltip,
            links: this.editableColumn.links || []
          }),
        });
        if (!response.ok) {
          throw new Error('Ошибка сервера: ' + response.status);
        }
        this.showEditColumnModal = false;
        this.editableColumn = { category: '', tooltip: '' };
        await this.fetchColumns();
      } catch (err) {
        console.error('Ошибка сохранения колонки:', err);
        alert('Не удалось сохранить колонку: ' + err.message);
      }
    },
    goToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.moderator-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px 40px; /* верхний отступ под фиксированный Header */
  font-family: 'Roboto', sans-serif;
  background: url('@/assets/fon.svg') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: #ececec;
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: #212529;
  margin-bottom: 20px;
}

.back-btn {
  display: block;
  margin: 0 auto 40px;
  padding: 10px 20px;
  border: 2px solid #00aaff;
  border-radius: 8px;
  color: #00aaff;
  background-color: white;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.25s ease;
  margin-bottom: 60px; /* Было 40px */
}
.back-btn:hover {
  background-color: #00aaff;
  color: white;
}

.add-column {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
}
.add-column h2 {
  margin-top: 0;
  color: #212529;
}

.columns-table {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95em;
}

thead {
  background: #f5f5f5;
}

th {
  text-align: left;
  padding: 12px;
  color: #212529;
  font-weight: 600;
}

td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

tr:hover {
  background: #f9f9f9;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95em;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #00aaff;
  box-shadow: 0 0 0 2px rgba(0, 170, 255, 0.2);
}

textarea {
  resize: vertical;
  min-height: 60px;
  max-height: 120px;
}

button {
  padding: 8px 12px;
  border: 1.8px solid #00aaff;
  border-radius: 8px;
  color: #00aaff;
  background-color: white;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.25s ease;
}

button:hover {
  background-color: #00aaff;
  color: white;
}

.edit-btn {
  margin-right: 8px;
  margin-bottom: 8px; /* отступ снизу */
}


.delete-btn {
  border-color: #ff4d4d;
  color: #ff4d4d;
}

.delete-btn:hover {
  background-color: #ff4d4d;
  color: white;
}

.cancel-btn {
  border-color: #6c757d;
  color: #6c757d;
  margin-right: 10px;
}

.cancel-btn:hover {
  background-color: #6c757d;
  color: white;
}

.add-btn {
  border-color: #28a745;
  color: #28a745;
  margin: 8px 0;
}

.add-btn:hover {
  background-color: #28a745;
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
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.links-modal {
  max-width: 600px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.2s ease;
}

.modal-close:hover {
  transform: scale(1.2);
}
.modal-close:hover svg {
  stroke: #00aaff;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
}

.links-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.link-item p {
  margin: 0;
  flex-grow: 1;
  font-size: 0.95em;
  color: #333;
}

.link-actions {
  display: flex;
  gap: 12px;
}

.additional-links {
  margin-top: 16px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.additional-links h4 {
  margin: 0 0 10px;
  font-size: 1em;
  color: #212529;
}

.additional-link-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.additional-link-item input {
  flex: 1;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
  .moderator-page {
    padding: 80px 10px 20px;
  }

  .add-column,
  .columns-table {
    padding: 15px;
  }

  th, td {
    padding: 8px;
    font-size: 0.9em;
  }

  .links-modal {
    max-width: 90%;
  }

  .additional-link-item {
    flex-direction: column;
    gap: 5px;
  }

  .additional-link-item input {
    width: 100%;
  }
}
</style>