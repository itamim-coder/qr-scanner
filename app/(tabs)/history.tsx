import React, { useState, useEffect } from "react";
import {

  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // For navigation
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
  const [history, setHistory] = useState<string[]>([]); // Array to store scanned data
  const router = useRouter(); // Hook for navigation
console.log(history);
  // Fetch scanned history from AsyncStorage
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Retrieve stored data
        const storedData = await AsyncStorage.getItem("scannedHistory");
        if (storedData) {
          setHistory(JSON.parse(storedData)); // Parse and set the history
        }
      } catch (error) {
        console.error("Error retrieving history:", error);
      }
    };

    fetchHistory();
  }, []);

  // Handle clicking on a scanned item
  const handleItemClick = (item: string) => {
    console.log("Scanned data clicked:", item);
    // You can navigate to another screen or handle the item click as needed
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className=" justify-center items-center">
        <Text className="text-2xl font-semibold mb-4">Scanned History</Text>

        {/* Display the list of scanned data */}
        {history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleItemClick(item)}
                className="bg-blue-100 p-4 rounded-lg mb-2"
              >
                <Text className="text-black">{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text className="text-gray-600">No scanned data found.</Text>
        )}

        {/* Button to go back to Scanner */}
        <TouchableOpacity
          onPress={() => router.push("/scanner")} // Navigate back to the scanner screen
          className="bg-blue-600 px-4 py-2 rounded-lg mt-4"
        >
          <Text className="text-white text-center">Go to Scanner</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default History;
