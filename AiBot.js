


import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { View, Dimensions, ScrollView,  Platform, Keyboard } from "react-native";

export default function AiBot() {
  const screenHeight = Dimensions.get('window').height;
  const initialWebViewHeight = screenHeight - 50;
  const [webViewHeight, setWebViewHeight] = useState(initialWebViewHeight);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);



  const handleKeyboardDidShow = () => {
    setWebViewHeight(initialWebViewHeight - 350);
  };

  const handleKeyboardDidHide = () => {
    setWebViewHeight(initialWebViewHeight); 
  };

  return (
   
  
        <View style={{ flex: 1 }}>
          <View style={{ height: webViewHeight }}>
            <WebView
              source={{ uri: 'https://console.dialogflow.com/api-client/demo/embedded/1ce01cea-7861-4bfb-8fca-b3ccfc0f2c3b' }}
              style={{ flex: 1 }}
              allowsFullscreenVideo={true}
            />
          </View>
        </View>
    
    
  );
}
