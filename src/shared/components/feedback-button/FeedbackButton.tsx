const FEEDBACK_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdgU6kRLmIC4FM6NjRGKYdgpiq8TndMRToWrQ5Tt5g73SNq4A/viewform';

export function FeedbackButton() {
  return (
    <a
      href={FEEDBACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="피드백 남기러 가기"
      className="fixed right-4 bottom-6 z-50 hidden items-center gap-2 rounded-full bg-rose-200 px-6 py-3 font-medium text-[#333] shadow-xl transition-all duration-200 hover:scale-105 hover:bg-rose-300 hover:shadow-2xl focus:ring-4 focus:ring-rose-200 focus:outline-none active:scale-100 sm:flex sm:px-4 sm:py-4"
      style={{ minWidth: 56, minHeight: 56 }}
    >
      <span className="text-2xl" role="img" aria-label="피드백">
        💌
      </span>
      <span className="hidden sm:inline">피드백 남기러 가기</span>
    </a>
  );
}
