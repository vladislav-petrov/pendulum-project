import View from '../view.js';
import visualizationView from './visualizationView/visualizationView.js';
import parametersView from './parametersView/parametersView.js';
import characteristicsView from './characteristicsView/characteristicsView.js';

class IntModelView extends View {
  _parentElementClass = 'app-content__model-content';

  _generateMarkup(data) {
    return (
      `
        <div class="int-model-container">
          <div class="int-model-description">
            <span class="int-model-description__text">
              Интерактивная модель позволяет на основании введенных параметров рассчитать характеристики колебательного движения и визуализировать процесс.
            </span>
          </div>
          <div class="int-model-visualization">
            ${visualizationView._generateMarkup(data.visualization)}
          </div>
          <div class="int-model-parameters">
            ${parametersView._generateMarkup(data.parameters)}
          </div>
          <div class="int-model-characteristics">
            ${characteristicsView._generateMarkup(data.characteristics)}
          </div>
        </div>
      `
    );
  }
}

export default new IntModelView();
