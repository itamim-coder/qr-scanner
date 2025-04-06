import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCameraPermissions } from "expo-camera";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
        className="bg-white"
      >
        <View className="flex-1 justify-center items-center px-6 py-10">
          <Ionicons name="qr-code-outline" size={120} color="#3b82f6" />

          <Text className="text-3xl font-bold text-blue-600 mt-4 mb-2">
            QR Scanner
          </Text>
          <Text className="text-center text-gray-500 text-base mb-8">
            Scan any QR code to verify its authenticity.
          </Text>

          {!isPermissionGranted && (
            <Pressable
              onPress={requestPermission}
              className="bg-blue-600 px-6 py-3 rounded-full"
            >
              <Text className="text-white font-semibold text-lg">
                Request Camera Permission
              </Text>
            </Pressable>
          )}

          {isPermissionGranted && (
            <Link href={"/scanner"} asChild>
              <Pressable className="bg-green-600 px-6 py-3 rounded-full">
                <Text className="text-white font-semibold text-lg">
                  Start Scanning
                </Text>
              </Pressable>
            </Link>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
