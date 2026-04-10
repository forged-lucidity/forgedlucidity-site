// Braun Law Client Intake API Route
// Handles: Supabase storage + email to client & attorney
// Env vars needed: SUPABASE_URL, SUPABASE_SERVICE_KEY, RESEND_API_KEY

export async function POST(request) {
  try {
    const data = await request.json();
    const { pdf_base64, pdf_filename, ...formData } = data;

    // 1. Store in Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/bl_client_intake`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(formData)
        });
      } catch (e) {
        console.error('Supabase insert error:', e);
      }
    }

    // 2. Send email via Resend to both client and attorney
    // NOTE: Using onboarding@resend.dev until forgedlucidity.ai domain is verified
    const resendKey = process.env.RESEND_API_KEY;
    const fromAddress = 'Braun Law Intake <onboarding@resend.dev>';
    const fromAddressClient = 'Braun Law <onboarding@resend.dev>';

    if (resendKey && formData.email) {
      const clientName = `${formData.first_name} ${formData.last_name}`;
      const subject = `Braun Law - Signed Engagement Agreement - ${clientName}`;
      const htmlBody = `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto">
          <h2 style="color:#1a2332">Engagement Agreement Received</h2>
          <p>A signed engagement agreement has been submitted:</p>
          <table style="border-collapse:collapse;width:100%;margin:16px 0">
            <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Client</td>
                <td style="padding:6px 12px;border:1px solid #ddd">${clientName}</td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Company</td>
                <td style="padding:6px 12px;border:1px solid #ddd">${formData.company || 'N/A'}</td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Email</td>
                <td style="padding:6px 12px;border:1px solid #ddd">${formData.email}</td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Phone</td>
                <td style="padding:6px 12px;border:1px solid #ddd">${formData.phone}</td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Practice Area</td>
                <td style="padding:6px 12px;border:1px solid #ddd">${formData.practice_area}</td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Matter</td>
                <td style="padding:6px 12px;border:1px solid #ddd">${formData.matter_description}</td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Signed</td>
                <td style="padding:6px 12px;border:1px solid #ddd">${formData.sig_date}</td></tr>
          </table>
          <p style="color:#666;font-size:13px">The signed engagement agreement PDF is attached.</p>
          <p style="color:#888;font-size:11px">
            Address: ${formData.street}${formData.street2 ? ', ' + formData.street2 : ''}, 
            ${formData.city}, ${formData.state} ${formData.zip}<br>
            Alt Phone: ${formData.alt_phone || 'N/A'} | 
            Contact Pref: ${formData.contact_preference}<br>
            Adverse Parties: ${formData.adverse_parties || 'None disclosed'}<br>
            Deadline: ${formData.urgent_deadline || 'None noted'}<br>
            Referral: ${formData.referral_source || 'N/A'}<br>
            IP: ${formData.ip_address || 'N/A'}
          </p>
        </div>`;

      const attachments = pdf_base64 ? [{
        filename: pdf_filename || 'Engagement_Agreement.pdf',
        content: pdf_base64
      }] : [];

      // Send to attorney
      try {
        const attResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromAddress,
            to: ['gregory@braunlaw.us'],
            subject: subject,
            html: htmlBody,
            attachments: attachments
          })
        });
        const attResult = await attResp.json();
        console.log('Attorney email result:', JSON.stringify(attResult));
      } catch (e) {
        console.error('Email to attorney error:', e);
      }

      // Send copy to client
      const clientHtml = `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto">
          <h2 style="color:#1a2332">Gregory P. Braun, Esq.</h2>
          <p style="color:#8b7355;font-style:italic;margin-top:-8px">~Attorney-at-Law~</p>
          <hr style="border:1px solid #e8e4df">
          <p>Dear ${formData.first_name},</p>
          <p>Thank you for completing the client intake and signing the engagement 
          agreement. A copy of your signed agreement is attached for your records.</p>
          <p>If you have any questions, please contact me at 
          <a href="tel:2073464140">(207) 346-4140</a> or 
          <a href="mailto:gregory@braunlaw.us">gregory@braunlaw.us</a>.</p>
          <p style="margin-top:24px">With consideration,</p>
          <p><em><strong>/s/ Gregory P. Braun, Esq.</strong></em><br>
          Braun Law<br>PO Box 107, Westbrook, ME 04092<br>
          (207) 346-4140</p>
        </div>`;

      try {
        const cliResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromAddressClient,
            to: [formData.email],
            subject: 'Braun Law - Your Signed Engagement Agreement',
            html: clientHtml,
            attachments: attachments
          })
        });
        const cliResult = await cliResp.json();
        console.log('Client email result:', JSON.stringify(cliResult));
      } catch (e) {
        console.error('Email to client error:', e);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Intake submit error:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
