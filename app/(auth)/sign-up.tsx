import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as z from "zod";

import { Button, FormLabel, FormMessage, Input } from "@/components/ui";
import { useSupabase } from "@/hooks/useSupabase";
import tw from "@/lib/tailwind";

const FormSchema = z
	.object({
		email: z.string().email("Please enter a valid email address."),
		password: z
			.string()
			.min(8, "Please enter at least 8 characters.")
			.max(64, "Please enter fewer than 64 characters.")
			.regex(
				/^(?=.*[a-z])/,
				"Your password must have at least one lowercase letter.",
			)
			.regex(
				/^(?=.*[A-Z])/,
				"Your password must have at least one uppercase letter.",
			)
			.regex(/^(?=.*[0-9])/, "Your password must have at least one number.")
			.regex(
				/^(?=.*[!@#$%^&*])/,
				"Your password must have at least one special character.",
			),
		confirmPassword: z.string().min(8, "Please enter at least 8 characters."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Your passwords do not match.",
		path: ["confirmPassword"],
	});

export default function SignUp() {
	const { signUp } = useSupabase();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		trigger,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			await signUp(data.email, data.password);
		} catch (error: Error | any) {
			console.log(error.message);
			Toast.show({
				type: "error",
				text1: "Error",
				text2: error.message,
			});
		}
	}

	return (
		<SafeAreaView style={tw`flex-1 p-4 bg-background dark:bg-dark-background`}>
			<View style={tw`flex-1`}>
				<Text style={tw`self-start h2`}>Create your account</Text>
				<Text style={tw`self-start mb-5 p muted`}>
					to continue to Expo Supabase Starter
				</Text>
				<View style={tw`gap-4`}>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<View style={tw`gap-1.5`}>
								<FormLabel errors={errors.email}>Email</FormLabel>
								<Input
									placeholder="Email"
									value={value}
									onChangeText={onChange}
									onBlur={() => {
										trigger("email");
									}}
									error={errors.email}
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect={false}
									keyboardType="email-address"
								/>
								{errors.email && (
									<FormMessage>{errors.email?.message}</FormMessage>
								)}
							</View>
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value } }) => (
							<View style={tw`gap-1.5`}>
								<FormLabel errors={errors.password}>Password</FormLabel>
								<Input
									placeholder="Password"
									value={value}
									onChangeText={onChange}
									onBlur={() => {
										trigger("password");
									}}
									error={errors.password}
									autoCapitalize="none"
									autoCorrect={false}
									// secureTextEntry
								/>
								{errors.password && (
									<FormMessage>{errors.password?.message}</FormMessage>
								)}
							</View>
						)}
					/>
					<Controller
						control={control}
						name="confirmPassword"
						render={({ field: { onChange, value } }) => (
							<View style={tw`gap-1.5`}>
								<FormLabel errors={errors.confirmPassword}>
									Confirm Password
								</FormLabel>
								<Input
									placeholder="Confirm password"
									value={value}
									onChangeText={onChange}
									onBlur={() => {
										trigger("confirmPassword");
									}}
									error={errors.confirmPassword}
									autoCapitalize="none"
									autoCorrect={false}
									// secureTextEntry
								/>
								{errors.confirmPassword && (
									<FormMessage>{errors.confirmPassword?.message}</FormMessage>
								)}
							</View>
						)}
					/>
				</View>
			</View>
			<View style={tw`gap-y-4`}>
				<Button
					label="Sign up"
					onPress={handleSubmit(onSubmit)}
					isLoading={isSubmitting}
				/>
				<Text
					style={tw`text-center muted`}
					onPress={() => {
						router.replace("/sign-in");
					}}
				>
					Already have an account? <Text style={tw`p`}>Sign in</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
}
