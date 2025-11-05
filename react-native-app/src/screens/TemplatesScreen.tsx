import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Searchbar, Chip, Button } from 'react-native-paper';
import { theme } from '../constants/theme';

export function TemplatesScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'modern', label: 'Modern' },
    { id: 'classic', label: 'Classic' },
    { id: 'creative', label: 'Creative' },
    { id: 'professional', label: 'Professional' },
  ];

  const templates = [
    { id: '1', name: 'Modern Professional', category: 'modern', preview: '📄' },
    { id: '2', name: 'Classic Elegance', category: 'classic', preview: '📋' },
    { id: '3', name: 'Creative Design', category: 'creative', preview: '🎨' },
    { id: '4', name: 'Executive', category: 'professional', preview: '💼' },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderTemplate = ({ item }: any) => (
    <Card style={styles.templateCard}>
      <Card.Content>
        <Text style={styles.templatePreview}>{item.preview}</Text>
        <Text style={styles.templateName}>{item.name}</Text>
        <Button
          mode="outlined"
          compact
          onPress={() => navigation.navigate('Builder')}
          style={styles.useTemplateButton}
        >
          Use Template
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Resume Templates</Title>
        <Searchbar
          placeholder="Search templates..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>
      
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <Chip
              selected={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
              style={styles.categoryChip}
            >
              {item.label}
            </Chip>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={filteredTemplates}
        renderItem={renderTemplate}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.templatesGrid}
        contentContainerStyle={styles.templatesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  searchbar: {
    marginBottom: theme.spacing.sm,
  },
  categoryContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  categoryChip: {
    marginRight: theme.spacing.sm,
  },
  templatesList: {
    padding: theme.spacing.sm,
  },
  templatesGrid: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  templateCard: {
    width: '48%',
    elevation: 2,
    borderRadius: theme.borderRadius.md,
  },
  templatePreview: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  templateName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  useTemplateButton: {
    marginTop: theme.spacing.xs,
  },
});