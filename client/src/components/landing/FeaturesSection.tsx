import { motion } from "framer-motion";
import { Heart, X, Check, Clock, MapPin, DollarSign, Users, Grip } from "lucide-react";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-2.5 shadow-2xl w-full max-w-[280px] mx-auto">
      <div className="bg-gray-50 rounded-[2rem] overflow-hidden relative">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-14 bg-black rounded-full z-20" />
        <div className="pt-8 pb-6 px-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function SwipeVoteMockup() {
  return (
    <PhoneFrame>
      <div className="text-center mb-3">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Swipe to Vote</div>
        <div className="text-xs text-gray-500">Barcelona Trip &middot; 5 members</div>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4 aspect-[3/4]">
        <img src="/images/hero-barcelona.jpg" className="w-full h-full object-cover" alt="Barcelona beach" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="text-lg font-bold font-display">Barceloneta Beach</div>
          <div className="flex items-center gap-2 text-xs opacity-80 mt-0.5">
            <MapPin size={10} /> Beach &middot; Free
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mb-3">
        <div className="w-14 h-14 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-red-400 shadow-sm">
          <X size={24} />
        </div>
        <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-500 shadow-sm">
          <Heart size={24} />
        </div>
      </div>
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-center">
        <div className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5">
          <Check size={12} /> Group Match: 4/5 agreed
        </div>
      </div>
    </PhoneFrame>
  );
}

function BudgetLockMockup() {
  const categories = [
    { name: "Accommodation", pct: 40, color: "bg-orange-400" },
    { name: "Food", pct: 30, color: "bg-amber-400" },
    { name: "Activities", pct: 20, color: "bg-emerald-400" },
    { name: "Transport", pct: 10, color: "bg-blue-400" },
  ];

  return (
    <PhoneFrame>
      <div className="text-center mb-4">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Budget Lock</div>
        <div className="text-xs text-gray-500">Barcelona Trip &middot; 5 members</div>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 mb-4 border border-orange-100/60">
        <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">Group Budget</div>
        <div className="text-3xl font-bold font-display text-gray-900">$1,200</div>
        <div className="text-xs text-gray-500 mt-0.5">$240 per person</div>
      </div>
      <div className="space-y-3 mb-4">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
              <span>{cat.name}</span>
              <span>{cat.pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="text-emerald-500" />
          <span className="text-xs font-medium text-gray-600">Real-time splits</span>
        </div>
        <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Live</div>
      </div>
    </PhoneFrame>
  );
}

function SquadItineraryMockup() {
  const items = [
    { time: "Morning", activity: "La Boqueria Market", icon: "🍊", addedBy: "Jess" },
    { time: "Afternoon", activity: "Gothic Quarter Walk", icon: "🏛️", addedBy: "Marco" },
    { time: "Evening", activity: "Hidden Rooftop Bar", icon: "🍸", addedBy: "Jess" },
  ];

  return (
    <PhoneFrame>
      <div className="text-center mb-4">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Squad Itinerary</div>
        <div className="text-xs text-gray-500">Barcelona Trip &middot; Day 1</div>
      </div>
      <div className="flex gap-2 mb-4">
        {["Day 1", "Day 2", "Day 3"].map((d, i) => (
          <div key={d} className={`flex-1 text-center py-1.5 rounded-lg text-[11px] font-bold ${i === 0 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex items-start gap-3 group hover:border-orange-100 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-lg shrink-0">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">{item.time}</div>
              <div className="text-sm font-bold text-gray-900 truncate">{item.activity}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Added by {item.addedBy}</div>
            </div>
            <Grip size={14} className="text-gray-300 mt-1 shrink-0" />
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <div className="text-[10px] text-gray-400 font-medium">Drag to reorder &middot; Tap to edit</div>
      </div>
    </PhoneFrame>
  );
}

export function FeaturesSection() {
  const features = [
    {
      id: "swipe-vote",
      label: "Swipe & Vote",
      title: "Swipe & Vote",
      description: "No more \"I'm down if you are.\" Everyone swipes on destinations and activities independently. SideQuest finds what your group actually agrees on — no awkward standoffs.",
      mockup: <SwipeVoteMockup />,
    },
    {
      id: "budget-lock",
      label: "Budget Lock",
      title: "Budget Lock",
      description: "Set a group budget everyone's comfortable with before anyone books anything. Real-time expense tracking and automatic splits so nobody's chasing Venmo requests three months later.",
      mockup: <BudgetLockMockup />,
    },
    {
      id: "squad-itinerary",
      label: "Squad Itinerary",
      title: "Squad Itinerary",
      description: "Build a shared itinerary everyone can see and edit. Drag, drop, remix. No more one person doing all the work while everyone else says \"whatever you think.\"",
      mockup: <SquadItineraryMockup />,
    },
  ];

  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-testid="text-features-title">
            From chaos to consensus
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Three tools that replace 200 unread messages.
          </p>
        </motion.div>

        <div className="space-y-24">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
              data-testid={`card-feature-${idx}`}
            >
              <div className="flex-1 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">
                  {feature.label}
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed text-[16px]">{feature.description}</p>
              </div>
              <div className="flex-1 flex justify-center">
                {feature.mockup}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
