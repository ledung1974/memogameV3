"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scoreToClock = scoreToClock;
exports.updateTopScores = updateTopScores;
exports.updateBestScore = updateBestScore;

function scoreToClock(count) {
  //count in (second) convert to minutes:seconds format  
  var minutes = parseInt(count / 60, 10); //to integer in Decimal

  var seconds = parseInt(count % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes; //add "0" before (0..9) 

  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}

function updateTopScores(playerId, playerName, playerScore, playerClicks, topScores) {
  var isTopScoresChanged = false;
  var last = topScores.length - 1; //Comparing playerScore and playerClicks with the last player in the topScores

  if (playerScore < topScores[last].score || playerScore === topScores[last].score && playerClicks < topScores[last].clicks) {
    var foundPlayerIndex = topScores.findIndex(function (element) {
      return element.uid === playerId;
    });

    if (foundPlayerIndex === -1) {
      //New player will add to TopScores and replace the last player in TopScores
      topScores.splice(last, 1, {
        uid: playerId,
        name: playerName,
        score: playerScore,
        clicks: playerClicks
      });
      isTopScoresChanged = true; //Enable Update to Firebase Button
    } else {
      //Player is already in TopScores --> replace score and clicks only if they are better
      if (playerScore < topScores[foundPlayerIndex].score || playerScore === topScores[foundPlayerIndex].score && playerClicks < topScores[foundPlayerIndex].clicks) {
        //Update score of the player in topScores
        topScores.splice(foundPlayerIndex, 1, {
          uid: playerId,
          name: playerName,
          score: playerScore,
          clicks: playerClicks
        });
        isTopScoresChanged = true; //Enable Update to Firebase Button
      }
    } //Re-sort topScores after relapcing 
    //sort by score first, then by clicks


    topScores.sort(function (a, b) {
      if (a.score < b.score) {
        return -1; //a with lower ID than b
      } else {
        if (a.score === b.score && a.clicks < b.clicks) {
          return -1; //a with lower ID than b
        } else {
          return 1; //a with lower ID than b
        }
      }
    });
  }

  return isTopScoresChanged;
}

function updateBestScore(level, player, playerScore, playerClicks) {
  var isBestScoresChanged = false;

  if (level === 16) {
    if (playerScore < player.bestEasyScore || playerScore === player.bestEasyScore && playerClicks < player.bestEasyClicks) {
      //Update best score of the player in playerData
      player.bestEasyScore = playerScore;
      player.bestEasyClicks = playerClicks;
      isBestScoresChanged = true;
    }
  } else {
    if (playerScore < player.bestHardScore || playerScore === player.bestHardScore && playerClicks < player.bestHardClicks) {
      //Update best score of the player in playerData
      player.bestHardScore = playerScore;
      player.bestHardClicks = playerClicks;
      isBestScoresChanged = true;
    }
  }

  return isBestScoresChanged;
}