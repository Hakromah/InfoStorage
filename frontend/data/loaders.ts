import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

const BASE_URL = getStrapiURL();
const homePageQuery = qs.stringify({
   populate: {
      blocks: {
         on: {
            "layout.hero-section": {
               populate: {
                  image: {
                     fields: ["url", "alternativeText"],
                  },
                  link: true,
               },
            },
            "layout.footer": {
               populate: {
                  image: {
                     fields: ["url", "alternativeText"],
                  },
                  link: true,
               },
            },
         },
      },
   },
});

export async function getHomePage() {
   const path = "/api/home-page";
   const url = new URL(path, BASE_URL);
   url.search = homePageQuery;

   console.dir(url.href, { depth: null });

   return await fetchAPI(url.href, { method: "GET" });
}

// Gets the full URL for a Strapi media asset
export function getStrapiMedia(url: string) {
	if (url.startsWith("http")) return url;
	return `${getStrapiURL()}${url}`;
}

const passwordEntriesQuery = qs.stringify({
   populate: "*",
   sort: ["appName:asc"],
   pagination: {
      pageSize: 100,
   },
});

export async function getPasswordEntries() {
   const path = "/api/password-entries";
   const url = new URL(path, BASE_URL);
   url.search = passwordEntriesQuery;
   return await fetchAPI(url.href, { method: "GET" });
}

export async function getUsers() {
   const path = "/api/users";
   const url = new URL(path, BASE_URL);
   url.search = qs.stringify({
      populate: {
         avatar: {
            fields: ["url", "alternativeText"],
         },
      },
   });
   const response = await fetchAPI(url.href, { method: "GET" });
   console.log(response);
   return response;
}
