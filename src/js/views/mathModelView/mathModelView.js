import View from '../view.js';

class MathModelView extends View {
  _parentElementClass = 'app-content__model-content';

  _generateMarkup() {
    return (
      `
        <div class="math-model__container">
          <span class="math-model__text">
            Колебательное движение пружинного маятника описывается следующей формулой:
          </span>
          <span class="math-model__formula">
            x(t) = x<sub>0</sub>cos(ω<sub>0</sub>t),
          </span>
          <span class="math-model__divider-text">
            или
          </span>
          <span class="math-model__formula">
            x(t) = x<sub>0</sub>cos(
              <math>
                <msqrt>
                  <mfrac>
                    <mi>k</mi>
                    <mi>m</mi>
                  </mfrac>
                </msqrt>
              </math>
            t),
          </span>
          <div class="math-model__description">
            <span class="description__intro-word">
              где
            </span>
            <div class="description__variables">
              <span class="variables__item">
                x
              </span>
              <span class="variables__item">
                t
              </span>
              <span class="variables__item">
                x<sub>0</sub>
              </span>
              <span class="variables__item">
                ω<sub>0</sub>
              </span>
              <span class="variables__item">
                k
              </span>
              <span class="variables__item">
                m
              </span>
            </div>
            <div class="description__text">
              <span class="text__item">
                - координата,
              </span>
              <span class="text__item">
                - время колебаний,
              </span>
              <span class="text__item">
                - первоначальное отклонение от равновесия,
              </span>
              <span class="text__item">
                - циклическая частота собственных колебаний,
              </span>
              <span class="text__item">
                - жесткость пружины,
              </span>
              <span class="text__item">
                - масса груза.
              </span>
            </div>
          </div>
        </div>
      `
    );
  }
}

export default new MathModelView();
