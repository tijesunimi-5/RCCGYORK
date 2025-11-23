"use client";

import React, { useEffect, useState, useRef } from "react";

interface EditableTextProps {
  slug: string;
  defaultText: string;
  className?: string;
}

export default function EditableText({ slug, defaultText, className }: EditableTextProps) {
  const [text, setText] = useState(defaultText);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Define the threshold for switching to a textarea (simplified check since we now feed it plain text)
  const IS_MULTI_LINE = text.length > 80 || text.includes('\n');

  // --- Auto-Resize Logic (Only runs for textarea) ---
  useEffect(() => {
    if (isEditing && IS_MULTI_LINE && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, text, IS_MULTI_LINE]);

  // --- API Functions ---
  async function save() {
    if (!isAdmin) return;
    // CRITICAL FIX: Ensure only the plain text is sent to the database. 
    // This prevents HTML tags from being stored, which was causing the display issue.
    const plainTextContent = text.replace(/<[^>]*>?/gm, '').trim();

    try {
      const res = await fetch(`/api/texts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: plainTextContent }),
      });
      if (!res.ok) console.error(`Failed to save. Status: ${res.status}`);
    } catch (error) {
      console.error("Network error during save:", error);
    }
  }

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch(`/api/texts/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.content !== null && data.content !== defaultText) {
            // If the loaded data still contains old HTML tags from previous saves, strip them here.
            const cleanLoadedText = data.content.replace(/<[^>]*>?/gm, '').trim();
            setText(cleanLoadedText);
          }
        }
      } catch (error) {
        console.error("Error loading content:", error);
      }
    }
    loadContent();
  }, [slug, defaultText]);

  useEffect(() => {
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

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      save();
    }
  }

  // Read-only content rendering is now pure plain text
  const renderReadOnlyContent = () => {
    return (
      <span className={`inline-block w-full whitespace-pre-wrap ${className}`}>
        {text}
      </span>
    );
  };


  // Final check: if NOT admin, return the read-only content
  if (!isAdmin) {
    return renderReadOnlyContent();
  }

  // If we reach here, isAdmin is true
  return isEditing ? (
    // Conditional Editor Rendering 
    IS_MULTI_LINE ? (
      <textarea
        ref={textareaRef}
        className={`border border-blue-500 bg-white p-2 w-full resize-none overflow-hidden text-gray-900 ${className}`}
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        // Start with a minimum of 1 row for textarea
        rows={1}
      />
    ) : (
      <input
        className={`border border-blue-500 bg-white p-2 w-full text-gray-900 ${className}`}
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        // Apply Enter key handler only for input
        onKeyDown={handleEnter}
      />
    )
  ) : (
    // Read-only mode for admin: Wrap read-only content in a clickable div
    <div
      className={`cursor-text inline-block w-full ${className}`}
      onDoubleClick={() => {
        setIsEditing(true);
      }}
    >
      {renderReadOnlyContent()}
    </div>
  );
}