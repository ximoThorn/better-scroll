export default class Singer {//相同的代码抽象出一个类
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.headImg = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`;
    }
}