<template>
  <div>
    <div class="inputArea">
      <span>
        <label for="steam-username">Add a member to your party</label>
        <input id="steam-username" placeholder="Enter Steam username" v-model="usernameField" />
        <label for="will-buy">Open to buying a game?</label>
        <input id="will-buy" type="checkbox" v-model="willBuy" />
        <button v-on:click="validateUser()">Add to the party</button>
        
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NameSearch',
  data() {
    return {
      usernameField: '',
      willBuy: false,
      party: []
    }
  },
  methods: {
    validateUser: async function() {
      try
      {
        let request = new Request(
          `${process.env.VUE_APP_Steam_API_URL}/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.VUE_APP_Steam_API_Key}&vanityurl=${this.usernameField}`,
          {
            method: "GET",
            mode: "cors",
            cache: "default"
          }
        )

        let response = await fetch(request);
        let data = await response.json();

        if (data.response.success === 1) {
          this.party.push({ 
            username: this.usernameField,
            steamId: data.response.steamid,
            willBuy: this.willBuy
          });

          this.usernameField = '';
          this.willBuy = false;
        }

        this.$emit('member-added', this.party);

      } catch (e) {
        console.error("Error connecting to the Steam API: " + e);
      }
    },
  }
}
</script>

<style scoped>

</style>
