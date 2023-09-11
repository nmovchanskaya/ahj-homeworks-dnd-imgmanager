export default class ImgItem {
  constructor(url) {
    this.id = Math.floor(performance.now());
    this.url = url;
  }
}
