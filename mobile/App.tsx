import { StatusBar } from 'react-native';
import './src/lib/dayjs'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter'

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </>
  );
}
