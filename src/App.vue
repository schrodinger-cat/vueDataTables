<template>
  <div id="app">
    <button @click.prevent="handleAddNewTable">Добавить таблицу</button>
    
    <table-component></table-component>
  </div>
</template>

<script>
import TableComponent from './components/Table/Table.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    TableComponent,
  },
  methods: {
    ...mapActions({
      addNewTable: 'addNewTable',
    }),
    /**
     * ОБработчик нажатия на кнопку добавления новой страницы
     */
    handleAddNewTable: function() {
      this.addNewTable();
    },
  },
};
</script>

<style lang="scss">
</style>
