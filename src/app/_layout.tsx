import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { ThemeProvider } from '@react-navigation/native';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useNavigationContainerRef } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import db from '~/database';
import migrations from '~/drizzle/migrations';
import { createTheme } from '~/utils';

const { DarkTheme, LightTheme } = createTheme();

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
    NavigationBar.setBackgroundColorAsync(theme.colors.background);

    NavigationBar.setButtonStyleAsync(
      colorScheme === 'dark' ? 'dark' : 'light',
    );
  }, [colorScheme, theme]);

  if (!success || error) {
    return null;
  }

  return (
    <ThemeProvider value={theme}>
      <PaperProvider
        theme={theme}
        settings={{ icon: (props) => <MaterialIcons {...props} /> }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </ThemeProvider>
  );
}
