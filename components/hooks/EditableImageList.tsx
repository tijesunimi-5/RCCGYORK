// components/hooks/EditableImageList.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Img {
  id: number | null;
  image_path: string;
  alt_text: string;
}
interface Props {
  slug: string;
  defaultImages: { url: string; alt: string }[];
  onImageClick: (url: string) => void;
}

export default function EditableImageList({
  slug,
  defaultImages,
  onImageClick,
}: Props) {
  const [images, setImages] = useState<Img[]>(
    defaultImages.map((i) => ({
      id: null,
      image_path: i.url,
      alt_text: i.alt,
    }))
  );

  const [isAdmin, setIsAdmin] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [altInput, setAltInput] = useState("");

  useEffect(() => {
    fetch("/api/admin/session", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setIsAdmin(!!d.authenticated))
      .catch(() => setIsAdmin(false));
  }, []);

  useEffect(() => {
    const check = () => window.innerWidth >= 1024;
    setIsDesktop(check());
    const onR = () => setIsDesktop(check());
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  useEffect(() => {
    async function load() {
      const r = await fetch(`/api/content/media/${slug}`, { credentials: "include" });
      const d = await r.json();
      if (d.images?.length) {
        setImages(
          d.images.map((i: any) => ({
            id: i.id,
            image_path: i.image_path,
            alt_text: i.alt_text,
          }))
        );
      }
    }
    load();
  }, [slug]);

  const canEdit = isAdmin && isDesktop;

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setAltInput(f ? f.name : "");
    if (f) {
      const r = new FileReader();
      r.onload = () => setPreview(r.result as string);
      r.readAsDataURL(f);
    } else setPreview(null);
  };

  const add = async () => {
    if (!file && !urlInput.trim()) return;
    const body: any = { alt: altInput || "" };
    if (file) {
      const b64 = await file.arrayBuffer().then((b) => Buffer.from(b).toString("base64"));
      body.base64 = `data:${file.type};base64,${b64}`;
      body.filename = file.name;
    } else {
      body.imageUrl = urlInput.trim();
    }

    const r = await fetch(`/api/content/media/${slug}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await r.json();
    if (j.success) {
      setImages((p) => [...p, { id: j.id, image_path: j.image_path, alt_text: altInput }]);
      setFile(null);
      setPreview(null);
      setUrlInput("");
      setAltInput("");
    }
  };

  const replace = async (id: number) => {
    if (!file && !urlInput.trim()) return;
    const body: any = { id, alt: altInput };
    if (file) {
      const b64 = await file.arrayBuffer().then((b) => Buffer.from(b).toString("base64"));
      body.base64 = `data:${file.type};base64,${b64}`;
      body.filename = file.name;
    } else {
      body.imageUrl = urlInput.trim();
    }

    const r = await fetch(`/api/content/media/${slug}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await r.json();
    if (j.success) {
      setImages((p) =>
        p.map((i) =>
          i.id === id ? { ...i, image_path: j.image_path, alt_text: altInput } : i
        )
      );
      setFile(null);
      setPreview(null);
      setUrlInput("");
      setAltInput("");
    }
  };

  const del = async (id: number) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/content/media/${slug}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setImages((p) => p.filter((i) => i.id !== id));
  };

  const [ctx, setCtx] = useState<{ x: number; y: number; id: number } | null>(null);
  const openCtx = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setCtx({ x: e.clientX, y: e.clientY, id });
  };
  const closeCtx = () => setCtx(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((i) => (
          <div
            key={i.id ?? i.image_path}
            className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-lg hover:shadow-xl transition-all"
            onClick={() => onImageClick(i.image_path)}
            onContextMenu={(e) => canEdit && i.id && openCtx(e, i.id)}
          >
            <Image
              src={i.image_path}
              alt={i.alt_text}
              fill
              className="object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>

      {canEdit && (
        <div className="mt-8 p-4 border rounded bg-white max-w-md mx-auto">
          <h4 className="font-medium mb-3">Add New Image</h4>
          <input type="file" accept="image/*" onChange={onFile} className="block w-full mb-2" />
          {preview && <img src={preview} alt="prev" className="max-h-40 mb-2" />}
          <input
            placeholder="or URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full border p-1 mb-2"
          />
          <input
            placeholder="Alt"
            value={altInput}
            onChange={(e) => setAltInput(e.target.value)}
            className="w-full border p-1 mb-2"
          />
          <button
            onClick={add}
            className="bg-green-600 text-white px-4 py-1 rounded w-full"
          >
            Add Image
          </button>
        </div>
      )}

      {ctx && canEdit && (
        <div
          className="fixed bg-white shadow-lg rounded p-2 z-50"
          style={{ top: ctx.y, left: ctx.x }}
          onMouseLeave={closeCtx}
        >
          <button
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (ev) => {
                const f = (ev.target as HTMLInputElement).files?.[0];
                if (f) {
                  setFile(f);
                  const r = new FileReader();
                  r.onload = () => setPreview(r.result as string);
                  r.readAsDataURL(f);
                  setAltInput(f.name);
                  replace(ctx.id);
                }
              };
              input.click();
              closeCtx();
            }}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          >
            Replace
          </button>
          <button
            onClick={() => {
              del(ctx.id);
              closeCtx();
            }}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}