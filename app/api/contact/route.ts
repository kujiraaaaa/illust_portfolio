import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message, token } = await req.json();

  if (!name || !email || !message || !token) {
    return NextResponse.json({ error: "すべてのフィールドを入力してください。" }, { status: 400 });
  }

  // 1. Cloudflare Turnstile の検証
  const formData = new FormData();
  formData.append("secret", process.env.CF_SECRET_KEY!);
  formData.append("response", token);
  formData.append("remoteip", req.ip ?? "");

  const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  const turnstileData = await turnstileResponse.json();

  if (!turnstileData.success) {
    return NextResponse.json({ error: "ボット検証に失敗しました。" }, { status: 400 });
  }

  // 2. Discord Webhook へ送信
  const webhookUrl = process.env.WEBHOOK_URL!;
  const embedPayload = {
    embeds: [
      {
        title: "新しいお問い合わせがありました",
        color: 3447003, // 青色
        fields: [
          { name: "お名前", value: name, inline: true },
          { name: "メールアドレス", value: email, inline: true },
          { name: "メッセージ", value: message },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embedPayload),
    });

    if (!discordResponse.ok) {
      throw new Error("Discordへの通知に失敗しました。");
    }

    return NextResponse.json({ message: "お問い合わせが正常に送信されました。" }, { status: 200 });

  } catch (error) {
    console.error("Webhook送信エラー:", error);
    return NextResponse.json({ error: "サーバー内部でエラーが発生しました。" }, { status: 500 });
  }
}