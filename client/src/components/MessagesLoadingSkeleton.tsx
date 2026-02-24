function MessagesLoadingSkeleton() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto space-y-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}
        >
          <div
            className={`chat-bubble w-32 ${
              index % 2 === 0
                ? "bg-base-300 rounded-tl-md rounded-r-lg"
                : "bg-primary/50 text-transparent rounded-l-lg rounded-tr-md"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
}
export default MessagesLoadingSkeleton;
