class View {
  render(data = null) {
    const markup = this._generateMarkup(data);
    this._insertMarkup(markup);
  }

  // Метод для апдейта вьюшки: вместо полного ререндеринга, как в методе render, тут меняется только текст в элементах
  // + их атрибуты, что повышает производительность кода + позволяет обращаться к одним и тем же элементам много раз
  update(data) {
    const newMarkup = this._generateMarkup(data);
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(document.querySelector(`.${this._parentElementClass}`).querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];

      if (currentElement.classList.contains('parameter-value__input')) {
        currentElement.readOnly = data.readOnly;
      }

      if (!newElement.isEqualNode(currentElement) && newElement.firstChild?.nodeValue.trim() !== '') {
        currentElement.textContent = newElement.textContent;
      }

      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach((attribute) => {
          currentElement.setAttribute(attribute.name, attribute.value);
        })
      }
    });
  }

  // Метод для вставки разметки в контейнер (родительский элемент)
  _insertMarkup(markup) {
    document.querySelector(`.${this._parentElementClass}`).innerHTML = '';
    document.querySelector(`.${this._parentElementClass}`).insertAdjacentHTML('afterbegin', markup);
  }
}

export default View;
