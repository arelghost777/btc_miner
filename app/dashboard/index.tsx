
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Appbar, Button, TextInput, useTheme } from 'react-native-paper';
import React = require('react');

export default function DashboardScreen() {
  const router = useRouter()
  const { user, updateUser } = useAuthStore()

  const [btcAddress, setBtcAddress] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [progress, setProgress] = useState(0);


  const theme = useTheme();

    useEffect(() => {
    if (user?.btc_address) {
      setBtcAddress(user.btc_address);
    }
  }, [user]);

  const isValidBTCAddress = (address : string) => {
  return /^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(address);
};

const handleMining = async () => {
  const amount = parseFloat(btcAmount);

  // 🔍 Validation du montant
  if (isNaN(amount) || amount <= 0 || amount > 5) {
    setInvalidAmount(true);
    return;
  }

  // 🔍 Validation de l'adresse BTC
  if (!isValidBTCAddress(btcAddress)) {
    setInvalidAddress(true);
    return;
  }

  // 📈 Lance le chargement
  setIsMining(true);
  setProgress(0);
  

  let seconds = 0;
  const intervalDuration = 1000; // 1 seconde
  const totalDuration = 30000; // 30 secondes

  const interval = setInterval(() => {
    seconds += 1;
    const newProgress = seconds / (totalDuration / intervalDuration);
    setProgress(newProgress);

    if (seconds >= 30) {
      clearInterval(interval);
    }
  }, intervalDuration);

  // ⏳ Met à jour l'utilisateur après 30 secondes
  setTimeout(async () => {
    try {
      await updateUser({
        btc_address: btcAddress,
        btc_amount: amount, // Utilise la variable déjà parsée
      });
      
      // Optionnel: Ajouter un toast ou feedback visuel
      Alert.alert(
        "Mining Complete", 
        `You've successfully mined ${amount} BTC!`,
        [{ text: "OK", onPress: () => router.push('/dashboard/payment') }]
      );
      
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", "Failed to update mining results");
    } finally {
      setIsMining(false);
      setProgress(0);
      clearInterval(interval); // Nettoyage supplémentaire
    }
  }, totalDuration);
};


  
  return (
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Action 
          icon="menu" 
          onPress={() => router.push('/dashboard/transactions')} 
          color={theme.colors.primary}
        />
        <Appbar.Content title="View transactions" titleStyle={styles.title} />
        <Appbar.Action 
          icon="help" 
          onPress={() => router.push("/dashboard/help")} 
          color={theme.colors.primary}
        />
      </Appbar.Header>
      
      {/* Main Content */}
      <ScrollView style={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Account Value */}
        <View style={styles.accountContainer}>
          <Text style={styles.accountLabel}>Your Account Value</Text>
          <View style={styles.valueRow}>
            <Text style={styles.accountValue}>{user?.btc_amount} BTC</Text>
              {/* Solution 1: Utilisation correcte de Link avec asChild */}
                  <Button
                    mode="contained"
                    style={styles.withdrawButton}
                    labelStyle={styles.withdrawText}
                    onPress={() => router.push("/dashboard/payment")}
                    disabled={!user || user.btc_amount === 0 }
                  >
                    WITHDRAW
                  </Button>
            </View>
          </View>

        
        {/* Form */}
        <View style={styles.formContainer}>
          {invalidAddress && (<Text style={styles.invalid}>Invalid BTC address!</Text>) }
          <TextInput
            mode="outlined"
            label="Enter your BTC Address"
            placeholder="Please enter your BTC address"
            style={styles.input}
            outlineColor="#e0e0e0"
            activeOutlineColor="#00C853"
            left={<TextInput.Icon icon="currency-btc" color="orange"/>}
            value={btcAddress} // <- lié à l'état
            onChangeText={(text) => {
              setBtcAddress(text);
              setInvalidAddress(false); // 🔄 Réinitialise l'erreur
            }}
          />
          
           {invalidAmount && (<Text style={styles.invalid}>Invalid amount!</Text>) }
          <TextInput
            mode="outlined"
            label="Select BTC for Mining"
            placeholder="Enter your Amount"
            style={styles.input}
            outlineColor="#e0e0e0"
            activeOutlineColor="#00C853"
            left={<TextInput.Icon icon="currency-btc" color="orange"/>}
            right={<TextInput.Icon icon="chevron-down" />}
            keyboardType="numeric"
            value={btcAmount} // <- lié à l'état
            onChangeText={(text) => {
              setBtcAmount(text);
              setInvalidAmount(false); // 🔄 Réinitialise l'erreur
              }}
          />
         
        </View>
        
        {/* Status */}
        <View style={styles.statusContainer}>
          <View style={styles.onlineIndicator} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
        {isMining && (
          <View style={{ marginVertical: 20 }}>
            <Text style={{ textAlign: 'center', marginBottom: 5 }}>
              Mining in progress...
            </Text>
            <View style={{
              height: 8,
              width: '100%',
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
              overflow: 'hidden',
            }}>
              <View style={{
                height: '100%',
                width: `${progress * 100}%`,
                backgroundColor: '#00C853',
              }} />
            </View>
          </View>
        )}
        <View style={styles.startRow}>
           {user && user.btc_amount === 0 && (
              <Button
                mode='contained'
                style={styles.startButton}
                labelStyle={styles.startText}
                onPress={handleMining}
                disabled={isMining || !btcAddress || !btcAmount}
              >
                START MINING
              </Button>
            )}

        </View>
      </ScrollView>

      
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ROBUST MINER V 2025</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  invalid: {
    color: "red",
    fontSize: 10
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  accountContainer: {
    marginBottom: 30,
  },
  accountLabel: {
    fontSize: 16,
    color: '#616161',
    marginBottom: 5,
  },
  accountValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#616161',
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: '#00C853',
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 40,
  },
  withdrawText: {
    color: 'white',
    fontWeight: 'bold',
  },
  startRow: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#00C853',
    borderRadius: 50,
    paddingHorizontal: 15,
  
    width: 200,
    
  },
  startText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
    borderRadius: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00C853',
    marginRight: 8,
  },
  onlineText: {
    color: '#00C853',
    fontWeight: 'bold',
    fontSize: 20
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom: 15
  },
  footerText: {
    textAlign: 'center',
    color: '#9e9e9e',
  },
});