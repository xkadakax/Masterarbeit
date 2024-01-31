<script>
import MoodChart from "@/components/MoodChart.vue";
import MoodCounter from "@/components/MoodCounter.vue";

export default {
    components: {
        MoodChart,
        MoodCounter
    },
};
</script>
  
<template>
    <main class="main-container flex-col">
        <MoodChart />
        <MoodCounter />
    </main>
</template>


