import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MovieContext } from "./Context";
import StackNavigator from "./StackNavigator";
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <>
      <MovieContext>
        <StripeProvider publishableKey="pk_test_51KCikuSB4b1eelR6gm6lKq3WrQ9bWyEEHTR809MdqX4tyyh1lchHShfHYFjW27NW1V88G0Zi7ZjtK9VyZtP2efZn00bFMC7PWF">
        <StackNavigator />
        <StatusBar style="auto" />
        </StripeProvider>
      </MovieContext>
    </>
  );
}
