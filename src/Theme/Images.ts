import { ThemeImages, ThemeVariables } from '@/Theme/theme.type'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({}: ThemeVariables): ThemeImages {
  return {
    logo: require('@/Assets/Images/logo.png'),
    video: require('@/Assets/Videos/LapChol.mp4'),
    frame: require('@/Assets/Images/frame.png'),
  }
}
