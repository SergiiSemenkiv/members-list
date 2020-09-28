<template>
  <div id="app">
    <div class="container-fluid">
      <Navbar />
      <div class="row">
        <div class="col s12">
          <div class="wrapper" style="padding: 2rem 0">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";

.form-error {
  color: red;
  padding-bottom: 1rem;
}
</style>
