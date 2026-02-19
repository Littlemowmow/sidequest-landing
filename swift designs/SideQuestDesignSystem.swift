import SwiftUI

// MARK: - Color System
// Exact hex values from the React/Tailwind design

extension Color {
    // Core palette
    static let sqBackground = Color(hex: "0a0a0a")
    static let sqPhoneFrame = Color(hex: "171717")
    static let sqPhoneFrameTop = Color(hex: "222222")
    static let sqNotch = Color(hex: "1a1a1a")

    // Primary accent
    static let sqOrange = Color(hex: "F97316")
    static let sqAmber = Color(hex: "F59E0B")

    // Semantic
    static let sqEmerald = Color(hex: "34D399")
    static let sqRed = Color(hex: "F87171")
    static let sqBlue = Color(hex: "60A5FA")
    static let sqCyan = Color(hex: "22D3EE")
    static let sqPurple = Color(hex: "A78BFA")
    static let sqAmber600 = Color(hex: "D97706")
    static let sqAmber400 = Color(hex: "FBBF24")

    // White with opacity helpers
    static func white(_ opacity: Double) -> Color {
        Color.white.opacity(opacity)
    }

    // Orange with opacity helpers
    static func sqOrange(_ opacity: Double) -> Color {
        Color.sqOrange.opacity(opacity)
    }

    // Emerald with opacity helpers
    static func sqEmerald(_ opacity: Double) -> Color {
        Color.sqEmerald.opacity(opacity)
    }

    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6:
            (a, r, g, b) = (255, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = ((int >> 24) & 0xFF, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Font System
// Outfit for display/headlines, Inter for body
// Register these fonts in your Xcode project's Info.plist

extension Font {
    static func outfit(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        switch weight {
        case .bold:
            return .custom("Outfit-Bold", size: size)
        case .semibold:
            return .custom("Outfit-SemiBold", size: size)
        case .medium:
            return .custom("Outfit-Medium", size: size)
        default:
            return .custom("Outfit-Regular", size: size)
        }
    }

    static func inter(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        switch weight {
        case .bold:
            return .custom("Inter-Bold", size: size)
        case .semibold:
            return .custom("Inter-SemiBold", size: size)
        case .medium:
            return .custom("Inter-Medium", size: size)
        default:
            return .custom("Inter-Regular", size: size)
        }
    }
}

// MARK: - Shared Components

struct StatusBarView: View {
    var body: some View {
        HStack {
            Text("9:41")
                .font(.system(size: 10, weight: .semibold))
                .foregroundColor(.white(0.35))
            Spacer()
            HStack(spacing: 6) {
                Image(systemName: "cellularbars")
                    .font(.system(size: 10))
                Image(systemName: "wifi")
                    .font(.system(size: 10))
                Image(systemName: "battery.100")
                    .font(.system(size: 12))
            }
            .foregroundColor(.white(0.35))
        }
        .padding(.horizontal, 24)
        .padding(.bottom, 8)
    }
}

struct ScreenHeader: View {
    let label: String
    let title: String
    var subtitle: String? = nil

    var body: some View {
        VStack(spacing: 0) {
            Text(label.uppercased())
                .font(.system(size: 10, weight: .bold))
                .tracking(2.5)
                .foregroundColor(.sqOrange(0.6))
                .padding(.bottom, 10)

            Text(title)
                .font(.system(size: 22, weight: .bold))
                .foregroundColor(.white)

            if let subtitle = subtitle {
                Text(subtitle)
                    .font(.system(size: 13))
                    .foregroundColor(.white(0.25))
                    .padding(.top, 6)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.bottom, 28)
    }
}

struct PillRow: View {
    let emoji: String
    let text: String
    var sub: String? = nil
    var rightText: String? = nil
    var showCheck: Bool = false
    var highlight: Bool = false

    var body: some View {
        HStack(spacing: 16) {
            Text(emoji)
                .font(.system(size: 22))

            VStack(alignment: .leading, spacing: 2) {
                Text(text)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(.white)
                if let sub = sub {
                    Text(sub)
                        .font(.system(size: 11))
                        .foregroundColor(.white(0.20))
                }
            }

            Spacer()

            if let rightText = rightText {
                Text(rightText)
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(.white)
            }

            if showCheck {
                GreenCheckView()
            }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 16)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(highlight ? Color.sqOrange(0.08) : Color.white(0.05))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(highlight ? Color.sqOrange(0.20) : Color.white(0.05), lineWidth: 1)
        )
    }
}

struct GreenCheckView: View {
    var body: some View {
        Image(systemName: "checkmark")
            .font(.system(size: 14, weight: .bold))
            .foregroundColor(.sqEmerald)
    }
}

struct ProgressDots: View {
    let step: Int
    let total: Int = 8

    var body: some View {
        HStack(spacing: 6) {
            ForEach(0..<total, id: \.self) { i in
                Capsule()
                    .fill(i == step ? Color.sqOrange(1.0) : Color.white(0.08))
                    .frame(width: i == step ? 28 : 6, height: 6)
            }
        }
        .padding(.top, 4)
        .padding(.bottom, 24)
    }
}

struct InputField: View {
    let placeholder: String

    var body: some View {
        Text(placeholder)
            .font(.system(size: 14))
            .foregroundColor(.white(0.20))
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
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

struct PrimaryButton: View {
    let text: String
    var isGradient: Bool = false

    var body: some View {
        Text(text)
            .font(.system(size: 15, weight: .bold))
            .foregroundColor(isGradient ? .white : .black)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(
                Group {
                    if isGradient {
                        LinearGradient(
                            colors: [.sqOrange, .sqAmber],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    } else {
                        Color.white
                    }
                }
            )
            .clipShape(RoundedRectangle(cornerRadius: 16))
    }
}

struct SectionDivider: View {
    var body: some View {
        Rectangle()
            .fill(Color.white(0.05))
            .frame(height: 1)
    }
}

// MARK: - Slider Track Component

struct SliderTrack: View {
    let progress: CGFloat
    var gradientColors: [Color] = [.sqOrange, .sqAmber400]
    var thumbBorderColor: Color = .sqOrange
    var shadowColor: Color = .sqOrange

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule()
                    .fill(Color.white(0.06))
                    .frame(height: 10)

                Capsule()
                    .fill(LinearGradient(colors: gradientColors, startPoint: .leading, endPoint: .trailing))
                    .frame(width: geo.size.width * progress, height: 10)

                Circle()
                    .fill(Color.white)
                    .frame(width: 24, height: 24)
                    .shadow(color: shadowColor.opacity(0.3), radius: 6)
                    .overlay(
                        Circle().stroke(thumbBorderColor, lineWidth: 2)
                    )
                    .offset(x: geo.size.width * progress - 12)
            }
        }
        .frame(height: 24)
    }
}
