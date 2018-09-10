<template>
  <div id="app">
    <div class="preloader" v-if="isPending">
      <div class="preloader__spinner"></div>
    </div>

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
      isPending: 'appIsPending',
    }),
  },

  methods: {
    setPopupState: function(state) {
      this.popupState = state;
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

.preloader {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(#3d3b3a, 0.7);

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: #4286f4;
    animation: rotate 2s linear infinite;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
