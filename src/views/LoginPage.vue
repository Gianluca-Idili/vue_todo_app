<template>
  <div class="container-fluid h-100 mt-4">
    <div class="row h-50 justify-content-center align-items-center">
      <div class="col-md-6 text-center">
        <input v-model="tempUsername" @keyup.enter="login" class="form-control" placeholder="Inserisci il tuo nome" />
      </div>
      <div class="col-md-12 text-center">
        <button @click="login" class="btn btn-primary btn-block">Entra</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      tempUsername: '',
    };
  },
  methods: {
    ...mapMutations(['setUsername']),
    login() {
  if (this.tempUsername.trim() !== '') {
    // Salva il nome utente nella memorizzazione persistente
    localStorage.setItem('username', this.tempUsername);
    this.setUsername(this.tempUsername);
    // Reindirizza direttamente alla pagina delle attività
    this.$router.push('/task');
  }
},
  },
};
</script>
