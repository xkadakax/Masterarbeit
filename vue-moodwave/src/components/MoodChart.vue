<template>
  <div class="panel w-full m-4 md:w-8/12">
    <h1>Stimmungsgrafik</h1>
    <Bar 
    v-if="chartData" 
    :data="chartData" 
    :options="chartOptions" />
  </div>
</template>
  
<script>
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebase.js';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#30AB86',
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#30AB86',
              callback: function (value, index, values) {
                switch (value) {
                  case 5: return 'Super';
                  case 4: return 'Gut';
                  case 3: return 'Ok';
                  case 2: return 'Schlecht';
                  case 1: return 'Lausig';
                  default: return '';
                }
              }
            }
          }
        }
      },
      moodsData: {}
    }
  },

  created() {
    const moodsRef = ref(db, 'moods');
    onValue(moodsRef, (snapshot) => {
      const data = snapshot.val();
      this.formatChartData(data);
    });
  },

  methods: {
    formatChartData(data) {
      const labels = Object.keys(data);
      const moodValues = Object.values(data).map(entry => this.convertMoodToNumber(entry.mood));
      const backgroundColors = moodValues.map(mood => this.getMoodColor(mood));

      this.chartData = {
        labels: labels,
        datasets: [{
          label: 'Stimmung',
          data: moodValues,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      };
    },

    convertMoodToNumber(mood) {
      const moodMap = {
        'Super': 5,
        'Gut': 4,
        'Ok': 3,
        'Schlecht': 2,
        'Lausig': 1,
      };
      return moodMap[mood] || 0;
    },

    getMoodColor(moodNumber) {
      switch (moodNumber) {
        case 5: return '#30AB86';
        case 4: return '#3EACB2';
        case 3: return '#2E7EB8';
        case 2: return '#4341A8';
        case 1: return '#602525';
        default: return '#040D0A';
      }
    },
  }
}
</script>
