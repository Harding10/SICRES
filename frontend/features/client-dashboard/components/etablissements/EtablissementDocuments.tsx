"use client";

import { useRef, useState } from "react";
import {
  Download,
  FileText,
  FolderOpen,
  Plus,
  Upload,
  X,
} from "lucide-react";

export interface EtablissementDocument {
  id: number | string;
  name: string;
  description?: string;
  type?: string;
  size?: number;
  createdAt?: string;
  downloadUrl?: string;
}

interface EtablissementDocumentsProps {
  documents?: EtablissementDocument[];
  loading?: boolean;
}

export default function EtablissementDocuments({
  documents = [],
  loading = false,
}: EtablissementDocumentsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(
    null,
  );
  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");

  function openAddModal() {
    setSelectedFile(null);
    setDocumentName("");
    setDescription("");
    setShowAddModal(true);
  }

  function closeAddModal() {
    setShowAddModal(false);
    setSelectedFile(null);
    setDocumentName("");
    setDescription("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);

    if (!documentName.trim()) {
      setDocumentName(file.name);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }

    /*
     * Le fichier sera envoyé au backend Laravel
     * via documentService.ts.
     *
     * Aucun stockage local n'est effectué ici.
     */

    closeAddModal();
  }

  return (
    <>
      <section className="border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen
              size={18}
              strokeWidth={1.8}
              className="text-gray-500"
            />

            <div>
              <h2 className="text-base font-bold text-gray-900">
                Documents
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Documents associés à votre établissement.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b] hover:!text-white"
            style={{ color: "#ffffff" }}
          >
            <Plus
              size={16}
              strokeWidth={1.8}
            />

            Ajouter un document
          </button>
        </div>

        {loading ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm text-gray-500">
              Chargement des documents...
            </p>
          </div>
        ) : documents.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-gray-400">
              <FileText
                size={22}
                strokeWidth={1.8}
              />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-800">
              Aucun document disponible
            </h3>

            <p className="mx-auto mt-1 max-w-md text-xs text-gray-500">
              Aucun document n'est actuellement associé
              à votre établissement.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#123524]"
            >
              <Upload
                size={16}
                strokeWidth={1.8}
              />

              Ajouter un document
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {documents.map((document) => (
              <div
                key={document.id}
                className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                    <FileText
                      size={19}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {document.name}
                    </p>

                    {document.description && (
                      <p className="mt-1 text-xs text-gray-500">
                        {document.description}
                      </p>
                    )}

                    <div className="mt-1 flex flex-wrap gap-x-2 text-[11px] text-gray-400">
                      {document.type && (
                        <span>{document.type}</span>
                      )}

                      {document.size !== undefined && (
                        <span>
                          {formatFileSize(
                            document.size,
                          )}
                        </span>
                      )}

                      {document.createdAt && (
                        <span>
                          {formatDate(
                            document.createdAt,
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {document.downloadUrl ? (
                    <a
                      href={document.downloadUrl}
                      className="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[#123524]"
                    >
                      <Download
                        size={15}
                        strokeWidth={1.8}
                      />

                      Télécharger
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center gap-2 border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-400"
                    >
                      <Download
                        size={15}
                        strokeWidth={1.8}
                      />

                      Télécharger
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAddModal();
            }
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl border border-gray-200 bg-white"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Mes documents
                </p>

                <h2 className="mt-1 text-lg font-semibold text-gray-900">
                  Ajouter un document
                </h2>
              </div>

              <button
                type="button"
                onClick={closeAddModal}
                className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label="Fermer"
              >
                <X
                  size={19}
                  strokeWidth={1.8}
                />
              </button>
            </div>

            <div className="space-y-5 px-5 py-6">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-400">
                  Nom du document
                </label>

                <input
                  type="text"
                  value={documentName}
                  onChange={(event) =>
                    setDocumentName(
                      event.target.value,
                    )
                  }
                  placeholder="Ex. Autorisation d'ouverture"
                  className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#123524] focus:ring-1 focus:ring-[#123524]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-400">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value,
                    )
                  }
                  rows={3}
                  placeholder="Description du document..."
                  className="w-full resize-none border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#123524] focus:ring-1 focus:ring-[#123524]"
                />
              </div>

              <div>
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Fichier
                </p>

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="flex w-full flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center transition hover:border-[#123524]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-gray-500">
                    <Upload
                      size={19}
                      strokeWidth={1.8}
                    />
                  </div>

                  {selectedFile ? (
                    <>
                      <p className="mt-3 text-sm font-semibold text-gray-800">
                        {selectedFile.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {formatFileSize(
                          selectedFile.size,
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-3 text-sm font-medium text-gray-700">
                        Sélectionner un fichier
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Cliquez pour choisir un document
                        depuis votre appareil.
                      </p>
                    </>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />

                <p className="mt-2 text-[11px] text-gray-400">
                  PDF, Word, Excel, JPG ou PNG.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-4">
              <button
                type="button"
                onClick={closeAddModal}
                className="border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={!selectedFile}
                className="inline-flex items-center gap-2 bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b] hover:!text-white disabled:cursor-not-allowed disabled:opacity-50"
                style={{ color: "#ffffff" }}
              >
                <Upload
                  size={16}
                  strokeWidth={1.8}
                />

                Ajouter le document
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} octets`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} Ko`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} Mo`;
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("fr-FR");
}