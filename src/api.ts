import { Config } from "./Config";
import { Message } from "./types/chat";


export const transcribe = async (audio: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", audio);
  // formData.append("filename", "test.wav");
  // formData.append("model", "whisper-1");
  // formData.append("response_format", "text");
  // formData.append("language", "en");

  // // Get the data url for audio
  // const base64AudioMessage = await new Promise<string | ArrayBuffer | null>((resolve) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(audio);
  //   reader.onloadend = function () {
  //     console.log('base64AudioMessage', reader.result);
  //     resolve(reader.result);
  //   };
  // });

  //   const response = await fetch(`${Config.API_URL}/transcribe`, {
  //     method: "POST",
  //     body: JSON.stringify({ 'b64Audio': base64AudioMessage }),
  //   });
  //   return response.json();
  // };
  const response = await fetch(`${Config.API_URL}/transcribe`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.text;
};


export const addMessageToServer = async (message: Message) => {
  await fetch(`${Config.API_URL}/chat`, {
    method: "POST",
    body: JSON.stringify({
      conversation: {
        messages: [message],
      },
    }),
  });
};

