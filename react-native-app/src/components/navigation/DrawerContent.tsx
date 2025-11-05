import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../constants/theme';

export function DrawerContent(props: any) {
  const { user, signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={styles.userInfo}>
            <Avatar.Icon size={60} icon="account" style={styles.avatar} />
            <View style={styles.userText}>
              <Title style={styles.title}>
                {user?.user_metadata?.full_name || 'User'}
              </Title>
              <Paragraph style={styles.caption} numberOfLines={1}>
                {user?.email}
              </Paragraph>
            </View>
          </View>
        </View>

        <ScrollView style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate('MainTabs');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="file-edit" color={color} size={size} />
            )}
            label="Resume Builder"
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate('Builder');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="view-module" color={color} size={size} />
            )}
            label="Templates"
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate('MainTabs', { screen: 'Templates' });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="chart-line" color={color} size={size} />
            )}
            label="Dashboard"
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate('MainTabs', { screen: 'Dashboard' });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="account-outline" color={color} size={size} />
            )}
            label="Profile"
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate('MainTabs', { screen: 'Profile' });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="cog-outline" color={color} size={size} />
            )}
            label="Settings"
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate('Settings');
            }}
          />
        </ScrollView>

        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="help-circle-outline" color={color} size={size} />
            )}
            label="Help & Support"
            labelStyle={styles.drawerLabel}
            onPress={() => {
              // Handle help navigation
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="logout" color={color} size={size} />
            )}
            label="Sign Out"
            labelStyle={[styles.drawerLabel, styles.signOutLabel]}
            onPress={() => {
              signOut();
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  userInfoSection: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: theme.spacing.md,
  },
  userText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  caption: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  drawerSection: {
    flex: 1,
    paddingTop: theme.spacing.sm,
  },
  drawerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  signOutLabel: {
    color: theme.colors.error,
  },
  bottomDrawerSection: {
    borderTopColor: theme.colors.disabled,
    borderTopWidth: 1,
    paddingTop: theme.spacing.sm,
  },
});