var app = new Vue({
    // using Vue.js
    el: '#app',
    data: {
        items: [
            ['a', 'b', 'c', 'd', 'e'],
            ['aa', 'bb', 'cc', 'dd', 'ee', 'ff'],
            ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg'],
        ],
        // reel state
        states: [
            {
                text: "-",
                isRunning: false,
                timerId: null,
                animCls: ""
            },
            {
                text: "-",
                isRunning: false,
                timerId: null,
                animCls: ""
            },
            {
                text: "-",
                isRunning: false,
                timerId: null,
                animCls: ""
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

            var itemRow = this.items[idx];
            var randomReel = function() {
                // ランダムにテキストをセット
                itemIdx = Math.floor(Math.random() * itemRow.length);
                reelState.text = itemRow[itemIdx];
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

                // テキストを震わせる
                reelState.animCls = "buruburu";
                setTimeout(function() {
                    reelState.animCls = "";
                }, 200);
            }
        }
    }
});
