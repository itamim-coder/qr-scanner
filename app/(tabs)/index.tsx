import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCameraPermissions } from "expo-camera";
import { Link } from "expo-router";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  console.log(permission);
  const isPermissionGranted = Boolean(permission?.granted);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
        <View className="flex-1 justify-center items-center min-h-screen">
          <Pressable onPress={requestPermission}>
            <Text className="text-blue-600 font-semibold text-2xl">
              Request Permissions
            </Text>
          </Pressable>
          <Link href={"/scanner"} asChild>
            <Pressable disabled={!isPermissionGranted}>
              <Text
                className={`px-4 py-2 rounded-md text-white bg-blue-600 text-center ${
                  !isPermissionGranted ? "opacity-50" : "opacity-100"
                }`}
              >
                Scan Code
              </Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
