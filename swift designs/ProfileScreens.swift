import SwiftUI

// MARK: - Profile Screen

struct ProfileScreen: View {
    let stats: [(val: String, label: String, icon: String)] = [
        ("23", "Done", "✓"),
        ("7", "Countries", "🌍"),
        ("5", "Trips", "✈️"),
        ("142", "Followers", "👥"),
    ]

    let unlockedBadges = ["🥾", "⚡", "🧭", "🏔️", "🌟"]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                // Header
                HStack {
                    Text("PROFILE")
                        .font(.system(size: 10, weight: .bold))
                        .tracking(2.5)
                        .foregroundColor(.sqOrange(0.5))
                    Spacer()
                    Image(systemName: "gearshape")
                        .font(.system(size: 18))
                        .foregroundColor(.white(0.15))
                }
                .padding(.bottom, 20)

                // Avatar section
                VStack(spacing: 0) {
                    ZStack(alignment: .bottomTrailing) {
                        Circle()
                            .fill(Color.white(0.05))
                            .frame(width: 80, height: 80)
                            .overlay(
                                Circle().stroke(Color.sqOrange(0.35), lineWidth: 2.5)
                            )

                        Circle()
                            .fill(
                                LinearGradient(
                                    colors: [.sqOrange, Color(hex: "D97706")],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 28, height: 28)
                            .overlay(
                                Image(systemName: "trophy.fill")
                                    .font(.system(size: 12))
                                    .foregroundColor(.white)
                            )
                            .shadow(color: .sqOrange(0.25), radius: 8)
                            .offset(x: 4, y: 4)
                    }
                    .padding(.bottom, 12)

                    Text("Alex Chen")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(.white)

                    Text("@alexplores")
                        .font(.system(size: 14))
                        .foregroundColor(.white(0.20))
                }
                .padding(.bottom, 20)

                // Rank card
                VStack(alignment: .leading, spacing: 0) {
                    HStack {
                        HStack(spacing: 8) {
                            Text("🏆")
                                .font(.system(size: 20))
                            Text("Gold")
                                .font(.system(size: 14, weight: .bold))
                                .foregroundColor(.white)
                            Text("5,240 XP")
                                .font(.system(size: 12))
                                .foregroundColor(.white(0.20))
                        }

                        Spacer()

                        HStack(spacing: 4) {
                            Text("Roadmap")
                                .font(.system(size: 12))
                            Image(systemName: "chevron.right")
                                .font(.system(size: 10))
                        }
                        .foregroundColor(.white(0.15))
                    }
                    .padding(.bottom, 10)

                    GeometryReader { geo in
                        ZStack(alignment: .leading) {
                            Capsule()
                                .fill(Color.white(0.06))
                                .frame(height: 8)
                            Capsule()
                                .fill(
                                    LinearGradient(
                                        colors: [.sqOrange, .sqAmber400],
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                                .frame(width: geo.size.width * 0.52, height: 8)
                        }
                    }
                    .frame(height: 8)
                    .padding(.bottom, 6)

                    Text("4,760 XP to Diamond · 52%")
                        .font(.system(size: 10))
                        .foregroundColor(.white(0.12))
                }
                .padding(16)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color.sqOrange(0.08))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color.sqOrange(0.20), lineWidth: 1)
                )
                .padding(.bottom, 16)

                // Stats grid
                LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 8), count: 4), spacing: 8) {
                    ForEach(0..<stats.count, id: \.self) { i in
                        let stat = stats[i]
                        VStack(spacing: 4) {
                            Text(stat.icon)
                                .font(.system(size: 14))

                            Text(stat.val)
                                .font(.system(size: 18, weight: .bold))
                                .foregroundColor(.white)

                            Text(stat.label)
                                .font(.system(size: 9, weight: .medium))
                                .foregroundColor(.white(0.12))
                        }
                        .padding(.vertical, 10)
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 12)
                                .fill(Color.white(0.03))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.white(0.03), lineWidth: 1)
                        )
                    }
                }
                .padding(.bottom, 12)

                // Achievements
                HStack(spacing: 8) {
                    Text("🏅")
                        .font(.system(size: 14))
                    Text("Achievements")
                        .font(.system(size: 12, weight: .bold))
                        .foregroundColor(.white(0.70))
                    Spacer()
                    Text("5/9")
                        .font(.system(size: 12))
                        .foregroundColor(.white(0.12))
                }
                .padding(.bottom, 12)

                HStack(spacing: 10) {
                    ForEach(0..<unlockedBadges.count, id: \.self) { i in
                        Circle()
                            .fill(Color.sqOrange(0.08))
                            .frame(width: 36, height: 36)
                            .overlay(
                                Circle().stroke(Color.sqOrange(0.15), lineWidth: 1)
                            )
                            .overlay(
                                Text(unlockedBadges[i])
                                    .font(.system(size: 16))
                            )
                    }

                    ForEach(0..<4, id: \.self) { _ in
                        Circle()
                            .fill(Color.white(0.02))
                            .frame(width: 36, height: 36)
                            .overlay(
                                Circle().stroke(Color.white(0.02), lineWidth: 1)
                            )
                            .overlay(
                                Text("🔒")
                                    .font(.system(size: 16))
                            )
                            .opacity(0.20)
                    }
                }
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Rank Roadmap

struct RankRoadmapScreen: View {
    let ranks: [(name: String, xp: String, color: Color, bg: Color, border: Color, current: Bool, unlocked: Bool)] = [
        ("Iron", "0 XP", .white.opacity(0.25), .white.opacity(0.03), .white.opacity(0.03), false, true),
        ("Bronze", "1,000 XP", Color(hex: "92400E"), Color(hex: "78350F").opacity(0.06), Color(hex: "78350F").opacity(0.15), false, true),
        ("Silver", "2,500 XP", Color(hex: "D1D5DB"), Color(hex: "6B7280").opacity(0.06), Color(hex: "6B7280").opacity(0.15), false, true),
        ("Gold", "5,000 XP", Color(hex: "FBBF24"), Color(hex: "F59E0B").opacity(0.06), Color(hex: "F59E0B").opacity(0.15), true, true),
        ("Diamond", "10,000 XP", Color(hex: "22D3EE"), Color(hex: "06B6D4").opacity(0.06), Color(hex: "06B6D4").opacity(0.10), false, false),
        ("Obsidian", "25,000 XP", Color(hex: "A78BFA"), Color(hex: "8B5CF6").opacity(0.06), Color(hex: "8B5CF6").opacity(0.10), false, false),
    ]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ScreenHeader(label: "Rank System", title: "Roadmap")

                VStack(spacing: 12) {
                    ForEach(0..<ranks.count, id: \.self) { i in
                        let rank = ranks[i]
                        HStack(spacing: 14) {
                            // Rank icon
                            Circle()
                                .fill(rank.bg)
                                .frame(width: 44, height: 44)
                                .overlay(
                                    Text(rank.unlocked ? "🏆" : "🔒")
                                        .font(.system(size: 18))
                                )

                            VStack(alignment: .leading, spacing: 2) {
                                HStack(spacing: 8) {
                                    Text(rank.name)
                                        .font(.system(size: 14, weight: .bold))
                                        .foregroundColor(rank.color)

                                    if rank.current {
                                        Text("CURRENT")
                                            .font(.system(size: 8, weight: .bold))
                                            .tracking(1.2)
                                            .foregroundColor(.sqOrange)
                                            .padding(.horizontal, 8)
                                            .padding(.vertical, 2)
                                            .background(
                                                Capsule().fill(Color.sqOrange(0.10))
                                            )
                                    }
                                }

                                Text(rank.xp)
                                    .font(.system(size: 12))
                                    .foregroundColor(.white(0.12))

                                if rank.current {
                                    GeometryReader { geo in
                                        ZStack(alignment: .leading) {
                                            Capsule()
                                                .fill(Color.white(0.06))
                                                .frame(height: 6)
                                            Capsule()
                                                .fill(
                                                    LinearGradient(
                                                        colors: [.sqOrange, .sqAmber400],
                                                        startPoint: .leading,
                                                        endPoint: .trailing
                                                    )
                                                )
                                                .frame(width: geo.size.width * 0.52, height: 6)
                                        }
                                    }
                                    .frame(height: 6)
                                    .padding(.top, 4)
                                }
                            }

                            Spacer()
                        }
                        .padding(14)
                        .background(
                            RoundedRectangle(cornerRadius: 16)
                                .fill(rank.bg)
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(rank.border, lineWidth: 1)
                        )
                        .opacity(rank.unlocked ? 1 : 0.35)
                    }
                }

                Spacer()
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Settings

struct SettingsScreen: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ScreenHeader(label: "Settings", title: "Preferences")

                // Account section
                Text("ACCOUNT")
                    .font(.system(size: 10, weight: .bold))
                    .tracking(2)
                    .foregroundColor(.white(0.12))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 12)

                VStack(spacing: 0) {
                    SettingsRow(icon: "person", label: "Edit Profile")
                    SettingsRow(icon: "star", label: "Preferences")
                    SettingsRow(icon: "bell", label: "Notifications")
                }

                // Support section
                Text("SUPPORT")
                    .font(.system(size: 10, weight: .bold))
                    .tracking(2)
                    .foregroundColor(.white(0.12))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.top, 28)
                    .padding(.bottom, 12)

                VStack(spacing: 0) {
                    SettingsRow(icon: "questionmark.circle", label: "Help Center")
                    SettingsRow(icon: "shield", label: "Privacy Policy")
                    SettingsRow(icon: "checkmark.circle", label: "Terms of Service")
                }

                Spacer()

                // Sign out
                HStack(spacing: 16) {
                    Image(systemName: "rectangle.portrait.and.arrow.right")
                        .font(.system(size: 16))
                    Text("Sign Out")
                        .font(.system(size: 14, weight: .bold))
                }
                .foregroundColor(.sqRed.opacity(0.7))
                .padding(.vertical, 16)
                .padding(.bottom, 12)
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

struct SettingsRow: View {
    let icon: String
    let label: String

    var body: some View {
        VStack(spacing: 0) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.system(size: 16))
                    .foregroundColor(.white(0.15))

                Text(label)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(.white(0.70))

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.system(size: 12))
                    .foregroundColor(.white(0.08))
            }
            .padding(.vertical, 16)

            Rectangle()
                .fill(Color.white(0.03))
                .frame(height: 1)
        }
    }
}

// MARK: - Previews

struct ProfileScreens_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            ProfileScreen().previewDisplayName("Profile")
            RankRoadmapScreen().previewDisplayName("Rank Roadmap")
            SettingsScreen().previewDisplayName("Settings")
        }
        .preferredColorScheme(.dark)
    }
}
