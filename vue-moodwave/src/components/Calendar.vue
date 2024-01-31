<template>
    <div class="panel w-full m-4 md:w-8/12">
        <h1>Calendar</h1>
        <div>
            <div class="text-center p-4 text-xl">{{ currentMonth }} {{ currentYear }}</div>
            <div class="flex justify-between text-xs pb-4">
                <button @click="changeMonth(-1)">Vorheriger Monat</button>
                <button @click="changeMonth(1)">Nächster Monat</button>
            </div>
            <table>
                <tr>
                    <th v-for="day in weekDays" :key="day">{{ day }}</th>
                </tr>
                <tr v-for="week in calendar" :key="week.toString()">
                    <td v-for="day in week" :key="day">
                        {{ day.getDate() }}
                        <span class="mood-dot" :style="{ backgroundColor: getMoodColor(day) }"></span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
  
<script>
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebase.js';

export default {
    data() {
        return {
            currentDate: new Date(),
            weekDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            moodsData: {}
        };
    },
    computed: {
        currentMonth() {
            return this.currentDate.toLocaleString('default', { month: 'long' });
        },
        currentYear() {
            return this.currentDate.getFullYear();
        },
        calendar() {
            const startDay = new Date(this.currentYear, this.currentDate.getMonth(), 1).getDay();
            const daysInMonth = new Date(this.currentYear, this.currentDate.getMonth() + 1, 0).getDate();

            let days = [];
            for (let i = 1; i <= daysInMonth; i++) {
                days.push(new Date(this.currentYear, this.currentDate.getMonth(), i));
            }

            for (let i = 0; i < startDay; i++) {
                days.unshift(new Date(this.currentYear, this.currentDate.getMonth(), -i));
            }

            let weeks = [];
            while (days.length) {
                weeks.push(days.splice(0, 7));
            }

            return weeks;
        },
    },
    methods: {
        changeMonth(step) {
            this.currentDate = new Date(this.currentYear, this.currentDate.getMonth() + step, 1);
        },


        getMoodColor(day) {
            const dateString = day.toISOString().split('T')[0];
            const moodData = this.moodsData[dateString];
            const mood = moodData ? moodData.mood : null;
            return mood ? this.convertMoodToColor(mood) : 'transparent';
        },

        convertMoodToColor(mood) {
            const moodColors = {
                'Super': '#30AB86',
                'Gut': '#3EACB2',
                'Ok': '#2E7EB8',
                'Schlecht': '#4341A8',
                'Lausig': '#602525',
            };
            return moodColors[mood] || 'transparent';
        },
    },

    created() {
        const moodsRef = ref(db, 'moods');
        onValue(moodsRef, (snapshot) => {
            this.moodsData = snapshot.val() || {};
            console.log("Geladene Stimmungsdaten: ", this.moodsData);
        });
    },

};
</script>
  