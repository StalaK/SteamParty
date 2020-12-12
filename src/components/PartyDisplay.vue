<template>
    <div>
        <div class="party-display" v-show="party.length > 0">
            <span class="title"><h3>Party</h3></span>
            <span class="member-display" v-for="(member, index) in party" :key="index">
                {{ member.username }}
            </span>
        
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            party: {
                Type: Array,
            }
        }
    }
</script>

<style scoped>
    .party-display {
        border: 1px solid white;
    }

    .title {
        display: inline;
        margin-left: 10px;
    }

    .member-display {
        display: block;
        margin: 10px;
    }
</style>