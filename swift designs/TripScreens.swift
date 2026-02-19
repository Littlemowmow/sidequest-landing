import SwiftUI

// MARK: - Trip Setup

struct TripSetupScreen: View {
    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ScreenHeader(label: "New Trip", title: "Trip Setup")

                VStack(spacing: 16) {
                    PillRow(emoji: "📍", text: "Barcelona, Spain", showCheck: true)
                    PillRow(emoji: "👥", text: "4 people", showCheck: true)
                    PillRow(emoji: "📅", text: "5 days · June 12-16", showCheck: true)
                    PillRow(emoji: "💰", text: "$$ · ~$1,700 budget", showCheck: true)
                }

                Spacer()

                // Trip created confirmation
                HStack(spacing: 8) {
                    Image(systemName: "checkmark")
                        .font(.system(size: 13, weight: .bold))
                    Text("Trip Created!")
                        .font(.system(size: 15, weight: .bold))
                }
                .foregroundColor(.sqEmerald)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 16)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color.sqEmerald(0.08))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color.sqEmerald(0.15), lineWidth: 1)
                )
                .padding(.top, 24)
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Join Trip

struct JoinTripScreen: View {
    let code = ["A", "B", "3", "X", "7", "K"]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                Spacer()

                Text("🎟️")
                    .font(.system(size: 48))
                    .padding(.bottom, 32)

                ScreenHeader(
                    label: "Join a Trip",
                    title: "Enter Invite Code",
                    subtitle: "Enter the code your friend shared."
                )

                // Code input boxes
                HStack(spacing: 10) {
                    ForEach(0..<code.count, id: \.self) { i in
                        Text(code[i])
                            .font(.system(size: 20, weight: .bold, design: .monospaced))
                            .foregroundColor(.white)
                            .frame(width: 44, height: 52)
                            .background(
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(Color.white(0.05))
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color.white(0.05), lineWidth: 1)
                            )
                    }
                }
                .padding(.bottom, 32)

                PrimaryButton(text: "Join Trip", isGradient: true)
                    .shadow(color: .sqOrange(0.15), radius: 12)
                    .padding(.bottom, 12)

                Text("Codes are case-insensitive")
                    .font(.system(size: 12))
                    .foregroundColor(.white(0.12))

                Spacer()
            }
            .padding(.horizontal, 24)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Squad Itinerary

struct SquadItineraryScreen: View {
    let days = ["Day 1", "Day 2", "Day 3"]
    let items: [(emoji: String, period: String, periodColor: Color, name: String, by: String, bg: Color)] = [
        ("🍊", "Morning", Color(hex: "FB923C").opacity(0.6), "La Boqueria Ma...", "Jess", Color(hex: "F59E0B").opacity(0.06)),
        ("🏛️", "Afternoon", Color(hex: "FBBF24").opacity(0.6), "Gothic Quarter ...", "Marco", Color.white.opacity(0.03)),
        ("🍸", "Evening", Color(hex: "F87171").opacity(0.6), "Hidden Rooftop ...", "Jess", Color(hex: "A78BFA").opacity(0.04)),
    ]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ScreenHeader(label: "Squad Itinerary", title: "Barcelona Trip", subtitle: "Day 1")

                // Day tabs
                HStack(spacing: 10) {
                    ForEach(0..<days.count, id: \.self) { i in
                        Text(days[i])
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(i == 0 ? .sqOrange : .white(0.20))
                            .padding(.horizontal, 20)
                            .padding(.vertical, 10)
                            .background(
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(i == 0 ? Color.sqOrange(0.12) : Color.white(0.03))
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(i == 0 ? Color.sqOrange(0.20) : Color.white(0.03), lineWidth: 1)
                            )
                    }
                }
                .padding(.bottom, 28)

                // Itinerary items
                VStack(spacing: 16) {
                    ForEach(0..<items.count, id: \.self) { i in
                        let item = items[i]
                        HStack(spacing: 16) {
                            // Icon container
                            RoundedRectangle(cornerRadius: 12)
                                .fill(Color.white(0.04))
                                .frame(width: 48, height: 48)
                                .overlay(
                                    Text(item.emoji)
                                        .font(.system(size: 22))
                                )

                            VStack(alignment: .leading, spacing: 2) {
                                Text(item.period.uppercased())
                                    .font(.system(size: 10, weight: .bold))
                                    .tracking(1.5)
                                    .foregroundColor(item.periodColor)

                                Text(item.name)
                                    .font(.system(size: 15, weight: .bold))
                                    .foregroundColor(.white)

                                Text("Added by \(item.by)")
                                    .font(.system(size: 12))
                                    .foregroundColor(.white(0.20))
                            }

                            Spacer()

                            Image(systemName: "line.3.horizontal")
                                .font(.system(size: 14))
                                .foregroundColor(.white(0.10))
                        }
                        .padding(16)
                        .background(
                            RoundedRectangle(cornerRadius: 16)
                                .fill(item.bg)
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(Color.white(0.05), lineWidth: 1)
                        )
                    }
                }

                Spacer()

                Text("Drag to reorder · Tap to edit")
                    .font(.system(size: 12))
                    .foregroundColor(.white(0.10))
                    .padding(.top, 20)
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Members & Invite

struct MembersInviteScreen: View {
    let members: [(name: String, role: String?, online: Bool)] = [
        ("Alex (You)", "Owner", true),
        ("Sarah", nil, true),
        ("Mike", nil, false),
        ("Jess", nil, true),
        ("Marco", nil, false),
    ]

    var body: some View {
        VStack(spacing: 0) {
            StatusBarView()

            VStack(spacing: 0) {
                ScreenHeader(label: "Barcelona Trip", title: "Members", subtitle: "5 members")

                // Invite code card
                VStack(spacing: 0) {
                    Text("Share this code to invite friends")
                        .font(.system(size: 12))
                        .foregroundColor(.white(0.20))
                        .padding(.bottom, 12)

                    Text("AB3X7K")
                        .font(.system(size: 26, weight: .bold, design: .monospaced))
                        .foregroundColor(.white)
                        .tracking(8)
                        .padding(.bottom, 20)

                    HStack(spacing: 12) {
                        // Copy button
                        HStack(spacing: 6) {
                            Image(systemName: "doc.on.doc")
                                .font(.system(size: 14))
                            Text("Copy")
                                .font(.system(size: 13, weight: .medium))
                        }
                        .foregroundColor(.white(0.60))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(
                            RoundedRectangle(cornerRadius: 12)
                                .fill(Color.white(0.05))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.white(0.05), lineWidth: 1)
                        )

                        // Share button
                        HStack(spacing: 6) {
                            Image(systemName: "square.and.arrow.up")
                                .font(.system(size: 14))
                            Text("Share")
                                .font(.system(size: 13, weight: .medium))
                        }
                        .foregroundColor(.sqOrange)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(
                            RoundedRectangle(cornerRadius: 12)
                                .fill(Color.sqOrange(0.10))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.sqOrange(0.20), lineWidth: 1)
                        )
                    }
                }
                .padding(20)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color.white(0.04))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color.white(0.04), lineWidth: 1)
                )
                .padding(.bottom, 24)

                // Member list
                VStack(spacing: 0) {
                    ForEach(0..<members.count, id: \.self) { i in
                        let member = members[i]
                        HStack(spacing: 14) {
                            // Avatar with status
                            ZStack(alignment: .bottomTrailing) {
                                Circle()
                                    .fill(Color.white(0.05))
                                    .frame(width: 40, height: 40)

                                Circle()
                                    .fill(member.online ? Color.sqEmerald : Color.white(0.12))
                                    .frame(width: 12, height: 12)
                                    .overlay(
                                        Circle().stroke(Color.sqBackground, lineWidth: 2)
                                    )
                                    .offset(x: 2, y: 2)
                            }

                            Text(member.name)
                                .font(.system(size: 14, weight: .medium))
                                .foregroundColor(.white(0.80))

                            Spacer()

                            if let role = member.role {
                                Text(role)
                                    .font(.system(size: 10, weight: .bold))
                                    .foregroundColor(.sqOrange)
                                    .padding(.horizontal, 10)
                                    .padding(.vertical, 4)
                                    .background(
                                        Capsule().fill(Color.sqOrange(0.10))
                                    )
                            }
                        }
                        .padding(.vertical, 14)

                        if i < members.count - 1 {
                            Rectangle()
                                .fill(Color.white(0.03))
                                .frame(height: 1)
                        }
                    }
                }
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.sqBackground)
    }
}

// MARK: - Previews

struct TripScreens_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            TripSetupScreen().previewDisplayName("Trip Setup")
            JoinTripScreen().previewDisplayName("Join Trip")
            SquadItineraryScreen().previewDisplayName("Squad Itinerary")
            MembersInviteScreen().previewDisplayName("Members & Invite")
        }
        .preferredColorScheme(.dark)
    }
}
