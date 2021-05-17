export const state = {
  parameters: {
    m: {
      ok: true,
      value: '0.5'
    },
    k: {
      ok: true,
      value: '5'
    },
    x0: {
      ok: true,
      value: '10'
    },
    readOnly: false
  },
  characteristics: {
    w0: '-',
    t: '-',
    n: '-',
    x: '-'
  },
  visualization: {
    active: false,
    disabled: false,
    polylineInitialPoints: [
      [250, 20],
      [250, 60],
      [230, 75],
      [270, 105],
      [230, 135],
      [270, 165],
      [230, 195],
      [270, 225],
      [230, 255],
      [270, 285],
      [250, 300],
      [250, 340]
    ],
    polylineCurrentPoints: [
      [250, 20],
      [250, 60],
      [230, 75],
      [270, 105],
      [230, 135],
      [270, 165],
      [230, 195],
      [270, 225],
      [230, 255],
      [270, 285],
      [250, 300],
      [250, 340]
    ],
    circle: {
      circleCoords: {
        cx: 250,
        cy: 0
      },
      circleRadius: 25
    }
  }
}

// Обновление состояния кнопки запуска визуализации (кликабельна/не кликабельна)
const updateVisualState = function() {
  state.visualization.disabled = state.parameters.m.ok && state.parameters.k.ok && state.parameters.x0.ok ? false : true;
}

// Обновление значения циклической частоты
export const updateStaticCharacteristic = function() {
  const m = state.parameters.m;
  const k = state.parameters.k;

  state.characteristics.w0 = m.ok && k.ok ? Math.round(Math.sqrt(+k.value / +m.value) * 10) / 10 : '-';
}

const setInitialCharacteristics = function() {
  state.characteristics.t = '-';
  state.characteristics.n = '-'
  state.characteristics.x = '-'
}

// Обновление координаты y груза + обновление радиуса при каждом смещении пружины
const updateCircleData = function() {
  if (state.parameters.m.ok) {
    const newRadius = Math.round((60 * Math.sqrt(Math.sqrt(+state.parameters.m.value)) / 2));

    state.visualization.circle.circleCoords.cy = (state.visualization.circle.circleCoords.cy - state.visualization.circle.circleRadius) + newRadius;
    state.visualization.circle.circleRadius = newRadius;
  }
}

// Обновление смещения пружины
export const updateSpringOffset = function(offset) {
  // 2см = 10px

  // Отклонение от равновесия в px всей пружины (вниз)
  const offsetAll = (offset * 10) / 2;

  // Отклонение отдельного элемента пружины
  const offsetOne = offsetAll / 10;

  // Длина линии пружины
  const lengthLine = 50;
  const lengthYLine = 30;

  // Координата x центра
  const centerX = 250;

  let yOffset;

  // Расчет новых координат для каждой точки полилайна
  state.visualization.polylineCurrentPoints = state.visualization.polylineInitialPoints.map((coords, i) => {
    const bottomLength = Math.round(Math.sqrt(lengthLine * lengthLine - (lengthYLine + offsetOne) * (lengthYLine + offsetOne)));

    if (i === 0 || i === 1) {
      return coords;
    }

    if (coords[0] < centerX) {
      return [(centerX - Math.round(bottomLength / 2)), coords[1] + offsetOne * (i - 1)];
    }

    if (coords[0] > centerX) {
      return [(centerX + Math.round(bottomLength / 2)), coords[1] + offsetOne * (i - 1)];
    }

    if (coords[0] === centerX) {
      const yCoord = coords[1] + offsetOne * (i - 1);

      if (i === 11) {
        yOffset = yCoord;
      }

      return [centerX, yCoord];
    }
  });

  // Обновляем y-координату груза, т.к пружина сместилась
  state.visualization.circle.circleCoords.cy = yOffset + state.visualization.circle.circleRadius;
}

// Обновление статуса кнопки визуализации (активна/неактивна)
export const toggleVisualStatus = function() {
  state.visualization.active = !state.visualization.active;

  state.parameters.readOnly = state.visualization.active;
}

// Ввод параметров от пользователя
export const updateInputValue = function(fieldId, value) {
  let valueFormated = value.replaceAll(',', '.');
  let localOK = true;

  if (valueFormated === '' || valueFormated.slice(-1) === '.' || valueFormated.slice(0) === '.') {
    localOK = false;
  }

  switch (true) {
    case fieldId === 'm': {
      state.parameters.m.value = valueFormated;
      state.parameters.m.ok = +valueFormated >= 0.5 && +valueFormated <= 1 && (+valueFormated * 10) % 1 === 0 && localOK ? true : false;
      updateCircleData();
      break;
    }

    case fieldId === 'k': {
      state.parameters.k.value = valueFormated;
      state.parameters.k.ok = +valueFormated >= 5 && +valueFormated <= 9 && +valueFormated % 1 === 0 && localOK ? true : false;
      break;
    }

    case fieldId === 'x0': {
      state.parameters.x0.value = valueFormated;
      state.parameters.x0.ok = +valueFormated >= 0 && +valueFormated <= 20 && +valueFormated % 2 === 0 && localOK ? true : false;

      if (state.parameters.x0.ok) {
        updateSpringOffset(+state.parameters.x0.value);
      }

      break;
    }

    default: {
      return;
    }
  }

  // Меняем состояние кнопки в зависимости от корректности введенных параметров
  updateVisualState();

  // Считаем новое значение циклической частоты
  updateStaticCharacteristic();

  // Сбрасываем значения характеристик после прощлой визуализации
  setInitialCharacteristics();

  // Сбрасываем смещение пружины после прошлой визуализации
  if (state.parameters.x0.ok) {
    updateSpringOffset(+state.parameters.x0.value);
  }
}

// Считаем характеристики
export const calcCharacteristics = function(t) {
  const x0 = +state.parameters.x0.value;
  const w0 = +state.characteristics.w0;
  const interval = (2 * Math.PI) / w0;

  state.characteristics.t = (Math.round((t / 1000) * 10) / 10).toFixed(1);
  state.characteristics.x = (Math.round((x0 * Math.cos(w0 * (t / 1000))) * 10) / 10).toFixed(1);
  state.characteristics.n = x0 > 0 ? Math.trunc((t / 1000) / interval) : 0;
}
