import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("=== LOCAL AI CHECK START ===");

    const formData = await request.formData();
    const file = formData.get("image");

    console.log("File received:", file instanceof File);

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Изображение не загружено" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    console.log("Image converted to base64");

    const prompt = `
Ты проверяешь выполнение KPI-задачи магазина Smoky Market.

Задача:
Выложить сторис с часами работы магазина.

Проверь изображение:

1. Есть ли на изображении сторис или статус магазина.
2. Есть ли название "Smoky Market".
3. Есть ли часы работы.
4. Часы работы должны соответствовать одному из вариантов:

- 11:00 - 00:00
- 11:00 - 00:30
- 12:30 - 1:30
- 12:30 - 2:00

Если все условия явно выполнены:
result = "passed"

Если явно видно, что условие не выполнено:
result = "failed"

Если изображение плохого качества, текст невозможно прочитать или есть сомнения:
result = "manual_review"

Верни ТОЛЬКО JSON без markdown:

{
  "result": "passed",
  "confidence": 95,
  "reason": "Краткое объяснение",
  "awardPoint": true
}

Правила:
- awardPoint = true ТОЛЬКО если result = "passed".
- При manual_review awardPoint = false.
- При failed awardPoint = false.
- Не додумывай отсутствующий текст.
`;

    console.log("Sending image to Ollama...");

    const ollamaResponse = await fetch(
      "http://localhost:11434/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2.5vl:3b",
          stream: false,
          messages: [
            {
              role: "user",
              content: prompt,
              images: [base64],
            },
          ],
        }),
      }
    );

    console.log("Ollama status:", ollamaResponse.status);

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();

      console.error("Ollama error:", errorText);

      return NextResponse.json(
        {
          success: false,
          error: `Ollama error ${ollamaResponse.status}: ${errorText}`,
        },
        { status: 500 }
      );
    }

    const data = await ollamaResponse.json();

    console.log("Ollama response received");

    const aiText = data?.message?.content ?? "";

    console.log("AI result:", aiText);

    return NextResponse.json({
      success: true,
      result: aiText,
    });
  } catch (error) {
    console.error("=== LOCAL AI CHECK ERROR ===");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}