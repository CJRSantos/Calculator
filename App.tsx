import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, SafeAreaView, TouchableOpacity } from 'react-native';
import { ThemeContext } from './src/context/ThemeContext';
import { HistoryProvider } from './src/context/HistoryContext';
import { myColors } from './src/styles/Colors';
import Button from "./src/components/Button";
import MyKeyboard from './src/components/MyKeyboard';
import HistoryView from './src/components/HistoryView';



export default function App() {
  const [theme, setTheme] = useState('light');
  const [historyVisible, setHistoryVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  const openHistory = () => {
    setMenuVisible(false);
    setHistoryVisible(true);
  }

  return (
    <HistoryProvider>
      <ThemeContext.Provider value={theme}>
        <SafeAreaView style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: '#17171C' }]}>
          <StatusBar style={theme === 'light' ? 'auto' : 'light'} />
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1, width: '100%', alignItems: 'center' }}
            onPress={() => { if (menuVisible) setMenuVisible(false); }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', marginTop: 60, zIndex: 300 }}>
              <Switch
                value={theme === 'light'}
                onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              />
              <View>
                <TouchableOpacity onPress={toggleMenu} style={{ padding: 10 }}>
                  <Text style={{ fontSize: 24, color: theme === 'light' ? myColors.black : myColors.white }}>⋮</Text>
                </TouchableOpacity>
                {menuVisible && (
                  <View style={{
                    position: 'absolute',
                    top: 40,
                    right: 0,
                    backgroundColor: theme === 'light' ? myColors.white : myColors.btnDark,
                    borderRadius: 8,
                    padding: 10,
                    elevation: 5,
                    zIndex: 301,
                    minWidth: 150,
                  }}>
                    <TouchableOpacity onPress={openHistory} style={{ padding: 5 }}>
                      <Text style={{ color: theme === 'light' ? myColors.black : myColors.white, fontSize: 16 }}>History</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <MyKeyboard />
            <HistoryView visible={historyVisible} onClose={() => setHistoryVisible(false)} />
          </TouchableOpacity>
        </SafeAreaView>
      </ThemeContext.Provider>
    </HistoryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.Light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
