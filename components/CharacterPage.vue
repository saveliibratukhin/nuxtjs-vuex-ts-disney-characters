<template>
    <div>
        <h1>{{character.name}}</h1>
        <img :src="character.imageUrl" /> <br>
        <b>films:</b> {{character.films?.join(', ')}}<br>
        <b>shortFilms:</b> {{character.shortFilms?.join(', ')}}<br>
        <b>tvShows:</b> {{character.tvShows?.join(', ')}}<br>
        <b>videoGames:</b> {{character.videoGames?.join(', ')}}<br>
        <b>parkAttractions:</b> {{character.parkAttractions?.join(', ')}}<br>
        <b>allies:</b> {{character.allies?.join(', ')}}<br>
        <b>enemies:</b> {{character.enemies?.join(', ')}}<br>
    </div>
</template>

<script lang="ts">
import { ICharacterFull } from '~/types/CharacterType.interface';
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            character: {} as ICharacterFull,
        }
    },
    mounted() {
        this.character = this.getCharacter(Number.parseInt(this.id))
        this.addAction('Enter on page of character id ' + this.id)
    },
    computed: {
        ...mapGetters({
            getCharacter: 'characters/characterAllInfo'
        })
    },
    methods: {
        ...mapActions({
            addAction: 'userActions/addAction'
        })
    }
}
</script>

<style lang="scss" scoped>
h1 {
    text-align: center;
}
</style>