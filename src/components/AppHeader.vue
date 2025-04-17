<template>
  <header class="main-header">
    <div class="logo-block">
      <img src="@/assets/logo.svg" alt="Логотип" class="logo-icon" />
      <img src="@/assets/knastu.svg" alt="Кнагу ONBOARDING" class="logo-text" />
    </div>
    <nav class="nav-buttons">
      <button>Главная</button>
      <button>Учебная деятельность</button>
      <button>Университет</button>
      <button>Документы</button>
      <button>Учебно-методическая деятельность</button>
      <button>Социальная сфера</button>
      <button>Наука и инновации</button>
      <button>Трудоустройство</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
};
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
}

.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100vw;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid #eaeaea;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  box-sizing: border-box;
  padding: 0 40px;
  z-index: 1000;
}

.logo-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  height: 77px;
}

.logo-icon {
  height: 52px;
  width: auto;
}

.logo-text {
  height: 43px;
  width: auto;
}

.nav-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none; /* Для Firefox */
}

.nav-buttons::-webkit-scrollbar {
  display: none; /* Для Chrome, Safari */
}

.nav-buttons button {
  height: 51px;
  padding: 0 12px;
  background: none;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: #212529;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.nav-buttons button:hover {
  color: #00aaff;
}

/* Адаптивность для экранов меньше 1200px */
@media (max-width: 1200px) {
  .nav-buttons button {
    font-size: 13px;
    padding: 0 8px;
  }
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .main-header {
    padding: 0 20px;
    gap: 10px;
  }

  .nav-buttons {
    gap: 8px;
  }

  .nav-buttons button {
    font-size: 12px;
    padding: 0 6px;
  }

  .logo-icon {
    height: 40px;
  }

  .logo-text {
    height: 32px;
  }
}
</style>