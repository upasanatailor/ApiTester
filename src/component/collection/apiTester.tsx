"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type BodyMode = "raw" | "json" | "binary";
type ResponseView = "pretty" | "raw" | "json" | "rows";

const ApiTester: React.FC = () => {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("");
  const [bodyMode, setBodyMode] = useState<BodyMode>("raw");
  const [responseView, setResponseView] = useState<ResponseView>("pretty");

  const [rawBody, setRawBody] = useState("");
  const [jsonBody, setJsonBody] = useState("{}");
  const [binaryFile, setBinaryFile] = useState<File | null>(null);

  const [responseText, setResponseText] = useState("");
  const [jsonParsed, setJsonParsed] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setResponseText("");
    setJsonParsed(null);

    try {
      const options: RequestInit = {
        method,
        headers: {} as Record<string, string>,
      };

      if (["POST", "PUT"].includes(method)) {
        if (bodyMode === "raw") {
          options.body = rawBody;
          (options.headers as Record<string, string>)["Content-Type"] =
            "text/plain";
        } else if (bodyMode === "json") {
          options.body = jsonBody;
          (options.headers as Record<string, string>)["Content-Type"] =
            "application/json";
        } else if (bodyMode === "binary" && binaryFile) {
          const formData = new FormData();
          formData.append("file", binaryFile);
          options.body = formData;
        }
      }

      const res = await fetch(url, options);
      const text = await res.text();
      setResponseText(text);

      try {
        const parsed = JSON.parse(text);
        setJsonParsed(parsed);
      } catch {
        setJsonParsed(null); // Not JSON
      }
    } catch (err: any) {
      setResponseText(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const flattenJSON = (obj: any, prefix = ""): Record<string, any> => {
    return Object.keys(obj).reduce((acc, key) => {
      const val = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof val === "object" && val !== null && !Array.isArray(val)) {
        Object.assign(acc, flattenJSON(val, newKey));
      } else {
        acc[newKey] = Array.isArray(val) ? JSON.stringify(val) : val;
      }
      return acc;
    }, {} as Record<string, any>);
  };

  const renderResponse = () => {
    if (loading) return "Loading...";

    switch (responseView) {
      case "pretty":
      case "json":
        return jsonParsed ? (
          <Editor
            height="400px"
            defaultLanguage="json"
            value={JSON.stringify(jsonParsed, null, 2)}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
            }}
          />
        ) : (
          <pre className="p-3">{responseText}</pre>
        );

      case "raw":
        return (
          <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded h-64 overflow-auto">
            {responseText}
          </pre>
        );

      case "rows":
        if (!jsonParsed || typeof jsonParsed !== "object")
          return "No structured data";
        const entries = Object.entries(flattenJSON(jsonParsed));
        return (
          <div className="bg-gray-100 rounded p-3 h-64 overflow-auto text-sm">
            {entries.map(([k, v]) => (
              <div key={k} className="flex justify-between border-b py-1">
                <span className="text-blue-700 font-mono">{k}</span>
                <span className="font-mono">{String(v)}</span>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 space-y-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-2">API Tester</h1>

      {/* Method & URL */}
      <div className="flex gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as HttpMethod)}
          className="border rounded px-2 py-1">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          type="text"
          placeholder="https://api.example.com/endpoint"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={sendRequest}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Send
        </button>
      </div>

      {/* Body section */}
      {["POST", "PUT"].includes(method) && (
        <div>
          <div className="flex gap-2 my-2">
            {(["raw", "json", "binary"] as BodyMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setBodyMode(mode)}
                className={`px-3 py-1 rounded border ${
                  bodyMode === mode ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}>
                {mode.toUpperCase()}
              </button>
            ))}
          </div>

          {bodyMode === "raw" && (
            <textarea
              className="w-full border rounded p-2 h-32"
              value={rawBody}
              onChange={(e) => setRawBody(e.target.value)}
              placeholder="Raw text"
            />
          )}

          {bodyMode === "json" && (
            <Editor
              height="200px"
              defaultLanguage="json"
              value={jsonBody}
              onChange={(value) => setJsonBody(value ?? "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          )}

          {bodyMode === "binary" && (
            <input
              type="file"
              onChange={(e) => setBinaryFile(e.target.files?.[0] || null)}
              className="mt-2"
            />
          )}
        </div>
      )}

      {/* Response View Switch */}
      <div>
        <h2 className="font-semibold mb-1">Response View:</h2>
        <div className="flex gap-2 mb-2">
          {(["pretty", "raw", "json", "rows"] as ResponseView[]).map((view) => (
            <button
              key={view}
              onClick={() => setResponseView(view)}
              className={`px-3 py-1 rounded border ${
                responseView === view ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}>
              {view.toUpperCase()}
            </button>
          ))}
        </div>
        <div>{renderResponse()}</div>
      </div>
    </div>
  );
};

export default ApiTester;
