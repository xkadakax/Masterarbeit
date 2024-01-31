<template>
    <div class="panel mb-32 w-full m-4 md:w-8/12">
        <h1>Stimmungszähler</h1>
        <div class="mood-counter-container">
            <div v-for="(count, mood) in moodCounts" :key="mood" class="mood-counter-item">
                <div class="mood-circle" :style="{ backgroundColor: getMoodColor(mood) }"></div>
                <span class="mood-count">{{ count }}</span>
            </div>
        </div>

        <div class="text-center mt-10">
            <button @click="calculateAverageMood" class="calculate-average-button">
                Durchschnitt anzeigen
            </button>

            <div v-if="averageMood" class="average-mood-display">
                {{ averageMood }}
                <p class="note">5 - Super, 1 - Lausig</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebase.js';

export default {
    data() {
        return {
            moodCounts: {},
            averageMood: null,
        };
    },
    created() {
        const moodsRef = ref(db, 'moods');
        onValue(moodsRef, (snapshot) => {
            const data = snapshot.val();
            this.calculateMoodCounts(data);
        });
    },
    methods: {
        calculateMoodCounts(data) {
            const counts = {
                'Super': 0,
                'Gut': 0,
                'Ok': 0,
                'Schlecht': 0,
                'Lausig': 0
            };

            Object.values(data).forEach(entry => {
                if (counts.hasOwnProperty(entry.mood)) {
                    counts[entry.mood] += 1;
                }
            });

            this.moodCounts = counts;
        },
        getMoodColor(mood) {
            const moodColorMap = {
                'Super': '#30AB86',
                'Gut': '#3EACB2',
                'Ok': '#2E7EB8',
                'Schlecht': '#4341A8',
                'Lausig': '#602525'
            };
            return moodColorMap[mood] || '#040D0A';
        },
        calculateAverageMood() {
            let total = 0;
            let count = 0;
            const moodValues = {
                'Super': 5,
                'Gut': 4,
                'Ok': 3,
                'Schlecht': 2,
                'Lausig': 1
            };

            for (const mood in this.moodCounts) {
                total += this.moodCounts[mood] * moodValues[mood];
                count += this.moodCounts[mood];
            }

            if (count > 0) {
                this.averageMood = (total / count).toFixed(2);
            } else {
                this.averageMood = 'Keine Daten vorhanden';
            }
        }
    }
};
</script>