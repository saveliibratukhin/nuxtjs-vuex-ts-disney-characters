<template>
    <div @click="characterCardClick" class="characterContainer">
        <img :src="character.imageUrl" class="characterImg"/>
        <div class="dataContainer">
            <b>{{character.name}}</b>
            {{character.refers}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {ICharacter} from '../types/CharacterType.interface'


export default defineComponent({
    props: {
        character: {
            type: Object as PropType<ICharacter>,
            required: true
        },
    },
    methods: {
        characterCardClick() {
            this.$router.push(`${this.character.id}`)
        }
    }
})
</script>

<style scoped lang="scss">
.characterContainer {
    padding: 5px;
    border: 1px solid black;
    margin: 15px;
    border-radius: 15px;
    display: flex;
    // flex-direction: row;
    align-items: center;
    background: white;

    &:hover {
        background-color: rgb(201, 201, 201);
        transform: scale(1.01);
        transition: 0.3s;
    }

    .characterImg {
    width: 60px;
    height: 60px;
    object-fit: contain;
    }

    .dataContainer {
        display: flex;
        flex-direction: column;
        margin-inline: 15px;
    }
}
</style>