<template>
<div>

  <ul id="allFilesList">
    <li v-for="file in allFiles" :key="file.id">
      {{ file.title }} 
      <button v-on:click="detectFromImg(file.id)">Detect from image</button>
      <button v-on:click="deleteImg(file.id)" id="deleteBtn">Delete image</button>
    </li>
  </ul>
  <ul id="detectionLabelsList">
    <li v-for="label in detectionLabels" :key="label.name">
      {{label}}
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AllImages',
  data() {
    return {
      allFiles: [],
      detectionLabels: []
    }
  },
  created() {
    let url = 'http://34.120.64.253/v1/files';
      axios
        .get(url)
        .then(response => {
          this.allFiles = response.data
        });
  },
  methods: {
    getAllFiles() {
      let url = 'http://34.120.64.253/v1/files';
      axios
        .get(url)
        .then(response => {
          this.allFiles = response.data
        });
    },
    detectFromImg(id) {
      let url = 'http://34.120.64.253/v1/files/detect/' + id;
      axios
        .get(url)
        .then(response => {
          this.detectionLabels = response.data
        });
    },
    deleteImg(id) {
      let url = 'http://34.120.64.253/v1/files/' + id;
      axios
        .delete(url)
        .then(() => this.getAllFiles())
    }
  },
  
}
</script>

<style>
li {
  padding: 5px;
}
ul {
  list-style: none;
}
button {
  cursor: pointer;
}
#deleteBtn {
  background: red;
}
</style>