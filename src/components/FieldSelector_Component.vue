<template>
    <div class="field">
        <Field_Component />
        <div  class="fieldgrid">
            <div v-for="(availablePosition, index) in availablePositions" :key="index" class="fielditem">
                <Player_Component @toggle="changeSelected(index)" :isSelected="selectedPlayer === index" :notAvailable="availablePosition"/>
            </div>
        </div>
    </div>  
</template>


<script setup>
import { ref } from 'vue';
import Field_Component from '@/components/Field_Component.vue';
import Player_Component from '@/components/Player_Component.vue';

const availablePositions = ref([true, true, false, false]);
const selectedPlayer = ref(null);

function changeSelected(index) {
    if (selectedPlayer.value === index) {
        selectedPlayer.value = null;
    } else {
        selectedPlayer.value = index;
    }
}
</script>


<style scoped>
.fieldgrid{
    display: grid;
    width: 198px;
    height: 194px;
    position: absolute;
    left: 50%;
    top: 50%;
    grid-template-rows: repeat(2, minmax(0, 1fr));
    grid-template-columns: repeat(2, minmax(0, 1fr));
    transform: translate(-50%, -50%);
}
.field{
    position: relative;
    display: flex;
    justify-content: center;
}

.fielditem{
    place-self: center;
}

.fielditem:nth-child(odd) {
    transform: scaleX(-1);
}

</style>
