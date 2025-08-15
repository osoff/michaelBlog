import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, serviceTitle, servicePrice } =
      body;

    // Валидация полей
    if (!name || !email || !serviceTitle) {
      return NextResponse.json(
        {
          error:
            "Необходимо заполнить обязательные поля: имя, email и название услуги",
        },
        { status: 400 }
      );
    }

    // Получаем токен бота и ID чата из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram bot token или chat ID не настроены");
      return NextResponse.json(
        { error: "Ошибка конфигурации сервера" },
        { status: 500 }
      );
    }

    // Формируем сообщение для Telegram
    const telegramMessage = `
🛒 *Новый заказ услуги*

👤 *Имя:* ${name}
📧 *Email:* ${email}
📱 *Телефон:* ${phone || "Не указан"}
🏢 *Компания:* ${company || "Не указана"}

📋 *Услуга:* ${serviceTitle}
💰 *Стоимость:* ${servicePrice || "По запросу"}

💬 *Дополнительная информация:*
${message || "Не указана"}

⏰ *Время:* ${new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    })}
🌐 *Источник:* ${request.headers.get("origin") || "Неизвестно"}
    `;

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error("Telegram API error:", errorData);
      throw new Error("Ошибка отправки в Telegram");
    }

    return NextResponse.json(
      { message: "Заявка успешно отправлена!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Service order error:", error);
    return NextResponse.json(
      { error: "Ошибка отправки заявки" },
      { status: 500 }
    );
  }
}
