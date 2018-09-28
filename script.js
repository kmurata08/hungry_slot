var app = new Vue({
    // using Vue.js
    el: '#app',
    data: {
        items: [
            ['マヨネーズ', '和風', '中華風', 'デミグラス'],
            ['肉', 'キムチ', 'すき焼き', 'あんかけ'],
            ['チャーハン', 'ラーメン', '丼', 'うどん'],
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
        ],
        nextStopReelIdx: 0,
        result: "------"
    },
    methods: {
        /**
         * 結果を出力する
         */
        showResult: function() {
            var textMap = this.states.map(x => x.text);
            this.result = textMap.join('');
        },
        /**
         * 特定のリールを動かす
         */
        startReel: function(idx) {
            // 「stop」ボタンで止まるリールを初期化
            this.nextStopReelIdx = 0;

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
        stopReel: function() {
            reelState = this.states[this.nextStopReelIdx];
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
            this.nextStopReelIdx++;
            var isAllStop = this.nextStopReelIdx >= this.states.length;

            // 全部止まったら結果を出す
            if (isAllStop) {
                this.showResult();
            }
        }
    }
});
