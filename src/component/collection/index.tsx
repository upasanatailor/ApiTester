"use client";

import React, { useEffect, useState } from "react";
import collectionJson from "./file.json";
import { ChevronDown, ChevronRight } from "lucide-react";

interface RequestUrl {
  raw?: string;
  host?: string[];
  path?: string[];
  // Add any other fields your JSON might have
}

interface Request {
  method: string;
  url: string | RequestUrl;
}

interface CollectionItem {
  name: string;
  item?: CollectionItem[];
  request?: Request;
}

interface FlattenedItem {
  name: string;
  method: string;
  url: string;
}

function flattenItems(
  items: CollectionItem[],
  parentName: string = ""
): FlattenedItem[] {
  return items.flatMap((item: CollectionItem): FlattenedItem[] => {
    if (item.item) {
      // Folder
      return flattenItems(
        item.item,
        parentName ? `${parentName}/${item.name}` : item.name
      );
    } else if (item.request) {
      const method: string = item.request.method;
      const urlObj = item.request.url;
      // Handle both string and object url
      let url: string;
      if (typeof urlObj === "string") {
        url = urlObj;
      } else {
        url =
          urlObj.raw ||
          (urlObj.host?.join(".") ?? "") +
            (urlObj.path?.map((p: string) => `/${p}`).join("") ?? "");
      }
      return [
        {
          name: parentName || "(root)",
          method,
          url,
        },
      ];
    }
    return [];
  });
}

export default function CollectionTree({}) {
  const [data, setData] = useState<
    { name: string; endpoints: { method: string; url: string }[] }[]
  >([]);

  useEffect(() => {
    if (collectionJson && collectionJson.item) {
      const flat = flattenItems(collectionJson.item);
      // Group by folder name
      const groups = flat.reduce<
        Record<string, { method: string; url: string }[]>
      >((acc, ep) => {
        if (!acc[ep.name]) acc[ep.name] = [];
        acc[ep.name].push({ method: ep.method, url: ep.url });
        return acc;
      }, {});
      setData(
        Object.entries(groups).map(([name, endpoints]) => ({ name, endpoints }))
      );
    }
  }, [collectionJson]);

  if (!collectionJson) return <div>Loading collection...</div>;

  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
  const Badge: React.FC<{ method: string }> = ({ method }) => {
    const colors: Record<HttpMethod, string> = {
      GET: "bg-green-500",
      POST: "bg-blue-500",
      PUT: "bg-yellow-500",
      DELETE: "bg-red-500",
    };
    return (
      <span
        className={`text-white text-xs font-semibold px-2 py-1 rounded ${
          (colors as any)[method] || "bg-gray-500"
        }`}>
        {method}
      </span>
    );
  };

  const Node: React.FC<{
    item: { name: string; endpoints: { method: string; url: string }[] };
  }> = ({ item }) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <div
          className="flex  cursor-pointer p-2 hover:bg-gray-100 rounded"
          onClick={() => setOpen(!open)}>
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span className="ml-2 font-medium">{item.name}</span>
        </div>
        {open && (
          <div className="ml-6 space-y-1">
            {item.endpoints.map((e, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 p-1 rounded hover:bg-gray-50">
                <Badge method={e.method} />
                <span className="text-sm text-gray-700">{e.url}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Postman Collection</h2>
      <div className="space-y-2">
        {data.map((grp, idx) => (
          <Node key={idx} item={grp} />
        ))}
      </div>
    </div>
  );
}
