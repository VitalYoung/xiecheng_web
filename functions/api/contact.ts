export async function onRequestPost({ request, env }: { request: Request; env: any }) {
  const formData = await request.formData();

  const data = {
    name: String(formData.get('name') || '').trim(),
    company: String(formData.get('company') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    serviceType: String(formData.get('serviceType') || '').trim(),
    message: String(formData.get('message') || '').trim(),
    submittedAt: new Date().toISOString(),
  };

  // Validate required fields
  if (!data.name || !data.phone || !data.message) {
    return new Response(
      JSON.stringify({ error: '请填写姓名、电话和加工需求等必填字段' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Forward to WeCom webhook if configured
  const webhookUrl = env.WECOM_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const markdown = [
        `## 网站咨询通知`,
        `**姓名**：${data.name}`,
        data.company ? `**公司**：${data.company}` : '',
        `**电话**：${data.phone}`,
        data.email ? `**邮箱**：${data.email}` : '',
        data.serviceType ? `**服务类型**：${data.serviceType}` : '',
        `**加工需求**：`,
        data.message,
        `---`,
        `提交时间：${data.submittedAt}`,
      ]
        .filter(Boolean)
        .join('\n');

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          msgtype: 'markdown',
          markdown: { content: markdown },
        }),
      });
    } catch (e) {
      console.error('Webhook failed:', e);
    }
  }

  return new Response(
    JSON.stringify({ success: true, message: '提交成功，我们会尽快与您联系！' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
