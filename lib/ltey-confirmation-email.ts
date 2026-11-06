import { siteUrl } from "@/lib/seo"

const preview = "Thanks for registering from the banner at Let’s Talk Early Years."

// Forest in the upper corner and clay behind the lower copy, both fading out before the edge so the stage meets the void ground.
const stage =
  "background-color:#0c0f0d;background-image:radial-gradient(ellipse 75% 55% at 100% 0%, rgba(23,54,44,0.9) 0%, rgba(12,15,13,0) 68%), radial-gradient(ellipse 95% 42% at 68% 78%, rgba(196,81,47,0.32) 0%, rgba(12,15,13,0) 72%);"

const mark = {
  src: `${siteUrl}/brand/mark-3d.png`,
  width: 44,
  height: 44,
}

const wordmark = {
  src: `${siteUrl}/brand/text-white.png`,
  width: 84,
  height: 15,
}

/**
 * Confirmation sent after someone registers interest from the Let’s Talk Early Years banner.
 * Visual treatment follows the homepage hero: void ground, serif headline, one italic signal line.
 */
export function lteyConfirmationEmail() {
  const text = [
    "You’re registered.",
    "",
    "Thanks for registering from the banner at Let’s Talk Early Years.",
    "",
    "This secures your conference discount on the next practical AI training. We will let you know as soon as a date is scheduled.",
    "",
    "ROQ CX - FZCO",
    "Dubai, UAE",
  ].join("\n")

  const html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>You registered your interest</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=Outfit:wght@400&display=swap">
  </head>
  <body style="margin:0;padding:0;background-color:#0c0f0d;color:#fffdf8;">
    <div lang="en" dir="ltr" style="background-color:#0c0f0d;">
      <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#0c0f0d;opacity:0;">
        ${preview}${"&nbsp;&zwnj;".repeat(12)}
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0c0f0d" style="${stage}">
        <tr>
          <td align="center" style="padding:48px 24px 72px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
              <tr>
                <td align="left" style="padding:0 0 56px;">
                  <a href="${siteUrl}/" style="text-decoration:none;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:0 8px 0 0;vertical-align:middle;">
                          <img src="${mark.src}" width="${mark.width}" height="${mark.height}" alt="" style="display:block;border:0;width:${mark.width}px;height:${mark.height}px;">
                        </td>
                        <td style="vertical-align:middle;">
                          <img src="${wordmark.src}" width="${wordmark.width}" height="${wordmark.height}" alt="ROQ CX home" style="display:block;border:0;width:${wordmark.width}px;height:${wordmark.height}px;">
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>
              </tr>
              <tr>
                <td align="left">
                  <h1 style="margin:0;font-family:Fraunces,'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif;font-weight:300;font-size:56px;line-height:0.96;letter-spacing:-1.7px;color:#fffdf8;">
                    You&rsquo;re<br>
                    <span style="font-style:italic;color:#d6ff4a;white-space:nowrap;">registered.</span>
                  </h1>
                  <p style="margin:28px 0 0;font-family:Outfit,'Avenir Next','Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;line-height:1.55;color:#d3d2ce;">
                    Thanks for registering from the banner at Let&rsquo;s Talk Early Years.
                  </p>
                  <p style="margin:16px 0 0;font-family:Outfit,'Avenir Next','Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;line-height:1.55;color:#d3d2ce;">
                    This secures your conference discount on the next practical AI training. We will let you know as soon as a date is scheduled.
                  </p>
                  <p style="margin:48px 0 0;font-family:Outfit,'Avenir Next','Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:#d3d2ce;">
                    ROQ CX - FZCO<br>
                    Dubai, UAE
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`

  return { text, html }
}
