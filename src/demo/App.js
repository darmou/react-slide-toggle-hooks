import React from 'react';
import ReactDOM from 'react-dom';

import eases from 'eases'; // example, provide your own easing fn
import BezierEasing from 'bezier-easing'; // example, provide your own easing fn

const log = console.log.bind(console);

const easeNames = Object.keys(eases);

const easeInOutQuart = t =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

const bezierEaseInOutQuart = BezierEasing(0.77, 0, 0.175, 1);
const defaultEase = eases.cubicInOut;

const getRandomEase = () => {
  const index = Math.floor(Math.random() * easeNames.length);
  return eases[easeNames[index]];
};

const ToggleText = () => 'Toggle';

const ProgressBar = ({ progress }) => (
  <span className="progress-bar">
    <span
      className="progress-bar__inner"
      style={{
        transform: `scaleX(${progress})`,
      }}
    />
  </span>
);

export default class App extends React.Component {
  state = { duration: 1000, event: 0 };

  generateMarkup = ({
    easeCollapseName,
    easeExpandName,
    easeCollapse,
    easeExpand,
    className = '',
    customText,
  } = {}) => ({
    onToggle,
    setCollapsibleElement,
    toggleState,
    isMoving,
    hasReversed,
    range,
    progress,
  }) => (
    <div
      className={`slide-toggle ${className} ${(
        toggleState || ''
      ).toLowerCase()}`}
    >
      <div className="slide-toggle__header">
        <button className="slide-toggle__toggle" onClick={onToggle}>
          <ToggleText />
        </button>
        <ProgressBar progress={progress} />
      </div>
      <div className="slide-toggle__box" ref={setCollapsibleElement}>
        <div
          className="slide-toggle__box-inner"
          style={{ opacity: Math.max(0.5, range) }}
        >
          <p>
            Default easing is cubicInOut. You can reverse the toggle before the
            movement completes. Ease in-out works best when reverse toggling is
            to be used.
          </p>
          <p>
            This should be A11Y friendly, you can test the tabindex by tabbing.
            The collapsed items should be skipped due to usage of display:none
          </p>
          <p>
            JS animation is used for best animation control and possible easing
            configuration. This triggers browser reflows on every
            requestAnimationFrame. If you have a very long page this might not
            be the best option to use.
          </p>
          <img
            className="slide-toggle__image"
            alt="random"
            src="https://source.unsplash.com/user/erondu/600x200"
          />
          <button onClick={onToggle}>
            <ToggleText />
          </button>
        </div>
      </div>

      <div className="state-values">
        <div>
          <span>toggleState:</span>
          <span>{toggleState}</span>
        </div>
        <div>
          <span>range:</span>
          <span>{range.toFixed(2)}</span>
        </div>
        <div>
          <span>progress:</span>
          <span>{progress.toFixed(2)}</span>
        </div>
        <div>
          <span>isMoving:</span>
          <span>{`${isMoving}`}</span>
        </div>
        <div>
          <span>easeCollapse:</span>
          <span>{easeCollapseName}</span>
        </div>
        <div>
          <span>easeExpand:</span>
          <span>{easeExpandName}</span>
        </div>
        <div>
          <span>hasReversed:</span>
          <span>{`${hasReversed}`}</span>
        </div>
        {customText && (
          <div>
            <span>custom:</span>
            <span>{customText}</span>
          </div>
        )}
      </div>
    </div>
  );

  render() {
    const components = [];
    let SlideToggle = this.props.SlideToggle;
    let SlideToggle2 = this.props.SlideToggle2
      ? this.props.SlideToggle2
      : SlideToggle;
    let SlideToggle3 = this.props.SlideToggle3
      ? this.props.SlideToggle3
      : SlideToggle;
    let SlideToggle4 = this.props.SlideToggle4
      ? this.props.SlideToggle4
      : SlideToggle;

    1 &&
      components.push(
        <div key={components.length}>
          <button onClick={() => this.setState({ event: Date.now() })}>
            Toggle event
          </button>
          <SlideToggle
            key={components.length}
            duration={this.state.duration}
            toggleEvent={this.state.event}
            collapsed
            onMount={({ toggle }) => {
              log('onMount');
              toggle();
            }}
          >
            {this.generateMarkup({
              easeCollapseName: 'default',
              easeExpandName: 'default',
            })}
          </SlideToggle>
        </div>
      );

    1 &&
      components.push(
        <SlideToggle
          key={components.length}
          duration={this.state.duration}
          collapsed
          onCollapsed={() => log('onCollapsed')}
          onCollapsing={() => log('onCollapsing')}
          onExpanding={() => log('onExpanding')}
          onExpanded={() => log('onExpanded')}
        >
          {this.generateMarkup({
            easeCollapseName: 'default',
            easeExpandName: 'default',
          })}
        </SlideToggle>
      );

    1 &&
      components.push(
        <SlideToggle2
          key={components.length}
          duration={this.state.duration * 2}
          easeCollapse={eases.bounceOut}
          easeExpand={eases.bounceOut}
          collapsed
          whenReversedUseBackwardEase
          render={this.generateMarkup({
            easeCollapseName: 'bounceOut',
            easeExpandName: 'bounceOut',
            easeCollapse: eases.bounceOut,
            easeExpand: eases.bounceOut,
            customText: 'whenReversedUseBackwardEase',
          })}
        />
      );

    1 &&
      components.push(
        <SlideToggle3
          key={components.length}
          duration={this.state.duration * 2}
          easeCollapse={eases.expoOut}
          easeExpand={eases.expoOut}
          collapsed
          interpolateOnReverse
          render={this.generateMarkup({
            easeCollapseName: 'expoOut interpolate',
            easeExpandName: 'expoOut interpolate',
            easeCollapse: eases.expoOut,
            easeExpand: eases.expoOut,
            customText: 'interpolateOnReverse',
          })}
        />
      );

    1 &&
      components.push(
        <SlideToggle4
          key={components.length}
          noDisplayStyle
          duration={this.state.duration}
          easeCollapse={bezierEaseInOutQuart}
          easeExpand={bezierEaseInOutQuart}
          collapsed={Math.random() > 0.5}
          render={this.generateMarkup({
            easeCollapseName: this.fnName(bezierEaseInOutQuart),
            easeExpandName: this.fnName(bezierEaseInOutQuart),
            easeCollapse: bezierEaseInOutQuart,
            easeExpand: bezierEaseInOutQuart,
            className: '-header-height',
            customText: 'noDisplayStyle',
          })}
        />
      );

    if (1)
      for (let i = 0; i < 4; i++) {
        const ease = getRandomEase();
        const name = this.fnName(ease);
        components.push(
          <SlideToggle
            key={components.length}
            collapsed
            whenReversedUseBackwardEase
            duration={this.state.duration}
            easeCollapse={ease}
            easeExpand={ease}
            render={this.generateMarkup({
              easeCollapseName: name,
              easeExpandName: name,
              customText: 'whenReversedUseBackwardEase',
            })}
          />
        );
      }

    1 &&
      components.push(
        <SlideToggle
          key={components.length}
          duration={this.state.duration}
          interpolateOnReverse
          easeCollapse={eases.quartOut}
          easeExpand={eases.bounceOut}
          onExpanded={({ hasReversed }) => {
            if (!hasReversed) {
              const el = ReactDOM.findDOMNode(this).querySelector(
                '.-extra-anim .slide-toggle__box-inner'
              );
              if (el) {
                const anim = document.createElement('div');
                const anim2 = document.createElement('div');
                const anim3 = document.createElement('div');
                const anim4 = document.createElement('div');
                const anim5 = document.createElement('div');
                const bcr = el.getBoundingClientRect();
                anim.className = 'bounce-anim';
                anim2.className = 'bounce-anim';
                anim3.className = 'bounce-anim';
                anim4.className = 'bounce-anim';
                anim5.className = 'bounce-anim';
                anim.style.left = `${Math.random() * bcr.width}px`;
                anim2.style.left = `${Math.random() * bcr.width}px`;
                anim3.style.left = `${Math.random() * bcr.width}px`;
                anim4.style.left = `${Math.random() * bcr.width}px`;
                anim5.style.left = `${Math.random() * bcr.width}px`;
                el.appendChild(anim);
                el.appendChild(anim2);
                el.appendChild(anim3);
                el.appendChild(anim4);
                el.appendChild(anim5);
                setTimeout(() => {
                  /* cleanup */
                  anim && el.removeChild(anim);
                  anim2 && el.removeChild(anim2);
                  anim3 && el.removeChild(anim3);
                  anim4 && el.removeChild(anim4);
                  anim5 && el.removeChild(anim5);
                }, 1000);
              }
            }
          }}
          collapsed={Math.random() > 0.5}
          render={this.generateMarkup({
            className: '-extra-anim',
            easeCollapseName: 'quartOut',
            easeExpandName: 'bounceOut',
            easeCollapse: eases.quartOut,
            easeExpand: eases.bounceOut,
            customText: 'interpolateOnReverse',
          })}
        />
      );

    0 &&
      components.push(
        <SlideToggle
          key={components.length}
          duration={this.state.duration}
          collapsed
          scrollHeight
          render={({ onToggle, setCollapsibleElement }) => (
            <div className="my-collapsible">
              <button className="button" onClick={onToggle}>
                toggle
              </button>
              <div
                className="my-collapsible__content"
                ref={setCollapsibleElement}
              >
                Collapsible content
              </div>
            </div>
          )}
        />
      );

    return (
      <>
        <div className="app">
          <header className="app__header">
            <button
              className="app__button"
              onClick={() => {
                this.setState({ duration: ~~(Math.random() * 800 + 200) });
              }}
            >
              Randomize duration
            </button>
            <span>{this.state.duration}</span>
          </header>
          <div className="ease-names">
            <div>Ease names ({easeNames.length}):</div>
            {easeNames.map((name, index) => (
              <span key={index}>{name} </span>
            ))}
          </div>
          {components}
        </div>
      </>
    );
  }

  getFunctionName(fn) {
    return /function ([^(]*)/.exec(`${fn}`)[1];
  }

  fnName = fn => this.getFunctionName(fn);
}
