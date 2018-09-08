import { mapMutations } from 'vuex';
import _ from 'lodash';
import TableFilter from '../TableFilter/TableFilter.vue';

export default {
  name: 'table-component',

  components: {
    TableFilter,
  },

  props: ['table'],

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
      },
    };
  },

  computed: {
    /**
     * Вернем символ сортировки для отрисовывания в заголовке
     */
    rowDirection: function() {
      return this.sorting.valuesSymbols[this.sorting.values.indexOf(this.sorting.direction)];
    },
  },

  methods: {
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

      this.tableData.values =
        this.sorting.direction === 'normal'
          ? this.table.values
          : _.orderBy(this.tableData.values, index, this.sorting.direction);
    },

    handleSearch: function(search) {
      let findedValues = this.table.values.filter(x => {
        let val = x[search.row].toString();
        return val.includes(search.search);
      });

      //TODO: возможно тут потребуется Object.assign при редактировании полей      
      this.tableData.values = findedValues;
    },

    clearSearch: function() {
      this.tableData.values = this.table.values;
    },
  },

  mounted() {
    let copy = Object.assign({}, this.table);

    this.tableData = copy;
  },
};
