export default {
  name: 'popup',

  methods: {
    handleClosePopup: function() {
      this.$emit('close');
    },
  },
};
