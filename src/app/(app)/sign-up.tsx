import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthLogo from "../../components/AuthLogo";
import TextInputField from "../../components/formFields/TextInputField";
import PasswordField from "../../components/formFields/PasswordField";
import VerificationScreen from "../../components/VerificationScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  validateCode,
  validateEmail,
  validatePassword,
} from "../../lib/helpers";
import { toast } from "sonner-native";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
    code?: string;
  }>({});

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
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

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (err?.errors?.length) {
        err.errors.forEach((e: any) => toast.error(e.message));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    let newErrors: { code?: string } = {};
    if (!validateCode(code)) {
      newErrors.code = "Please enter a valid 6-digit code";
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
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

  const handleCodeChange = (text: string) => {
    setCode(text);

    if (errors && /^\d{6}$/.test(text)) {
      setErrors({}); // clear error as soon as valid
    }
  };

  if (pendingVerification) {
    return (
      <VerificationScreen
        emailAddress={emailAddress}
        isLoading={isLoading}
        onChangeText={handleCodeChange}
        onVerify={onVerifyPress}
        value={code}
        error={errors.code}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={20}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1">
          {/* Main */}
          <View className="flex-1 justify-center p-4">
            <AuthLogo />
            {/* form */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <Text className="text-2xl mb-6 text-center font-bold text-gray-900">
                Create Your Account
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
              <TouchableOpacity
                onPress={onSignUpPress}
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
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color={"white"}
                    />
                  )}
                  <Text className="text-white font-semibold text-lg ml-2 ">
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text className="text-xs mb-4 text-center text-gray-500">
                By signing up, you agree to our Terms of Service and Privacy
                Policy
              </Text>
            </View>
          </View>
          <View className="flex-row justify-center items-center mb-4">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 font-semibold">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
