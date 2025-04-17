<template>
  <header class="main-header">
    <div class="logo-block">
      <img src="@/assets/logo.svg" alt="Логотип" class="logo-icon" />
      <img src="@/assets/knastu.svg" alt="Кнагу ONBOARDING" class="logo-text" />
    </div>
    <nav class="nav-buttons">
      <button>Главная</button>
      <button>Учебная деятельность</button>
      <button>Учебно-методическая деятельность</button>
      <button>Социальная сфера</button>
      <button>Об университете</button>
      <button>Наука и инновации</button>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* или center */
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 20px; /* чтобы контент не прилипал к краям */
  overflow: hidden; /* важно */
}
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0; /* добавляем! */
  width: 100%;
  max-width: 100vw;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #eaeaea;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 110px;
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
  gap: 20px;
}

.nav-buttons button {
  height: 51px;
  padding: 16px;
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: #212529;
  cursor: pointer;
}
</style>
