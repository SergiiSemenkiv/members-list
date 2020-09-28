<template>
  <nav v-if="loggedIn">
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="right">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <a href="/" @click.prevent="logoutHandler">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { authLogOut } from '@/auth';
import { isAuthenticated } from '@/auth/guard';

export default {
  name: 'Navbar',
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    checkLoginStatus() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.loggedIn = isAuthenticated();
    },
    logoutHandler() {
      authLogOut();
      this.$router.push({ name: 'login' });
    },
  },
  watch: {
    $route: 'checkLoginStatus',
  },
};
</script>
