import { View, ActivityIndicator } from 'react-native';
import colors from 'tailwindcss/colors'

export function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#09090a' }}>
      <ActivityIndicator color={colors.green[400]} />
    </View>
  )
}