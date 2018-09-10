<template>
  <div id="app">
    <button @click.prevent="setPopupState(true)">Добавить таблицу</button>

    <popup v-if="popupState" @close="setPopupState(false)">
      <add-table @created="setPopupState(false)"></add-table>
    </popup>
    
    <table-component 
      v-for="(table, index) in tablesList"
      :table="table"
      :tableIndex="index"
      :key="index"
    ></table-component>
  </div>
</template>

<script>
import TableComponent from './components/Table/Table.vue';
import Popup from './components/Popup/Popup.vue';
import AddTable from './components/AddTable/AddTable.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'app',

  components: {
    TableComponent,
    Popup,
    AddTable,
  },

  data: () => {
    return {
      popupState: false,
    };
  },

  computed: {
    ...mapGetters({
      tablesList: 'getTablesList',
    }),
  },

  methods: {
    setPopupState: function(state) {
      this.popupState = state;
    }
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
