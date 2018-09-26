var app = new Vue({
    // using Vue.js
    el: '#app',
    data: {
        // reel state
        states: [
            {
                text: 0,
                isRunning: false,
                timerId: null,
            },
            {
                text: 0,
                isRunning: false,
                timerId: null,
            },
            {
                text: 0,
                isRunning: false,
                timerId: null,
            }
        ]
    },
    methods: {
        /**
         * 特定のリールを動かす
         */
        startReel: function(idx) {
            var reelState = this.states[idx];
            if (reelState.isRunning) {
                return;
            }
            var randomReel = function() {
                // ランダムにテキストをセット
                reelState.text = Math.floor(Math.random() * 10);
            }
            // 1000msec毎にランダム処理を実行
            reelState.timerId = setInterval(randomReel, 100);
            reelState.isRunning = true;
        },
        /**
         * スタート
         */
        startSlot: function() {
            for (var idx = 0; idx < this.states.length; idx++) {
                this.startReel(idx);
            }
        },
        /**
         * 特定のリールをストップ
         */
        stopReel: function(idx) {
            reelState = this.states[idx];
            if (reelState.isRunning) {
                // 動いてたら止める
                clearInterval(reelState.timerId);
                reelState.isRunning = false;
            }
        }
    }
});
