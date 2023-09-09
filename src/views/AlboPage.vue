<template>
  <div class="container mt-4">
    <h1><router-link to="/task">Torna in dietro</router-link></h1>
    <h1>{{ comicData.safe_title }}</h1>
    <img :src="comicData.img" alt="Comic Image" class="img-fluid" />
    
    <div class="mt-4">
      <div class="row">
        <div class="col-md-3">
          <p><strong>Giorno:</strong> {{ comicData.day }}</p>
          <p><strong>Mese:</strong> {{ comicData.month }}</p>
          <p><strong>Anno:</strong> {{ comicData.year }}</p>
          <p><strong>Numero:</strong> {{ comicData.num }}</p>
        </div>
        <div class="col-md-9">
          <p><strong>Titolo:</strong> {{ comicData.safe_title }}</p>
        </div>
      </div>
    </div>
    
    <div class="mt-4">
      <button @click="fetchComic(comicData.num - 1)" class="btn btn-primary mr-2">Vignetta Precedente</button>
      <button @click="fetchComic(comicData.num + 1)" class="btn btn-primary">Vignetta Successiva</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'XKCDComic',
  data() {
    return {
      comicData: {
        safe_title: '',
        img: '',
        day: '',
        month: '',
        year: '',
        num: 100,
      },
    };
  },
  mounted() {
    this.fetchComic(100);
  },
  methods: {
    async fetchComic(num) {
      try {
        const response = await axios.get(`/xkcd/${num.toString()}/info.0.json`); 
        this.comicData = response.data;
      } catch (error) {
        console.error('Errore durante la richiesta:', error);
      }
    },
  },
};
</script>
