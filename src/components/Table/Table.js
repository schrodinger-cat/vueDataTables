import { mapMutations } from 'vuex';
import _ from 'lodash';
import TableFilter from '../TableFilter/TableFilter.vue';
import Popup from '../Popup/Popup.vue';
import CopyRestoreTable from '../CopyRestoreTable/CopyRestoreTable.vue';

export default {
  name: 'table-component',

  components: {
    TableFilter,
    Popup,
    CopyRestoreTable,
  },

  props: ['table', 'tableIndex'],

  data: () => {
    return {
      tableData: {
        isPending: false,
        values: [],
        errors: [],
        page: 1,
        rows: [],
      },
      sorting: {
        direction: 'normal',
        field: null,
        values: ['asc', 'desc', 'normal'],
        valuesSymbols: ['⇈', '⇊', ''],
        initialState: [],
      },
      edit: {
        column: null,
        row: null,
        value: null,
      },
      editStatus: false,
      isFiltered: false,
      popupState: false,
    };
  },

  computed: {
    /**
     * Вернем символ сортировки для отрисовывания в заголовке
     */
    rowDirection: function() {
      return this.sorting.valuesSymbols[this.sorting.values.indexOf(this.sorting.direction)];
    },

    setCustomTh: function() {
      return this.table.meta[0] ? this.table.meta[0] : '';
    },
  },

  methods: {
    ...mapMutations({
      addNewColumn: 'addNewColumn',
      saveNewValue: 'saveNewValue',
      cleanTable: 'cleanTable',
      deleteTable: 'deleteTable',
    }),

    setCustomTd: function(index) {
      if (index % 2 == 0) {
        return this.table.meta[1] ? this.table.meta[1] : '';
      } else {
        return this.table.meta[2] ? this.table.meta[2] : '';
      }
    },

    /**
     * В задании не было указано, что делать с вложенными объектами, поэтому все элементы объектов
     * я вывел через запятую
     * @param {*} value - значение поля
     */
    checkTypeOfValue: function(value) {
      return typeof value == 'object'
        ? Object.keys(value)
            .map(e => value[e])
            .join(', ')
        : value;
    },

    /**
     * Выставим активное состояние кнопки в пагинации
     * @param {*} page - номер страницы
     */
    checkActivePage: function(page) {
      if (page == this.tableData.page) {
        return '_active';
      }
    },

    /**
     * Отсортируем список в зависимости от текущей страницы
     */
    getTableValuesPerPage: (list, page) => {
      const start = (page - 1) * 10;
      const end = start + 10;

      return list.slice(start, end);
    },

    /**
     * Для пагинации посчитаем и вернем количество страниц
     */
    getPagesCount: values => {
      return Math.ceil(values.length / 10);
    },

    /**
     * Изменим страницу
     */
    handleSetPage: function(page) {
      this.tableData.page = page;
    },

    /**
     * Сортировка поля. Если поле не отсортировано выставляем сортировку по возрастанию.
     * Если сортировка уже есть, смотрим следующий элемент в массиве this.sorting.value, если его нет - ставим первый элемент
     * @param {*} index -  название поля по которому происходит сортировка
     */
    handleSort: function(index) {
      if (this.sorting.field != index) {
        this.sorting.field = index;
        this.sorting.direction = 'asc';
      } else {
        let currentDirection = this.sorting.values.indexOf(this.sorting.direction);
        let directions = this.sorting.values;
        let nextDirection = directions[currentDirection + 1];

        this.sorting.direction = nextDirection ? nextDirection : directions[0];
      }

      //если список отфильтрован - значение для "нормального" состояния возьмём из this.sorting.initialState
      if (this.sorting.direction === 'normal') {
        this.tableData.values = this.isFiltered ? this.sorting.initialState : this.table.values;
      } else {
        this.tableData.values = _.orderBy(this.tableData.values, index, this.sorting.direction);
      }
    },

    /**
     * Отфильтруем в зависимости от введенного значения и столбца
     */
    handleSearch: function(search) {
      this.isFiltered = true;

      let findedValues = this.table.values.filter(x => {
        let val = x[search.row].toString();
        return val.includes(search.search);
      });

      //сохраним состояние для сортировки
      this.sorting.initialState = findedValues;
      this.tableData.values = findedValues;
    },

    clearSearch: function() {
      this.tableData.values = this.table.values;
      this.isFiltered = false;
    },

    /**
     * Добавление пустой строки в таблицу
     * @param {*} column - индекс строки после которой будет вставленна пустая строка
     */
    addColumn: function(column) {
      let blankElement = {};

      this.table.rows.forEach(row => {
        blankElement[row] = '';
      });

      let indexes = {
        table: this.tableIndex,
        column: column,
        element: blankElement,
        page: this.tableData.page,
      };

      this.addNewColumn(indexes);
    },

    /**
     * Проверка на то, редактируется ли элемент
     * @param {*} row - индекс колонки
     * @param {*} column - индекс редактируемого элемента
     */
    checkIfColumnEditable: function(row, column) {
      return this.edit.row == row && this.edit.column == column;
    },

    /**
     * Откроем форму редактирования поля
     * @param {*} row - индекс колонки
     * @param {*} column - индекс редактируемого элемента
     */
    openEdit: function(row, column, rowObj) {
      //Если фильтруем - найдём элемент в исходном массиве
      let initialRow = this.isFiltered ? this.table.values.indexOf(rowObj) : row;

      this.edit.row = row;
      this.edit.column = column;
      this.edit.value = this.table.values[initialRow][column];
      this.editStatus = true;
    },

    /**
     * Очистка объекта редактирования
     */
    clearEdit: function() {
      for (let elem in this.edit) {
        this.edit[elem] = null;
      }

      this.editStatus = false;
    },

    /**
     * Отмена редактирования
     */
    cancelEdit: function() {
      this.clearEdit();
    },

    /**
     * Сохранение отредактированного поля
     * @param {*} row - индекс колонки
     * @param {*} column - индекс редактируемого элемента
     */
    saveEdit: function(row, column, rowObj) {
      //Если фильтруем - найдём элемент в исходном массиве
      if (this.isFiltered) {
        row = this.table.values.indexOf(rowObj);
      }

      let edited = {
        table: this.tableIndex,
        row: row,
        column: column,
        newValue: this.edit.value,
      };

      /**
       * look like костыль, что бы блюр не запускался после того как выстрелил keyup.enter и скрыл инпут
       * но лучшего решения на данный момент я придумать не могу
       */

      if (this.editStatus) {
        this.saveNewValue(edited);
        this.clearEdit();
      }
    },

    /**
     * Очистка таблицы
     */
    handleCleanTable: function() {
      this.tableData.values = [];
      this.cleanTable(this.tableIndex);
    },

    /**
     * Удаление таблицы
     */
    handleDeleteTable: function() {
      this.deleteTable(this.tableIndex);
    },

    /**
     * Управление попапом копирования / восстановления данных
     */
    setPopupState: function(state) {
      this.popupState = state;
    },

    copyToTableData: function() {
      let copy = Object.assign({}, this.table);
      this.tableData = copy;
    },

    dataRestored: function() {
      this.copyToTableData();
      this.popupState = false;
    },
  },

  mounted() {
    this.copyToTableData();
  },
};
