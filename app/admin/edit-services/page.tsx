"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditServicesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [content, setContent] = useState<string>("Loading content...");
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  // Fetch session and content
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/admin/session");
      const data = await res.json();

      if (!data.authenticated) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
        // You can fetch your write-up content from DB here
        const contentRes = await fetch("/api/writeup");
        const contentData = await contentRes.json();
        setContent(contentData.text || "No content found.");
      }
    };
    checkAuth();
  }, [router]);

  // Save updated content
  const handleSave = async () => {
    setIsSaving(true);
    setSavedMessage("");

    const res = await fetch("/api/writeup", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: content }),
    });

    if (res.ok) {
      setSavedMessage("✅ Content saved successfully!");
    } else {
      setSavedMessage("❌ Failed to save content.");
    }

    setIsSaving(false);
  };

  if (isAuthenticated === null)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Checking authentication...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Edit Services Write-up
        </h2>

        <textarea
          className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          {savedMessage && (
            <span
              className={`text-sm ${savedMessage.includes("✅")
                  ? "text-green-600"
                  : "text-red-500"
                }`}
            >
              {savedMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
