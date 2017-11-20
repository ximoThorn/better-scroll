import jsonp from "./../common/js/jsonp"
import { commonParmas, options,ERR_OK} from "./../common/js/config"

export function swiperAjax () {
    const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
    const data = Object.assign({}, commonParmas, {
        uin: 0,
        format:"json",
        needNewCode:1
    });

    return jsonp(url, data, options);
}

export function sinerAjax () {
    const url = "https://szc.y.qq.com/v8/fcg-bin/v8.fcg";
    const data = Object.assign({}, commonParmas,{
        channel: "singer",
        page: "list",
        key: "all_all_all",
        pagesize: 100,
        pagenum: 1,
        g_tk: 5381,
        // loginUin: 0,
        // hostUin: 0,
        // format: "jsonp",
        platform: "yqq",
        needNewCode: 0
    });
    
    return jsonp(url, data, options);
}