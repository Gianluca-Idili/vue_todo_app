<template>
  <div class="container mt-4">
    <h1 class="mb-4">Task Completati</h1>
    <router-link to="/task" class="mb-4">Vai a lista</router-link>

    <!-- Campo di ricerca -->
    <div class="form-group col-3">
      <label for="searchText">Cerca per testo:</label>
      <div class="input-group">
        <input type="text" id="searchText" v-model="searchText" @input="filterByText" class="form-control" />
        <div class="input-group-append">
          <button @click="clearSearch" class="btn btn-secondary">Cancella</button>
        </div>
      </div>
    </div>

    <!-- Filtro per i creatori dei task archiviati -->
    <div class="form-group col-3">
      <label for="filterCreator">Filtra per creatore:</label>
      <select id="filterCreator" v-model="selectedCreator" @change="filterByCreator" class="form-control">
        <option value="tutti">Tutti</option>
        <option v-for="creator in creators" :key="creator">{{ creator }}</option>
      </select>
    </div>

    <div class="row">
      <div class="col-md-4" v-for="(archivedTask, index) in filteredArchivedList" :key="index">
        <div class="card mb-3">
          <div class="card-body">
            <p class="card-text">{{ archivedTask.name }}</p>
            <small class="text-muted">{{ archivedTask.username }}</small>
          </div>
          <div class="card-footer">
            <button @click="restoreTask(archivedTask)" class="btn btn-primary btn-block">Annulla Archiviazione</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      searchText: '', 
      filteredArchivedList: [], 
      creators: [], 
    };
  },
  computed: {
    ...mapState(['archivedList']), 
  },
  methods: {
    ...mapMutations(['restoreTask']), 

     // Funzione per filtrare le task archiviate in base al testo inserito
  filterByText() {
    const searchQuery = this.searchText.toLowerCase();
    this.filteredArchivedList = this.archivedList.filter((archivedTask) => {
      const taskName = archivedTask.name.toLowerCase();
      const creatorName = archivedTask.username.toLowerCase();
      return taskName.includes(searchQuery) || creatorName.includes(searchQuery);
    });
  },

  // Funzione per cancellare il testo di ricerca
  clearSearch() {
    this.searchText = '';
    this.filteredArchivedList = this.archivedList;
  },

    filterByCreator() {
      // Filtra gli elementi archiviati in base al creatore selezionato
      if (this.selectedCreator === 'tutti') {
        // Se "Tutti" è selezionato, mostra tutti gli elementi archiviati
        this.filteredArchivedList = this.archivedList;
      } else {
        // Altrimenti, filtra per creatore
        this.filteredArchivedList = this.archivedList.filter(task => task.username === this.selectedCreator);
      }
    },
  },

  created() {
    // Inizializza la lista dei creatori dei task archiviati
    this.creators = [...new Set(this.archivedList.map(task => task.username))];
    // Inizializza la lista filtrata con tutti gli elementi archiviati
    this.filteredArchivedList = this.archivedList;
  },
};
</script>
