import { View, Text, Image, Dimensions, Animated } from "react-native";
import React, { useRef } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width; // Screen width
const SCREEN_HEIGHT = Dimensions.get("window").height; // Screen height

const OnboardingItem = ({ item }) => {

 
  return (
    <View
      style={{ width: SCREEN_WIDTH,  }} // Fullscreen dimensions
      className=""
    >
 
      <Image
        source={item?.image}
        className="h-2/3 w-full"
        resizeMode="cover"
      />


      <View className=" px-6 py-4 ">
        <Text className="text-3xl font-bold mb-4 text-gray-800 text-center">
          {item?.title}
        </Text>
        <Text className="text-base text-gray-600 text-center">
          {item?.description}
        </Text>
      </View>
    </View>
  );
};

export default OnboardingItem;
