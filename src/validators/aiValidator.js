import { z } from 'zod';

// Skema dasar untuk model dan prompt yang sering diulang
const baseAISchema = {
  model: z.string().optional().default('gemini-2.5-flash'),
  prompt: z.string({ required_error: 'Prompt wajib diisi' }).min(1, 'Prompt tidak boleh kosong'),
};

// 1. Validasi untuk generateText
export const generateTextSchema = z.object({
  body: z.object({
    ...baseAISchema,
  }),
});

// 2. Validasi untuk generateFromImage
export const generateFromImageSchema = z.object({
  body: z.object({
    ...baseAISchema,
  }),
  file: z.object({
    mimetype: z.string().refine((val) => val.startsWith('image/'), {
      message: 'File harus berupa gambar (JPEG, PNG, dll)',
    }),
  }, { required_error: 'File gambar wajib diunggah.' }),
});

// 3. Validasi untuk generateFromDocument
export const generateFromDocumentSchema = z.object({
  body: z.object({
    ...baseAISchema,
  }),
  file: z.object({
    mimetype: z.string().refine(
      (val) => ['application/pdf', 'text/plain', 'application/msword'].includes(val), 
      { message: 'Format dokumen tidak didukung (Gunakan PDF, TXT, atau DOC)' }
    ),
  }, { required_error: 'File dokumen wajib diunggah.' }),
});

// 4. Validasi untuk generateFromAudio
export const generateFromAudioSchema = z.object({
  body: z.object({
    ...baseAISchema,
  }),
  file: z.object({
    mimetype: z.string().refine((val) => val.startsWith('audio/'), {
      message: 'File harus berupa audio (MP3, WAV, dll)',
    }),
  }, { required_error: 'File audio wajib diunggah.' }),
});

// 5. Validasi untuk generateChat (Struktur Percakapan)
export const generateChatSchema = z.object({
  body: z.object({
    model: z.string().optional().default('gemini-3.1-flash-lite'),
    
    // z.preprocess akan mencegat data sebelum divalidasi
    conversation: z.preprocess(
      (val) => {
        // Jika input berupa string, ubah jadi array object
        if (typeof val === 'string') {
          return [{ role: 'user', text: val }];
        }
        return val;
      },
      // Setelah di-preprocess, validasi secara ketat bahwa ini HARUS array
      z.array(
        z.object({
          role: z.enum(['user', 'model'], {
            errorMap: () => ({ message: "Role harus 'user' atau 'model'" })
          }),
          text: z.string().min(1, "Teks pesan tidak boleh kosong")
        })
      )
    )
  })
});
