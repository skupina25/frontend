<template>
  <div>
    <ul id="allStatisticsList">
      <li v-for="stx in allStatistics" :key="stx.id">
        {{stx}}
        <button v-on:click="generatePdf(stx)">Create PDF from this statistics</button>
        <button v-on:click="deleteStatistics(stx.id)"  id="deleteBtn">Delete Statistics</button>
      </li>
    </ul>
    <button v-on:click="getTasks(5)">Generate new statistics</button>
    <div v-if="newStatistics">
      {{newStatistics}}
      <button v-on:click="generatePdf(newStatistics)">Create PDF from this statistics</button>
      <button v-on:click="deleteStatistics(newStatistics.id)"  id="deleteBtn">Delete Statistics</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StatisticsByUser',
  data() {
    return {
      allStatistics: [],
      newStatistics: null
    }
  },
  created() {
    let url = 'http://34.120.64.253/v1/statistics';
    axios
      .get(url)
      .then(response => {
        this.allStatistics = response.data
      });
  },
  methods: {
    generatePdf(statistic) {
      let url = 'http://35.234.64.16:8085/api/v1/pdfStatistic';
      axios
        .post(url, statistic,  {responseType: 'arraybuffer'})
        .then(response => {
          let newBlob = new Blob([response.data], {type: 'application/pdf'})
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob)
            return
          }
          const data = window.URL.createObjectURL(newBlob)
          let link = document.createElement('a');
          let filename = 'statistic' + statistic.id + 'ForUser' + statistic.userId;
          link.href = data
          link.download = filename + '.pdf'
          link.click()
          setTimeout(function () {
            window.URL.revokeObjectURL(data)
          }, 100)
        });
    },
    getAllStatistics() {
      let url = 'http://34.120.64.253/v1/statistics';
      axios
        .get(url)
        .then(response => {
          this.allStatistics = response.data
        });
    },
    generateStatistics(id, tasks) {
      let url = 'http://34.120.64.253/v1/statistics/user/' + id;
      axios
        .post(url, tasks)
        .then(response => {
          this.newStatistics = response.data
        });
    },
    deleteStatistics(id)  {
      let url = 'http://34.120.64.253/v1/statistics/delete/' + id;
      axios
        .delete(url)
        .then(() => this.getAllStatistics());
    },
    getTasks(boardId) {
      let url = 'http://34.120.64.253/api/v1/board/' + boardId + '/task';
      let todotasks = 0;
      let inprogresstasks = 0;
      let completedtasks = 0;

      let userId = 42;

      axios
        .get(url)
        .then(response => {
          response.data.forEach(task => {
            if (task.lifecycleStep == 'TO DO') {
              todotasks += 1;
            }
            if (task.lifecycleStep == 'IN PROGRESS') {
              inprogresstasks += 1;
            }
            if (task.lifecycleStep == 'DONE') {
              completedtasks += 1;
            }
          });
          this.generateStatistics(userId, {
            numOfCompleted: completedtasks,
            numOfInProgress: inprogresstasks,
            numOfToDo: todotasks
          })
        });
    }
  }
}
</script>

<style>
#deleteBtn {
  background: red;
}
</style>