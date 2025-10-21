import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/MyMDiaryTypes';
import { moods } from '../data/MyMDiaryMoods';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import FlowerIcon from '../components/MyMDiaryFlowerIcon';

type MoodSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MoodSelection'>;
type MoodSelectionScreenRouteProp = RouteProp<RootStackParamList, 'MoodSelection'>;

const MoodSelectionScreen: React.FC = () => {
  const navigation = useNavigation<MoodSelectionScreenNavigationProp>();
  const route = useRoute<MoodSelectionScreenRouteProp>();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleChoose = () => {
    if (selectedMood) {
      const mood = moods.find(m => m.id === selectedMood);
      if (mood) {
        navigation.navigate('MoodAffirmation', { mood });
      }
    }
  };

  return (
    <CloudBackground>
      <AppHeader title="Choose Your Mood" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.moodsContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodCard,
                selectedMood === mood.id && styles.selectedMoodCard
              ]}
              onPress={() => handleMoodSelect(mood.id)}
            >
              <FlowerIcon color={mood.color} size={80} />
              <Text style={[styles.moodName, { color: mood.color }]}>
                {mood.name}
              </Text>
              <View style={styles.descriptionCard}>
                <Text style={styles.description}>{mood.description}</Text>
                <Text style={styles.symbol}>{mood.symbol}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {selectedMood && (
          <TouchableOpacity
            style={styles.chooseButton}
            onPress={handleChoose}
          >
            <Text style={styles.chooseButtonText}>Choose</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </CloudBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  moodsContainer: {
    gap: 20,
  },
  moodCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
  selectedMoodCard: {
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  moodName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  descriptionCard: {
    backgroundColor: '#87CEEB',
    borderRadius: 15,
    padding: 15,
    width: '100%',
  },
  description: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  symbol: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  chooseButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chooseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MoodSelectionScreen;



