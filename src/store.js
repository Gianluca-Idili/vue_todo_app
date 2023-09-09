import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskList: [],
    archivedList: [],
    username: '',
  },
  mutations: {
    addTask(state, task) {
      state.taskList.push(task);
    },
    
    archiveTask(state, task) {
      state.archivedList.push(task);
      const index = state.taskList.indexOf(task);
      if (index > -1) {
        state.taskList.splice(index, 1);
      }
    },
    
    restoreTask(state, task) {
      state.taskList.push(task);
      const index = state.archivedList.indexOf(task);
      if (index > -1) {
        state.archivedList.splice(index, 1);
      }
    },
    setUsername(state, username) { 
      state.username = username;
    },

    resetTaskList(state) {
      state.taskList = [];
    },

  },
 actions: {
  initializeState({ commit }) {
    const storedTaskList = localStorage.getItem('taskList');
    if (storedTaskList) {
      const taskList = JSON.parse(storedTaskList);
      taskList.forEach(task => commit('addTask', task));
    }

    const storedArchivedList = localStorage.getItem('archivedList');
    if (storedArchivedList) {
      const archivedList = JSON.parse(storedArchivedList);
      archivedList.forEach(task => commit('archiveTask', task));
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      commit('setUsername', storedUsername);
    }
  },
},

});
