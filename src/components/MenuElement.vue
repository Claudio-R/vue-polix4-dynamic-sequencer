<template>
    <div @click="$emit('selectionEvent', element)"
    > {{ element }} 
    </div>
</template>

<script>
export default {
    name: 'MenuElement',
    props: ['element'],
}
</script>