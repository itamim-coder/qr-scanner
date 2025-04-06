# 📱 QR Code Scanner App

A simple and powerful React Native application built using Expo that allows users to scan QR codes, verify them with a backend server, and view a history of scanned codes. The app uses `expo-camera` for scanning, `AsyncStorage` for storing history locally, and `expo-router` for screen navigation.

---

## ✨ Features

- 🔍 **QR Code Scanning**  
  Scan QR codes using the device camera with vibration feedback on successful scan.

- 🔐 **QR Code Verification**  
  After scanning, the QR code is sent to a backend API for verification. The app displays alerts based on the server response (e.g., Verified or Invalid).

- 💾 **Save Scanned Data**  
  Users can choose to save valid QR data locally using AsyncStorage.

- 🕘 **Scanned History**  
  View all previously saved QR codes in a clean and styled history screen.

- 🧭 **Navigation**  
  Smooth screen transitions using `expo-router`.

## 🔧 Tech Stack

- **React Native** with **Expo**
- **TypeScript**
- **expo-camera** for QR scanning
- **AsyncStorage** for local persistence
- **expo-router** for navigation
- **Tailwind CSS (via NativeWind)** for styling

---

## 📲 How It Works

### 🔹 Scanner Screen (`/scanner`)
- Opens the device camera to scan QR codes.
- On successful scan:
  - Vibrates the device.
  - Sends scanned data to the backend server (`/verify` endpoint).
  - Shows a modal with the scanned content.
  - Allows saving data to local storage or re-scanning.

### 🔹 History Screen (`/history`)
- Retrieves stored scanned data from AsyncStorage.
- Displays the data in a styled list.
- Includes a button to navigate back to the scanner.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/qr-code-scanner-app.git
   cd qr-code-scanner-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npx expo start
   ```

4. **Scan QR and Verify**
   - Use the scanner to scan any QR code.
   - The app will send a POST request to your backend at `http://192.168.x.x:3000/verify`.

---
## 📌 Notes

- Ensure the backend URL in `API_URL` (`Scanner.tsx`) matches your local IP.
- Make sure your backend server is running and accessible from your device.

## 🧪 Backend API

**Endpoint**: `POST /verify`  
**Payload**:
```json
{
  "qrData": "scanned_qr_content"
}
```

**Expected Response**:
```json
{
  "status": "Verified" | "Invalid"
}
```
---

## 🙌 Acknowledgments

Built with ❤️ using React Native & Expo.

---


---

## 👨‍💻 Author

- Developed by [Imtiaz Tamim](https://github.com/itamim-coder)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
```

You can copy this directly into your `README.md` file. Let me know if you’d like to include a screenshot section or live demo link too!