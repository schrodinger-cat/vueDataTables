<template>
  <div id="app">
    <button @click.prevent="handleAddNewTable">Добавить таблицу</button>
    
    <table-component 
      v-for="(table, index) in tablesList"
      :table="table"
      :key="index"
    ></table-component>
  </div>
</template>

<script>
import TableComponent from './components/Table/Table.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',

  components: {
    TableComponent,
  },

  computed: {
    ...mapGetters({
      tablesList: 'getTablesList',
    }),
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
</style>
