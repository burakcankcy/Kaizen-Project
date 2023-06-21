/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
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
import MainNavigation from './src/navigation/MainNavigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const App: () => Node = () => {
  const backgroundStyle = {
    flex: 1,
    borderWidth: 1,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['right', 'left', 'top']} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <MainNavigation />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
