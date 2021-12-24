/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [userInfo, setUserInfo] = useState('empty');
  const [loaded, setLoaded] = useState('false');
  const [state, setState] = useState({isLoginScreenPresented: false});
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const optionsGoogleSignIn = {
      webClientId:
        '853005137807-ojnjdj3b7eqgvcgvibj4lgqimrfd0eie.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
    };
    GoogleSignin.configure(optionsGoogleSignIn);
  }, []);

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setState({isLoginScreenPresented: !isSignedIn}, ...state);
  };

  const signIn = async () => {
    try {
      const res = await GoogleSignin.hasPlayServices();
      console.log('res', res)

      const userInformation = await GoogleSignin.signIn();
      setUserInfo(userInformation);
      console.log('userInformation', userInformation);
      // setUserInfo(userInformation);
    } catch (error) {
      console.log('ERROR', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
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
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            // disabled={isSigninInProgress}
          />
          <Text>{userInfo}</Text>
          {loaded && (
            <View>
              <Text>{userInfo?.user?.name}</Text>
            </View>
          )}
          <View>
            <Text>{`is logged? ${state?.isLoginScreenPresented}`}</Text>
          </View>
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
