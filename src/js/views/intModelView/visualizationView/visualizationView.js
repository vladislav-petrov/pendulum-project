import View from '../../view.js';

class VisualizationView extends View {
  _parentElementClass = 'int-model-visualization';

  _generateMarkup(data) {
    return (
      `
        <h2 class="visualization-heading">
          Визуализация
        </h2>
        <div class="visualization-content">
          <svg
            class="visualization-svg"
            width="500px"
            height="640px"
          >
            <line
              x1="210"
              y1="0"
              x2="200"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="220"
              y1="0"
              x2="210"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="230"
              y1="0"
              x2="220"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="240"
              y1="0"
              x2="230"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="250"
              y1="0"
              x2="240"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="260"
              y1="0"
              x2="250"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="270"
              y1="0"
              x2="260"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="280"
              y1="0"
              x2="270"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="290"
              y1="0"
              x2="280"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="300"
              y1="0"
              x2="290"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="310"
              y1="0"
              x2="300"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <line
              x1="200"
              y1="20"
              x2="300"
              y2="20"
              style="stroke:#2d3436;stroke-width:2"
            />
            <polyline
              id="svg-polyline"
              points="
                ${data.polylineCurrentPoints[0][0]},${data.polylineCurrentPoints[0][1]}
                ${data.polylineCurrentPoints[1][0]},${data.polylineCurrentPoints[1][1]}
                ${data.polylineCurrentPoints[2][0]},${data.polylineCurrentPoints[2][1]}
                ${data.polylineCurrentPoints[3][0]},${data.polylineCurrentPoints[3][1]}
                ${data.polylineCurrentPoints[4][0]},${data.polylineCurrentPoints[4][1]}
                ${data.polylineCurrentPoints[5][0]},${data.polylineCurrentPoints[5][1]}
                ${data.polylineCurrentPoints[6][0]},${data.polylineCurrentPoints[6][1]}
                ${data.polylineCurrentPoints[7][0]},${data.polylineCurrentPoints[7][1]}
                ${data.polylineCurrentPoints[8][0]},${data.polylineCurrentPoints[8][1]}
                ${data.polylineCurrentPoints[9][0]},${data.polylineCurrentPoints[9][1]}
                ${data.polylineCurrentPoints[10][0]},${data.polylineCurrentPoints[10][1]}
                ${data.polylineCurrentPoints[11][0]},${data.polylineCurrentPoints[11][1]}
              "
              style="fill:none;stroke:#2d3436;stroke-width:2"
            />
            <circle
              cx="${data.circle.circleCoords.cx}"
              cy="${data.circle.circleCoords.cy}"
              r="${data.circle.circleRadius}px"
              stroke="#2d3436"
              stroke-width="2"
              fill="#a6b1b6a1"
            />
          </svg>
          <button
            class="visualization-button ${data.active ? 'button--active' : ''} ${data.disabled ? 'button--disabled' : ''}"
            type="button"
          >
            ${data.active ? 'Остановить визуализацию' : 'Запустить визуализацию'}
          </button>
        </div>
      `
    );
  }

  addHandlerSwitchVisual(handler) {
    document.querySelector(`.${this._parentElementClass}`).addEventListener('click', function(event) {
      if (event.target === document.querySelector('.visualization-button')) {
        handler();
      }
    });
  }
}

export default new VisualizationView();
