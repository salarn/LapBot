import { checkPropTypes } from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  Image
} from 'react-native';
import GetPixelColor from 'react-native-get-pixel-color';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import GameData from '../helper/GameData'
import RoundsCalculationMod from '../helper/RoundsCalculationMod'

let frameOrgwidth = 1
let frameOrgHeight = 1

const bullseyeRadius = (1.0 / 8.0) / 3.0 * frameOrgHeight

const distance = (a, b, x, y) => {
  let val1 = (a - x) * (a - x)
  let val2 = (b - y) * (b - y)
  let ans = Math.sqrt(val1 + val2)
  return ans
}

const pixelScoreCalculator = (color) => {
  color = "" + color;
  var result = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    , (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
  var r = result[0]
  var g = result[1]
  var b = result[2]
  var score = (g / 255) * 100 - (r / 255) * 100;
  return score
}

const ScoreCalculator = async (x, y, levelNumber, roundNumber, orgFrameWidth, orgFrameHeight) => {

  frameOrgwidth = orgFrameWidth
  frameOrgHeight = orgFrameHeight

  await GetPixelColor.setImage(Image.resolveAssetSource(GameData.scoreFrame[levelNumber][RoundsCalculationMod(levelNumber, roundNumber)]).uri)
    .catch(err => {
      // Handle errors
      console.log("Error to load the image")
      throw error;
    })
  let numcounter = 0;
  let normalizeScore = 0.0;
  for (let i = parseInt(x * frameOrgwidth - bullseyeRadius);
    i <= parseInt(x * frameOrgwidth + bullseyeRadius);
    i += 10) {
    for (let j = parseInt(y * frameOrgHeight - bullseyeRadius);
      j <= parseInt(y * frameOrgHeight + bullseyeRadius);
      j += 10) {
      if (i <= 0 || i >= frameOrgwidth || j <= 0 || j >= frameOrgHeight)
        continue
      if (distance(parseInt(x * frameOrgwidth), parseInt(y * frameOrgHeight), i, j) > bullseyeRadius)
        continue

      await GetPixelColor.pickColorAt(i, j)
        .then((color) => {
          numcounter++;
          normalizeScore += pixelScoreCalculator(color)
        })
        .catch(err => {
          // Handle errors
          console.log("Error to read one pixel")
          throw error;
        });
    }
  }
  if (numcounter == 0)
    return null;
  normalizeScore /= numcounter;
  return normalizeScore
}

export default ScoreCalculator