import React from "react";
import Movies from "../screen/Movies";
import My from "../screen/My";
import { MaterialIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          title: "영화",
          headerTitleAlign: "center",
          tabBarLabel: "영화",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="movie-filter" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          title: "내가 작성한 댓글",
          tabBarLabel: "마이페이지",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="contact-page" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
