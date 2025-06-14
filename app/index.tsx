


import Loading from '@/Components/Loading';
import { useAuthStore } from '@/stores/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter()
  // Solution alternative avec useRouter si les liens ne fonctionnent pas
  const navigateTo = (path: any) => {
    router.push(path);
  };


   const { user, session, isLoading, restoreSession } = useAuthStore()
    const [isReady, setIsReady] = useState(false)
  
    useEffect(() => {
      const initializeAuth = async () => {
        try {
          const stored = await AsyncStorage.getItem('auth-storage')
  
          if (stored) {
            await restoreSession()
          }
        } catch (error) {
          console.error('Auth initialization failed:', error)
        } finally {
          setIsReady(true)
        }
      }
  
      initializeAuth()
    }, [])
  
    if (!isReady || isLoading) {
      return <Loading />
    }

  return user ? <Redirect href="/dashboard" /> : (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../assets/images/Bitcoin.webp')}
        style={styles.image}
      />
      <Text style={styles.title}>ROBUST MINER</Text>

      {/* Solution 2: Alternative avec useRouter */}
      <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.signupbutton}
        onPress={() => navigateTo("/signup")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.loginButton}
        onPress={() => navigateTo("/login")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

// Styles inchangés
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 40
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  signupbutton: {
    width: '100%',
    height: 55,
    backgroundColor: '#00C853',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 55,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});