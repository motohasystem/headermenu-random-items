import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import { ItemGenerator } from './item_generator';
import { MenuCanvas } from './menu_canvas';

/**
 * メイン処理
 */
(function () {
    "use strict";
    const CONSTANTS = {
        TITLE_CUSTOMIZE: 'ツールバーにランダムでアイテムを追加'
        , REPEAT: 50
    }

    const EVENT_LIST = [
        'app.record.index.show'
    ];

    // 一覧画面表示イベント
    kintone.events.on(EVENT_LIST, function (_event) {
        console.log(`[${CONSTANTS.TITLE_CUSTOMIZE}] を実行します`)
        add_menu_100()
        add_menu_canvas()
    });

    // HeaderMenuSpaceにアイコン100個を足す
    const add_menu_100 = () => {
        // HeaderMenuSpaceを取得
        const headerSpace = kintone.app.getHeaderMenuSpaceElement()

        if (headerSpace == undefined) {
            console.error('ボタン配置スペースが取得できませんでした。')
            return
        }

        if (headerSpace.children.length >= 100) {


            console.error('すでにボタンは配置済みです。')
            return

        }

        // 100個追加
        const generator = new ItemGenerator()
        for (let i = 0; i < CONSTANTS.REPEAT; i++) {
            headerSpace.append(generator.get())
        }
    }

    // MenuCanvasにアイコン100個を足す
    const add_menu_canvas = () => {
        const menu_canvas_id = 'sample_menu_canvas'

        // プラグインキャンバスの設定
        const plugin_canvas = new MenuCanvas(menu_canvas_id, false)

        // メニューキャンバスにアイコン100個追加
        const generator = new ItemGenerator()
        for (let i = 0; i < CONSTANTS.REPEAT; i++) {
            plugin_canvas.append(generator.get())
        }
    }
})();

