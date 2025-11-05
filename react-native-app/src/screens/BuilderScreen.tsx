import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Button, ProgressBar } from 'react-native-paper';
import { theme } from '../constants/theme';

export function BuilderScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    'Personal Info',
    'Summary',
    'Education',
    'Experience',
    'Skills',
    'Projects',
    'Review'
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep + 1) / steps.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Resume Builder</Title>
        <Text style={styles.stepText}>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </Text>
        <ProgressBar progress={progress} style={styles.progressBar} />
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.contentCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>{steps[currentStep]}</Title>
            <Text style={styles.sectionDescription}>
              {getStepDescription(currentStep)}
            </Text>

            <View style={styles.stepContent}>
              {getStepContent(currentStep)}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.navigation}>
        <Button
          mode="outlined"
          onPress={prevStep}
          disabled={currentStep === 0}
          style={styles.navButton}
        >
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={currentStep === steps.length - 1 ? () => {} : nextStep}
          style={styles.navButton}
        >
          {currentStep === steps.length - 1 ? 'Save Resume' : 'Next'}
        </Button>
      </View>
    </View>
  );
}

function getStepDescription(step: number): string {
  const descriptions = [
    'Add your basic contact information and personal details',
    'Write a compelling summary that highlights your key qualifications',
    'Add your educational background and qualifications',
    'Add your work experience and achievements',
    'List your technical and soft skills',
    'Add any notable projects you have worked on',
    'Review your resume before finalizing'
  ];
  return descriptions[step] || '';
}

function getStepContent(step: number): React.ReactNode {
  // This would contain the actual form components for each step
  // For now, we'll return placeholder content
  return (
    <Text style={styles.placeholderText}>
      Step {step + 1} content will go here...
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: theme.spacing.sm,
  },
  stepText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  contentCard: {
    elevation: 2,
    borderRadius: theme.borderRadius.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  sectionDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  stepContent: {
    minHeight: 200,
  },
  placeholderText: {
    fontSize: 16,
    color: theme.colors.placeholder,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.disabled,
  },
  navButton: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
  },
});