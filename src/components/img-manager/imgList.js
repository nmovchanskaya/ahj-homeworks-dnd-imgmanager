import ImgItem from './imgItem';

export default class ImgList {
  constructor() {
    this.imgs = [];
  }

  addImg(img) {
    this.imgs.push(img);
  }

  delete(imgId) {
    this.imgs = this.imgs.filter((item) => item.id !== imgId);
  }

  getURLById(imgId) {
    const img = this.imgs.filter((item) => item.id === imgId);
    return img[0].url;
  }
}
