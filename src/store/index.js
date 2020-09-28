import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    members: [],
  },
  getters: {
    getAllMembers(state) {
      return state.members;
    },
    getIndexedMembers(state) {
      return state.members.reduce((acc, member) => {
        const { id } = member;
        acc[id] = member;
        return acc;
      }, {});
    },
  },
  mutations: {
    SET_MEMBERS(state, members) {
      state.members = members;
    },
  },
  actions: {
    fetchMembers({ commit }) {
      api.get('members', { role: 'user' })
        .then((data) => {
          commit('SET_MEMBERS', data);
        });
    },
    fetchMember({ state, dispatch }, id) {
      if (!state.members.length) {
        dispatch('fetchMembers');
      }
      return api.getById('members', id);
    },
    editMember({ commit }, member) {
      api.put('members', member).then((updatedMembers) => {
        commit('SET_MEMBERS', updatedMembers);
      });
    },
  },
  modules: {},
});
