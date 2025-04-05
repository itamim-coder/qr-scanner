// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import HomeScreen from "../../app/(drawer)/(tabs)/index"; // Adjust the import to your folder structure
// import ExploreScreen from "../../app/(drawer)/(tabs)/explore"; // Adjust to match your "explore" tab path
// import { View, Text } from "react-native";

// const Drawer = createDrawerNavigator();

// const CustomDrawerContent = (props) => {
//   return (
//     <View className="flex-1">
//       <Text className="text-center font-bold py-4">Custom Drawer Header</Text>
//       {/* Additional customizations like user info or footer */}
//     </View>
//   );
// };

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Tabs"
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         drawerStyle: {
//           backgroundColor: "#f9f9f9",
//           width: 240,
//         },
//         headerShown: false, // Avoid duplication of headers
//       }}
//     >
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Explore" component={ExploreScreen} />
//       {/* Add more screens or tabs as needed */}
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;
