import View from '../../view.js';

class ParametersView extends View {
  _parentElementClass = 'int-model-parameters';

  _generateMarkup(data) {
    return (
      `
        <h2 class="parameters-heading">
          Параметры
        </h2>
        <div class="parameters-content">
          <div class="parameter-block">
            <h3 class="parameter-heading">
              Масса груза
            </h3>
            <span class="parameter-literal">
              m
            </span>
            <span class="parameter-colon">
              :
            </span>
            <div class="parameter-value">
              <input
                class="parameter-value__input ${data.m.ok ? '' : 'input--warning'} ${data.readOnly ? 'input--disabled' : ''}"
                type="text"
                id="m"
                value="${data.m.value}"
              >
              <span class="parameter-value__description">
                (0.5 - 1, шаг 0.1)
              </span>
            </div>
            <span class="parameter-unit">
              кг
            </span>
          </div>
          <div class="parameter-block">
            <h3 class="parameter-heading">
              Жесткость пружины
            </h3>
            <span class="parameter-literal">
              k
            </span>
            <span class="parameter-colon">
              :
            </span>
            <div class="parameter-value">
              <input
                class="parameter-value__input ${data.k.ok ? '' : 'input--warning'} ${data.readOnly ? 'input--disabled' : ''}"
                type="text"
                id="k"
                value="${data.k.value}"
              >
              <span class="parameter-value__description">
                (5 - 9, шаг 1)
              </span>
            </div>
            <span class="parameter-unit">
              Н/м
            </span>
          </div>
          <div class="parameter-block">
            <h3 class="parameter-heading">
              Первоначальное отклонение от равновесия
            </h3>
            <span class="parameter-literal">
              x<sub>0</sub>
            </span>
            <span class="parameter-colon">
              :
            </span>
            <div class="parameter-value">
              <input
                class="parameter-value__input ${data.x0.ok ? '' : 'input--warning'} ${data.readOnly ? 'input--disabled' : ''}"
                type="text"
                id="x0"
                value="${data.x0.value}"
              >
              <span class="parameter-value__description">
                (0 - 20, шаг 2)
              </span>
            </div>
            <span class="parameter-unit">
              см
            </span>
          </div>
        </div>
      `
    );
  }

  addHandlerInputParameter(handler) {
    document.querySelector(`.${this._parentElementClass}`).addEventListener('input', function(event) {
      if (event.target.classList.contains('parameter-value__input')) {
        handler(event.target.getAttribute('id'), event.target.value);
      }
    });
  }
}

export default new ParametersView();
