const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js', // Убедитесь, что путь к главному файлу верный
      title: 'КнАГУ - Онбординг', // Новый заголовок
    },
  },
});