import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Updates from 'expo-updates';

const states = {
  idle: null,
  hasUpdate: 'hasUpdate',
  downloadUpdate: 'downloadUpdate',
  updateReady: 'updateReady',
};

export default function App() {
  const [state, setState] = useState<string | null>(states.idle);

  const checkForUpdate = useCallback(async () => {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      setState(states.hasUpdate);
    }
  }, []);

  const downloadTheUpdate = useCallback(async () => {
    setState(states.downloadUpdate);
    const update = await Updates.fetchUpdateAsync();
    if (update.isNew) {
      setState(states.updateReady);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {/* <Text>Should be visible</Text> - Build production version, uncomment this and publish */}

      {state === states.idle && <Button title="Check for updates" onPress={checkForUpdate} />}
      {state === states.hasUpdate && <Button title="Download the update" onPress={downloadTheUpdate} />}
      {state === states.downloadUpdate && <Button title="Downloading..." onPress={() => undefined} disabled />}
      {state === states.updateReady && <Button title="Reload for update" onPress={Updates.reloadAsync} />}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
