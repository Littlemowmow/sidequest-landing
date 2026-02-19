import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import {
  Plus,
  Trash2,
  Share2,
  Check,
  Copy,
  ArrowLeft,
  Vote,
  Users,
  Utensils,
  MapPin,
  Clock,
  Sparkles,
  BarChart3,
  ChevronRight,
} from "lucide-react";

const CATEGORIES = [
  { id: "meal", label: "Meal", icon: Utensils, emoji: "🍕" },
  { id: "activity", label: "Activity", icon: Sparkles, emoji: "🎯" },
  { id: "destination", label: "Destination", icon: MapPin, emoji: "📍" },
  { id: "time", label: "Time", icon: Clock, emoji: "⏰" },
  { id: "general", label: "General", icon: Vote, emoji: "📊" },
] as const;

const QUICK_TEMPLATES = [
  { question: "Where should we eat tonight?", options: ["Chipotle", "Raising Cane's", "Noodles & Company", "Zingerman's"], category: "meal" as const },
  { question: "What should we do this weekend?", options: ["Beach day", "Hiking", "Game night", "Movie marathon"], category: "activity" as const },
  { question: "Spring break destination?", options: ["Miami", "Cancun", "Nashville", "Puerto Rico"], category: "destination" as const },
  { question: "When should we leave?", options: ["Friday morning", "Friday night", "Saturday morning", "Thursday night"], category: "time" as const },
];

export default function PollPage() {
  const [, params] = useRoute("/poll/:shareCode");
  const shareCode = params?.shareCode;

  if (shareCode) {
    return <PollVotingView shareCode={shareCode} />;
  }

  return <CreatePollView />;
}

function CreatePollView() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<"choose" | "create">("choose");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [category, setCategory] = useState<string>("general");
  const [createdBy, setCreatedBy] = useState("");
  const [createdPoll, setCreatedPoll] = useState<{ shareCode: string; question: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/polls", {
        question,
        options: options.filter(o => o.trim()),
        category,
        createdBy: createdBy || "Anonymous",
      });
      return res.json();
    },
    onSuccess: (data) => {
      setCreatedPoll({ shareCode: data.shareCode, question: data.question });
    },
  });

  const addOption = () => {
    if (options.length < 8) setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const useTemplate = (template: typeof QUICK_TEMPLATES[0]) => {
    setQuestion(template.question);
    setOptions(template.options);
    setCategory(template.category);
    setStep("create");
  };

  const canSubmit = question.trim() && options.filter(o => o.trim()).length >= 2;

  const shareUrl = createdPoll ? `${window.location.origin}/poll/${createdPoll.shareCode}` : "";

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (createdPoll) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <PollNavbar />
        <div className="max-w-lg mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold font-outfit">Poll Created!</h1>
            <p className="text-white/60">{createdPoll.question}</p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <p className="text-sm text-white/50 uppercase tracking-wider">Share this link with your group</p>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={shareUrl}
                  className="bg-white/5 border-white/10 text-white text-sm"
                  data-testid="input-share-url"
                />
                <Button
                  onClick={copyLink}
                  variant="outline"
                  className="shrink-0 border-white/10 hover:bg-white/10"
                  data-testid="button-copy-link"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={() => navigate(`/poll/${createdPoll.shareCode}`)}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded-xl h-12"
                data-testid="button-view-poll"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Poll & Vote
              </Button>
              <Button
                onClick={() => {
                  setCreatedPoll(null);
                  setQuestion("");
                  setOptions(["", ""]);
                  setCategory("general");
                  setStep("choose");
                }}
                variant="ghost"
                className="text-white/50 hover:text-white"
                data-testid="button-create-another"
              >
                Create Another Poll
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PollNavbar />
      <div className="max-w-lg mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold font-outfit">Quick Poll</h1>
            <p className="text-white/50">Create a poll, share the link, let your group decide</p>
          </div>

          <AnimatePresence mode="wait">
            {step === "choose" ? (
              <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm text-white/40 uppercase tracking-wider font-medium">Quick Templates</p>
                  {QUICK_TEMPLATES.map((template, i) => {
                    const cat = CATEGORIES.find(c => c.id === template.category);
                    return (
                      <motion.button
                        key={i}
                        onClick={() => useTemplate(template)}
                        className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 text-left transition-colors"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        data-testid={`button-template-${i}`}
                      >
                        <span className="text-2xl">{cat?.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{template.question}</p>
                          <p className="text-sm text-white/40 truncate">{template.options.join(" · ")}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
                      </motion.button>
                    );
                  })}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-4 text-white/30">or</span>
                  </div>
                </div>

                <Button
                  onClick={() => setStep("create")}
                  variant="outline"
                  className="w-full h-14 border-white/10 hover:bg-white/10 rounded-2xl text-white font-medium"
                  data-testid="button-custom-poll"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Custom Poll
                </Button>
              </motion.div>
            ) : (
              <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <button
                  onClick={() => setStep("choose")}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                  data-testid="button-back-templates"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to templates
                </button>

                <div className="space-y-2">
                  <label className="text-sm text-white/50 font-medium">Your Name</label>
                  <Input
                    value={createdBy}
                    onChange={e => setCreatedBy(e.target.value)}
                    placeholder="e.g. Alex"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-12"
                    data-testid="input-creator-name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/50 font-medium">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          category === cat.id
                            ? "bg-[#F97316] text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                        data-testid={`button-category-${cat.id}`}
                      >
                        <span>{cat.emoji}</span>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/50 font-medium">Question</label>
                  <Input
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder="What should we do?"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-12"
                    maxLength={200}
                    data-testid="input-question"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm text-white/50 font-medium">Options</label>
                  {options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-sm text-white/40 font-medium">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <Input
                        value={opt}
                        onChange={e => updateOption(i, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 flex-1"
                        maxLength={100}
                        data-testid={`input-option-${i}`}
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => removeOption(i)}
                          className="text-white/30 hover:text-red-400 transition-colors p-1"
                          data-testid={`button-remove-option-${i}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {options.length < 8 && (
                    <button
                      onClick={addOption}
                      className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors pl-10"
                      data-testid="button-add-option"
                    >
                      <Plus className="w-4 h-4" />
                      Add option
                    </button>
                  )}
                </div>

                <Button
                  onClick={() => createMutation.mutate()}
                  disabled={!canSubmit || createMutation.isPending}
                  className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded-xl h-12 disabled:opacity-40"
                  data-testid="button-create-poll"
                >
                  {createMutation.isPending ? "Creating..." : "Create Poll"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function PollVotingView({ shareCode }: { shareCode: string }) {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [voterName, setVoterName] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data, isLoading, error } = useQuery<{
    poll: { id: number; shareCode: string; question: string; options: string[]; category: string; createdBy: string };
    results: { option: string; votes: number }[];
    totalVotes: number;
  }>({
    queryKey: [`/api/polls/${shareCode}`],
    refetchInterval: hasVoted ? 5000 : false,
  });

  const voteMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/polls/${shareCode}/vote`, {
        optionIndex: selectedOption,
        voterName: voterName || "Anonymous",
      });
      return res.json();
    },
    onSuccess: () => {
      setHasVoted(true);
      queryClient.invalidateQueries({ queryKey: [`/api/polls/${shareCode}`] });
    },
    onError: (err: Error) => {
      if (err.message.includes("409")) {
        setHasVoted(true);
      }
    },
  });

  const shareUrl = `${window.location.origin}/poll/${shareCode}`;
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <PollNavbar />
        <div className="max-w-lg mx-auto px-4 pt-24 text-center space-y-4">
          <h1 className="text-2xl font-bold font-outfit">Poll Not Found</h1>
          <p className="text-white/50">This poll doesn't exist or has been removed.</p>
          <Button
            onClick={() => navigate("/poll")}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl"
            data-testid="button-create-new"
          >
            Create a New Poll
          </Button>
        </div>
      </div>
    );
  }

  const { poll, results, totalVotes } = data;
  const categoryInfo = CATEGORIES.find(c => c.id === poll.category);
  const maxVotes = Math.max(...results.map(r => r.votes), 1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PollNavbar />
      <div className="max-w-lg mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {categoryInfo && (
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/60">
                  {categoryInfo.emoji} {categoryInfo.label}
                </span>
              )}
              <span className="text-xs text-white/30">by {poll.createdBy}</span>
            </div>
            <h1 className="text-2xl font-bold font-outfit" data-testid="text-poll-question">{poll.question}</h1>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
              </span>
              <button onClick={copyLink} className="flex items-center gap-1 hover:text-white/70 transition-colors" data-testid="button-share-poll">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!hasVoted ? (
              <motion.div key="vote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/50 font-medium">Your Name</label>
                  <Input
                    value={voterName}
                    onChange={e => setVoterName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11"
                    data-testid="input-voter-name"
                  />
                </div>

                <div className="space-y-2">
                  {poll.options.map((option, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        selectedOption === i
                          ? "bg-[#F97316]/10 border-[#F97316] text-white"
                          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                      }`}
                      whileTap={{ scale: 0.98 }}
                      data-testid={`button-vote-option-${i}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                        selectedOption === i ? "bg-[#F97316] text-white" : "bg-white/10 text-white/50"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="font-medium">{option}</span>
                      {selectedOption === i && (
                        <Check className="w-5 h-5 text-[#F97316] ml-auto" />
                      )}
                    </motion.button>
                  ))}
                </div>

                <Button
                  onClick={() => voteMutation.mutate()}
                  disabled={selectedOption === null || voteMutation.isPending}
                  className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded-xl h-12 disabled:opacity-40"
                  data-testid="button-submit-vote"
                >
                  {voteMutation.isPending ? "Voting..." : "Cast Vote"}
                </Button>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                <p className="text-sm text-white/40 uppercase tracking-wider font-medium flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Live Results
                </p>
                {results.map((result, i) => {
                  const percentage = totalVotes > 0 ? Math.round((result.votes / totalVotes) * 100) : 0;
                  const isLeading = result.votes === maxVotes && result.votes > 0;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`relative overflow-hidden rounded-2xl border p-4 ${
                        isLeading ? "border-[#F97316]/50 bg-[#F97316]/5" : "border-white/10 bg-white/5"
                      }`}
                      data-testid={`result-option-${i}`}
                    >
                      <motion.div
                        className={`absolute inset-y-0 left-0 ${isLeading ? "bg-[#F97316]/15" : "bg-white/5"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                      />
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            isLeading ? "bg-[#F97316] text-white" : "bg-white/10 text-white/50"
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{result.option}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-bold ${isLeading ? "text-[#F97316]" : "text-white/70"}`}>
                            {percentage}%
                          </span>
                          <p className="text-xs text-white/40">{result.votes} {result.votes === 1 ? "vote" : "votes"}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                <p className="text-xs text-white/30 text-center pt-2">Results refresh automatically every 5 seconds</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-4 flex justify-center">
            <Button
              onClick={() => navigate("/poll")}
              variant="ghost"
              className="text-white/40 hover:text-white"
              data-testid="button-create-own-poll"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your Own Poll
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PollNavbar() {
  const [, navigate] = useLocation();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-3" data-testid="link-home">
          <Logo size="text-xl" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#F97316]/20 text-[#F97316] px-3 py-1 rounded-full font-medium">Quick Poll</span>
        </div>
      </div>
    </nav>
  );
}
