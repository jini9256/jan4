import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="one" component={One} />
      <Stack.Screen name="two" component={Two} />
      <Stack.Screen name="three" component={Three} />
    </Stack.Navigator>
  );
}

const One = ({ route: { params }, navigation: { navigate, goBack } }) => {
  console.log("para", params);
  return (
    <>
      <TouchableOpacity onPress={() => navigate("two")}>
        <Text>첫번째 스크린</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goBack()}>
        <Text>마지막 스크린</Text>
      </TouchableOpacity>
    </>
  );
};

const Two = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate("three")}>
      <Text>2번째 스크린</Text>
    </TouchableOpacity>
  );
};

const Three = ({ navigation: { goBack, reset } }) => {
  return (
    <>
      <TouchableOpacity onPress={() => goBack()}>
        <Text>마지막 스크린</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          reset({
            index: 1,
            routes: [{ name: "two" }, { name: "one" }],
          })
        }
      >
        <Text>리셋?????</Text>
      </TouchableOpacity>
    </>
  );
};
