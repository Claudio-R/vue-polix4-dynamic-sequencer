<template>
    <div class="selector">Selected key: {{ selectedKey }}
            <MenuElement 
                v-for="(note,index) in keys"
                class="menu-element"
                :key="index"
                :element="note"
                @selectionEvent="selectKey">
            </MenuElement>
        </div>
</template>

<script>
import MenuElement from '@/components/MenuElement.vue'

export default {
    name: 'KeySelector',

    components: {
        MenuElement
    },

    props: ['selectedKey'],

    data() {
        return {
            keys: ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'],
        }
    },

    methods: {
        selectKey(note) {
            this.$emit('keySelectedEvent', note)
        }
    }
}
</script>
