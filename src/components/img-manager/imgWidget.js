import ImgItem from './imgItem';
import ImgList from './imgList';

export default class ImgWidget {
  constructor() {
    this.imgList = new ImgList();

    this.onFileChange = this.onFileChange.bind(this);
    this.onDropFile = this.onDropFile.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  renderImg(img) {
    const div = document.createElement('div');
    div.className = 'img_div';
    const html = `
        <img class="img_small" src="${img.url}">
        <span class="img-del" data-id="${img.id}">
            x
        </span>
    `;
    div.innerHTML = html;
    return div;
  }

  generateImg(url) {
    // create imgItem and add to list
    const imgItem = new ImgItem(url);
    this.imgList.addImg(imgItem);

    // render img element and add it to the container
    const img = this.renderImg(imgItem);
    this.imgContainer.insertBefore(img, null);
  }

  onFileChange(e) {
    console.dir(this.fileInput);

    const file = this.fileInput.files && this.fileInput.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    this.generateImg(url);
  }

  onDropFile(e) {
    e.preventDefault();

    const url = URL.createObjectURL(e.dataTransfer.files && e.dataTransfer.files[0]);

    this.generateImg(url);
  }

  onDeleteItem(e) {
    if (e.target.className === 'img-del') {
      const id = Number(e.target.dataset.id);
      const url = this.imgList.getURLById(id);

      // remove from the list
      this.imgList.delete(id);

      // remove from DOM
      e.target.closest('div').remove();

      // remove from memory
      URL.revokeObjectURL(url);
    }
  }

  bindToDOM() {
    this.fileContainer = document.querySelector('.file-container');
    this.fileInput = this.fileContainer.querySelector('.overlapped');
    this.imgContainer = document.querySelector('.img-container');

    this.fileContainer.addEventListener('click', (e) => {
      this.fileInput.dispatchEvent(new MouseEvent('click'));
    });

    this.fileContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    this.fileContainer.addEventListener('drop', this.onDropFile);

    this.fileInput.addEventListener('change', this.onFileChange);

    this.imgContainer.addEventListener('click', this.onDeleteItem);
  }
}
