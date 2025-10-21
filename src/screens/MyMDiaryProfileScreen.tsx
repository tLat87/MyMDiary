import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Share, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/MyMDiaryTypes';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import { storage } from '../utils/MyMDiaryStorage';
import { UserProfile } from '../types/MyMDiaryTypes';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  // Update profile every time the screen gets focus
  useFocusEffect(
    React.useCallback(() => {
      loadUserProfile();
    }, [])
  );

  const loadUserProfile = async () => {
    try {
      const profile = await storage.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditProfile' as any);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out My Mood Flower Diary - a gentle space for women to connect with their emotions and track their daily moods!',
        title: 'My Mood Flower Diary',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <CloudBackground>
      <AppHeader title="Profile" />
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <Image
              source={{
                uri: userProfile?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face'
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.nameButton}>
              <Text style={styles.nameText}>{userProfile?.name || 'Marina'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>About the app</Text>
            <Text style={styles.aboutText}>
              My Mood Flower Diary is a gentle space for women, where every day blossoms with a new mood. 
              Choose your flower, receive words of support, and save your thoughts in a diary that grows with you.
            </Text>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CloudBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100, // Padding for new navigation
  },
  profileSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  profileCard: {
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 20,
  },
  nameButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  nameText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aboutSection: {
    flex: 1,
  },
  aboutCard: {
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aboutTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  aboutText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  shareButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  shareButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;



