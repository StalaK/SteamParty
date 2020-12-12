<template>
    <div>
        <button v-on:click="searchGames">Find us a game!</button>
    </div>
</template>

<script>
    export default {
        props: {
            party: {
                Type: Array
            }
        },
        data() {
            return {
                gameIdList: [],
                gameList: []
            }
        },
        methods: {
            searchGames: async function() {
                console.log(process.env.VUE_APP_Steam_API_Key)
                this.$emit('load-state-changed', { loading: true, loaded: false });

                for (let player of this.party) {
                    let request = new Request(
                        `${process.env.VUE_APP_Steam_API_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.VUE_APP_Steam_API_Key}&steamid=${player.steamId}&format=json `,
                        {
                            method: "GET",
                            mode: "cors",
                            cache: "default"
                        }
                    )

                    let response = await fetch(request);
                    let data = await response.json();
                    this.getSharedGames(data.response.games)
                }

                await this.getGameDetails();

                this.$emit('load-state-changed', { loading: false, loaded: true });
                this.$emit('games-searched', this.gameList)
            },
            getSharedGames: function(games) {      
                if (this.gameIdList.length === 0) {
                    this.gameIdList = games.map(o => ({appid: o.appid}));
                    return;
                }

                let sharedGames = [];

                for(let game of games) {
                    let existingGame = this.gameIdList.find(g => g.appid === game['appid']);

                    if (existingGame) {
                        sharedGames.push(game['appid']);
                    }
                }

                this.gameIdList = sharedGames;
            },
            getGameDetails: async function() {
                for(let gameId of this.gameIdList) {
                    let request = new Request(
                        `${process.env.VUE_APP_Steam_Store_URL}/api/appdetails/?appids=${gameId}`,
                        {
                            method: "GET",
                            mode: "cors",
                            cache: "default"
                        }
                    )

                    let response = await fetch(request);
                    let data = await response.json();

                    if (data[gameId].success) {
                        let gameData = data[gameId].data;

                        try
                        {
                            let isMultiplayer = data[gameId].data.categories.find(c => c.id === 1);
                            
                            if (isMultiplayer) {
                                this.gameList.push({ name: gameData.name, image: gameData.header_image })
                            }
                        }
                        catch (error) {
                            console.error(`Error handling record: ${gameData.name}`)
                        }
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>