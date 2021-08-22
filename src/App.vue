<template>
  <div class="pokedex">
    <div id="nav">
      <app-header/>
    </div>
    <div id="teste">
      <div class="border-inset">
        <div id="app">
          <router-view id="router-link"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './shared/components/layout/header/header.component.vue';

export default {
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
  html {
    background: #ca314a;
  }

  body {
    margin: 0;
  }

  #teste {
    padding: 20px;
  }

  .border-inset {
    border: 20px solid #f5efe9;
    border-radius: 8px;
    box-shadow: 3px 3px 0px 0 rgba(138, 132, 126, 1);
  }

  #router-link {
    background: #edf9fb;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 30rem;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 5px inset #8a847e;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  #nav {
    height: 90px
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }

</style>
