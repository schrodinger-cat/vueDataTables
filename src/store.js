import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tablesBlueprint: {
      values: [],
      errors: [],
      page: 1,
      rows: [],
      meta: [],
    },
    tables: [],
    isPending: false,
  },
  getters: {
    getTablesList: state => state.tables,
    appIsPending: state => state.isPending,
  },
  mutations: {
    addNewTable: state => {
      state.isPending = true;
    },

    addNewTableSuccess: (state, payload) => {
      let copy = Object.assign({}, state.tablesBlueprint);

      copy.values = payload;
      copy.isPending = false;
      copy.rows = Object.keys(payload[0]);

      state.tables.push(copy);
      state.isPending = false;
    },

    addNewTableError: (state, payload) => {
      state.tables[state.tables.length - 1].error = payload;
      state.isPending = false;
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
      let values = JSON.parse(payload.values);
      if (!_.isEqual(state.tables[payload.table].rows, Object.keys(values[0]))) {
        state.tables[payload.table].rows = Object.keys(values[0]);
      }

      state.tables[payload.table].values = values;
    },

    /**
     * Добавление пустой таблицы
     */
    addEmptyTable: (state, payload) => {
      let rows = payload.fields.replace(/\s/g, '').split(',');

      let emptyValues = [];

      for (let i = 0; i < Number(payload.cols); i++) {
        let elem = {};

        rows.forEach(row => {
          elem[row] = '';
        });

        emptyValues.push(elem);
      }

      let copy = Object.assign({}, state.tablesBlueprint);
      copy.rows = rows;
      copy.values = emptyValues;
      copy.meta = payload.meta ? payload.meta.replace(/\s/g, '').split(',') : [];

      state.tables.push(copy);
    },
  },
  actions: {
    /**
     * Добавим новую таблицу, предварительно скопировав структуру из tableBlueprint
     * Затем сделаем запрос и в случае успешного завершения отправим полученные данные
     * на обработку в мутацию
     */
    addNewTable: context => {
      context.commit('addNewTable');

      axios
        .get(
          'http://www.filltext.com/?rows=100&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32};',
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
