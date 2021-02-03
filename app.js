function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
        }
    },
    computed: {
        monsterBarStyles() {
            if(this.monsterHealth < 0) {
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            if(this.playerHealth < 0) {
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // a draw
                this.winner = 'Draw'
            } else if(value <= 0) {
                // player lost
                this.winner = 'Monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // a draw
                this.winner = 'Draw'
            } else if(value <= 0) {
                // monster lost
                this.winner = 'Player'
            }
        },
    },
    methods: {
        surrender() {
            this.winner = 'Monster'
        },
        restartGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
            this.currentRound = 0;
        },
        attackMonster() {
            this.currentRound++;
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
        },
        specialAttack() {
            this.currentRound++
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();

        },
        healPlayer() {
            this.currentRound++
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            };
            this.attackPlayer();
        }
    },
});

app.mount('#game')