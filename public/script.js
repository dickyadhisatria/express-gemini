// Mengambil elemen DOM yang dibutuhkan
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const modelSelect = document.getElementById('model-select');
const sendBtn = form.querySelector('.send-btn');

// Variabel untuk menyimpan riwayat percakapan (Multi-turn)
let conversationHistory = [];

// Fungsi pembantu untuk menambahkan pesan teks ke layar
function appendMessage(sender, text) {
  const msgElement = document.createElement('div');
  msgElement.classList.add('message', sender); // 'user' atau 'bot'
  msgElement.textContent = text;
  chatBox.appendChild(msgElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah
  return msgElement;
}

// Menampilkan indikator "AI mengetik" (3 dot animasi) sambil menunggu respons
function appendTypingIndicator() {
  const el = document.createElement('div');
  el.classList.add('message', 'bot', 'typing');
  el.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;
  return el;
}

// Mengganti indikator typing dengan teks balasan asli
function resolveTyping(el, text) {
  el.classList.remove('typing');
  el.innerHTML = '';
  el.textContent = text;
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listener saat form dikirim (tombol Kirim ditekan)
form.addEventListener('submit', async function (e) {
  e.preventDefault(); // Mencegah reload halaman

  const userMessage = input.value.trim();
  if (!userMessage) return; // Jangan kirim pesan kosong

  // 1. Tampilkan pesan user di UI dan tambahkan ke riwayat
  appendMessage('user', userMessage);
  conversationHistory.push({ role: "user", text: userMessage });
  input.value = ''; // Kosongkan input
  input.disabled = true;
  sendBtn.disabled = true;

  // 2. Tampilkan indikator typing sebagai placeholder balasan bot
  const botMessageElement = appendTypingIndicator();

  try {
    // 3. Kirim request ke backend Node.js Anda
    const response = await fetch('/api/ai/generate-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Mengirimkan seluruh riwayat agar AI memahami konteks
      body: JSON.stringify({
        model: modelSelect.value, // Mengambil nilai dari select box
        conversation: conversationHistory
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.result) {
      // 4. Ganti indikator typing dengan balasan asli AI
      resolveTyping(botMessageElement, data.result);
      // Simpan balasan AI ke riwayat
      conversationHistory.push({ role: "model", text: data.result });
    } else {
      resolveTyping(botMessageElement, 'Sorry, no response received.');
    }
  } catch (error) {
    console.error('Error fetching response:', error);
    resolveTyping(botMessageElement, 'Failed to get response from server.');
  } finally {
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  }
});