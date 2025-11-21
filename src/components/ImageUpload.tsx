import type { ChangeEvent, DragEvent } from 'react';
import { useRef, useState, useEffect } from 'react';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  currentImageUrl?: string;
}

const ImageUpload = ({ onUpload, currentImageUrl }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(currentImageUrl);
  const [error, setError] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (currentImageUrl) {
      setPreview(currentImageUrl);
    }
  }, [currentImageUrl]);

  const handleFiles = async (files?: FileList | null) => {
    if (!files?.length) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes.');
      return;
    }
    setError(undefined);
    setPreview(URL.createObjectURL(file));
    await onUpload(file);
  };

  const onDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    await handleFiles(event.dataTransfer.files);
  };

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await handleFiles(event.target.files);
  };

  return (
    <div
      className={`rounded-3xl border-2 border-dashed p-8 text-center transition ${
        isDragging ? 'border-sky-400 bg-sky-400/5' : 'border-slate-700 bg-slate-900/40'
      }`}
      onDragOver={(event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onInputChange}
      />
      <div className="flex flex-col items-center gap-4">
        {preview ? (
          <img
            src={preview}
            alt="Previsualización"
            className="h-40 w-40 rounded-2xl object-cover shadow-card"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-800/60 text-4xl text-slate-500">
            ⬆️
          </div>
        )}
        <div>
          <p className="text-lg font-medium text-white">Sube tu producto</p>
          <p className="text-sm text-slate-400">
            Arrastra la imagen o{' '}
            <button
              type="button"
              className="text-sky-300 underline"
              onClick={() => inputRef.current?.click()}
            >
              selecciona un archivo
            </button>
          </p>
        </div>
        {error && <p className="text-sm text-rose-300">{error}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;

