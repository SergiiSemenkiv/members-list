export default {
  data() {
    return {
      form: {},
      validations: {},
      validatorDefault: {
        invalid: false,
        error: '',
      },
      formError: '',
    };
  },
  computed: {
    isFormValid() {
      return !Object.values(this.validations)
        .filter((field) => field.invalid).length;
    },
  },
  created() {
    this.setDefaultValidationsState();
  },
  methods: {
    setDefaultValidationsState() {
      Object.keys(this.validations)
        .forEach((field) => {
          this.$set(this.validations, field,
            { ...this.validations[field], ...this.validatorDefault });
        });
    },
    formValidate() {
      this.formResetErrors();
      Object.keys(this.form)
        .forEach((key) => {
          const fieldValue = this.form[key];
          if (key in this.validations) {
            const fieldValidator = this.validations[key];
            const validationResult = fieldValidator.rule(fieldValue, fieldValidator.errorText);
            this.$set(this.validations, key, { ...fieldValidator, ...validationResult });
          }
        });
    },
    formResetErrors() {
      this.formError = '';
      this.setDefaultValidationsState();
    },
  },
};
