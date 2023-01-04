import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stacks from "./Stacks";
import Tabs from "./Tabs";

const Stack = createNativeStackNavigator();

// 두개의 네비게이터를 병합하는 용도의 root

export default function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  );
}
