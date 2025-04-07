import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PetsList from "./adoptions";
import PetDetail from "./adoptions/[slug]";
import Login from "./auth/login";

export type RootStackParamList = {
  Login: undefined;
  PetsList: undefined;
  PetDetail: { slug: string };
  AdoptionList:{slug:string};
};

const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="PetsList"
          component={PetsList}
          options={{ title: "Pets for Adoption" }}
        />
        <Stack.Screen
          name="PetDetail"
          component={PetDetail}
          options={{ title: "Pet Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
