import GameData from "./GameData";

const RoundsCalculationMod = (levelNumber, roundNumber) => {
  let mod = GameData.numberOfRoundsInLevel[levelNumber]
  return (((roundNumber - 1) % mod) + 1)
}

export default RoundsCalculationMod;