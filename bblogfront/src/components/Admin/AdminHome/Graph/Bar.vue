<template>
    <Bar :chart-options="chartOptions" :chart-data="chartData" />
</template>
<script setup lang="ts">
    import { Bar } from "vue-chartjs";
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
    const chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: "Count",
                backgroundColor: "#42adf5",
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };
</script>
<style lang="sass"></style>
