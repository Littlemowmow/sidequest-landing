import SwiftUI

// MARK: - Sign In Screen

struct SignInScreen: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                Spacer()

                ScreenHeader(label: "Welcome Back", title: "Sign In")

                VStack(spacing: 12) {
                    InputField(placeholder: "Email address")
                    InputField(placeholder: "Password")
                }
                .padding(.bottom, 20)

                HStack {
                    Spacer()
                    Text("Forgot password?")
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(.sqOrange(0.6))
                }
                .padding(.bottom, 24)

                PrimaryButton(text: "Sign In")
                    .padding(.bottom, 20)

                // Divider
                HStack(spacing: 16) {
                    Rectangle().fill(Color.white(0.05)).frame(height: 1)
                    Text("or")
                        .font(.system(size: 11))
                        .foregroundColor(.white(0.12))
                    Rectangle().fill(Color.white(0.05)).frame(height: 1)
                }
                .padding(.bottom, 20)

                // Social buttons
                HStack(spacing: 12) {
                    SocialButton(icon: "apple.logo", label: "Apple")
                    SocialButton(icon: nil, label: "Google", customIcon: "G")
                }
                .padding(.bottom, 32)

                // Footer
                HStack(spacing: 4) {
                    Text("Don't have an account?")
                        .foregroundColor(.white(0.15))
                    Text("Sign Up")
                        .fontWeight(.bold)
                        .foregroundColor(.sqOrange)
                }
                .font(.system(size: 13))

                Spacer()
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Sign Up Screen

struct SignUpScreen: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                Spacer()

                ScreenHeader(label: "Get Started", title: "Create Account")

                VStack(spacing: 12) {
                    InputField(placeholder: "Email address")
                    InputField(placeholder: "Password")
                    InputField(placeholder: "Confirm password")
                }
                .padding(.bottom, 24)

                PrimaryButton(text: "Sign Up")
                    .padding(.bottom, 20)

                HStack(spacing: 16) {
                    Rectangle().fill(Color.white(0.05)).frame(height: 1)
                    Text("or")
                        .font(.system(size: 11))
                        .foregroundColor(.white(0.12))
                    Rectangle().fill(Color.white(0.05)).frame(height: 1)
                }
                .padding(.bottom, 20)

                HStack(spacing: 12) {
                    SocialButton(icon: "apple.logo", label: "Apple")
                    SocialButton(icon: nil, label: "Google", customIcon: "G")
                }
                .padding(.bottom, 32)

                HStack(spacing: 4) {
                    Text("Already have an account?")
                        .foregroundColor(.white(0.15))
                    Text("Sign In")
                        .fontWeight(.bold)
                        .foregroundColor(.sqOrange)
                }
                .font(.system(size: 13))

                Spacer()
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Reset Password Screen

struct ResetPasswordScreen: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                Spacer()

                Text("🔐")
                    .font(.system(size: 40))
                    .padding(.bottom, 24)

                ScreenHeader(
                    label: "Forgot Password",
                    title: "Reset Password",
                    subtitle: "Enter your email to receive a reset link."
                )

                InputField(placeholder: "Email address")
                    .padding(.bottom, 24)

                PrimaryButton(text: "Send Reset Link")

                Spacer()
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Social Button Helper

struct SocialButton: View {
    var icon: String?
    let label: String
    var customIcon: String? = nil

    var body: some View {
        HStack(spacing: 8) {
            if let icon = icon {
                Image(systemName: icon)
                    .font(.system(size: 18))
                    .foregroundColor(.white)
            }
            if let customIcon = customIcon {
                Text(customIcon)
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(.white)
            }
            Text(label)
                .font(.system(size: 14, weight: .medium))
                .foregroundColor(.white(0.70))
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color.white(0.05))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.white(0.05), lineWidth: 1)
        )
    }
}

// MARK: - Previews

struct AuthScreens_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            SignInScreen()
                .previewDisplayName("Sign In")
            SignUpScreen()
                .previewDisplayName("Sign Up")
            ResetPasswordScreen()
                .previewDisplayName("Reset Password")
        }
        .preferredColorScheme(.dark)
    }
}
