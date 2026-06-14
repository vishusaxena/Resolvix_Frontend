import React, { useState } from "react";

export default function FileUploader({ onFilesChange }) {
  const [files, setFiles] = useState([]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    const formattedFiles = await Promise.all(
      selectedFiles.map(async (file) => ({
        fileName: file.name,
        fileExt: file.name.split(".").pop(),
        fileBase64: await convertToBase64(file),
      })),
    );
    console.log(formattedFiles);
    setFiles(formattedFiles);

    if (onFilesChange) {
      onFilesChange(formattedFiles);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" multiple onChange={handleFileChange} id="file-upload-input" />
      <label
        htmlFor="file-upload-input"
        className="px-3 py-1.5 border border-zinc-200 bg-white text-zinc-700 font-bold text-[11px] rounded-lg shadow-sm hover:bg-zinc-50 cursor-pointer"
      >
        Browse Files
      </label>
    </div >
  );
}
