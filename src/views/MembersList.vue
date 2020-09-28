<template>
  <div class="home">
    <ListComponent
        title="Member List"
        :columns="membersListColumns"
        :items="getMembersListData"
        @list-row-clicked="showMemberProfile"
    ></ListComponent>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListComponent from '@/components/List/ListComponent.vue';

export default {
  name: 'MembersList',
  components: {
    ListComponent,
  },
  data() {
    return {
      membersListColumns: [
        {
          title: 'First Name',
          key: 'firstname',
        },
        {
          title: 'Last Name',
          key: 'lastname',
        },
        {
          title: 'Hired',
          key: 'hired_at',
        },
        {
          title: 'Company Position',
          key: 'position',
        },
        {
          title: 'Department',
          key: 'department',
        },
        {
          title: 'Supervisor',
          key: 'supervisor',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      members: 'getIndexedMembers',
    }),
    getMembersListData() {
      const membersSafeDeepClone = JSON.parse(JSON.stringify(this.members));
      return Object.values(membersSafeDeepClone).map((member) => {
        const supervisorId = member.supervisor;
        const supervisor = this.members[supervisorId];
        // eslint-disable-next-line no-param-reassign
        member.supervisor = supervisor ? this.$options.filters.showFullName(supervisor) : '';
        return member;
      });
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      fetchData: 'fetchMembers',
    }),
    showMemberProfile(member) {
      const { id } = member;
      this.$router.push({
        name: 'memberProfile',
        params: { id },
      });
    },
  },
};
</script>
