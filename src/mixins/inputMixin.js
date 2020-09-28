export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    errorText: {
      type: String,
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    invalid() {
      return this.errorText && this.errorText.length;
    },
    activeClass() {
      return { active: this.value };
    },
  },
};
