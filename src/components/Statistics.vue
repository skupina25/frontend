<template>
  <div>
    <ul id="allStatisticsList">
      <li v-for="stx in allStatistics" :key="stx.id">
        {{stx}}
        <button v-on:click="generatePdf(stx)">Create PDF from this statistics</button>
      </li>
    </ul>
    <button v-on:click="getTasks(1)">Generate new statistics</button>
    <div v-if="newStatistics">
      {{newStatistics}}
      <button v-on:click="generatePdf(newStatistics)">Create PDF from this statistics</button>
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
    let url = 'http://localhost:8082/v1/statistics';
    axios
      .get(url)
      .then(response => {
        this.allStatistics = response.data
      });
  },
  methods: {
    generatePdf(statistic) {
      let url = 'http://localhost:8083/v1/pdf';
      return axios
        .post(url, statistic)
        .then(response => {
          return response.data
        });
    },
    generateStatistics(id, tasks) {
      let url = 'http://localhost:8082/v1/statistics/user/' + id;
      axios
        .post(url, tasks)
        .then(response => {
          this.newStatistics = response.data
        });
    },
    getTasks(boardId) {
      let url = 'http://localhost:8081/api/v1/board/' + boardId + '/tasks';
      let todotasks = 0;
      let inprogresstasks = 0;
      let completedtasks = 0;

      let userId = 42;

      axios
        .get(url)
        .then(response => {
          response.data.forEach(task => {
            if (task.lifecycleStep == 'todo') {
              todotasks += 1;
            }
            if (task.lifecycleStep == 'inprogress') {
              inprogresstasks += 1;
            }
            if (task.lifecycleStep == 'completed') {
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

</style>