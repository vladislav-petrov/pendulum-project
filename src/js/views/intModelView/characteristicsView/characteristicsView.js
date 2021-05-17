import View from '../../view.js';

class CharacteristicsView extends View {
  _parentElementClass = 'int-model-characteristics';

  _generateMarkup(data) {
    return (
      `
        <h2 class="characteristics-heading">
          Характеристики
        </h2>
        <div class="characteristics-content">
          <div class="characteristic-block">
            <h3 class="characteristic-heading">
              Циклическая частота собственных колебаний
            </h3>
            <span class="characteristic-literal">
              ω<sub>0
            </span>
            <span class="characteristic-colon">
              :
            </span>
            <span class="characteristic-value">
              ${data.w0}
            </span>
            <span class="characteristic-unit">
              рад/с
            </span>
          </div>
          <div class="characteristic-block">
            <h3 class="characteristic-heading">
              Время колебаний
            </h3>
            <span class="characteristic-literal">
              t
            </span>
            <span class="characteristic-colon">
              :
            </span>
            <span class="characteristic-value">
              ${data.t}
            </span>
            <span class="characteristic-unit">
              с
            </span>
          </div>
          <div class="characteristic-block">
            <h3 class="characteristic-heading">
              Количество полных колебаний
            </h3>
            <span class="characteristic-literal">
              n
            </span>
            <span class="characteristic-colon">
              :
            </span>
            <span class="characteristic-value">
              ${data.n}
            </span>
            <span class="characteristic-unit"></span>
          </div>
          <div class="characteristic-block">
            <h3 class="characteristic-heading">
              Координата
            </h3>
            <span class="characteristic-literal">
              x
            </span>
            <span class="characteristic-colon">
              :
            </span>
            <span class="characteristic-value">
              ${data.x}
            </span>
            <span class="characteristic-unit">
              см
            </span>
          </div>
        </div>
      `
    );
  }
}

export default new CharacteristicsView();
