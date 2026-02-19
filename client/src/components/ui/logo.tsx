export function Logo({ className = "", size = "text-2xl" }: { className?: string, size?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/images/sidequest-logo.png" 
        alt="SideQuest" 
        className="h-10 sm:h-11 md:h-12 w-auto object-contain"
      />
    </div>
  );
}
