import React from 'react';
import PropTypes from 'prop-types';

const Scoreboard = props => {
  /*
    Scoreboard will live inside of App and the 'score' value of the answered question will need to be added to or subtracted
    from the score of the current quiz session.

    I don't think it needs to be an actual board. An <h1> tag with a big number will allow them to visibly practice state/prop
    passing.
  */

  const scoreboards = (function () {
    var arr = [];
    var keys = ['q', 'f', 'j', 'p'];
    for (let i = 0; i < props.players; i++) {
      arr.push(
        <div key={i}>
          <h3 className={props.selectedPlayer === (i + 1) ? "selected" : ""} id='scoreboard-title'>Player {i + 1} ({keys[i]})</h3>
          <div id={'scoreboard'} data-testid="scoreboard">
            ${props.score[i + 1]}
          </div>
        </div>
      )
    }
    return arr;
  })()

  console.log(scoreboards)
  return (
    <>
      {scoreboards}
    </>
  );
};

Scoreboard.propTypes = {
  score: PropTypes.number,
}

export default Scoreboard;
