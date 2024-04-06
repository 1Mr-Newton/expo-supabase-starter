import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui";
import { useSupabase } from "@/hooks/useSupabase";
import tw from "@/lib/tailwind";

export default function WelcomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView
			style={tw`flex flex-1 p-4 bg-background dark:bg-dark-background`}
		>
			<View style={tw`flex items-center justify-center flex-1 gap-y-4`}>
				<Text style={tw`text-center h1`}>Welcome to Expo Supabase Starter</Text>
				<Text style={tw`text-center muted`}>
					A simple template for developing Expo applications with Supabase as
					the backend.
				</Text>
			</View>
			<View style={tw`flex flex-row gap-x-4`}>
				<Button
					style={tw`flex-1`}
					label="Sign up"
					onPress={() => {
						router.push("/sign-up");
					}}
				/>
				<Button
					style={tw`flex-1`}
					variant="outline"
					label="Sign in"
					onPress={() => {
						router.push("/sign-in");
					}}
				/>
			</View>
		</SafeAreaView>
	);
}
