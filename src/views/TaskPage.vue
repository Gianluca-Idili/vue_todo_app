<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-6">
          <h2>Benvenuto {{ username }}</h2>
          <div class="form-group">
            <label for="newName">Modifica il tuo nome:</label>
            <input type="text" class="form-control" id="newName" v-model="newName" />
          </div>
          <button @click="changeName" class="btn btn-primary ">Cambia Nome</button>
        </div>
        <div class="col-md-6 mt-4">
          <h2>Aggiunggi il tuo task</h2>
          <form>
            <div class="input-group mt-4 mb-3">
              <input v-model="newTask" @keyup.enter="addTask" placeholder="Inserisci un task..." class="form-control" />
              <div class="input-group-append">
                <button @click="addTask" class="btn btn-primary">Aggiungi Task</button>
              </div>
            </div>
          </form>
        </div>
      </div>

     <div class="container text-center">
      <button @click="resetTaskList" class="btn btn-danger mx-2">Resetta TaskList</button>
      <button @click="navigateToAlbo" class="btn btn-danger mx-2">Albo</button>
      <button @click="navigateToConfirmed" class="btn btn-danger mx-2">Completati</button>
     </div>
      

      <ul class="list-group mt-4">
        <li v-for="(task, index) in taskList" :key="index" class="list-group-item">
          <div class="card">
            <div class="card-body">
              <p class="card-text">{{ task.name }}</p>
              <small>{{ task.username }}</small>
            </div>
            <div>
              <button @click="renameTask(index)" class="btn btn-warning">Rinomina</button>
              <button @click="deleteTask(index)" class="btn btn-danger">Cancella</button>
              <button @click="sendArchive(task, index)" class="btn btn-success">Conferma e archivia</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      newTask: '',
      newName: '',
    };
  },
  computed: {
    ...mapState(['taskList', 'username']), 
  },
  methods: {
    ...mapMutations(['archiveTask', 'addTask', 'initializeState', 'setUsername', 'resetTaskList']), // Importa le mutazioni da Vuex

    changeName() {
      if (this.newName.trim() !== '') {
        // Chiama la mutazione per impostare il nuovo nome nel Vuex store
        this.setUsername(this.newName); 
        localStorage.setItem('username', this.newName); 
        this.newName = ''; 
      }
    },

    addTask() {
      if (this.newTask.trim() !== '') {
        // Aggiungi il nome del creatore
        const task = { name: this.newTask, completed: false, username: this.username }; 
        // Chiama la mutazione per aggiungere la task
        this.$store.commit('addTask', task); 
        this.newTask = '';
      }
    },
    
    renameTask(index) {
      const nuovoNome = prompt('Inserisci il nuovo nome per il compito');
      if (nuovoNome) {
        this.$store.state.taskList[index].name = nuovoNome;
      }
    },

    deleteTask(index) {
      this.$store.state.taskList.splice(index, 1);
    },

    sendArchive(task, index) {
      this.deleteTask(index); 
      this.$store.commit('archiveTask', task); 
    },

    resetTaskList() {
      this.$store.commit('resetTaskList');
      localStorage.setItem('taskList', JSON.stringify([]));
    },

    navigateToAlbo() {
    this.$router.push('/albo');
    },

    navigateToConfirmed() {
    this.$router.push('/archiviati');
  }
  },
  logout() {
      // Rimuovi il nome utente dalla memorizzazione persistente
      localStorage.removeItem('username');
      // Esegui il logout chiamando la mutazione per azzerare lo stato
      this.$store.commit('initializeState');
      // Reindirizza l'utente alla pagina di login
      this.$router.push('/');
    },
  
    created() {
  // Controlla se il nome utente è già stato impostato
  const storedUsername = localStorage.getItem('username');
  if (storedUsername && storedUsername !== this.username) {
    this.setUsername(storedUsername);
  }
  // Azzerare la taskList all'avvio del programma
  this.$store.commit('initializeState');
},
};
</script>