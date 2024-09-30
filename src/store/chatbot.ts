import { Store } from "../core/core";
import OpenAI from "openai";

interface State {
  chatText: string;
  messages: OpenAI.ChatCompletionMessageParam[];
  loading: boolean;
}

const defaultMessages: OpenAI.ChatCompletionMessageParam[] = [
  { role: "assistant", content: "좋아하는 영화 장르나 제목을 알려주세요." },
];

const store = new Store<State>({
  chatText: "",
  messages: defaultMessages,
  loading: false,
});

export default store;
export const sendMessages = async () => {
  if (!store.state.chatText.trim()) return;
  if (store.state.loading) return;
  store.state.loading = true;
  store.state.messages = [
    ...store.state.messages,
    { role: "user", content: store.state.chatText },
  ];
  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({
        messages: store.state.messages,
      }),
    });
    const message = await res.json();
    console.log("Response status:", res.status);
    console.log("Fetched message:", message);
    store.state.messages = [...store.state.messages, message];
    store.state.chatText = "";
  } catch (error) {
    console.log("sendMessgae error: ", error);
  } finally {
    store.state.loading = false;
  }
};

export const resetMessages = () => {
  store.state.messages = defaultMessages;
};
