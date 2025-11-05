import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Card, Title, List, Button, Divider } from 'react-native-paper';
import { theme } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';

export function SettingsScreen({ navigation }: any) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Settings</Title>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Appearance</Title>
            <List.Item
              title="Dark Mode"
              description="Switch between light and dark themes"
              right={() => (
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
                />
              )}
            />
          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Notifications</Title>
            <List.Item
              title="Push Notifications"
              description="Get notified about resume tips and job alerts"
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
                />
              )}
            />
          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Resume Builder</Title>
            <List.Item
              title="Auto Save"
              description="Automatically save your progress"
              right={() => (
                <Switch
                  value={autoSave}
                  onValueChange={setAutoSave}
                  trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
                />
              )}
            />
          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Account</Title>
            <List.Item
              title="Change Password"
              description="Update your account password"
              left={(props) => <List.Icon {...props} icon="lock" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Privacy Policy"
              description="View our privacy policy"
              left={(props) => <List.Icon {...props} icon="shield-outline" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Terms of Service"
              description="View our terms of service"
              left={(props) => <List.Icon {...props} icon="file-document-outline" />}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Support</Title>
            <List.Item
              title="Help Center"
              description="Get help and support"
              left={(props) => <List.Icon {...props} icon="help-circle-outline" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Contact Support"
              description="Get in touch with our support team"
              left={(props) => <List.Icon {...props} icon="email-outline" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Rate App"
              description="Rate ATS Resume Builder on the store"
              left={(props) => <List.Icon {...props} icon="star-outline" />}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.doneButton}
        >
          Done
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
  },
  sectionCard: {
    marginBottom: theme.spacing.lg,
    elevation: 2,
    borderRadius: theme.borderRadius.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  doneButton: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
});