import * as model from './model.js';
import switchTabsView from './views/switchTabsView/switchTabsView.js';
import mathModelView from './views/mathModelView/mathModelView.js';
import intModelView from './views/intModelView/intModelView.js';
import visualizationView from './views/intModelView/visualizationView/visualizationView.js';
import parametersView from './views/intModelView/parametersView/parametersView.js';
import characteristicsView from './views/intModelView/characteristicsView/characteristicsView.js';

const controlSwitchTabs = function(modelType) {
  if (modelType === 'Математическая модель') {
    mathModelView.render();

    // Останавливаем визуализацию при переходе на вкладку "Мат. модель"
    if (model.state.visualization.active) {
      model.toggleVisualStatus();
    }
  }

  if (modelType === 'Интерактивная модель') {
    intModelView.render(model.state);

    // Привязываем хэндлеры для вьюшек из intModelView каждый раз при рендеринге intModelView
    visualizationView.addHandlerSwitchVisual(controlSwitchVisual);
    parametersView.addHandlerInputParameter(controlInputParameter);
  
    // Достаем из state последние значения характеристик, параметров, координат пружины и воссоздаем картину на том моменте, на котором ушли на вкладку "Мат. модель" +
    // инициализируем координаты пружины и другие характеристики при первом открытии вкладки "Инт. модель"
    model.updateStaticCharacteristic();
    model.updateSpringOffset(isFinite(+model.state.characteristics.x) ? +model.state.characteristics.x : +model.state.parameters.x0.value);
    characteristicsView.update(model.state.characteristics);
    visualizationView.update(model.state.visualization);
    parametersView.update(model.state.parameters);
  }
}

// Контроль ввода параметров от пользователя
const controlInputParameter = function(fieldId, value) {
  model.updateInputValue(fieldId, value);
  parametersView.update(model.state.parameters);
  visualizationView.update(model.state.visualization);
  characteristicsView.update(model.state.characteristics);
}

// Контроль переключения визуализации (активна/неактивна)
const controlSwitchVisual = function() {
  model.toggleVisualStatus();
  visualizationView.update(model.state.visualization);
  parametersView.update(model.state.parameters);

  if (model.state.visualization.active) {
    const start = Date.now();

    // При запуске визуализации характеристики и смещение пружины рассчитываются через каждые 20ms для точности и плавности анимации
    const controlVisualization = setInterval(() => {
      const timePassed = Date.now() - start;

      // Очищаем интервал и останавливаем рассчет + анимацию при нажатии кнопки "Остановить визуализацию"
      if (!model.state.visualization.active) {
        clearInterval(controlVisualization);
      }

      model.calcCharacteristics(timePassed);
      characteristicsView.update(model.state.characteristics);
      model.updateSpringOffset(+model.state.characteristics.x);
      visualizationView.update(model.state.visualization);
    }, 20);
  }
}

const init = function() {
  mathModelView.render();

  // Хэндлер для кнопок переключения вкладок
  switchTabsView.addHandlerSwitchTabs(controlSwitchTabs);
}

init();
