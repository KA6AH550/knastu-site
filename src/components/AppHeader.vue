<template>
    <header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Логотип КнАГУ" />
      </div>
      <nav class="nav">
        <a href="https://www.knastu.ru/">Главная</a>
        <a href="https://knastu.ru/teachers">Преподавателю</a>
        <a href="https://knastu.ru/employees">Сотруднику</a>
      </nav>
    </header>
  </template>
  
  <style scoped>
  .header {
    background-color: #3779b6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
  }
  .header .logo img {
    height: 50px;
  }
  .nav a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
  }
  .nav a:hover {
    text-decoration: underline;
    color: #24963c;
  }
  </style>
  