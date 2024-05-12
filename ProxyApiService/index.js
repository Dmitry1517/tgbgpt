export default class ProxyApiService {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer sk-tU86m4ShWnh60CG8u52K9H0k52fegXsm",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
            role: "user",
            content: ``
        },
      ],
      temperature: 0.7,
    }),
  };

  async getAns() {
    const response = await fetch(
        "https://api.proxyapi.ru/openai/v1/chat/completions",
        this.options
    );
    if (!response.ok) throw new Error();
    else return response.json();
  }
}