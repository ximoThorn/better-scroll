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

export function scrollAjax (_page) {

    return jsonp(url, data, options);
}