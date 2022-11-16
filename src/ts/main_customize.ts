import { Utils } from "./utils";

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

/**
 * メイン処理
 */
 (function() {
    "use strict";
    const CONSTANTS = {
        TITLE_CUSTOMIZE: 'ツールバーにランダムでアイテムを追加'
        , REPEAT: 100
    }

    // 一覧画面の表示イベント
    const EVENT_LIST = [
        'app.record.index.show'    // 一覧表示イベント
    ];

    // 一覧画面表示イベント
    kintone.events.on(EVENT_LIST, function(_event) {
        console.log(`[${CONSTANTS.TITLE_CUSTOMIZE}] を実行します`)
        const headerSpace = kintone.app.getHeaderMenuSpaceElement()
        if(headerSpace == undefined) {
            console.error('ボタン配置スペースが取得できませんでした。')
            return
        }
        
        if(headerSpace.children.length >= 100){
            console.error('すでにボタンは配置済みです。')
            return
            
        }

        const generator = new ItemGenerator()
        console.log(generator)
        for(let i=0; i< CONSTANTS.REPEAT; i++){
            headerSpace.appendChild(generator.get())
        }
    });
})();


export class ItemGenerator {
    static saved_height: string;

    constructor() {
        ItemGenerator.saved_height = 'auto'
    }
    /**
     * アイテムを生成します。
     */
    icon_list = [
        'fa-solid fa-fill-drip'
        , 'fa-solid fa-house'
        , "fa-solid fa-magnifying-glass"
        , "fa-solid fa-user"
        , "fa-solid fa-check"
        , "fa-solid fa-download"
        , "fa-solid fa-image"
        , "fa-solid fa-phone"
        , "fa-solid fa-bars"
        , "fa-solid fa-envelope"
        , "fa-solid fa-star"
        , "fa-solid fa-location-dot"
    ]

    get(){
        return this.createButton();
    }

    icon_random(){
        const size = this.icon_list.length
        const index = Math.floor(Math.random() * size)
        return this.icon_list[index]
    }

    // 一括入力ダイアログを表示するボタン
    createButton(label: string | undefined = undefined) {
        const btn = document.createElement('button');
        btn.setAttribute('class', 'bbk-tool-icon-box-disabled') // ボタンスタイル
        if (label) {
            btn.innerText = label;
        }

        const icon = Utils.createElement('i', this.icon_random())
        icon.style.color = 'dodgerblue'
        // const self = this
        btn.addEventListener('click', ()=>{
            console.log('button clicked')
            ItemGenerator.switch_headermenu_autoheight()
        }, false)

        btn.appendChild(icon)

        btn.style.width = '48px'
        btn.style.height = '48px'
        btn.style.backgroundColor = '#f7f9fa'
        btn.style.fontSize = '28px'
        btn.style.border = '1px solid #e3e7e8'

        return btn
    }

    // ヘッダースペースの高さを切り替える
    static switch_headermenu_autoheight() {
        const hms = kintone.app.getHeaderMenuSpaceElement()
        console.log(hms)
        if(hms == undefined){
            return
        }

        let curr = hms.style.height
        console.log(curr)
        if(curr == 'auto'){
            hms.style.height = '48px'
        }
        else {
            hms.style.height = 'auto'
        }

    }
}