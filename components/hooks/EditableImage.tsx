// components/hooks/EditableImage.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  slug: string;
  defaultUrl: string;
  defaultAlt: string;
  onClick?: (url: string) => void;
  priority?: boolean;
}

export default function EditableImage({
  slug,
  defaultUrl,
  defaultAlt,
  onClick,
  priority,
}: Props) {
  const [img, setImg] = useState<{
    id: number | null;
    url: string;
    alt: string;
  }>({ id: null, url: defaultUrl, alt: defaultAlt });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [altInput, setAltInput] = useState(defaultAlt);

  // ADMIN CHECK
  useEffect(() => {
    fetch("/api/admin/session", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setIsAdmin(!!d.authenticated))
      .catch(() => setIsAdmin(false));
  }, []);

  // DESKTOP CHECK
  useEffect(() => {
    const check = () => window.innerWidth >= 1024;
    setIsDesktop(check());
    const onR = () => setIsDesktop(check());
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  // LOAD FROM DB
  useEffect(() => {
    async function load() {
      const r = await fetch(`/api/content/media/${slug}`, {
        credentials: "include",
      });
      const d = await r.json();
      if (d.images?.length) {
        const i = d.images[0];
        setImg({ id: i.id, url: i.image_path, alt: i.alt_text });
        setAltInput(i.alt_text);
      }
    }
    load();
  }, [slug]);

  const canEdit = isAdmin && isDesktop;

  // FILE PREVIEW
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      const r = new FileReader();
      r.onload = () => setPreview(r.result as string);
      r.readAsDataURL(f);
    } else setPreview(null);
  };

  // SAVE
  const save = async () => {
    if (!file && !urlInput.trim()) return;
    const body: any = { alt: altInput };
    if (img.id) body.id = img.id;

    if (file) {
      const b64 = await file.arrayBuffer().then((b) => Buffer.from(b).toString("base64"));
      body.base64 = `data:${file.type};base64,${b64}`;
      body.filename = file.name;
    } else {
      body.imageUrl = urlInput.trim();
    }

    const r = await fetch(`/api/content/media/${slug}`, {
      method: img.id ? "PUT" : "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await r.json();

    if (j.success) {
      setImg({
        id: img.id ?? j.id,
        url: j.image_path ?? urlInput.trim(),
        alt: altInput,
      });
      setFile(null);
      setPreview(null);
      setUrlInput("");
    }
  };

  // DELETE
  const del = async () => {
    if (!img.id || !confirm("Delete permanently?")) return;
    await fetch(`/api/content/media/${slug}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: img.id }),
    });
    setImg({ id: null, url: defaultUrl, alt: defaultAlt });
  };

  // CONTEXT MENU
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const openCtx = (e: React.MouseEvent) => {
    e.preventDefault();
    setCtx({ x: e.clientX, y: e.clientY });
  };
  const closeCtx = () => setCtx(null);

  return (
    <div className="relative w-full h-full">
      <div
        className="cursor-pointer w-full h-full relative"
        onClick={() => onClick?.(img.url)}
        onContextMenu={canEdit ? openCtx : undefined}
      >
        <Image
          src={img.url}
          alt={img.alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {canEdit && (
        <div className="absolute top-2 right-2 flex flex-col gap-2 bg-white/90 p-2 rounded shadow">
          <label className="bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer">
            Replace
            <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          </label>
          {preview && <img src={preview} alt="prev" className="max-h-24 rounded" />}
          <input
            placeholder="or URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="border text-xs px-1"
          />
          <input
            placeholder="Alt"
            value={altInput}
            onChange={(e) => setAltInput(e.target.value)}
            className="border text-xs px-1"
          />
          <button onClick={save} className="bg-green-600 text-white text-xs px-2 py-1 rounded">
            Save
          </button>
          {img.id && (
            <button onClick={del} className="bg-red-600 text-white text-xs px-2 py-1 rounded">
              Delete
            </button>
          )}
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
                  save();
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
              del();
              closeCtx();
            }}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}