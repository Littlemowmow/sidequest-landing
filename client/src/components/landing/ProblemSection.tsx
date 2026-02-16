import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { AppSimulation } from "./AppSimulation";

export function ProblemSection() {
  const ChatBubble = ({ text, isMe }: { text: string, isMe?: boolean }) => (
    <div className={`py-2 px-3 rounded-2xl text-xs max-w-[90%] mb-1.5 ${isMe ? "bg-blue-500 text-white rounded-br-sm ml-auto" : "bg-white/10 text-white/70 rounded-bl-sm mr-auto"}`}>
      {text}
    </div>
  );

  return (
    <section id="demo" className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">The Problem</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-testid="text-problem-title">
            Don't let the trip die in the <br/>
            <span className="text-gradient">Group Chat.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-16">
            Sound familiar? Try the interactive demo below to see how SideQuest fixes it.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto flex justify-center items-center min-h-[750px]">
           
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="absolute left-0 top-16 hidden lg:block w-64 z-20"
          >
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-red-500/20 -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <div className="text-[10px] font-bold text-red-400 mb-2 uppercase tracking-widest">🔥 Budget Fight</div>
              <ChatBubble text="The boat rental is $800?? 🛥️" />
              <ChatBubble text="That puts us way over budget" isMe />
              <ChatBubble text="Let's find something cheaper" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
            className="absolute right-0 top-28 hidden lg:block w-64 z-20"
          >
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20 rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <div className="text-[10px] font-bold text-orange-400 mb-2 uppercase tracking-widest">📅 Date Clash</div>
              <ChatBubble text="How about June 12-15?" isMe />
              <ChatBubble text="Can't. Cousin's wedding." />
              <ChatBubble text="July 4th weekend?" isMe />
              <ChatBubble text="Flights are insane then 😭" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
            className="absolute left-8 bottom-36 hidden lg:block w-56 z-20"
          >
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <div className="text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">🤷‍♂️ Indecision</div>
              <ChatBubble text="So where are we going?" />
              <ChatBubble text="Idk you pick 🤷‍♂️" isMe />
              <ChatBubble text="I picked last time!" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.3 }}
            className="absolute right-4 bottom-28 hidden lg:block w-60 z-20"
          >
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-red-500/20 -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <div className="text-[10px] font-bold text-red-400 mb-2 uppercase tracking-widest">💀 Logistics Fail</div>
              <ChatBubble text="Did anyone book the train?" isMe />
              <ChatBubble text="..." />
              <ChatBubble text="I thought Mike was doing it 💀" />
            </div>
          </motion.div>

          <div className="bg-white rounded-[2.5rem] p-2.5 shadow-2xl border border-white/10 relative z-10 w-full max-w-[340px] mx-auto" data-testid="demo-phone-frame">
            <div className="bg-gray-50 rounded-[2rem] overflow-hidden h-[680px] flex flex-col relative">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-16 bg-black rounded-full z-20 pointer-events-none" />
              <div className="h-full w-full">
                <AppSimulation />
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-orange-500/10 to-rose-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <button
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/15 text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 text-base group"
            data-testid="button-sound-familiar"
          >
            Sound familiar? There's a better way
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
