import { StyleSheet, Text, View } from 'react-native';
import CreateBill from './screens/CreateBill';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home'>
          <Stack.Screen name='home' component={Home} options={{
            headerShown: false,
          }} />
          <Stack.Screen name='bill' component={CreateBill} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
});
