import { View, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

const NextButton = ({ percentage, scrollTo }) => {
  const size = 128; // Diameter of the SVG
  const strokeWidth = 4; // Thickness of the circles
  const center = size / 2; // Center of the SVG
  const radius = size / 2 - strokeWidth / 2; // Radius for the inner circle
  const circumference = 2 * Math.PI * radius; // Circumference for the stroke
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({ strokeDashoffset });
        }
      },
      [percentage]
    );
  });
  return (
    <View className="justify-center items-center flex-1">
      {/* SVG for Circular Progress */}
      <Svg width={size} height={size} color="#ffffff">
        {/* Background Circle */}
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <Circle
            ref={progressRef}
            stroke="#1dc468"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </G>
      </Svg>

      {/* Centered TouchableOpacity Button */}
      <View
        style={{
          position: "absolute", // Overlay on top of the SVG
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={scrollTo}
          style={{
            backgroundColor: "#1dc468",
            borderRadius: 50,
            padding: 16,
          }}
        >
          <AntDesign name="arrowright" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NextButton;
