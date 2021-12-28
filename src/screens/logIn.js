/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from './../../googleSettings';
import styled from 'styled-components';

const LogIn = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [userInfo, setUserInfo] = useState();
  const [loaded, setLoaded] = useState('false');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const PROFILE_IMAGE_SIZE = 150;

  const prettyJson = (value: any) => {
    return JSON.stringify(value, null, 2);
  };

  useEffect(() => {
    const optionsGoogleSignIn = {
      webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      profileImageSize: PROFILE_IMAGE_SIZE,
    };
    GoogleSignin.configure(optionsGoogleSignIn);
  }, []);

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setState({isLoginScreenPresented: !isSignedIn}, ...state);
  };

  const signIn = async () => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices();
      if (hasPlayServices) {
        const userInformation = await GoogleSignin.signIn();
        if (userInformation?.idToken) {
          setUserInfo(userInformation);
          setLoaded(true);
          console.log(userInformation);
        }
      }
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
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Title>Welcome to CovidApp</Title>
        <GoogleSigninButton
          style={{width: 192, height: 48, margin: 50}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          // disabled={isSigninInProgress}
        />
        {loaded && (
          <View>
            <View>
              <Text>{userInfo?.user?.name}</Text>
            </View>
            <Text>Your user info: {prettyJson(userInfo?.user)}</Text>
            {userInfo?.user?.photo && (
              <Image
                style={{width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE}}
                source={{uri: userInfo?.user?.photo}}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const Title = styled.Text`
  font-size: 50px;
  text-align: center;
  color: palevioletred;
  margin: 30px;
`;

export default LogIn;
