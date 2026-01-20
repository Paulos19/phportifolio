import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validação simples
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 });
    }

    // Configuração do Transporter (Carteiro)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true, // true para 465, false para outras portas
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Email que VOCÊ vai receber
    const mailOptions = {
      from: `Portfólio Contact <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_FROM, // Envia para você mesmo
      replyTo: email, // Para você clicar em "Responder" e ir para a pessoa
      subject: `Nova mensagem de ${name} via Portfólio`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Novo Contato do Portfólio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <br/>
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json({ error: 'Erro interno ao enviar email.' }, { status: 500 });
  }
}