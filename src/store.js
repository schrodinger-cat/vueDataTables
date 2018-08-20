import Vue from 'vue';
import Vuex from 'vuex';
import { httpGet } from './utils.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tablesBlueprint: {
      isPending: false,
      values: [],
      errors: [],
      page: 1,
      rows: [],
    },
    tables: [],
  },
  getters: {
    getTablesList: state => state.tables,
  },
  mutations: {
    addNewTableInit: state => {
      let copy = Object.assign({}, state.tablesBlueprint);
      let tableIndex = state.tables.push(copy) - 1;

      state.tables[tableIndex].isPending = true;
    },
    addNewTableSuccess: (state, payload) => {
      state.tables[state.tables.length - 1].values = payload;
      state.tables[state.tables.length - 1].isPending = false;
      state.tables[state.tables.length - 1].rows = Object.keys(payload[0]);
    },
    addNewTableError: (state, payload) => {
      state.tables[state.tables.length - 1].error = payload;
    },

    /**
     * Смена страниц в текущей таблице
     */
    setCurrentPage: (state, payload) => {
      state.tables[payload.index].page = payload.page;
    },
  },
  actions: {
    /**
     * Добавим новую таблицу, предварительно скопировав структуру из tableBlueprint
     * Затем сделаем запрос и в случае успешного завершения отправим полученные данные
     * на обработку в мутацию
     */
    addNewTable: context => {
      context.commit('addNewTableInit');

      httpGet(
        'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32};',
      ).then(
        response => {
          context.commit('addNewTableSuccess', JSON.parse(response));
        },
        error => {
          context.commit('addNewTableError', error);
        },
      );
    },
  },
});
