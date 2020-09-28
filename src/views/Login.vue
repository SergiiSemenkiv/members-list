<template>
  <div class="row">
    <div class="col s12 l6 offset-l3">
      <div class="card hoverable">
        <div class="card-content">
          <h5 class="card-title">Login</h5>
          <form @submit.prevent="loginHandler">
            <mInput v-model="form.login"
                    :errorText="validations.login.error"
                    label="Login"/>
            <mInput v-model="form.password"
                    :errorText="validations.password.error"
                    inputType="password" label="Password"/>
            <div class="form-error">{{ formError }}</div>
            <button
                class="btn waves-effect waves-light btn-large" type="submit">
              Submit
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authLogin } from '@/auth';
import { notEmpty } from '@/Utils/formValidationRules';
import FormMixin from '@/mixins/FormMixin';
import mInput from '@/components/Form/MaterializeInput.vue';

export default {
  name: 'login',
  mixins: [FormMixin],
  components: {
    mInput,
  },
  data() {
    return {
      form: {
        login: '',
        password: '',
      },
      validations: {
        login: {
          rule: notEmpty,
        },
        password: {
          rule: notEmpty,
        },
      },
    };
  },
  methods: {
    loginHandler() {
      this.formValidate();
      if (!this.isFormValid) return;
      const { login, password } = this.form;
      authLogin(login, password)
        .then(() => {
          this.$router.push({ name: 'home' });
        })
        .catch((err) => {
          this.formError = err.message;
        });
    },
  },
};
</script>
