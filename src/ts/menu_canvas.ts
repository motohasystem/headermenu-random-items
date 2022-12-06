import { Utils as ut } from "./utils"
import 'bootstrap'
import "../scss/style.scss";    // bootstrapのスタイル

export class MenuCanvas {
    static CLASS_DISMISS = 'offcanvas-dismiss'
    static CONSTANTS = {
        TITLE_CUSTOMIZE: '**プラグイン名**'
        , REPEAT: 100
    }

    id_island: string
    id_offcanvas: string
    island: HTMLElement // プラグインアイコンを表示するメニューキャンバス
    enable_offcanvas: boolean
    prepend: boolean

    /**
     * プラグインからアイコンを追加したい場合に、HeaderMenuSpaceではなくBootstrapのOffcanvasにアイコンを載せて開閉できるようにします。
     * @param id_canvas メニューキャンバスID、異なるプラグイン同士でも、同じIDを指定すると同じキャンバスにアイコンを追加できます。
     * @param prepend trueでキャンバス呼び出しアイコンをHeaderMenuSpaceの先頭に挿入します。省略可能。
     * @param default_element キャンバス以外のノードに挿入したい場合にHTMLElementを渡します。省略可能。
     * @param icon_element 呼び出しアイコンとして指定したいノードを渡します。省略可能。
     * @returns 
     */
    constructor(id_canvas: string, prepend: boolean = false, default_element: HTMLElement | null = null, icon_element: HTMLElement | undefined = undefined) {
        this.id_island = `plugin_island_id_${id_canvas}`
        this.id_offcanvas = `offcanvas_${this.id_island}`
        this.prepend = prepend

        // 初期化またはメニューキャンバスを使わない
        if (id_canvas == "") {
            console.log(`[${MenuCanvas.CONSTANTS.TITLE_CUSTOMIZE}]メニューキャンバスを使いません。`)
            if (default_element == null) {
                default_element = kintone.app.getHeaderMenuSpaceElement()
            }

            if (default_element == null) {
                throw new Error('kintone.app.HeaderMenuSpaceElement() を取得できませんでした。')
            }
            this.island = default_element
            this.enable_offcanvas = false

            return
        }

        //メニューキャンバスを使用する
        this.enable_offcanvas = true
        const already = document.getElementById(this.id_island)
        if (already) {  // 同じIDで既存の島があればそれを使う
            console.log(`[${MenuCanvas.CONSTANTS.TITLE_CUSTOMIZE}] 既存のメニューキャンバスを使用します。`)
            this.island = already
        }
        else {
            console.log(`[${MenuCanvas.CONSTANTS.TITLE_CUSTOMIZE}]メニューキャンバスをID[${this.id_island}]で作成します。`)

            //メニューキャンバスのアイコン
            const icon_balloon = ((icon) => {
                if (icon) {
                    return icon
                }
                else {
                    return ut.ce('i', 'fa-solid fa-comment-dots ps-2')
                }
            })(icon_element)
            icon_balloon.style.color = 'dodgerblue'

            const island = ut.ce('button', ''
                , [icon_balloon]
                , ''
                , {
                    'id': this.id_island
                    , 'data-bs-toggle': 'offcanvas'
                    , 'aria-controls': this.id_offcanvas
                    , 'data-bs-target': `#${this.id_offcanvas}`
                }
            )

            island.style.width = '48px'
            island.style.height = '48px'
            island.style.backgroundColor = '#f7f9fa'
            island.style.fontSize = '28px'
            island.style.border = '1px solid #e3e7e8'
            island.style.display = 'inline'

            this.island = island
            this.init_offcanvas()
        }
    }

    init_offcanvas() {
        const headerSpace = kintone.app.getHeaderMenuSpaceElement()
        if (headerSpace) {
            if (this.prepend) {
                headerSpace.prepend(this.get_node())
                headerSpace.prepend(this.build_node_offcanvas())
            }
            else {
                headerSpace.append(this.get_node())
                headerSpace.append(this.build_node_offcanvas())
            }
        }
    }

    get_node(): HTMLElement {
        return this.island
    }

    build_node_offcanvas() {
        return ut.ce('div', 'offcanvas offcanvas-start',
            [
                ut.ce('div', 'offcanvas-header', [
                    ut.ce('h5', 'offcanvas-title',
                        []
                        , MenuCanvas.CONSTANTS.TITLE_CUSTOMIZE
                        , {
                            'id': `${this.id_offcanvas}Label`
                        }
                    )
                    , ut.ce('button', 'btn-close text-reset', [], '',
                        {
                            'data-bs-dismiss': 'offcanvas'
                            , 'aria-label': 'Close'
                        }
                    )

                ])
                , ut.ce('div', 'offcanvas-body',
                    [
                        ut.ce('div', 'mb-4', [], 'ここから各種プラグインを呼び出せます。')
                    ]
                    , ''
                    , {
                        'id': `${this.id_offcanvas}-body`
                    })
            ]
            , ''
            , {
                'tabindex': '-1'
                , 'id': `${this.id_offcanvas}`
                , 'aria-labelledby': `${this.id_offcanvas}Label`
                , 'data-bs-backdrop': 'false'
            }
        )
    }

    append(node: HTMLElement) {
        if (this.enable_offcanvas) {
            const offcanvas = document.getElementById(`${this.id_offcanvas}-body`)
            // node.setAttribute('data-bs-dismiss', "offcanvas")
            this.deal_dismiss_attribute(node)
            offcanvas?.appendChild(node)
        }
        else {
            this.island.append(node)
        }
    }

    deal_dismiss_attribute(node: HTMLElement) {
        const dismissElements = Array.from(node.querySelectorAll(`.${MenuCanvas.CLASS_DISMISS}`))
        console.log(dismissElements)
        if (dismissElements.length > 0) {
            dismissElements.map((element) => {
                element.setAttribute('data-bs-dismiss', "offcanvas")
            })
        }
        else {
            node.setAttribute('data-bs-dismiss', "offcanvas")
        }
    }
}
