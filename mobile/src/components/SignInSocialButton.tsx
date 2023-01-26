import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native'
import { SvgProps } from 'react-native-svg';

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({
  title,
  svg: Svg,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
      className="mb-14 flex w-52 flex-row h-14 gap-2 items-center justify-center rounded-md border-b border-green-600 active:bg-gradient-to-t from-green-200 to-green-600 transition-all"
    >
      <View className="h-full flex items-center justify-center">
        <Svg />
      </View>

      <Text className="text-center font-regular text-base text-white">
        {title}
      </Text>
    </TouchableOpacity>
  )
}