<template>
    <div @click="characterCardClick" class="characterContainer">
        <h3>{{character.name}}</h3>
        <img :src="character.imageUrl" class="characterImg"/>
        {{character.refers}}
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
    padding: 15px;
    border: 1px solid black;
    margin: 15px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    background: white;

    &:hover {
        background-color: rgb(201, 201, 201);
        transform: scale(1.2);
        transition: 0.3s;
    }

    .characterImg {
        object-fit:fill;
    }
}
</style>