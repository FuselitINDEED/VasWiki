import { getStore } from "@netlify/blobs"
import type { WikiData } from "./types"
import wikiDataJson from "@/public/data/wiki-data.json"

const STORE_NAME = "wiki"
const DATA_KEY = "wiki-data"

function getWikiStore() {
  return getStore({ name: STORE_NAME, consistency: "strong" })
}

export async function getWikiData(): Promise<WikiData> {
  const store = getWikiStore()
  const data = await store.get(DATA_KEY, { type: "json" })
  if (data) {
    return data as WikiData
  }
  // First run: seed the blob store from the bundled JSON
  const initial = wikiDataJson as WikiData
  await store.setJSON(DATA_KEY, initial)
  return initial
}

export async function saveWikiData(data: WikiData): Promise<void> {
  const store = getWikiStore()
  await store.setJSON(DATA_KEY, data)
}
