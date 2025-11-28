"use client";

import { useEffect, useState } from "react";
import type { PasswordEntry } from "@/types/password";

interface Props {
   data: PasswordEntry[];
   loading: boolean;
}

export default function Search({ data, loading }: Props) {
   const [query, setQuery] = useState("");
   const [filteredData, setFilteredData] = useState<PasswordEntry[]>([]);

   useEffect(() => {
      setFilteredData(data);
   }, [data]);

   useEffect(() => {
      if (!query.trim()) {
         setFilteredData(data);
         return;
      }

      const q = query.toLowerCase();

      const filtered = data.filter((item) =>
         item.appName?.toLowerCase().includes(q) ||
         item.email?.toLowerCase().includes(q) ||
         item.text?.toLowerCase().includes(q)
      );

      setFilteredData(filtered);
   }, [query, data]);

   if (loading) return <p>Loading...</p>;

   return (
      <div className="p-4 bg-gray-100">
         {/* Search Input */}
         <div className="mb-4">
            <input
               type="text"
               placeholder="Search by app name, email or password..."
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>

         <h2 className="text-2xl font-bold mb-4 text-blue-500">Your Passwords</h2>

         {!filteredData.length ? (
            <p>No matching records found</p>
         ) : (
            <div className="flex flex-wrap gap-4">
               {filteredData.map((item) => (
                  <div
                     key={item.id}
                     className="
                     grow shrink-0 basis-80 md:basis-96 lg:basis-0
                     min-w-80 max-w-lg bg-white text-black p-6 rounded-2xl shadow-xl
                     hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  >
                     <div className="flex items-center mb-2">
                        <div className="w-2/6 font-bold">AppName:</div>
                        <h3 className="text-lg text-emerald-400">{item.appName}</h3>
                     </div>

                     <div className="flex items-center mb-2">
                        <div className="w-2/6 font-bold">Email:</div>
                        <h3 className="text-lg">{item.email}</h3>
                     </div>

                     <div className="flex items-center mb-2">
                        <div className="w-2/6 font-bold">Password:</div>
                        <h3 className="text-lg">{item.text}</h3>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}




// "use client";

// import { useEffect, useState } from "react";
// import { getPasswordEntries } from "@/data/loaders";
// import type { PasswordEntry } from "@/types/password";

// export default function Search() {
//    const [data, setData] = useState<PasswordEntry[]>([]);
//    const [filteredData, setFilteredData] = useState<PasswordEntry[]>([]);
//    const [query, setQuery] = useState("");
//    const [loading, setLoading] = useState(true);

//    useEffect(() => {
//       async function load() {
//          try {
//             const res = await getPasswordEntries();
//             if (Array.isArray(res?.data)) {
//                setData(res.data);
//                setFilteredData(res.data);
//             }
//          } catch (err) {
//             console.error(err);
//          } finally {
//             setLoading(false);
//          }
//       }
//       load();
//    }, []);

//    useEffect(() => {
//       if (!query.trim()) {
//          setFilteredData(data);
//          return;
//       }

//       const q = query.toLowerCase();

//       const filtered = data.filter((item) =>
//          item.appName?.toLowerCase().includes(q) ||
//          item.email?.toLowerCase().includes(q) ||
//          item.text?.toLowerCase().includes(q)
//       );

//       setFilteredData(filtered);
//    }, [query, data]);

//    if (loading) return <p>Loading...</p>;

//    return (
//       <div className="p-4 bg-gray-100">
//          {/* Search Input */}
//          <div className="mb-4">
//             <input
//                type="text"
//                placeholder="Search by app name, email or password..."
//                value={query}
//                onChange={(e) => setQuery(e.target.value)}
//                className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//          </div>

//          {/* Password List */}
//          <h2 className="text-2xl font-bold mb-4 ">Your Passwords</h2>

//          {/* Results */}
//          {!filteredData.length ? (
//             <p>No matching records found</p>
//          ) : (
//             <div className="flex flex-wrap gap-4">
//                {filteredData.map((item) => (
//                   <div
//                      key={item.id}
//                      className="
//                      grow shrink-0 basis-80 md:basis-96 lg:basis-0
//                      min-w-80 max-w-lg
//                      bg-[#ffff]
//                      text-black p-6 rounded-2xl shadow-xl
//                      hover:shadow-2xl hover:scale-[1.02] transition-all duration-300
//                      relative overflow-hidden"
//                   >
//                      <div className="flex items-center mb-2">
//                         <div className="w-2/6 items-start font-bold">
//                            AppName:
//                         </div>
//                         <h3 className="items-start text-lg ">
//                            {item.appName}
//                         </h3>
//                      </div>
//                      <div className="flex items-center mb-2">
//                         <div className="w-2/6 items-start font-bold">
//                            Email:
//                         </div>
//                         <h3 className="items-start text-lg">
//                            {item.email}
//                         </h3>
//                      </div>
//                      <div className="flex items-center mb-2">
//                         <div className="w-2/6 items-start font-bold">
//                            Password:
//                         </div>
//                         <h3 className="items-start text-lg">
//                            {item.text}
//                         </h3>
//                      </div>
//                   </div>
//                ))}
//             </div>
//          )}
//       </div>
//    );
// }
