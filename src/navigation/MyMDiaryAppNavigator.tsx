import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PNGIcon from '../components/MyMDiaryPNGIcon';

import { MainTabParamList, RootStackParamList, OnboardingStackParamList, RegistrationStackParamList } from '../types/MyMDiaryTypes';
import { storage } from '../utils/MyMDiaryStorage';
import { UserProfile } from '../types/MyMDiaryTypes';

// Onboarding screens
import Onboarding1Screen from '../screens/MyMDiaryOnboarding1Screen';
import Onboarding2Screen from '../screens/MyMDiaryOnboarding2Screen';
import Onboarding3Screen from '../screens/MyMDiaryOnboarding3Screen';

// Registration screens
import AvatarSelectionScreen from '../screens/MyMDiaryAvatarSelectionScreen';
import NameInputScreen from '../screens/MyMDiaryNameInputScreen';

// Main app screens
import HomeScreen from '../screens/MyMDiaryHomeScreen';
import CalendarScreen from '../screens/MyMDiaryCalendarScreen';
import DiaryScreen from '../screens/MyMDiaryDiaryScreen';
import ProfileScreen from '../screens/MyMDiaryProfileScreen';
import EditProfileScreen from '../screens/MyMDiaryEditProfileScreen';
import MoodSelectionScreen from '../screens/MyMDiaryMoodSelectionScreen';
import MoodAffirmationScreen from '../screens/MyMDiaryMoodAffirmationScreen';
import DiaryEntryScreen from '../screens/MyMDiaryDiaryEntryScreen';
import DiaryListScreen from '../screens/MyMDiaryDiaryListScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const OnboardingStack = createStackNavigator<OnboardingStackParamList>();
const RegistrationStack = createStackNavigator<RegistrationStackParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource: any;

          if (route.name === 'Home') {
            iconSource = require('../assets/icons/home.png');
          } else if (route.name === 'Calendar') {
            iconSource = require('../assets/icons/calendar.png');
          } else if (route.name === 'Diary') {
            iconSource = require('../assets/icons/diary.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/icons/profile.png');
          } else {
            iconSource = require('../assets/icons/home.png'); // fallback
          }

          return (
            <View style={{ alignItems: 'center' }}>
              <PNGIcon source={iconSource} size={size} tintColor={color} />
              {focused && (
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#77B0E0',
                  marginTop: 4,
                }} />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#B0C4DE',
        tabBarStyle: {
          backgroundColor: '#77B0E0',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 15,
          paddingTop: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: '#4A90E2',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen} 
        options={{ title: 'Calendar' }}
      />
      <Tab.Screen 
        name="Diary" 
        component={DiaryScreen} 
        options={{ title: 'Diary' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardingStack.Screen name="Onboarding1" component={Onboarding1Screen} />
      <OnboardingStack.Screen name="Onboarding2" component={Onboarding2Screen} />
      <OnboardingStack.Screen name="Onboarding3" component={Onboarding3Screen} />
    </OnboardingStack.Navigator>
  );
};

const RegistrationNavigator = () => {
  return (
    <RegistrationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RegistrationStack.Screen name="AvatarSelection" component={AvatarSelectionScreen} />
      <RegistrationStack.Screen name="NameInput" component={NameInputScreen} />
    </RegistrationStack.Navigator>
  );
};

const AppNavigator = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    try {
      const profile = await storage.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error('Error checking user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Can add loading screen
  }

  const getInitialRouteName = () => {
    if (!userProfile) {
      return 'Onboarding';
    }
    return 'Main';
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A90E2',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Registration" 
          component={RegistrationNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MoodSelection" 
          component={MoodSelectionScreen}
          options={{ title: 'Choose Your Mood' }}
        />
        <Stack.Screen 
          name="MoodAffirmation" 
          component={MoodAffirmationScreen}
          options={{ title: 'Today You' }}
        />
        <Stack.Screen 
          name="DiaryEntry" 
          component={DiaryEntryScreen}
          options={{ title: 'Diary Entry' }}
        />
        <Stack.Screen 
          name="DiaryList" 
          component={DiaryListScreen}
          options={{ title: 'My Diary' }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{ title: 'Edit Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;



