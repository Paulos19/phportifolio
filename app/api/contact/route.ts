import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // Configuração do Transporter (Usando as vars do .env)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Configuração do Email
    const mailOptions = {
      from: process.env.EMAIL_FROM, // Quem envia (Você)
      to: process.env.EMAIL_SERVER_USER, // Quem recebe (Você mesmo, ou outro email)
      replyTo: email, // Para você poder clicar em "Responder" e ir para o cliente
      subject: `[Portfolio] Nova mensagem de ${name}`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #333;">
          <h2 style="color: #10b981;">Novo Lead do Portfólio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    };

    // Enviar
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: "Falha ao enviar mensagem." },
      { status: 500 }
    );
  }
}