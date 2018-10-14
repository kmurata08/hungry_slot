var app = new Vue({
    // using Vue.js
    el: '#app',
    data: {
        items: [
            ['チーズたっぷり','激辛','苦学生の','絶景','中華風','和風','韓国風','イタリアン','甘辛','さっぱり','野菜たっぷり','ご飯がすすむ','豆腐でかさ増し','秒速','長生きしちゃう','我が家の','スタミナ','大根おろしたっぷり','ビールがすすむ'],
            ['牛','豚','チキン','キムチ','白身魚の','マーボー','豚肉','鮭','マグロ','魚介','レバー','ホルモン','さんま','豚バラ','牛ひき肉','豆腐'],
            ['ハンバーグ','カレー','鍋','丼','フライ','チャーハン','蒲焼き','うどん','そば','野菜炒め','ソテー','お好み焼き','ちらしずし','スープ','ステーキ','煮付け','煮込み','生姜焼き','シチュー','パスタ','ピザ','しゃぶしゃぶ','ドリア']
        ],
        // reel state
        states: [
            {
                text: "いつまで",
                isRunning: false,
                timerId: null,
                animCls: ""
            },
            {
                text: "レシピ本で",
                isRunning: false,
                timerId: null,
                animCls: ""
            },
            {
                text: "消耗してるの？",
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
                }, 400);
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

var current_scrollY;
$('.modal-open').click(function(){
  current_scrollY = $( window ).scrollTop();
      $( 'body' ).css( {
        position: 'fixed',
        width: '100%',
        top: -1 * current_scrollY
      } );
    $('body').append('<div class="modal-overlay"></div>');
    $('.modal-overlay').fadeIn('fast');
    var modal = '#' + $(this).attr('data-target');
    modalResize();
    $(modal).fadeIn('fast');
    // リサイズしたら表示位置を再取得
    $(window).on('resize', function(){
        modalResize();
    });
    // モーダルコンテンツの表示位置を設定する関数
    function modalResize(){
        // ウィンドウの横幅、高さを取得
        var w = $(window).width();
        //var h = $(window).height();
        // モーダルコンテンツの表示位置を取得
        var x = (w - $(modal).outerWidth(true)) / 2;
        //var y = (w - $(modal).outerHeight(true)) / 2;
        // モーダルコンテンツの表示位置を設定
        $(modal).css({'left': x + 'px'});
    }
    });
    $('.modal-overlay, .modal-close').off().click(function(){
        $('.modal-content,.modal-overlay').fadeOut(300);
        $( 'body' ).attr( { style: '' } );
        $( 'html, body' ).prop( { scrollTop: current_scrollY } );
        $('.modal-overlay').remove();
    });
