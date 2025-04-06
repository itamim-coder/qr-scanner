import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; 
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
  const [history, setHistory] = useState<string[]>([]); 
  const router = useRouter(); 

  // Fetch scanned history from AsyncStorage
  useEffect(() => {
    const fetchHistory = async () => {
      try {

        const storedData = await AsyncStorage.getItem("scannedHistory");
        if (storedData) {
          setHistory(JSON.parse(storedData)); 
        }
      } catch (error) {
        console.error("Error retrieving history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-3xl font-semibold mb-6 text-gray-800">
          Saved QR Data
        </Text>

        {history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full max-w-lg">
                <Text className="text-black text-lg">{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text className="text-gray-600 text-xl">No scanned data found.</Text>
        )}

        {/* Button to go back to Scanner */}
        <TouchableOpacity
          onPress={() => router.push("/scanner")}
          className="bg-green-600 px-6 py-3 rounded-lg  w-full max-w-xs"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Go to Scanner
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default History;
