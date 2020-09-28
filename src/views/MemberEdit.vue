<template>
  <div v-if="member">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <h3 class="header">Edit Member</h3>
        <div class="card">
          <template v-if="member">
            <form @submit.prevent="editMemberHandler">
              <div class="card-content">
                <mInput label="First Name"
                        :errorText="validations.firstname.error"
                        v-model="form.firstname"/>
                <mInput label="Last Name"
                        :errorText="validations.lastname.error"
                        v-model="form.lastname"/>
                <mPicker label="Hired At"
                         :errorText="validations.hired_at.error"
                         v-model="form.hired_at"/>
                <mInput label="Position"
                        :errorText="validations.position.error"
                        v-model="form.position"/>
                <mInput label="Department"
                        :errorText="validations.department.error"
                        v-model="form.department"/>
                <mSelect
                    label="Supervisor"
                    :errorText="validations.supervisor.error"
                    v-model="form.supervisor">
                  <option v-for="member in members"
                          :value="member.id"
                          :key="member.id">
                    {{ member | showFullName }}
                  </option>
                </mSelect>
                <mSelect
                    label="Subordinates"
                    :errorText="validations.subordinates.error"
                    v-model="form.subordinates"
                    multiple
                >
                  <option v-for="member in members"
                          :value="member.id"
                          :key="member.id">
                    {{ member | showFullName }}
                  </option>
                </mSelect>
              </div>
              <div class="card-action">
                <button class="btn waves-effect waves-light red lighten-2"
                        type="button"
                        @click.prevent="showMemberProfile">
                  Cancel
                </button>
                <button class="btn waves-effect waves-light right"
                        type="submit" name="action"
                        @click.prevent="editMemberHandler">
                  Submit
                  <i class="material-icons right">send</i>
                </button>
              </div>
            </form>
          </template>
          <template v-else>
            <div class="card-content">
              Such user does not exist
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import FormMixin from '@/mixins/FormMixin';
import mInput from '@/components/Form/MaterializeInput.vue';
import mSelect from '@/components/Form/MeterializeSelect.vue';
import mPicker from '@/components/Form/MaterializePicker.vue';
import { fieldValidation, notEmpty, notFuture } from '@/Utils/formValidationRules';

export default {
  name: 'MemberEdit',
  mixins: [FormMixin],
  components: {
    mInput,
    mSelect,
    mPicker,
  },
  data() {
    return {
      member: null,
      id: null,
      form: {
        firstname: '',
        lastname: '',
        hired_at: '',
        position: '',
        department: '',
        supervisor: null,
        subordinates: [],
      },
      validations: {
        firstname: {
          rule: notEmpty,
        },
        lastname: {
          rule: notEmpty,
        },
        hired_at: {
          rule: notFuture,
        },
        position: {
          rule: notEmpty,
        },
        department: {
          rule: notEmpty,
        },
        supervisor: {
          rule: this.couldNotBeSameAsUser,
        },
        subordinates: {
          rule: this.couldNotBeSameAsUser,
        },
      },
    };
  },
  computed: {
    ...mapState(['members']),
  },
  created() {
    this.fetchData();
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.FormSelect.init(this.$refs.select);
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    ...mapActions({
      fetchMember: 'fetchMember',
      editMember: 'editMember',
    }),
    couldNotBeSameAsUser(value) {
      const invalid = (value === this.id || (Array.isArray(value) && value.includes(value)));
      return fieldValidation(invalid, 'Could not be same as current user');
    },
    setMemberFormValues() {
      Object.keys(this.form)
        .forEach((fieldKey) => {
          this.form[fieldKey] = this.member[fieldKey];
        });
    },
    fetchData() {
      this.id = Number(this.$route.params.id);
      this.fetchMember(this.id)
        .then((member) => {
          this.member = member;
          this.setMemberFormValues();
        });
    },
    showMemberProfile() {
      this.$router.push({
        name: 'memberProfile',
        params: { id: this.id },
      });
    },
    editMemberHandler() {
      this.formValidate();
      if (!this.isFormValid) return;
      const memberData = { ...this.member, ...this.form };
      this.editMember(memberData)
        .then(() => {
          // eslint-disable-next-line no-undef
          M.toast({ html: 'Member updated!!', displayLength: 1000, completeCallback: () => this.showMemberProfile() });
        });
    },
  },
};
</script>
