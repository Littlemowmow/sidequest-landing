import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calendar, ChevronRight, MapPin, X, Heart, Check, Users, Play, Loader2, MessageCircle, DollarSign, ArrowRightLeft, CreditCard } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";

// Mock Data
const DESTINATIONS = [
  {
    id: 1,
    name: "Tulum, Mexico",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop",
    price: "$1,200",
    tags: ["Beach", "Party", "Relax"]
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    price: "$1,800",
    tags: ["Culture", "Food", "Scenic"]
  },
  {
    id: 3,
    name: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2159&auto=format&fit=crop",
    price: "$2,100",
    tags: ["Adventure", "Nature", "Cold"]
  },
  {
    id: 4,
    name: "Amalfi Coast, Italy",
    image: "https://images.unsplash.com/photo-1633321088355-d0f8c1eaad48?q=80&w=2070&auto=format&fit=crop",
    price: "$2,500",
    tags: ["Luxury", "Views", "Food"]
  }
];

// Mock Chat Messages for Voting Step
const MOCK_MESSAGES = [
  { user: "Sarah", avatar: "https://i.pravatar.cc/150?u=1", text: "Tulum looks insane! 😍", color: "bg-pink-100 text-pink-700" },
  { user: "Mike", avatar: "https://i.pravatar.cc/150?u=2", text: "Wait, Japan is actually in budget?", color: "bg-blue-100 text-blue-700" },
  { user: "Jess", avatar: "https://i.pravatar.cc/150?u=3", text: "I voted for Italy 🍝", color: "bg-green-100 text-green-700" },
  { user: "Alex", avatar: "https://i.pravatar.cc/150?u=4", text: "Team Tulum!!", color: "bg-orange-100 text-orange-700" }
];

// Mock Expenses Data keyed by Destination ID
const MOCK_EXPENSES = {
  1: [ // Tulum
    { title: "Villa Deposit", payer: "Sarah", amount: 1200, icon: "🏠" },
    { title: "Beach Club Cabana", payer: "Mike", amount: 450, icon: "🍹" },
    { title: "Tacos & Cervezas", payer: "You", amount: 85, icon: "🌮" },
    { title: "Van Rental", payer: "Jess", amount: 320, icon: "🚐" },
  ],
  2: [ // Kyoto
    { title: "Ryokan Booking", payer: "Sarah", amount: 1800, icon: "🏯" },
    { title: "Omakase Dinner", payer: "Mike", amount: 600, icon: "🍣" },
    { title: "Bullet Train Pass", payer: "You", amount: 400, icon: "🚅" },
    { title: "Tea Ceremony", payer: "Jess", amount: 120, icon: "🍵" },
  ],
  3: [ // Reykjavik
    { title: "4x4 Rental", payer: "Mike", amount: 900, icon: "🚙" },
    { title: "Blue Lagoon Tickets", payer: "Sarah", amount: 300, icon: "💧" },
    { title: "Cabin Airbnb", payer: "Jess", amount: 1100, icon: "🏡" },
    { title: "Grocery Haul", payer: "You", amount: 250, icon: "🛒" },
  ],
  4: [ // Amalfi
    { title: "Cliffside Villa", payer: "Sarah", amount: 2200, icon: "🍋" },
    { title: "Boat Rental", payer: "Mike", amount: 800, icon: "🚤" },
    { title: "Pasta Making Class", payer: "You", amount: 300, icon: "🍝" },
    { title: "Limoncello Tasting", payer: "Jess", amount: 150, icon: "🥂" },
  ]
};

export default function DemoPage() {
  const [step, setStep] = useState<"setup" | "swipe" | "voting" | "result" | "split">("setup");
  const [tripDetails, setTripDetails] = useState({ name: "", budget: [1500] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedDestinations, setLikedDestinations] = useState<number[]>([]);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);

  // Setup Step
  const handleStart = () => {
    if (tripDetails.name) setStep("swipe");
  };

  // Swipe Logic
  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setLikedDestinations([...likedDestinations, DESTINATIONS[currentIndex].id]);
    }
    
    setDragDirection(direction);
    
    setTimeout(() => {
      setDragDirection(null);
      if (currentIndex < DESTINATIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setStep("voting");
      }
    }, 200);
  };

  // Simulation of "Group Voting"
  const [votingProgress, setVotingProgress] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<typeof MOCK_MESSAGES>([]);
  
  useEffect(() => {
    if (step === "voting") {
      const interval = setInterval(() => {
        setVotingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep("result");
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F97316', '#FB923C', '#FDBA74']
              });
            }, 500);
            return 100;
          }
          return prev + 1; // Slowed down slightly for realism
        });
      }, 30);

      // Simulate chat messages popping up
      let msgIndex = 0;
      const msgInterval = setInterval(() => {
        if (msgIndex < MOCK_MESSAGES.length) {
          setVisibleMessages(prev => [...prev, MOCK_MESSAGES[msgIndex]]);
          msgIndex++;
        } else {
          clearInterval(msgInterval);
        }
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(msgInterval);
      };
    }
  }, [step]);

  // Budget Emoji Logic
  const getBudgetEmoji = (amount: number) => {
    if (amount < 1000) return "💸";
    if (amount < 2500) return "💰";
    if (amount < 4000) return "💳";
    return "💎";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar for Demo */}
      <nav className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50">
         <div className="container mx-auto max-w-md flex justify-between items-center">
            <Link href="/">
               <div className="cursor-pointer hover:opacity-80 transition-opacity">
                  <Logo size="text-xl" className="text-sq-text" />
               </div>
            </Link>
            <div className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">
               Interactive Demo
            </div>
         </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden min-h-[650px] relative border border-gray-100 flex flex-col">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SETUP TRIP */}
            {step === "setup" && (
              <motion.div 
                key="setup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 flex flex-col h-full flex-1"
              >
                <div className="flex-1">
                   <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                      <MapPin size={32} />
                   </div>
                   <h2 className="text-3xl font-display font-bold text-sq-text mb-2">Start a Trip</h2>
                   <p className="text-gray-500 mb-8">Create a new group trip to get started.</p>

                   <div className="space-y-6">
                      <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Trip Name</label>
                        <Input 
                          placeholder="e.g. Summer 2026 ☀️" 
                          className="text-lg py-6 rounded-xl border-gray-200 focus:ring-orange-500"
                          value={tripDetails.name}
                          onChange={(e) => setTripDetails({...tripDetails, name: e.target.value})}
                          autoFocus
                        />
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex justify-between mb-4">
                           <label className="text-sm font-bold text-gray-700">Budget / Person</label>
                           <span className="text-lg font-bold text-orange-600 flex items-center gap-2">
                             {getBudgetEmoji(tripDetails.budget[0])} ${tripDetails.budget}
                           </span>
                        </div>
                        <Slider 
                           value={tripDetails.budget} 
                           onValueChange={(val) => setTripDetails({...tripDetails, budget: val})}
                           max={5000} 
                           step={100}
                           className="py-4"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium uppercase tracking-wide">
                           <span>Cheap</span>
                           <span>Boujee</span>
                        </div>
                      </div>
                   </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full rounded-xl font-bold text-lg bg-sq-primary hover:bg-orange-600 h-14 shadow-lg shadow-orange-500/20"
                  onClick={handleStart}
                  disabled={!tripDetails.name}
                >
                  Create Trip <ChevronRight className="ml-2" />
                </Button>
              </motion.div>
            )}


            {/* STEP 2: SWIPING */}
            {step === "swipe" && (
               <motion.div 
                 key="swipe"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 className="relative h-full flex flex-col flex-1"
               >
                  {/* Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-20">
                     <div 
                       className="h-full bg-orange-500 transition-all duration-300" 
                       style={{ width: `${((currentIndex) / DESTINATIONS.length) * 100}%` }} 
                     />
                  </div>

                  <div className="p-6 pb-0 flex justify-between items-center bg-white z-10">
                     <div className="font-display font-bold text-xl text-sq-text">{tripDetails.name}</div>
                     <div className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500">
                        {currentIndex + 1} / {DESTINATIONS.length}
                     </div>
                  </div>

                  <div className="flex-1 p-4 flex items-center justify-center relative overflow-hidden">
                     <AnimatePresence mode="popLayout">
                        <motion.div
                           key={DESTINATIONS[currentIndex].id}
                           initial={{ scale: 0.95, opacity: 0, y: 20 }}
                           animate={{ 
                             scale: 1, 
                             opacity: 1, 
                             y: 0,
                             x: dragDirection === "left" ? -200 : dragDirection === "right" ? 200 : 0,
                             rotate: dragDirection === "left" ? -10 : dragDirection === "right" ? 10 : 0
                           }}
                           exit={{ scale: 1.05, opacity: 0 }}
                           transition={{ type: "spring", damping: 20, stiffness: 300 }}
                           className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl bg-white cursor-grab active:cursor-grabbing group"
                           drag="x"
                           dragConstraints={{ left: 0, right: 0 }}
                           onDragEnd={(e, { offset, velocity }) => {
                             const swipe = offset.x;
                             if (swipe < -100) handleSwipe("left");
                             else if (swipe > 100) handleSwipe("right");
                           }}
                        >
                           <img 
                              src={DESTINATIONS[currentIndex].image} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                              alt={DESTINATIONS[currentIndex].name}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                           
                           {/* Swipe Indicators */}
                           <div className={`absolute top-8 right-8 border-4 border-green-500 text-green-500 text-3xl font-black uppercase tracking-widest px-4 py-2 rounded-lg transform rotate-12 opacity-0 ${dragDirection === 'right' ? '!opacity-100' : ''} transition-opacity`}>
                             LIKE
                           </div>
                           <div className={`absolute top-8 left-8 border-4 border-red-500 text-red-500 text-3xl font-black uppercase tracking-widest px-4 py-2 rounded-lg transform -rotate-12 opacity-0 ${dragDirection === 'left' ? '!opacity-100' : ''} transition-opacity`}>
                             NOPE
                           </div>

                           <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <h3 className="text-4xl font-display font-bold mb-2 leading-none">{DESTINATIONS[currentIndex].name}</h3>
                              <div className="flex items-center gap-3 mb-4">
                                 <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-bold border border-white/20">
                                   {DESTINATIONS[currentIndex].price}
                                 </span>
                                 <span className="text-white/80 text-sm">per person</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                 {DESTINATIONS[currentIndex].tags.map(tag => (
                                    <span key={tag} className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                                       {tag}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                     </AnimatePresence>
                  </div>

                  <div className="p-6 pt-0 flex gap-6 justify-center items-center pb-8">
                     <button 
                        onClick={() => handleSwipe("left")}
                        className="w-16 h-16 rounded-full bg-white shadow-xl text-red-500 flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all border border-gray-100"
                     >
                        <X size={32} />
                     </button>
                     <button 
                        onClick={() => handleSwipe("right")}
                        className="w-16 h-16 rounded-full bg-sq-primary shadow-xl shadow-orange-500/30 text-white flex items-center justify-center hover:bg-orange-600 hover:scale-110 transition-all"
                     >
                        <Heart size={32} fill="currentColor" />
                     </button>
                  </div>
               </motion.div>
            )}


            {/* STEP 3: SIMULATED GROUP VOTING */}
            {step === "voting" && (
               <motion.div 
                  key="voting"
                  className="flex flex-col items-center justify-center h-full p-8 text-center flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
               >
                  <div className="w-full max-w-xs mb-8 space-y-3 relative h-48">
                    <AnimatePresence>
                      {visibleMessages.map((msg, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={`flex items-end gap-2 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                        >
                           <img src={msg.avatar} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                           <div className={`px-4 py-2 rounded-2xl text-sm font-medium shadow-sm ${msg.color} ${i % 2 === 0 ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                              {msg.text}
                           </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 relative">
                     <Loader2 size={32} className="text-orange-500 animate-spin" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-sq-text mb-2">Syncing Votes...</h2>
                  <p className="text-gray-400 text-sm mb-8">Waiting for friends to decide</p>

                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden max-w-xs relative">
                     <motion.div 
                        className="bg-sq-primary h-full rounded-full absolute left-0 top-0"
                        animate={{ width: `${votingProgress}%` }}
                        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                     />
                  </div>
                  <div className="mt-2 text-xs font-bold text-orange-600">{votingProgress}% Complete</div>
               </motion.div>
            )}


            {/* STEP 4: RESULTS */}
            {step === "result" && (
               <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 flex flex-col h-full bg-sq-primary text-white text-center flex-1 relative overflow-hidden"
               >
                  {/* Confetti Canvas is handled by library, this is just background */}
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />

                  <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                     <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6 ring-4 ring-white/10">
                        <Check size={40} className="text-white" />
                     </div>
                     <h2 className="text-4xl font-display font-bold mb-2">It's a Match!</h2>
                     <p className="text-orange-100 text-lg mb-8">Your group decided on:</p>

                     <motion.div 
                       initial={{ y: 50, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ delay: 0.2 }}
                       className="bg-white text-sq-text p-4 rounded-3xl w-full max-w-xs shadow-2xl mx-auto transform rotate-2 ring-4 ring-white/20"
                     >
                        <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative">
                           <img 
                              src={DESTINATIONS.find(d => d.id === likedDestinations[0])?.image || DESTINATIONS[0].image} 
                              className="w-full h-full object-cover" 
                           />
                           <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                              100% Match
                           </div>
                        </div>
                        <h3 className="font-bold text-2xl mb-1 text-left">
                           {DESTINATIONS.find(d => d.id === likedDestinations[0])?.name || DESTINATIONS[0].name}
                        </h3>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                           <span className="font-medium">{tripDetails.name}</span>
                           <span className="flex -space-x-2">
                              {[1,2,3,4].map(i => (
                                 <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                              ))}
                           </span>
                        </div>
                     </motion.div>
                  </div>

                  <div className="mt-8 relative z-10 space-y-3">
                     <p className="text-sm text-orange-100 font-medium">Trip is locked! What's next?</p>
                     
                     <Button 
                        size="lg" 
                        className="w-full bg-white text-sq-primary hover:bg-gray-50 font-bold rounded-xl h-14 shadow-lg"
                        onClick={() => setStep("split")}
                     >
                        <DollarSign className="mr-2" size={20} /> Split Expenses
                     </Button>

                     <Button 
                        variant="ghost"
                        className="w-full text-orange-100 hover:text-white hover:bg-white/10"
                        onClick={() => window.location.href = "/"}
                     >
                        Skip to Waitlist
                     </Button>
                  </div>
               </motion.div>
            )}


            {/* STEP 5: EXPENSE SPLITTING */}
            {step === "split" && (
               <motion.div 
                  key="split"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 flex flex-col h-full bg-gray-50"
               >
                  <div className="flex items-center gap-2 mb-6 text-sq-text">
                     <Button variant="ghost" size="icon" onClick={() => setStep("result")} className="-ml-2">
                        <ChevronRight className="rotate-180" />
                     </Button>
                     <h2 className="text-xl font-bold font-display">Shared Expenses</h2>
                  </div>

                  {/* Total Card */}
                  <div className="bg-sq-text text-white p-6 rounded-3xl shadow-xl mb-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                     <div className="relative z-10">
                        <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Trip Cost</div>
                        <div className="text-4xl font-bold font-display flex items-baseline gap-1">
                           ${MOCK_EXPENSES[likedDestinations[0] || 1].reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                        </div>
                        <div className="mt-4 flex gap-2">
                           <div className="flex -space-x-2">
                              {[1,2,3,4].map(i => (
                                 <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-8 h-8 rounded-full border-2 border-sq-text" />
                              ))}
                           </div>
                           <div className="text-xs text-gray-400 flex items-center">
                              Split by 4 people
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Expenses List */}
                  <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3 mb-6">
                     <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Payments</h3>
                     {MOCK_EXPENSES[likedDestinations[0] || 1].map((expense, i) => (
                        <motion.div 
                           key={i}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.1 }}
                           className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
                        >
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xl">
                                 {expense.icon}
                              </div>
                              <div>
                                 <div className="font-bold text-gray-800">{expense.title}</div>
                                 <div className="text-xs text-gray-400">Paid by <span className="font-bold text-gray-600">{expense.payer}</span></div>
                              </div>
                           </div>
                           <div className="font-bold text-sq-text">
                              ${expense.amount}
                           </div>
                        </motion.div>
                     ))}
                  </div>

                  {/* Settle Up Action */}
                  <div className="bg-white p-4 rounded-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                           <ArrowRightLeft className="text-orange-500" size={20} />
                           <span className="font-bold text-gray-700">You owe Sarah</span>
                        </div>
                        <span className="font-bold text-xl text-sq-text">$350.00</span>
                     </div>
                     <Button 
                        size="lg" 
                        className="w-full bg-black text-white hover:bg-gray-800 font-bold rounded-xl h-14"
                        onClick={() => {
                           confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
                           setTimeout(() => window.location.href = "/", 1500);
                        }}
                     >
                        <CreditCard className="mr-2" size={18} /> Pay & Settle Up
                     </Button>
                  </div>

               </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
