"use client";

import { useEffect, useState, useRef } from "react";

interface EditableTextProps {
  slug: string;
  defaultText: string;
}

export default function EditableText({ slug, defaultText }: EditableTextProps) {
  const [text, setText] = useState(defaultText);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Define the threshold for switching to a textarea
  const IS_MULTI_LINE = text.length > 80 || text.includes('\n');

  // --- Auto-Resize Logic (Only runs for textarea) ---
  useEffect(() => {
    if (isEditing && IS_MULTI_LINE && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, text, IS_MULTI_LINE]);

  // --- API Functions (Same as before) ---
  // ... (loadContent, checkAdminStatus, save functions) ...
  async function save() {
    if (!isAdmin) return;
    try {
      const res = await fetch(`/api/texts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      if (!res.ok) console.error(`Failed to save. Status: ${res.status}`);
    } catch (error) {
      console.error("Network error during save:", error);
    }
  }

  useEffect(() => { /* ... loadContent useEffect ... */
    async function loadContent() {
      const res = await fetch(`/api/texts/${slug}`);
      const data = await res.json();
      if (data.content !== null && data.content !== defaultText) {
        setText(data.content);
      }
    }
    loadContent();
  }, [slug, defaultText]);

  useEffect(() => { /* ... checkAdminStatus useEffect ... */
    async function checkAdminStatus() {
      try {
        const res = await fetch("/api/admin/session");
        const data = await res.json();
        setIsAdmin(data.authenticated);
      } catch (error) {
        setIsAdmin(false);
      }
    }
    checkAdminStatus();
  }, []);

  // --- Event Handlers ---

  function handleBlur() {
    setIsEditing(false);
    save();
  }

  // Re-added for single-line input fields
  function handleEnter(e: any) {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      save();
    }
  }

  // Final check: if NOT admin, return the read-only span
  if (!isAdmin) {
    return <span className="inline-block w-full whitespace-pre-wrap">{text}</span>;
  }

  // If we reach here, isAdmin is true
  return isEditing ? (
    // Conditional Editor Rendering (explicit branches so refs match element types)
    IS_MULTI_LINE ? (
      <textarea
        ref={textareaRef}
        className={`border border-blue-500 bg-white p-2 w-full resize-none overflow-hidden text-gray-900`}
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        // Start with a minimum of 1 row for textarea
        rows={1}
      />
    ) : (
      <input
        className={`border border-blue-500 bg-white p-2 w-full text-gray-900`}
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        // Apply Enter key handler only for input
        onKeyDown={handleEnter}
      />
    )
  ) : (
    <span
      className="cursor-text inline-block w-full whitespace-pre-wrap"
      onDoubleClick={() => {
        // Log the value before switching to help debug the current state
        console.log(`Editing started for slug: ${slug}. Value: "${text}"`);
        setIsEditing(true);
      }}
    >
      {text}
    </span>
  );
}