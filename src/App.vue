<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/AppHeader.vue';

export default {
  components: {
    Header,
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
</style>