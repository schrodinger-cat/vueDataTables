import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'table-component',

  computed: {
    ...mapGetters({
      tablesList: 'getTablesList',
    }),
  },

  methods: {
    ...mapMutations({
      setPage: 'setCurrentPage',
    }),

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
    handleSetPage: function(page, index) {
      const params = {
        page: page,
        index: index,
      };

      this.setPage(params);
    },
  },
};
