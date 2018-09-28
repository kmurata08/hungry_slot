var app = new Vue({
    // using Vue.js
    el: '#app',
    data: {
        items: [
            ['チーズたっぷり','激辛','苦学生の','絶景','中華風','和風','韓国風','イタリアン','甘辛','あっさりさっぱり','野菜たっぷり','豆腐でかさ増し','秒速','長生きしちゃう','我が家の','スタミナ','大根おろしたっぷり','ご飯がすすむ','ビールがすすむ'],
            ['牛','豚','チキン','キムチ','白身魚の','マーボー','豚肉','鮭','マグロ','魚介','レバー','ホルモン','さんま','豚バラ','牛ひき肉','豆腐'],
            ['ハンバーグ','カレー','鍋','丼','フライ','チャーハン','蒲焼き','うどん','そば','野菜炒め','ソテー','お好み焼き','ちらしずし','スープ','ステーキ','煮付け','煮込み','生姜焼き','シチュー','パスタ','ピザ','しゃぶしゃぶ','ドリア']
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
        isStopping: true,
        buttonLabel: "START",
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
            this.isStopping = false;
            this.buttonLabel = "STOP";
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
            this.isStopping = this.nextStopReelIdx >= this.states.length;

            // 全部止まったら結果を出す
            if (this.isStopping) {
                this.showResult();
                this.buttonLabel = "START";
            }
        },
        clickButton: function() {
            if (this.isStopping) {
                this.startSlot();
            } else {
                this.stopReel();
            }
        }
    }
});
