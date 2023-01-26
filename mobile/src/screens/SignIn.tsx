import { useCallback, useState } from "react";
import { Text, View, Image, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { api } from "../lib/axios";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";
import { useAuth } from "../hooks/auth";
import Logo from './../assets/logo.svg'
import GoogleSvg from './../assets/google.svg'
import { SignInSocialButton } from "../components/SignInSocialButton";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimumSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

type SummaryProps = {
  id: string
  date: string
  amount: number
  completed: number
}[]


export function SignIn() {
  const [loading, setLoading] = useState(false)

  const { navigate } = useNavigation()
  const { signInWithGoogle } = useAuth()

  async function handleSignInWithGoogle() {
    try {
      setLoading(true)
      await signInWithGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possivel conectar com a conta Google')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 flex items-center justify-between bg-background px-8 pt-16">
      <View className="w-full flex-row items-center justify-between">
        <Logo />
      </View>

      <Image source={require('./../assets/summary.png')} resizeMode="cover" />

      <SignInSocialButton 
        title="Entrar com Google"
        svg={GoogleSvg}
        onPress={handleSignInWithGoogle}
      />
    </View>
  )
}