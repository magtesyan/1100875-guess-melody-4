import renderer from "react-test-renderer";
import React from "react";
import {Router} from "react-router-dom";

import {GameScreen} from "./game-screen.jsx";
import {GameType} from "../../const.js";
import history from "../../history.js";

const children = <div className="children-component" />;
const noop = () => {};

describe(`GameScreen component render correctly`, () => {
  it(`with type GameType.ARTIST`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <GameScreen
            type={GameType.ARTIST}
            mistakes={2}
            goToWelcome={noop}
          >
            {children}
          </GameScreen>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with type GameType.GENRE`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <GameScreen
            type={GameType.GENRE}
            mistakes={2}
            goToWelcome={noop}
          >
            {children}
          </GameScreen>
        </Router>
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
