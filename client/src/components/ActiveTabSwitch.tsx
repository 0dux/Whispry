import { useChat } from "@/store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChat();

  return (
    <div className="px-4 pt-2">
      <div className="relative flex w-full p-1 bg-base-100 rounded-xl shadow-inner border border-base-200">
        {/* Sliding Indicator Background */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary/20 rounded-lg transition-transform duration-300 ease-out`}
          style={{
            transform:
              activeTab === "chat" ? "translateX(0)" : "translateX(100%)",
          }}
        />

        <button
          onClick={() => setActiveTab("chat")}
          className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
            activeTab === "chat"
              ? "text-primary"
              : "text-base-content/60 hover:text-base-content/80"
          }`}
        >
          Chats
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
            activeTab === "contacts"
              ? "text-primary"
              : "text-base-content/60 hover:text-base-content/80"
          }`}
        >
          Contacts
        </button>
      </div>
    </div>
  );
}
export default ActiveTabSwitch;
