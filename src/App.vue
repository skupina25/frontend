<template>
  <div id="app">
    <nav id='navbar'>
      <router-link to="/">Home</router-link>
      <router-link to="/upload">Upload</router-link>
      <router-link to="/all-images">All images</router-link>
      <router-link to="/statistics">Statistics</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  line-height: 60px;
}

router-link {
  color: black;
  background-color: antiquewhite;
}

router-link:visited {
  color: black;
  text-decoration: none;
}
</style>
