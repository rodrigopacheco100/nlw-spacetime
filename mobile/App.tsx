import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950">
      <Text className="p-8 text-xl text-zinc-50">Hello</Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
