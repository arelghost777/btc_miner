import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React = require('react');

import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PayWithdrawalFees() {

    const router = useRouter()

      const copyToClipboard = async () => {
        await Clipboard.setStringAsync('greatminerbtc@gmail.com');
        alert('E-mail copied to clipboard!');
      };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
<TouchableOpacity style={styles.backButton} onPress={router.back}>
  <Ionicons name="arrow-back" size={24} color="white" />
</TouchableOpacity>
    
        <Text style={styles.headerTitle}>Help</Text>
      </View>
                  <StatusBar backgroundColor="#00C853" barStyle="light-content" />
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
             <View style={styles.content}>
        {/* Bitcoin Logo */}
        <View style={styles.bitcoinLogo}>
          <FontAwesome name="bitcoin" size={80} color="#00C853" />
        </View>
        <Text style={styles.title}>ROBUST MINER</Text>

        <View style={{marginBottom:30}}>
            <Text style={styles.h1}>Contact Us Now</Text>
            <Text style={styles.h4}>Telegram : @greateminerapp</Text>
        </View>
        <View style={{marginBottom:60, alignItems: "center",justifyContent: "center",}}>
            <Text style={styles.h1}>greatminerbtc@gmail.com</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={styles.h4}>https://t.me/greateminerapp</Text>
        </View>

      </View>

         <View style={styles.footer}>
                <Text style={styles.footerText}>ROBUST MINER V 2025</Text>
              </View>
        </ScrollView>
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
    justifyContent: "center",
  },
  header: {
    backgroundColor: '#00C853',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
    title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40
  },
    h1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "gray",
        textAlign: "center"
  },
    h4: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gray',
        textAlign: "center"
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
    content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
    copyButton: {
        width: 100,
        marginTop: 10,
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  copyText: {
    fontWeight: 'bold',
    textAlign: "center",
  },
  bitcoinLogo: {
    marginVertical: 30,
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