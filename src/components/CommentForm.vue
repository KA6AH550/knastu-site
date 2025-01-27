<!--
<template>
    <section class="comments">
      <h3>Комментарии</h3>
      <form @submit.prevent="submitForm" class="comment-form">
        <label for="name">Ваше имя:</label>
        <input type="text" id="name" v-model="name" placeholder="Введите ваше имя" required />
  
        <label for="comment">Ваш комментарий:</label>
        <textarea id="comment" v-model="comment" rows="4" placeholder="Напишите комментарий" required></textarea>
  
        <button type="submit">Отправить</button>
      </form>
    </section>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        comment: "",
      };
    },
    methods: {
      async submitForm() {
        try {
          await axios.post("http://localhost:5000/api/comments", {
            name: this.name,
            comment: this.comment,
          });
          alert("Спасибо за ваш комментарий!");
          this.name = "";
          this.comment = "";
        } catch (error) {
          console.error("Error submitting comment:", error);
          alert("Ошибка отправки комментария!");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .comments {
    width: 100%;
    padding: 20px;
    margin-top: 20px;
    background-color: #f9f9f9;
    border-top: 1px solid #ccc;
  }
  .comment-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .comment-form input,
  .comment-form textarea {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .comment-form button {
    width: fit-content;
    padding: 10px 15px;
    font-size: 14px;
    color: #fff;
    background-color: #3366cc;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .comment-form button:hover {
    background-color: #ff6600;
  }
  </style>
  -->