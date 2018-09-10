import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'add-table',

  data: () => {
    return {
      fields: null,
      cols: 1,
      meta: 'custom-th, td-even, td-odd',
    };
  },

  methods: {
    ...mapMutations({
      addEmptyTable: 'addEmptyTable',
    }),

    ...mapActions({
      addNewTable: 'addNewTable',
    }),

    handleAddTable: function() {
      if (this.fields) {
        let options = {
          fields: this.fields,
          cols: this.cols,
          meta: this.meta,
        };

        this.addEmptyTable(options);
      } else {
        this.addNewTable();
      }

      this.$emit('created');
    },
  },
};
