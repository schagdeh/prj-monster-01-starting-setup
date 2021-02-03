function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
        }
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            return {width: this.playerHealth + '%'}
        },
    },
    methods: {
        attackMonster() {
            // this code below is repeated so made one function above and used in both the player and monster attack.
            //const attackValue = Math.floor(Math.random() * (12 - 5)) + 5; 
            const attackValue = getRandomValue(5, 12);
            //this.monsterHealth = this.monsterHealth - attackValue  // this code and below one are same
            this.monsterHealth -= attackValue 
            this.attackPlayer(); // this will attack player when we attack monster.
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue 
        }
    },
});

app.mount('#game')