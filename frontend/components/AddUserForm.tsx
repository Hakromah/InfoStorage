"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const AddSchema = z.object({
   appName: z.string().min(1, "App name required"),
   email: z.string().email("Invalid email"),
   text: z.string().min(1, "Text required"),
});

interface Props {
   onSuccess?: () => void;
   onClose?: () => void;
}

export default function AddUserForm({ onSuccess, onClose }: Props) {
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

   const handleCancel = () => {
      // Reset form logic if needed
      setIsOpen(false);
   };

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setError(null);
      setLoading(true);
      setIsOpen(false);

      const formData = new FormData(e.currentTarget);
      const payload = {
         appName: String(formData.get("appName") ?? ""),
         email: String(formData.get("email") ?? ""),
         text: String(formData.get("text") ?? ""),
      };

      const parsed = AddSchema.safeParse(payload);
      if (!parsed.success) {
         setError(parsed.error.issues.map((x) => x.message).join(", "));
         setLoading(false);
         return;
      }

      try {
         const token = localStorage.getItem("strapiToken");

         const res = await fetch("https://harmonious-fireworks-bde4521ff5.strapiapp.com/admin/api/password-entries", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify({
               data: payload,   // ✅ Strapi requires wrapping in "data"
            }),
         });

         if (!res.ok) {
            const errText = await res.text();
            console.error("Strapi error:", errText);
            throw new Error(errText);
         }
         onSuccess?.();
      } catch (err: unknown) {
         if (err instanceof Error) setError(err.message);
         else setError("Failed to add entry");
      } finally {
         if (onClose) onClose();
         setLoading(false);
      }
      //e.currentTarget.reset(); // reset form fields and values after a successful submit
   }

   return (
      <section className="w-full py-8">
         <div className="mx-auto w-full max-w-md">

            {/* STATE 1: The "Open" Button (Visible when form is closed) */}
            {!isOpen && (
               <button
                  onClick={() => setIsOpen(true)}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm font-medium text-green-700 transition-all hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900"
               >
                  {/* Simple Plus Icon (CSS or SVG) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <line x1="12" y1="5" x2="12" y2="19"></line>
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add New User
               </button>
            )}

            {/* STATE 2: The Form Card (Visible when isOpen is true) */}
            {isOpen && (
               <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 animate-in fade-in slide-in-from-top-4 duration-300">

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                     <h3 className="font-semibold text-green-700">Add New User</h3>
                     {/* Optional 'X' close button in header */}
                     <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                        <span className="sr-only">Close</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                     </button>
                  </div>
                  {/* Form Body */}
                  <div className="p-6">
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                           <label className="mb-1 block text-sm font-medium text-gray-700">App Name</label>
                           <input
                              name="appName"
                              placeholder="e.g. Dashboard App"
                              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                              required
                              autoFocus // Automatically focus first input when opened
                           />
                        </div>
                        <div>
                           <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                           <input
                              name="email"
                              type="email"
                              placeholder="user@example.com"
                              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                              required
                           />
                        </div>
                        <div>
                           <label className="mb-1 block text-sm font-medium text-gray-700">App Password</label>
                           <textarea
                              name="text"
                              rows={3}
                              placeholder="App Password..."
                              className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                              required
                           />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <div className="flex justify-end gap-3 pt-2">
                           <Button
                              type="button"
                              onClick={handleCancel} // Closes the form
                              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                           >
                              Cancel
                           </Button>
                           <Button
                              type="submit"
                              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                           >
                              {loading ? "Saving..." : "Create User"}
                           </Button>
                        </div>
                     </form>
                  </div>
               </div>
            )}
         </div>
      </section>
   );
}
