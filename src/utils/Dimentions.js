import { Dimensions } from 'react-native';
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width
export const windowWidth = h < w ? h : w
export const windowHeight = h > w ? h : w