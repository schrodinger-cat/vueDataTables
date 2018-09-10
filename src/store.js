import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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
    addNewTableSuccess: (state, payload) => {
      let copy = Object.assign({}, state.tablesBlueprint);
      let index = state.tables.push(copy) - 1;

      state.tables[index].values = payload;
      state.tables[index].isPending = false;
      state.tables[index].rows = Object.keys(payload[0]);
    },
    addNewTableError: (state, payload) => {
      state.tables[state.tables.length - 1].error = payload;
    },

    /**
     * Добавим новую строку в таблицу
     * @param {*} payload - индексы строки, таблицы, пустой элемент и номер страницы
     */
    addNewColumn: (state, payload) => {
      let index = payload.column + 1 + (payload.page - 1) * 10;
      state.tables[payload.table].values.splice(index, 0, payload.element);
    },

    /**
     * Сохраним изменненое значение
     * @param {*} payload - индекс таблицы, название столбца, индекс строки, значение поля
     */
    saveNewValue: (state, payload) => {
      state.tables[payload.table].values[payload.row][payload.column] = payload.newValue;
    },

    /**
     * Очистка таблицы
     * @param {*} payload - индекс таблицы
     */
    cleanTable: (state, payload) => {
      state.tables[payload].values = [];
    },

    /**
     * Удаление таблицы
     * @param {*} payload - индекс таблицы
     */
    deleteTable: (state, payload) => {
      state.tables.splice(payload, 1);
    },

    /**
     * Восстановление таблицы
     */
    restoreTable: (state, payload) => {
      state.tables[payload.table].values = JSON.parse(payload.values);
    },
  },
  actions: {
    /**
     * Добавим новую таблицу, предварительно скопировав структуру из tableBlueprint
     * Затем сделаем запрос и в случае успешного завершения отправим полученные данные
     * на обработку в мутацию
     */
    addNewTable: context => {
      axios
        .get(
          'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32};',
        )
        .then(response => {
          context.commit('addNewTableSuccess', response.data);
        })
        .catch(error => {
          return Promise.reject(context.commit('addNewTableError', error));
        });
    },
  },
});
