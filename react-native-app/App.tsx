// Main App Component - Beautiful and Clean
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { theme } from './src/theme/Theme';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar style="light" backgroundColor={theme.colors.primary} />
          <SafeAreaView style={styles.safeArea}>
            <RootNavigator />
          </SafeAreaView>
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
});