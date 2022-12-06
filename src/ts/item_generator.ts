import { Utils } from "./utils";

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
        btn.setAttribute('class', '')
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
        btn.style.display = 'inline'

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