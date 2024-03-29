import { StyleSheet, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

interface ErrorViewProps {
  error: unknown;
}

export default function ErrorView(props: ErrorViewProps) {
  const { error } = props;

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon source="error-outline" size={72} color={theme.colors.error} />
      <Text variant="titleLarge">Ocurrió un error</Text>
      <Text>{`${error}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});
