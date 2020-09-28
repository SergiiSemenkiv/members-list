<template>
  <div v-if="member">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <h3 class="header">Member Profile</h3>
        <div class="card">
          <template v-if="member">
            <div class="card-content">
              <ul class="collection with-header">
                <li class="collection-header"><h4>{{ member | showFullName }}</h4></li>
                <li class="collection-item">
                  <PersonalInfo title="Hired" :value="member.hired_at"/>
                </li>
                <li class="collection-item">
                  <PersonalInfo title="Company Position" :value="member.position"/>
                </li>
                <li class="collection-item">
                  <PersonalInfo title="Department" :value="member.department"/>
                </li>
                <li class="collection-item" v-if="memberSupervisor">
                  <PersonalInfo title="Supervisor">
                    <router-link
                        :to="{ name: 'memberProfile', params: { id: memberSupervisor.id }}">
                      {{ memberSupervisor | showFullName }}
                    </router-link>
                  </PersonalInfo>
                </li>
                <li class="collection-item" v-if="memberSubordinates.length">
                  <PersonalInfo title="Subordinates">
                    <router-link
                        v-for="subordinate in memberSubordinates"
                        :key="subordinate.id"
                        :to="{ name: 'memberProfile', params: { id: subordinate.id }}">
                      {{ subordinate | showFullName }};
                    </router-link>
                  </PersonalInfo>
                </li>
              </ul>
            </div>
            <div class="card-action">
              <router-link  class="btn waves-effect waves-light red lighten-2"
                            :to="{ name: 'home', params: { id: member.id }}">List</router-link>
              <router-link  class="btn waves-effect waves-light right"
                            v-if="isEditingEnabled"
                            :to="{ name: 'memberEdit', params: { id: member.id }}">
                Edit
              </router-link>
            </div>
          </template>
          <template v-else>
            Such user does not exist
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isGrantedForEditing } from '@/auth/guard';
import PersonalInfo from '@/components/Personal/PersonalInfo.vue';

export default {
  name: 'MemberProfile',
  components: {
    PersonalInfo,
  },
  data() {
    return {
      member: null,
    };
  },
  computed: {
    ...mapGetters(['getIndexedMembers']),
    isEditingEnabled() {
      const { id } = this.$route.params;
      return isGrantedForEditing(id);
    },
    memberSupervisor() {
      if (!this.member.supervisor) return '';
      const supervisorId = this.member.supervisor;
      return this.getIndexedMembers[supervisorId];
    },
    memberSubordinates() {
      return this.member.subordinates.reduce((acc, subordinateId) => {
        const subordinate = this.getIndexedMembers[subordinateId];
        if (subordinate) {
          acc.push(subordinate);
        }
        return acc;
      }, []);
    },
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    ...mapActions({
      fetchMember: 'fetchMember',
    }),
    fetchData() {
      this.id = Number(this.$route.params.id);
      this.fetchMember(this.id)
        .then((member) => {
          this.member = member;
        });
    },
  },
};
</script>
