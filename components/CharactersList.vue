<template>
    <div>
        <h1>Disney characters list</h1>
        <div v-if="isGridView" class="charactersContainerGrid">
            <character-grid-element v-for="character in filteredCharacters" :key="character.id" :character="character" />
        </div>
        <div v-else class="charactersContainerList">
            <character-list-element v-for="character in filteredCharacters" :key="character.id" :character="character"/>
        </div>
        <loading v-if="isCharactersLoading" />
        <div class="searchContainer">
            <div class="iconsContainer">
                <img 
                    @click="isGridView ? null : setViewType(true)"
                    class="viewTypeIcon" 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvjr6xPKFhmFp6VaWN3ZBC14WFaCYR2hqOpxorQac&s" 
                />
                <img 
                    @click="isGridView ? setViewType(false) : null"
                    class="viewTypeIcon" 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQng5cxILySCffws6qeF_iHAmbUevFlYlw_LBJUN80&s" 
                />
            </div>
            <select @change="changeCharactersPerPage">
                    <option selected disabled>Items per page...</option>
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                </select>
            <input 
                placeholder="Search"
                @input="searchInput"
            />
        </div>
        <div class="pageWrapper">
            <div 
                v-for="num in totalPages" 
                @click="pageClick(num)"
                :class="['page', {
                    'currentPage': page === num
                }]"
            >
                {{num}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

export default defineComponent({
    data() {
        return {
            isGridView: true,
        }
    },
    computed: {
        ...mapGetters({
            filteredCharacters: 'characters/getCharactersByPage',
        }),
        ...mapState({
            isCharactersLoading: (state: any) => state.characters.loading,
            page: (state: any) => state.characters.page,
            totalPages: (state: any) => state.characters.totalPages
        })
    },
    methods: {
        ...mapActions({
            fetchCharacters: 'characters/fetchCharacters',
            addAction: 'userActions/addAction',
            searchCharacters: 'characters/searchInput' ,
            setCharactersPerPage: 'characters/changeCharactersPerPage'
        }),
        ...mapMutations({
            setPage: 'characters/setPage',
        }),
        setViewType(isGrid: boolean) {
            this.isGridView = isGrid
            this.addAction('Set view type ' + (isGrid? 'Grid' : 'List'))
        },
        searchInput(event: Event) {
            this.searchCharacters((event.target as HTMLInputElement).value)
            this.addAction('Search ' + (event.target as HTMLInputElement).value)
        },
        pageClick(page: number) {
            this.setPage(page)
            this.addAction('Changed page to ' + page)
        },
        changeCharactersPerPage(event: Event) {
            this.addAction('Changed characters per page to '+ (event.target as HTMLSelectElement).value)
            this.setCharactersPerPage((event.target as HTMLSelectElement).value)
        }
    },
    mounted() {
        this.fetchCharacters()
        this.addAction('enter the main page')
    }
})
</script>

<style scoped lang="scss">
.searchContainer {
    display: flex;
    position: fixed;
    right: 0;  
    top: 0;
    padding: 15px;
    align-items: center;

    @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
        align-items: flex-end;
    }

    .iconsContainer{
        display: flex;
    }

    input {
    width: 80%;
    padding: 5px;
    }

    select {
        margin: 5px;
        padding: 5px;
    }
}

.charactersContainerGrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;

    @media screen and (max-width: 768px) {
        justify-content: center;
    }
}

.viewTypeIcon {
    width: 20px;
    height: 20px;
    margin: 5px;

    &:hover {
        transform: scale(1.2);
        transition: 0.3s;
    }
}

.pageWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .currentPage {
    border: 2px solid black
    }
    .page {
        padding: 5px;
        font-weight: bold;
        border-radius: 3px;
        font-size: large;

        &:hover {
            background: rgb(201, 201, 201);
        }
    }
}

</style>