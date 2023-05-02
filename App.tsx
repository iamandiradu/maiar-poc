/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import Main from './src/containers/main';

const App = () => {
    // Defaults to dark
    const colorScheme = useColorScheme() || 'dark';

    return (
        <SafeAreaView>
            <StatusBar barStyle={`${colorScheme}-content`} />
            <Main />
        </SafeAreaView>
    );
};

export default App;
