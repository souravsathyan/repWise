import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import GoogleSignIn from "../../components/GoogleSigngin";
import PasswordField from "../../components/formFields/PasswordField";
import TextInputField from "../../components/formFields/TextInputField";
import { validateEmail, validatePassword } from "../../lib/helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { toast } from "sonner-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    let newErrors: { email?: string; password?: string } = {};
    if (!validateEmail(emailAddress)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (err?.errors?.length) {
        err.errors.forEach((e: any) => toast.error(e.message));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmailAddress(text);
    // Clear error if the new value is valid
    if (errors.email && /\S+@\S+\.\S+/.test(text)) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // Clear error if the new password is valid
    if (errors.password && text.length >= 6) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={20}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View className="flex-1 justify-center p-4">
          <View className="items-center mb-8">
            {/* logo*/}
            <View className="w-18 h-18 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
              <Ionicons name="fitness" size={40} color={"white"} />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              RepWise
            </Text>
            <Text className="text-2xl text-gray-600 mb-2 text-center">
              Track Your Fitness Journy{"\n"}and reachc your goal
            </Text>
          </View>

          {/* Form */}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <Text className="text-2xl mb-6 text-center font-bold text-gray-900">
              Welcom Back
            </Text>
            {/* email */}
            <TextInputField
              onChangeText={handleEmailChange}
              value={emailAddress}
              isLoading={isLoading}
              label="Email"
              placeholder="Enter Your Email"
              error={errors.email}
            />
            {/* password */}
            <PasswordField
              isLoading={isLoading}
              label="Password"
              placeholder="Enter Your Password"
              onChangeText={handlePasswordChange}
              value={password}
              error={errors.password}
            />
          </View>
          {/* buttons */}
          <TouchableOpacity
            onPress={onSignInPress}
            disabled={isLoading}
            className={`rounded-xl py-4 shadow-sm mb-4 ${
              isLoading ? "bg-gray-400" : "bg-blue-600"
            }`}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              {isLoading ? (
                <Ionicons name="refresh" size={20} color={"white"} />
              ) : (
                <Ionicons name="log-in-outline" size={20} color={"white"} />
              )}
              <Text className="text-white font-semibold text-lg ml-2 ">
                {isLoading ? "Signing in..." : "Sign in"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Dividers */}
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="px-4 text-gray-500 text-sm">or</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <GoogleSignIn />

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-gray-600">Don't have an account? </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Footer section */}
        <View className="pb-6 flex-row justify-center">
          <Text className="text-center text-gray-500 text-sm mr-1">
            Start your fitness journey today
          </Text>
          <Ionicons name="heart" size={20} color="pink" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
