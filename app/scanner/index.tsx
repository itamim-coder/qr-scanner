import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, Modal, Vibration, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const API_URL = "http://192.168.31.113:3000/verify";

const Scanner = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    resetScanner();
  }, []);

  const handleScan = async ({ data }: { data: string }) => {
    if (!hasScanned) {
      Vibration.vibrate();
      setScannedData(data);
      setHasScanned(true);
      setIsModalVisible(true);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qrData: data }),
        });
        const json = await res.json();
        if (res.ok) {
          setVerificationMessage(
            json.status === "Verified"
              ? "✅ QR Code Verified!"
              : "❌ QR Code Invalid!"
          );
        } else {
          setVerificationMessage("⚠️ Error verifying QR code.");
        }
      } catch (error) {
        console.error("Error verifying:", error);
        setVerificationMessage("⚠️ Network request failed.");
      }
    }
  };

  const handleSaveData = async () => {
    try {
      if (scannedData) {
        const existing = await AsyncStorage.getItem("scannedHistory");
        const history = existing ? JSON.parse(existing) : [];
        history.push(scannedData);
        await AsyncStorage.setItem("scannedHistory", JSON.stringify(history));
        alert("✅ Data Saved!");
        router.push("/");
      } else {
        alert("No data to save.");
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving data.");
    }
  };

  const resetScanner = () => {
    setHasScanned(false);
    setScannedData(null);
    setVerificationMessage(null); 
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {!hasScanned && (
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={handleScan}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />
      )}

      {/* Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/70 px-4">
          <View className="w-full bg-white p-6 rounded-2xl space-y-4 shadow-lg">
            <Text className="text-xl font-bold text-center text-gray-800">
              Scanned QR Data
            </Text>
            <Text className="text-center text-gray-600 py-6 text-xl">
              {scannedData}
            </Text>

            {/* Verification Message */}
            {verificationMessage && (
              <Text className="text-center text-xl py-3 font-bold text-gray-700">
                {verificationMessage}
              </Text>
            )}

            <View className="flex-row gap-2">
              {/* Save */}
              <TouchableOpacity
                onPress={handleSaveData}
                className="flex-1 bg-green-600 rounded-lg py-3"
              >
                <Text className="text-white text-center font-semibold">
                  Save Data
                </Text>
              </TouchableOpacity>

              {/* Scan Again */}
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  resetScanner();
                }}
                className="flex-1 bg-blue-600 rounded-lg py-3"
              >
                <Text className="text-white text-center font-semibold">
                  Scan Again
                </Text>
              </TouchableOpacity>
            </View>

            {/* Close */}
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                router.push("/");
              }}
              className="absolute top-3 right-4"
            >
              <FontAwesome name="times" size={26} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Scanner;
