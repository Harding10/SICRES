import { authClient } from "@/lib/axios";

import type { EtablissementDocument } from "../components/etablissements/EtablissementDocuments";

export async function getClientDocuments(): Promise<
  EtablissementDocument[]
> {
  const response = await authClient.get(
    "/api/client/etablissement/documents",
  );

  const data = response.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.documents)) {
    return data.documents;
  }

  return [];
}

export async function uploadClientDocument(
  file: File,
  name?: string,
  description?: string,
): Promise<EtablissementDocument> {
  const formData = new FormData();

  formData.append("file", file);

  if (name) {
    formData.append("name", name);
  }

  if (description) {
    formData.append("description", description);
  }

  const response = await authClient.post(
    "/api/client/etablissement/documents",
    formData,
  );

  return response.data?.data ?? response.data;
}

export async function deleteClientDocument(
  documentId: number | string,
): Promise<void> {
  await authClient.delete(
    `/api/client/etablissement/documents/${documentId}`,
  );
}