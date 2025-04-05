import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
  Vibration,
  ToastAndroid,
  View,
} from "react-native";
import { CameraView } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

// API URL
const API_URL = "http://192.168.31.113:3000/verify";

const Scanner = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );
  const router = useRouter();

  // Reset camera when returning to this screen
  useEffect(() => {
    setIsCameraActive(true);
    setHasScanned(false);
    setScannedData(null);
  }, []);

  // Handle scan and perform vibration
  const handleScan = async ({ data }: { data: string }) => {
    console.log("Scanned data:", data); // Log the scanned data
    if (!hasScanned) {
      Vibration.vibrate(); // Trigger vibration on scan
      setScannedData(data);
      setHasScanned(true);
      setIsCameraActive(false); // Turn off camera view
      setIsModalVisible(true); // Show modal with data

      // Send the data to the local API for verification
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qrData: data }), // Ensure you're sending "qrData"
        });
        console.log("Response status:", response); // Log the response status
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          if (json.status === "Verified") {
            alert("QR Code Verified!");
            // Handle verified logic
          } else {
            alert("QR Code Invalid!");
          }
        } else {
          alert("Error verifying QR code.");
        }
      } catch (error) {
        console.error("Error verifying QR code:", error);
        alert("Network request failed.");
      }
    }
  };

  // Save data to AsyncStorage
  const handleSaveData = async () => {
    try {
      // Ensure that `scannedData` is not null and is a valid string
      if (scannedData) {
        const existingHistory = await AsyncStorage.getItem("scannedHistory");
        const parsedHistory = existingHistory
          ? JSON.parse(existingHistory)
          : [];

        // Add the new scanned data to the history
        parsedHistory.push(scannedData!);

        // Save the updated history to AsyncStorage
        await AsyncStorage.setItem(
          "scannedHistory",
          JSON.stringify(parsedHistory)
        );
        alert("Data Saved Successfully!"); // Feedback to user

        alert("Data Saved Successfully!");
        setIsModalVisible(false); // Close the modal after saving data
        setScannedData(null); // Reset the scanned data
        setIsCameraActive(false); // Disable camera view
        setHasScanned(false); // Reset the scan state
        router.push("/"); // Navigate back to main screen
      } else {
        alert("No data to save.");
      }
    } catch (error) {
      console.error("Error saving data:", error); // Log any error to the console
      alert("Error saving data.");
    }
  };

  // Close modal and reset states
  const closeModal = () => {
    setIsModalVisible(false);
    setScannedData(null);
    setIsCameraActive(true);
    setHasScanned(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={handleScan}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              padding: 20,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOpacity: 0.1,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              Scanned Data
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#555",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {scannedData}
            </Text>

            {/* Close Button */}
            <TouchableOpacity
              onPress={closeModal}
              style={{ position: "absolute", top: 10, right: 10 }}
            >
              <Icon name="times" size={30} color="black" />
            </TouchableOpacity>

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSaveData}
              style={{
                backgroundColor: "#4CAF50",
                padding: 12,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                Save Data
              </Text>
            </TouchableOpacity>

            {/* Scan Again Button */}
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                setScannedData(null);
                setIsCameraActive(true);
                setHasScanned(false);
              }}
              style={{
                backgroundColor: "#2196F3",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                Scan Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Scanner;
