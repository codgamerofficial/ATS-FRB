import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import { theme } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

export function HomeScreen({ navigation }: any) {
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Title style={styles.title}>Welcome to ATS Resume Builder</Title>
            <Text style={styles.subtitle}>
              {user ? `Hello, ${user.email}!` : 'Welcome to the app'}
            </Text>
            <Text style={styles.description}>
              Build professional resumes with AI-powered features and get your dream job!
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Builder')}
              style={styles.button}
            >
              Start Building Resume
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.featuresGrid}>
          <Card style={styles.featureCard}>
            <Card.Content>
              <Text style={styles.featureTitle}>📝 Resume Builder</Text>
              <Text style={styles.featureDescription}>
                Create professional resumes with our step-by-step builder
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.featureCard}>
            <Card.Content>
              <Text style={styles.featureTitle}>🤖 AI Features</Text>
              <Text style={styles.featureDescription}>
                Get AI-powered suggestions and insights for your resume
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.featureCard}>
            <Card.Content>
              <Text style={styles.featureTitle}>📄 PDF Export</Text>
              <Text style={styles.featureDescription}>
                Export your resume as high-quality PDF for applications
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.featureCard}>
            <Card.Content>
              <Text style={styles.featureTitle}>🎨 Templates</Text>
              <Text style={styles.featureDescription}>
                Choose from professional resume templates
              </Text>
            </Card.Content>
          </Card>
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
  welcomeCard: {
    marginBottom: theme.spacing.lg,
    elevation: 4,
    borderRadius: theme.borderRadius.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    color: theme.colors.placeholder,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    color: theme.colors.placeholder,
    lineHeight: 20,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    marginBottom: theme.spacing.md,
    elevation: 2,
    borderRadius: theme.borderRadius.md,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  featureDescription: {
    fontSize: 12,
    color: theme.colors.placeholder,
    lineHeight: 16,
  },
});