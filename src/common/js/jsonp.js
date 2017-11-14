import orgianJsonp from "jsonp"

export default function jsonp (url, data, option) {
    url += (url.indexOf("?")<0)?"?":"&"+promt(data);
    return new Promise ((resolve, reject) => {
        orgianJsonp(url, option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        }) 

    });

};

export function promt (data) {

    let url = "";
    for (let k in data) {
        let value = data[k]!=undefined?data[k]:"";
        url+= `&${k}=${encodeURIComponent(value)}`;
    };
    return url?url.substring(1):"";
};