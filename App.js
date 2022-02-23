import React from "react";
import StackNav from './nav/StackNav';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  return (
    <StackNav />
  );
}
