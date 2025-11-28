"use server";

export async function addUser(formData: FormData) {
   const username = formData.get("username") as string;
   const password = formData.get("password") as string;

   if (!username || !password) {
      throw new Error("Missing fields");
   }

   // Example API call
   const res = await fetch("https://harmonious-fireworks-bde4521ff5.strapiapp.com/admin/api/users", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         username,
         password
      })
   });

   return res.json();
}
