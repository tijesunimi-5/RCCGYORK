"use client";

import { useEffect, useState } from "react";

type EditableTextProps = {
  id: string; // unique identifier for this text (e.g. "home_title")
  defaultText: string;
  isAdmin?: boolean; // optional, set true if logged in as admin
};

export default function EditableText({ id, defaultText, isAdmin }: EditableTextProps) {
  const [text, setText] = useState(defaultText);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load the text from the database
  useEffect(() => {
    const fetchText = async () => {
      const res = await fetch(`/api/texts/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.text) setText(data.text);
      }
    };
    fetchText();
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    await fetch(`/api/texts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify({ text }),
    });

    setLoading(false);
    setEditing(false);
  };

  if (!isAdmin) {
    return <span>{text}</span>;
  }

  return (
    <span
      onDoubleClick={() => setEditing(true)}
      className="cursor-text"
    >
      {editing ? (
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="border border-gray-300 rounded-md px-2 py-1 text-gray-800 w-auto"
          disabled={loading}
        />
      ) : (
        <span className="hover:bg-yellow-100">{text}</span>
      )}
    </span>
  );
}
