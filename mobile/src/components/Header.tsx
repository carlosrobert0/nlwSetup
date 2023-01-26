import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import Logo from '../assets/logo.svg'
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/auth";

export function Header() {
  const { navigate } = useNavigation()
  const { signOut } = useAuth()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />

      <View className="flex items-end justify-between gap-2">
        <TouchableOpacity
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <Feather
            name="log-out"
            color={colors.green[800]}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('new')}
          activeOpacity={0.7}
          className="flex flex-row h-11 px-4 border border-green-200 rounded-lg items-center"
        >
          <Feather
            name="plus"
            color={colors.green[200]}
            size={20}
          />

          <Text className="text-white ml-3 font-semibold text-base">
            Novo
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}