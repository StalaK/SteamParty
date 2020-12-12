<template>
    <div>
        Shared Games
        <table>
            <tr v-for="(game, index) in sharedGames" :key="index">
                <td>
                    <img :src="game.image" />
                </td>
                <td>
                    {{ game.name }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            sharedGames: {
                Type: Array
            }
        },
    }
</script>

<style scoped>

</style>