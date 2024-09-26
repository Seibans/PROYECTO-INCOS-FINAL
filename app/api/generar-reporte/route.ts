// app/api/generate-report/route.ts
import { generatePDFFromURL } from '@/actions/pdf';

export async function POST(request: Request) {
  try {
    const reportUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/div`;
    const pdfPath = await generatePDFFromURL(reportUrl);
    return new Response(JSON.stringify({ pdfPath }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 });
  }
}