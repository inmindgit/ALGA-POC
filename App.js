/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import './shim';

import Web3 from 'web3';
import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState ('');
  const [url, setURL] = useState('');

  const loadWeb3 = async() => {
    try {
      const web3 = new Web3("http://localhost:7545"); //ganache
      const accounts = await web3.eth.getAccounts();
      console.log('account',accounts);
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log('Balance', balance);
      setAccount(accounts[0]);
      setBalance(balance);
    } catch(error) {
      console.log('error', error);
    }
  }

  // use this line if you want connect with ganache and show his account, you should disconnect the HOC withWalletConnect first
  useEffect(() => {
  //  loadWeb3();
  }, [])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(async () => {
    const initialUrl = await Linking.getInitialURL();
    setURL(initialUrl);
  }, [])

  const connector = useWalletConnect();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <Text>Account: {account}</Text>
            <Text>Balance: {balance}</Text>
            <Text>Link: {url}</Text>
            {!connector?._connected
              ? <Button title="Connect" onPress={() => connector?.connect()} />
              : <Button title="Kill Session" onPress={() => connector?.killSession()} />
            }
            <Text>Account from wallet selected: {connector?._accounts}</Text>
            
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default withWalletConnect(App, {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : 'yourappscheme://',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});;
