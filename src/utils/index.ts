import { getMaterial3Theme } from '@pchmn/expo-material3-theme';
import {
  DarkTheme as ReactNavigationDark,
  DefaultTheme as ReactNavigationLight,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  type MD3Theme,
} from 'react-native-paper';

export function createTheme() {
  const { dark, light } = getMaterial3Theme();

  const MaterialDark: MD3Theme = { ...MD3DarkTheme, colors: dark };
  const MaterialLight: MD3Theme = { ...MD3LightTheme, colors: light };

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    materialDark: MaterialDark,
    materialLight: MaterialLight,
    reactNavigationDark: ReactNavigationDark,
    reactNavigationLight: ReactNavigationLight,
  });

  return {
    DarkTheme: merge(MaterialDark, DarkTheme),
    LightTheme: merge(MaterialLight, LightTheme),
  };
}
