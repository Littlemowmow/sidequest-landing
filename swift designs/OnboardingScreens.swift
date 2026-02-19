import SwiftUI

// MARK: - Onboarding Welcome

struct OnboardingWelcome: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                Spacer()

                // App icon
                RoundedRectangle(cornerRadius: 28)
                    .fill(
                        LinearGradient(
                            colors: [.sqOrange, Color(hex: "D97706")],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 96, height: 96)
                    .overlay(
                        Text("S")
                            .font(.system(size: 40, weight: .bold))
                            .foregroundColor(.white)
                    )
                    .shadow(color: .sqOrange(0.25), radius: 16)
                    .padding(.bottom, 40)

                Text("WELCOME TO")
                    .font(.system(size: 10, weight: .bold))
                    .tracking(2.5)
                    .foregroundColor(.sqOrange(0.5))
                    .padding(.bottom, 12)

                Text("SideQuest")
                    .font(.system(size: 26, weight: .bold))
                    .foregroundColor(.white)
                    .padding(.bottom, 16)

                Text("Discover hidden gems, plan epic trips, and travel like a local — not a tourist.")
                    .font(.system(size: 14))
                    .foregroundColor(.white(0.25))
                    .multilineTextAlignment(.center)
                    .lineSpacing(4)
                    .padding(.horizontal, 4)
                    .padding(.bottom, 48)

                PrimaryButton(text: "Let's Go")

                ProgressDots(step: 0)

                Spacer()
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Trip Intent

struct OnboardingTripIntent: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ProgressDots(step: 1)
                ScreenHeader(label: "Step 2", title: "What brings you here?")

                VStack(spacing: 12) {
                    PillRow(emoji: "🗺️", text: "Planning a specific trip", showCheck: true, highlight: true)
                    PillRow(emoji: "💡", text: "Exploring ideas")
                    PillRow(emoji: "👥", text: "Finding travel buddies")
                    PillRow(emoji: "🌍", text: "Building a bucket list")
                }

                Spacer()

                PrimaryButton(text: "Continue")
                    .padding(.top, 24)
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Travel Style

struct OnboardingTravelStyle: View {
    let styles: [(icon: String, label: String, selected: Bool)] = [
        ("⛰️", "Adventure", true),
        ("🏛️", "Culture", true),
        ("🍜", "Foodie", false),
        ("🧘", "Relaxation", false),
        ("🎉", "Nightlife", true),
        ("🌿", "Nature", false),
    ]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ProgressDots(step: 2)
                ScreenHeader(label: "Step 3", title: "Travel Style", subtitle: "Pick all that apply.")

                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                    ForEach(0..<styles.count, id: \.self) { i in
                        let style = styles[i]
                        VStack(spacing: 10) {
                            Text(style.icon)
                                .font(.system(size: 30))
                            Text(style.label)
                                .font(.system(size: 14, weight: .medium))
                                .foregroundColor(.white(0.80))
                            if style.selected {
                                Circle()
                                    .fill(Color.sqOrange)
                                    .frame(width: 20, height: 20)
                                    .overlay(
                                        Image(systemName: "checkmark")
                                            .font(.system(size: 9, weight: .bold))
                                            .foregroundColor(.white)
                                    )
                            }
                        }
                        .padding(16)
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 16)
                                .fill(style.selected ? Color.sqOrange(0.06) : Color.white(0.03))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(style.selected ? Color.sqOrange(0.25) : Color.white(0.05), lineWidth: 1)
                        )
                    }
                }

                Spacer()

                PrimaryButton(text: "Continue")
                    .padding(.top, 24)
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Interests

struct OnboardingInterests: View {
    let interests = ["Hiking", "Museums", "Street Food", "Surfing", "Photography", "Markets", "Diving", "Wine", "Architecture", "Festivals", "Yoga", "Nightlife"]
    let selected = [0, 2, 4, 7, 9]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ProgressDots(step: 3)
                ScreenHeader(label: "Step 4", title: "Interests", subtitle: "Select at least 3.")

                FlowLayout(spacing: 10) {
                    ForEach(0..<interests.count, id: \.self) { i in
                        Text(interests[i])
                            .font(.system(size: 13, weight: .medium))
                            .foregroundColor(selected.contains(i) ? .sqOrange : .white(0.25))
                            .padding(.horizontal, 16)
                            .padding(.vertical, 10)
                            .background(
                                Capsule()
                                    .fill(selected.contains(i) ? Color.sqOrange(0.08) : Color.white(0.03))
                            )
                            .overlay(
                                Capsule()
                                    .stroke(selected.contains(i) ? Color.sqOrange(0.25) : Color.white(0.05), lineWidth: 1)
                            )
                    }
                }

                Spacer()

                Text("\(selected.count) selected")
                    .font(.system(size: 12))
                    .foregroundColor(.white(0.15))
                    .padding(.bottom, 12)

                PrimaryButton(text: "Continue")
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Flow Layout (for tag wrapping)

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = arrange(proposal: proposal, subviews: subviews)
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = arrange(proposal: proposal, subviews: subviews)
        for (index, position) in result.positions.enumerated() {
            subviews[index].place(at: CGPoint(x: bounds.minX + position.x, y: bounds.minY + position.y), proposal: .unspecified)
        }
    }

    private func arrange(proposal: ProposedViewSize, subviews: Subviews) -> (positions: [CGPoint], size: CGSize) {
        let maxWidth = proposal.width ?? .infinity
        var positions: [CGPoint] = []
        var x: CGFloat = 0
        var y: CGFloat = 0
        var rowHeight: CGFloat = 0
        var maxX: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x + size.width > maxWidth && x > 0 {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            positions.append(CGPoint(x: x, y: y))
            rowHeight = max(rowHeight, size.height)
            x += size.width + spacing
            maxX = max(maxX, x)
        }

        return (positions, CGSize(width: maxX, height: y + rowHeight))
    }
}

// MARK: - Budget

struct OnboardingBudget: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ProgressDots(step: 4)
                ScreenHeader(label: "Step 5", title: "Budget Style")

                Spacer()

                VStack(spacing: 0) {
                    Text("⚖️")
                        .font(.system(size: 48))
                        .padding(.bottom, 20)

                    Text("Balanced")
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(.white)
                        .padding(.bottom, 6)

                    Text("Mix of budget-friendly and splurges")
                        .font(.system(size: 14))
                        .foregroundColor(.white(0.25))
                        .padding(.bottom, 48)

                    SliderTrack(
                        progress: 0.6,
                        gradientColors: [.sqOrange, .sqAmber400],
                        thumbBorderColor: .sqOrange,
                        shadowColor: .sqOrange
                    )
                    .padding(.horizontal, 4)
                    .padding(.bottom, 16)

                    HStack {
                        Text("BACKPACKER")
                        Spacer()
                        Text("LUXURY")
                    }
                    .font(.system(size: 10, weight: .medium))
                    .tracking(1.5)
                    .foregroundColor(.white(0.15))
                    .padding(.horizontal, 4)
                }

                Spacer()

                PrimaryButton(text: "Continue")
                    .padding(.top, 24)
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Pace

struct OnboardingPace: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ProgressDots(step: 5)
                ScreenHeader(label: "Step 6", title: "Travel Pace")

                Spacer()

                VStack(spacing: 0) {
                    Text("🚶")
                        .font(.system(size: 48))
                        .padding(.bottom, 20)

                    Text("Super Chill")
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(.white)
                        .padding(.bottom, 6)

                    Text("1-2 activities per day")
                        .font(.system(size: 14))
                        .foregroundColor(.white(0.25))
                        .padding(.bottom, 48)

                    SliderTrack(
                        progress: 0.25,
                        gradientColors: [.sqBlue, .sqCyan],
                        thumbBorderColor: .sqBlue,
                        shadowColor: .sqBlue
                    )
                    .padding(.horizontal, 4)
                    .padding(.bottom, 16)

                    HStack {
                        Text("SUPER CHILL")
                        Spacer()
                        Text("GO GO GO!")
                    }
                    .font(.system(size: 10, weight: .medium))
                    .tracking(1.5)
                    .foregroundColor(.white(0.15))
                    .padding(.horizontal, 4)
                }

                Spacer()

                PrimaryButton(text: "Continue")
                    .padding(.top, 24)
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Notifications

struct OnboardingNotifications: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                Spacer()

                Text("🔔")
                    .font(.system(size: 48))
                    .padding(.bottom, 32)

                Text("STAY IN THE LOOP")
                    .font(.system(size: 10, weight: .bold))
                    .tracking(2.5)
                    .foregroundColor(.sqOrange(0.5))
                    .padding(.bottom, 12)

                Text("Enable Notifications")
                    .font(.system(size: 22, weight: .bold))
                    .foregroundColor(.white)
                    .padding(.bottom, 12)

                Text("Get notified when your crew votes, plans change, or it's time to pack.")
                    .font(.system(size: 14))
                    .foregroundColor(.white(0.25))
                    .multilineTextAlignment(.center)
                    .lineSpacing(4)
                    .padding(.horizontal, 4)
                    .padding(.bottom, 48)

                PrimaryButton(text: "Enable Notifications")
                    .padding(.bottom, 16)

                Text("Maybe Later")
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(.white(0.15))

                Spacer()

                ProgressDots(step: 6)
                    .padding(.top, 40)
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - All Set

struct OnboardingAllSet: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                Spacer()

                Text("✅")
                    .font(.system(size: 48))
                    .padding(.bottom, 24)

                Text("YOU'RE READY")
                    .font(.system(size: 10, weight: .bold))
                    .tracking(2.5)
                    .foregroundColor(.sqEmerald(0.6))
                    .padding(.bottom, 12)

                Text("All Set!")
                    .font(.system(size: 22, weight: .bold))
                    .foregroundColor(.white)
                    .padding(.bottom, 28)

                VStack(spacing: 12) {
                    PillRow(emoji: "⛰️", text: "Adventure, Culture, Nightlife", showCheck: true)
                    PillRow(emoji: "⚖️", text: "Balanced budget", showCheck: true)
                    PillRow(emoji: "🚶", text: "Super Chill pace", showCheck: true)
                }
                .padding(.bottom, 32)

                PrimaryButton(text: "Start Exploring", isGradient: true)

                Spacer()

                ProgressDots(step: 7)
                    .padding(.top, 32)
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Previews

struct OnboardingScreens_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            OnboardingWelcome().previewDisplayName("Welcome")
            OnboardingTripIntent().previewDisplayName("Trip Intent")
            OnboardingTravelStyle().previewDisplayName("Travel Style")
            OnboardingInterests().previewDisplayName("Interests")
            OnboardingBudget().previewDisplayName("Budget")
            OnboardingPace().previewDisplayName("Pace")
            OnboardingNotifications().previewDisplayName("Notifications")
            OnboardingAllSet().previewDisplayName("All Set")
        }
        .preferredColorScheme(.dark)
    }
}
