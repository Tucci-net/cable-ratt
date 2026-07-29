const lines = [
  { left: "2%", duration: "6s", delay: "0s" },
  { left: "9%", duration: "8s", delay: "2.2s" },
  { left: "16%", duration: "5s", delay: "3.6s" },
  { left: "23%", duration: "7s", delay: "0.8s" },
  { left: "30%", duration: "9s", delay: "1.5s" },
  { left: "38%", duration: "5.5s", delay: "3s" },
  { left: "46%", duration: "7.5s", delay: "0.3s" },
  { left: "54%", duration: "6.5s", delay: "2.7s" },
  { left: "62%", duration: "8.5s", delay: "1.1s" },
  { left: "69%", duration: "5s", delay: "4s" },
  { left: "76%", duration: "7s", delay: "0.6s" },
  { left: "83%", duration: "6s", delay: "2.4s" },
  { left: "90%", duration: "9s", delay: "1.8s" },
  { left: "96%", duration: "5.5s", delay: "3.3s" },
];

export function CableRain() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {lines.map((line, i) => (
        <span
          key={i}
	    className="animate-rainfall absolute top-0 h-32 w-0.5 bg-neutral-500 dark:bg-		    neutral-300"          style={{
            left: line.left,
            animationDuration: line.duration,
            animationDelay: line.delay,
          }}
        />
      ))}
    </div>
  );
}