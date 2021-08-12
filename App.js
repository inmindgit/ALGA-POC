/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
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


const App = () => {
  // const web3 = new Web3('http://localhost:7545');
  // const web3 = new Web3('http://localhost:7545');
  // const newWallet = web3.eth.accounts.wallet.create(1);
  // const accounts = web3.eth.getAccounts();
  // console.log('Web 3', web3.eth.accounts);
  // const newAccount = newWallet[0];
  // console.log(newAccount);
  // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  // console.log('WEB 3', web3);
  const [account, setAccount] = useState('');

  const loadWeb3 = async() => {
    try {
      // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const web3 = new Web3("http://localhost:7545"); //ganache
      const accounts = await web3.eth.getAccounts();
      console.log('account',accounts);
      setAccount(accounts[0]);
    } catch(error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
   loadWeb3();
  }, [])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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

export default App;
