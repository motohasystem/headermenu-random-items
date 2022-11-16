
export type KintoneRecordItem = {
    'code': string
    , 'label': string
    , 'type': string
}

export type KintoneFieldValue = {
    'value': string
    , 'type': string
}

export type KintoneAppInfo = {
    'appId': string         // アプリID
    , 'name': string        // アプリ名
    , 'description': string // アプリの説明
}

// プルダウン１個分の情報を持つ
export type DropdownData = {
    'code': string
    , 'label': string
    , 'option': string
}


export class Utils {
    /**
     * 重複禁止フィールドだけをピックアップする
     * @param properties fields.jsonのレスポンスのproperties
     * @param with_record_number RECORD_NUMBERフィールドを返すフラグ
     */
    static unique_properties(props: {[code:string]: object}, with_record_number: boolean = false) {
        const results = []

        for(const fieldcode of Object.keys(props)){
            const prop = props[fieldcode] as any
            if(prop.unique == true){
                results.push(prop)
            }
            else if(with_record_number && prop['type'] == 'RECORD_NUMBER'){
                results.push(prop)
            }
        }
        return results
    }

    // 空文字列ではないことをチェックする
    static is_not_empty_string(test_str: string | string[] | undefined | null) {
        return !Utils.is_empty_string(test_str)
    }

    // 空文字列であることをチェックする
    static is_empty_string(test_str: string | string[] | undefined | null) {
        if (test_str == null || test_str == undefined) {
            return true
        }

        if (test_str.length > 0) {
            return false
        }

        return true
    }
    
    // 設定値またはデフォルト値を取得
    static get_from = (dic: {[key: string]: string}, conf_key: string, defaults: string): string => {
        if( dic.hasOwnProperty(conf_key) ){
        return dic[conf_key]
        }
        return defaults
    }

    // ノードを構築して返す
    static createElement = (
        tagName: string,
        className: string = "",
        childElements: HTMLElement[] = [],
        textContent: string = ""
    ): HTMLElement => {
        const el = document.createElement(tagName)
        el.className = className
        el.textContent = textContent

        if(childElements.length > 0){
            childElements.forEach((child)=>{
                el.appendChild(child)
            })
        }
        return el
    }

    // 配列のうち、重複したものがあればTrueを返す
    static is_overlapped = ( list: any[]) => {
        const overlapped = Utils.overlapped(list)

        if(overlapped.length > 0){
            return true
        }
        return false
    }

    // 配列のうち、重複したものをUniqして返す
    static overlapped = (list:any[]) =>{
        const overlapped = list.filter( (x, _i, self)=> {
            return self.indexOf(x) !== self.lastIndexOf(x)
        })

        return Array.from(new Set(overlapped))

    }

    // 現在開いているkintoneドメインのうち指定した番号のアプリのURLを構築して返す
    static get_application_url(appid: string): string{
        return `${location.protocol}//${location.host}/k/${appid}`
    }

    // CSSセレクタに使用できない文字を_に置き換える
    static replace_to_selector_string(raw: string, replace: string='_'): string{
        const re = /[!-/:-@¥[-`{-~]/g    // 半角記号
        const replaced = raw.replace(re, replace)
        return replaced
    }

    // 指定したIDのレコードを開くリンクを持ったノードを構築して返す
    static get_record_anchor(record_id: string) {
        // const record_id = kintone.app.record.getId()
        const app_id = kintone.app.getId()
        const url = `/k/${app_id}/show#record=${record_id}`
        const fileicon = Utils.createElement('span', 'recordlist-detail-gaia mt-1')
        const anchor = Utils.createElement('a', 'text-decoration-none', [fileicon]) // , '📋')
        anchor.setAttribute('href', url)
        anchor.setAttribute('target', "_blank")
        const link: HTMLElement = Utils.createElement('td', '', [anchor])

        return link
    }

}

export class CustomError extends Error {
    constructor(e?: string){
        super(e)
        this.name = new.target.name;
    }
}

export type KintoneErrorStatus = {
    code: string
    , id: string
    , message: string

}

export class KintoneAuthorityError extends CustomError {
    appendix: string = ""
    constructor(public status: KintoneErrorStatus, e?: string, appendix?: string){
        super(e)
        if(appendix){
            this.appendix = appendix
        }
    }
}
