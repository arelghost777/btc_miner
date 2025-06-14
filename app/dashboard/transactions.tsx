import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React = require('react');

export default function PayWithdrawalFees() {

    const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
<TouchableOpacity style={styles.backButton} onPress={router.back}>
  <Ionicons name="arrow-back" size={24} color="white" />
</TouchableOpacity>
    
        <Text style={styles.headerTitle}>ROBUST MINER V 2025</Text>
      </View>
        <View style={styles.container2}>  
            <StatusBar backgroundColor="#00C853" barStyle="light-content" />
            <Text>
                No transactions !
            </Text>
        </View>
         <View style={styles.footer}>
                <Text style={styles.footerText}>ROBUST MINER V 2025</Text>
              </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflowY: 'auto'
  },
  container2: {  
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    backgroundColor: '#00C853',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
   footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    textAlign: 'center',
    color: '#9e9e9e',
  },
});