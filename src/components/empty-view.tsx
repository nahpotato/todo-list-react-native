import { StyleSheet, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

export default function EmptyView() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon source="task-alt" size={72} color={theme.colors.primary} />
      <Text variant="titleLarge">No hay tareas</Text>
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
