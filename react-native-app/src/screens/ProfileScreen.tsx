import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Avatar, Button, List, Switch } from 'react-native-paper';
import { theme } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

export function ProfileScreen({ navigation }: any) {
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <Avatar.Icon size={80} icon="account" />
              <Title style={styles.userName}>
                {user?.user_metadata?.full_name || user?.email || 'User'}
              </Title>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.menuCard}>
          <List.Section>
            <List.Item
              title="Edit Profile"
              description="Update your personal information"
              left={(props) => <List.Icon {...props} icon="account-edit" />}
              onPress={() => {}}
            />
            <List.Item
              title="Resume Builder"
              description="Create or edit your resume"
              left={(props) => <List.Icon {...props} icon="file-edit" />}
              onPress={() => navigation.navigate('Builder')}
            />
            <List.Item
              title="Templates"
              description="Browse resume templates"
              left={(props) => <List.Icon {...props} icon="view-module" />}
              onPress={() => navigation.navigate('Templates')}
            />
            <List.Item
              title="Settings"
              description="App preferences and notifications"
              left={(props) => <List.Icon {...props} icon="cog" />}
              onPress={() => navigation.navigate('Settings')}
            />
          </List.Section>
        </Card>

        <View style={styles.actionsContainer}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Settings')}
            style={styles.button}
          >
            Settings
          </Button>
          <Button
            mode="contained"
            onPress={() => signOut()}
            style={styles.button}
            buttonColor={theme.colors.error}
          >
            Sign Out
          </Button>
        </View>
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
  profileCard: {
    marginBottom: theme.spacing.lg,
    elevation: 4,
    borderRadius: theme.borderRadius.lg,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: theme.spacing.md,
    color: theme.colors.text,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
  menuCard: {
    elevation: 2,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  actionsContainer: {
    gap: theme.spacing.sm,
  },
  button: {
    marginBottom: theme.spacing.sm,
  },
});