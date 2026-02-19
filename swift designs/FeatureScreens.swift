import SwiftUI

// MARK: - Swipe to Vote

struct SwipeToVoteScreen: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ScreenHeader(label: "Swipe to Vote", title: "Barcelona Trip", subtitle: "5 members")

                Spacer()

                // Destination card
                ZStack(alignment: .bottomLeading) {
                    RoundedRectangle(cornerRadius: 24)
                        .fill(
                            LinearGradient(
                                colors: [
                                    Color(hex: "065F46").opacity(0.4),
                                    Color(hex: "0D9488").opacity(0.25),
                                    Color(hex: "06B6D4").opacity(0.15)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(height: 224)
                        .overlay(
                            RoundedRectangle(cornerRadius: 24)
                                .stroke(Color.white(0.06), lineWidth: 1)
                        )
                        .shadow(color: .black.opacity(0.4), radius: 16)

                    // Gradient overlay for text readability
                    LinearGradient(
                        colors: [.clear, .black.opacity(0.8)],
                        startPoint: .center,
                        endPoint: .bottom
                    )
                    .clipShape(RoundedRectangle(cornerRadius: 24))

                    VStack(alignment: .leading, spacing: 6) {
                        Text("Barceloneta Beach")
                            .font(.system(size: 22, weight: .bold))
                            .foregroundColor(.white)

                        HStack(spacing: 6) {
                            Image(systemName: "mappin")
                                .font(.system(size: 13))
                            Text("Beach · Free")
                        }
                        .font(.system(size: 14))
                        .foregroundColor(.white(0.35))
                    }
                    .padding(20)
                }
                .padding(.bottom, 28)

                // Vote buttons
                HStack(spacing: 32) {
                    // Reject
                    Circle()
                        .fill(Color.sqRed.opacity(0.05))
                        .frame(width: 60, height: 60)
                        .overlay(
                            Circle().stroke(Color.sqRed.opacity(0.25), lineWidth: 2)
                        )
                        .overlay(
                            Image(systemName: "xmark")
                                .font(.system(size: 22, weight: .medium))
                                .foregroundColor(.sqRed.opacity(0.8))
                        )

                    // Accept
                    Circle()
                        .fill(Color.sqEmerald.opacity(0.05))
                        .frame(width: 60, height: 60)
                        .overlay(
                            Circle().stroke(Color.sqEmerald.opacity(0.25), lineWidth: 2)
                        )
                        .overlay(
                            Image(systemName: "heart.fill")
                                .font(.system(size: 22, weight: .medium))
                                .foregroundColor(.sqEmerald.opacity(0.8))
                        )
                }
                .padding(.bottom, 28)

                // Group match indicator
                HStack(spacing: 8) {
                    Image(systemName: "checkmark")
                        .font(.system(size: 13, weight: .bold))
                    Text("Group Match: 4/5 agreed")
                        .font(.system(size: 14, weight: .bold))
                }
                .foregroundColor(.sqEmerald)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color.sqEmerald(0.08))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color.sqEmerald(0.15), lineWidth: 1)
                )

                Spacer()
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Group Vote Results

struct GroupVoteResultsScreen: View {
    let results: [(name: String, votes: String, pct: CGFloat, color: Color, badge: String?, badgeColor: Color)] = [
        ("Hidden Speakeasy", "4/4", 1.0, .sqEmerald, "✓ Must Do", .sqEmerald),
        ("Rooftop Yoga", "3/4", 0.75, .sqBlue, "★ Group Pick", .sqBlue),
        ("Flamenco Show", "2/4", 0.50, .sqOrange, nil, .clear),
        ("Tapas Tour", "2/4", 0.50, .sqAmber400, nil, .clear),
    ]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ScreenHeader(label: "Group Vote", title: "Results")

                VStack(spacing: 24) {
                    ForEach(0..<results.count, id: \.self) { i in
                        let r = results[i]
                        VStack(alignment: .leading, spacing: 0) {
                            HStack {
                                Text(r.name)
                                    .font(.system(size: 15, weight: .semibold))
                                    .foregroundColor(.white)
                                Spacer()
                                Text(r.votes)
                                    .font(.system(size: 14, weight: .medium))
                                    .foregroundColor(.white(0.30))
                            }
                            .padding(.bottom, 8)

                            // Progress bar
                            GeometryReader { geo in
                                ZStack(alignment: .leading) {
                                    Capsule()
                                        .fill(Color.white(0.05))
                                        .frame(height: 10)
                                    Capsule()
                                        .fill(r.color)
                                        .frame(width: geo.size.width * r.pct, height: 10)
                                }
                            }
                            .frame(height: 10)
                            .padding(.bottom, 6)

                            if let badge = r.badge {
                                Text(badge)
                                    .font(.system(size: 12, weight: .bold))
                                    .foregroundColor(r.badgeColor)
                            }
                        }
                    }
                }

                Spacer()

                // Tiebreaker card
                VStack(spacing: 6) {
                    Text("⚡ Tiebreaker!")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundColor(.sqOrange)

                    Text("Flamenco Show vs Tapas Tour")
                        .font(.system(size: 14))
                        .foregroundColor(.white(0.30))

                    Text("👑 Tapas Tour wins!")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundColor(.white)
                        .padding(.top, 2)
                }
                .frame(maxWidth: .infinity)
                .padding(20)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color.sqOrange(0.08))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color.sqOrange(0.20), lineWidth: 1)
                )
                .padding(.top, 16)
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Budget Lock

struct BudgetLockScreen: View {
    let breakdown: [(dot: Color, label: String, amount: String)] = [
        (.sqOrange, "Stays", "$560"),
        (.sqOrange, "Food", "$350"),
        (.sqEmerald, "Activities", "$280"),
        (.sqBlue, "Transport", "$210"),
    ]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ScreenHeader(label: "Budget", title: "Set Your Budget", subtitle: "Barcelona Trip · 4 members")

                VStack(spacing: 12) {
                    PillRow(emoji: "😎", text: "You", sub: "submitted budget", rightText: "$500", showCheck: true)
                    PillRow(emoji: "👩", text: "Sarah", sub: "submitted budget", rightText: "$400", showCheck: true)
                    PillRow(emoji: "🧑", text: "Mike", sub: "submitted budget", rightText: "$350", showCheck: true)
                    PillRow(emoji: "👩‍🦰", text: "Jess", sub: "submitted budget", rightText: "$450", showCheck: true)
                }
                .padding(.bottom, 20)

                // Group alignment card
                VStack(alignment: .leading, spacing: 0) {
                    HStack(spacing: 6) {
                        Text("✨")
                        Text("GROUP ALIGNMENT")
                            .font(.system(size: 10, weight: .bold))
                            .tracking(2)
                    }
                    .foregroundColor(.sqOrange(0.6))
                    .padding(.bottom, 6)

                    HStack(alignment: .firstTextBaseline, spacing: 12) {
                        Text("$350")
                            .font(.system(size: 32, weight: .bold))
                            .foregroundColor(.white)
                        Text("$1,400 total")
                            .font(.system(size: 13, weight: .medium))
                            .foregroundColor(.sqOrange(0.6))
                    }
                    .padding(.bottom, 2)

                    Text("per person target")
                        .font(.system(size: 13))
                        .foregroundColor(.white(0.25))
                        .padding(.bottom, 12)

                    // Progress bar
                    GeometryReader { geo in
                        Capsule()
                            .fill(Color.white(0.06))
                            .frame(height: 8)
                            .overlay(
                                Capsule()
                                    .fill(
                                        LinearGradient(
                                            colors: [.sqOrange, .sqAmber400],
                                            startPoint: .leading,
                                            endPoint: .trailing
                                        )
                                    )
                                    .frame(width: geo.size.width, height: 8),
                                alignment: .leading
                            )
                    }
                    .frame(height: 8)
                }
                .padding(20)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color.sqOrange(0.08))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color.sqOrange(0.20), lineWidth: 1)
                )
                .padding(.bottom, 16)

                // Suggested Breakdown
                Text("SUGGESTED BREAKDOWN")
                    .font(.system(size: 10, weight: .bold))
                    .tracking(1.5)
                    .foregroundColor(.white(0.15))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 8)

                VStack(spacing: 8) {
                    ForEach(0..<breakdown.count, id: \.self) { i in
                        let item = breakdown[i]
                        HStack(spacing: 10) {
                            Circle().fill(item.dot).frame(width: 8, height: 8)
                            Text(item.label)
                                .font(.system(size: 13))
                                .foregroundColor(.white(0.30))
                            Spacer()
                            Text(item.amount)
                                .font(.system(size: 13, weight: .medium))
                                .foregroundColor(.white(0.50))
                        }
                    }
                }
                .padding(.bottom, 12)

                // Settlements
                Text("SETTLEMENTS")
                    .font(.system(size: 10, weight: .bold))
                    .tracking(1.5)
                    .foregroundColor(.white(0.10))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.bottom, 6)

                VStack(spacing: 4) {
                    HStack {
                        Text("You owe Sarah")
                            .foregroundColor(.white(0.30))
                        Spacer()
                        Text("$45")
                            .foregroundColor(.sqRed.opacity(0.7))
                            .fontWeight(.medium)
                    }
                    .font(.system(size: 13))

                    HStack {
                        Text("Jess owes Mike")
                            .foregroundColor(.white(0.30))
                        Spacer()
                        Text("$20")
                            .foregroundColor(.sqEmerald.opacity(0.7))
                            .fontWeight(.medium)
                    }
                    .font(.system(size: 13))
                }
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Smart Schedule

struct SmartScheduleScreen: View {
    let schedule: [(time: String, name: String, icon: String)] = [
        ("9:00", "Sagrada Familia", "☀️"),
        ("12:30", "La Boqueria Market", "☀️"),
        ("2:00", "Pick up Mike ✈️", "⛅"),
        ("4:00", "Gothic Quarter", "☀️"),
    ]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ScreenHeader(label: "Smart Schedule", title: "Optimizing...")

                VStack(spacing: 12) {
                    PillRow(emoji: "☀️", text: "Beach day → Wednesday (sunny)")
                    PillRow(emoji: "🏛️", text: "Sagrada Familia at 9am (shorter lines)")
                    PillRow(emoji: "✈️", text: "Mike lands at 2pm (free afternoon first)")
                }
                .padding(.bottom, 28)

                // Optimized schedule card
                VStack(alignment: .leading, spacing: 0) {
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark")
                            .font(.system(size: 12, weight: .bold))
                        Text("Optimized Schedule Ready")
                            .font(.system(size: 14, weight: .bold))
                    }
                    .foregroundColor(.sqEmerald)
                    .padding(.bottom, 16)

                    VStack(spacing: 12) {
                        ForEach(0..<schedule.count, id: \.self) { i in
                            let item = schedule[i]
                            HStack(spacing: 14) {
                                Text(item.time)
                                    .font(.system(size: 12, design: .monospaced))
                                    .foregroundColor(.sqEmerald(0.5))
                                    .frame(width: 44, alignment: .leading)
                                Text(item.name)
                                    .font(.system(size: 13))
                                    .foregroundColor(.white(0.60))
                                Spacer()
                                Text(item.icon)
                                    .font(.system(size: 14))
                            }
                        }
                    }
                }
                .padding(20)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color.sqEmerald(0.08))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color.sqEmerald(0.15), lineWidth: 1)
                )

                Spacer()
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Previews

struct FeatureScreens_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            SwipeToVoteScreen().previewDisplayName("Swipe to Vote")
            GroupVoteResultsScreen().previewDisplayName("Vote Results")
            BudgetLockScreen().previewDisplayName("Budget Lock")
            SmartScheduleScreen().previewDisplayName("Smart Schedule")
        }
        .preferredColorScheme(.dark)
    }
}
