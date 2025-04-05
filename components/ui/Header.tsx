import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView className="flex justify-center items-center pb-3 ">
      <Text className="text-2xl font-semibold text-green-500">Alteryouth</Text>
    </SafeAreaView>
  );
};

export default Header;
