import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Button, FAB, Avatar } from 'react-native-paper';
import { theme } from '../constants/theme';

export function DashboardScreen({ navigation }: any) {
  const mockResumes = [
    { id: '1', title: 'Software Engineer Resume', updatedAt: '2024-01-15' },
    { id: '2', title: 'Data Scientist Resume', updatedAt: '2024-01-10' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Avatar.Icon size={80} icon="account" />
          <Text style={styles.greeting}>Good morning!</Text>
        </View>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsTitle}>Your Resume Stats</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{mockResumes.length}</Text>
                <Text style={styles.statLabel}>Resumes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Applications</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Interviews</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>Recent Resumes</Title>
            <Button mode="text" onPress={() => navigation.navigate('Templates')}>
              View All
            </Button>
          </View>
          
          {mockResumes.map((resume) => (
            <Card key={resume.id} style={styles.resumeCard}>
              <Card.Content>
                <Text style={styles.resumeTitle}>{resume.title}</Text>
                <Text style={styles.resumeDate}>Updated {resume.updatedAt}</Text>
                <View style={styles.resumeActions}>
                  <Button 
                    mode="outlined" 
                    compact 
                    onPress={() => navigation.navigate('Builder')}
                  >
                    Edit
                  </Button>
                  <Button 
                    mode="text" 
                    compact
                  >
                    Export
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Builder')}
      />
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
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
    color: theme.colors.text,
  },
  statsCard: {
    marginBottom: theme.spacing.lg,
    elevation: 4,
    borderRadius: theme.borderRadius.lg,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  resumeCard: {
    marginBottom: theme.spacing.sm,
    elevation: 2,
    borderRadius: theme.borderRadius.md,
  },
  resumeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  resumeDate: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
  resumeActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: theme.spacing.sm,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});