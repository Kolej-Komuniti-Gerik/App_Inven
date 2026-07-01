export const askTutor = async (question: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Ralat pelayan: ${response.status}`);
    }

    const data = await response.json();
    return data.text || 'Tiada jawapan diterima daripada Cikgu AI.';
  } catch (error: any) {
    console.error('Error asking Gemini via server API:', error);
    return 'Maaf, saya mengalami ralat sambungan untuk menghubungi Cikgu AI. Sila cuba sebentar lagi!';
  }
};
