<template>
  <div>
    <Header />
    <NameSearch v-on:member-added="updateParty" />
    <PartyDisplay v-bind:party="party" />
    <GameSearch 
      v-bind:party="party" 
      v-on:load-state-changed="updateLoadState" 
      v-on:games-searched="setSharedGames" />
    <Loading v-if="loadState.loading" />
    <GameDisplay 
      
      v-bind:sharedGames="sharedGames" />
  </div>
</template>

<script>
  import NameSearch from './components/NameSearch'
  import Header from './components/Header'
  import PartyDisplay from './components/PartyDisplay'
  import GameSearch from './components/GameSearch'
  import Loading from './components/Loading'
  import GameDisplay from './components/GameDisplay'

  export default {
    name: 'App',
    components: {
      Header,
      NameSearch,
      PartyDisplay,
      GameSearch,
      Loading,
      GameDisplay
    },
    data () {
      return {
        party: [],
        loadState: { loading: false, loaded: false },
        sharedGames: []
      }
    },
    methods: {
      updateParty: function(party) {
        this.party = party;
      },
      updateLoadState: function(loadState) {
        this.loadState = loadState;
      },
      setSharedGames: function(gamesList) {
        this.sharedGames = gamesList;
      }
    }
  }
</script>

<style>
  #app {
    display: flex;
    height: 100%;
    margin-left: 15%;
    margin-right: 15%;
  }
</style>
