"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Building2,
  Loader2,
  Plus,
  RefreshCw,
} from "lucide-react";

import type {
  Etablissement,
  EtablissementForm,
  EtablissementsStatistics,
} from "../../types";

import { emptyEtablissementForm } from "../../types";

import {
  getEtablissements,
  normalizeEtablissementsResponse,
} from "../../services/etablissementService";

import EtablissementsTable from "./EtablissementsTable";
import EtablissementFormModal from "./EtablissementFormModal";
import EtablissementViewModal from "./EtablissementViewModal";

export default function EtablissementsPage() {
  const [etablissements, setEtablissements] =
    useState<Etablissement[]>([]);

  const [statistics, setStatistics] =
    useState<EtablissementsStatistics>({
      total: 0,
      actifs: 0,
      a_verifier: 0,
      inactifs: 0,
    });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [modal, setModal] = useState<
    "add" | "edit" | "view" | null
  >(null);

  const [selectedEtablissement, setSelectedEtablissement] =
    useState<Etablissement | null>(null);

  const [form, setForm] =
    useState<EtablissementForm>(
      emptyEtablissementForm,
    );

  /**
   * Chargement des établissements
   */
  const loadEtablissements = async (
    isRefresh = false,
  ) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const response =
        await getEtablissements();

      const normalized =
        normalizeEtablissementsResponse(
          response,
        );

      setEtablissements(normalized.data);

      if (normalized.statistics) {
        setStatistics(
          normalized.statistics,
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        "Impossible de charger les établissements. Vérifiez la connexion au serveur.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Chargement initial
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      loadEtablissements();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Filtrage de la liste
   */
  const filteredEtablissements =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      if (!query) {
        return etablissements;
      }

      return etablissements.filter(
        (etablissement) => {
          const values = [
            etablissement.code_etablissement,
            etablissement.sigle,
            etablissement.nom_officiel,
            etablissement.nom_usuel,
            etablissement.nom,
            etablissement.type,
            ...(etablissement.types ?? []),
            etablissement.responsable,
            etablissement.adresse,
            etablissement.email,
            etablissement.telephone,
            etablissement.statut,
            etablissement.localite,
            etablissement.sous_prefecture,
            etablissement.dren,
            etablissement.iepp,
            etablissement.rattachement_technique,
            etablissement.rattachement_professionnel,
            etablissement.rattachement_insertion,
            etablissement.rattachement_superieur,
            ...(etablissement.niveaux ?? []),
            ...(etablissement.domaines_formation_insertion ?? []),
            ...(etablissement.domaines_enseignement_professionnel ?? []),
          ];

          return values.some((value) =>
            String(value ?? "")
              .toLowerCase()
              .includes(query),
          );
        },
      );
    }, [etablissements, search]);

  /**
   * Ouverture du formulaire d'ajout
   */
  const openAddModal = () => {
    setSelectedEtablissement(null);

    setForm({
      ...emptyEtablissementForm,
      types: [],
      niveaux: [],
      domaines_formation_insertion: [],
      domaines_enseignement_professionnel: [],
    });

    setModal("add");
  };

  /**
   * Ouverture de la fenêtre de consultation
   */
  const openViewModal = (
    etablissement: Etablissement,
  ) => {
    setSelectedEtablissement(
      etablissement,
    );

    setModal("view");
  };

  /**
   * Ouverture du formulaire de modification
   */
  const openEditModal = (
    etablissement: Etablissement,
  ) => {
    setSelectedEtablissement(
      etablissement,
    );

    setForm({
      code_etablissement:
        etablissement.code_etablissement ??
        "",

      sigle:
        etablissement.sigle ?? "",

      nom_officiel:
        etablissement.nom_officiel ??
        etablissement.nom ??
        "",

      nom_usuel:
        etablissement.nom_usuel ?? "",

      nom:
        etablissement.nom ??
        etablissement.nom_officiel ??
        "",

      types:
        etablissement.types ??
        (etablissement.type
          ? [
              etablissement.type as EtablissementForm["types"][number],
            ]
          : []),

      niveaux:
        etablissement.niveaux ?? [],

      domaines_formation_insertion:
        etablissement.domaines_formation_insertion ??
        [],

      domaines_enseignement_professionnel:
        etablissement.domaines_enseignement_professionnel ??
        [],

      responsable:
        etablissement.responsable ?? "",

      statut:
        (etablissement.statut as EtablissementForm["statut"]) ??
        "",

      secteur:
        etablissement.secteur ?? "",

      adresse:
        etablissement.adresse ?? "",

      telephone:
        etablissement.telephone ?? "",

      email:
        etablissement.email ?? "",

      dren:
        etablissement.dren ?? "",

      iepp:
        etablissement.iepp ?? "",

      rattachement_technique:
        etablissement.rattachement_technique ?? "",

      rattachement_professionnel:
        etablissement.rattachement_professionnel ??
        "",

      rattachement_insertion:
        etablissement.rattachement_insertion ??
        "",

      rattachement_superieur:
        etablissement.rattachement_superieur ??
        "",

      sous_prefecture:
        etablissement.sous_prefecture ?? "",

      localite:
        etablissement.localite ?? "",

      latitude:
        etablissement.latitude !==
        undefined
          ? String(
              etablissement.latitude,
            )
          : "",

      longitude:
        etablissement.longitude !==
        undefined
          ? String(
              etablissement.longitude,
            )
          : "",

      precision_gps:
        etablissement.precision_gps !==
        undefined
          ? String(
              etablissement.precision_gps,
            )
          : "",
    });

    setModal("edit");
  };

  /**
   * Fermeture de toutes les fenêtres
   */
  const closeModal = () => {
    setModal(null);
    setSelectedEtablissement(null);
  };

  /**
   * Modification du formulaire
   */
  const handleFormChange = <
    K extends keyof EtablissementForm,
  >(
    field: K,
    value: EtablissementForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /**
   * Soumission frontend temporaire.
   */
  const handleFrontendSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const nomOfficiel =
      form.nom_officiel.trim() ||
      form.nom_usuel.trim() ||
      form.nom.trim();

    const nomUsuel =
      form.nom_usuel.trim() ||
      nomOfficiel;

    const data: Etablissement = {
      id:
        modal === "edit" &&
        selectedEtablissement
          ? selectedEtablissement.id
          : Date.now(),

      code_etablissement:
        form.code_etablissement.trim(),

      sigle:
        form.sigle.trim(),

      nom_officiel:
        nomOfficiel,

      nom_usuel:
        nomUsuel,

      nom:
        nomOfficiel,

      type:
        form.types[0] ?? "",

      types:
        form.types,

      secteur:
        form.secteur === ""
          ? undefined
          : form.secteur,

      responsable:
        form.responsable.trim(),

      statut:
        form.statut,

      adresse:
        form.adresse.trim(),

      telephone:
        form.telephone.trim(),

      email:
        form.email.trim(),

      niveaux:
        form.niveaux,

      domaines_formation_insertion:
        form.domaines_formation_insertion,

      domaines_enseignement_professionnel:
        form.domaines_enseignement_professionnel,

      dren:
        form.dren,

      iepp:
        form.iepp,

      rattachement_technique:
        form.rattachement_technique,

      rattachement_professionnel:
        form.rattachement_professionnel,

      rattachement_insertion:
        form.rattachement_insertion,

      rattachement_superieur:
        form.rattachement_superieur,

      sous_prefecture:
        form.sous_prefecture.trim(),

      localite:
        form.localite.trim(),

      latitude:
        form.latitude
          ? Number(form.latitude)
          : undefined,

      longitude:
        form.longitude
          ? Number(form.longitude)
          : undefined,

      precision_gps:
        form.precision_gps
          ? Number(form.precision_gps)
          : undefined,
    };

    if (
      modal === "edit" &&
      selectedEtablissement
    ) {
      setEtablissements(
        (current) =>
          current.map((item) =>
            item.id ===
            selectedEtablissement.id
              ? data
              : item,
          ),
      );
    } else {
      setEtablissements(
        (current) => [
          data,
          ...current,
        ],
      );
    }

    closeModal();
  };

  return (
    <div className="space-y-6">
      {/* EN-TÊTE */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-gray-100 text-gray-500">
            <Building2
              size={20}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Établissements
            </h1>

            <p className="text-sm text-gray-500">
              Recensement et suivi des établissements de la commune
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              loadEtablissements(true)
            }
            disabled={refreshing}
            className="inline-flex h-10 items-center gap-2 border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Actualiser
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-10 items-center gap-2 border border-[#123524] bg-[#123524] px-4 text-sm font-semibold text-white transition hover:bg-[#0d291b]"
          >
            <Plus size={17} />

            Ajouter un établissement
          </button>
        </div>
      </div>

      {/* STATISTIQUES */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Total
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.total}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Établissements enregistrés
          </p>
        </div>

        <div className="border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Actifs
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.actifs}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Établissements actifs
          </p>
        </div>

        <div className="border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            À vérifier
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.a_verifier}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Établissements à vérifier
          </p>
        </div>
      </div>

      {/* RECHERCHE */}
      <div className="border border-gray-200 bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Liste des établissements
            </h2>

            <p className="text-sm text-gray-500">
              {filteredEtablissements.length} résultat
              {filteredEtablissements.length > 1
                ? "s"
                : ""}
            </p>
          </div>

          <div className="w-full md:max-w-md">
            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Rechercher par code, nom, sigle, localité..."
              className="h-10 w-full border border-gray-300 px-3 text-sm outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/10"
            />
          </div>
        </div>
      </div>

      {/* ERREUR */}
      {error && (
        <div className="flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
        </div>
      )}

      {/* TABLEAU */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center border border-gray-200 bg-white">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Loader2
              size={20}
              className="animate-spin"
            />

            Chargement des établissements...
          </div>
        </div>
      ) : (
        <EtablissementsTable
          etablissements={
            filteredEtablissements
          }
          search={search}
          onSearchChange={setSearch}
          onView={openViewModal}
          onEdit={openEditModal}
        />
      )}

      {/* AJOUT / MODIFICATION */}
      {(modal === "add" ||
        modal === "edit") && (
        <EtablissementFormModal
          mode={modal}
          form={form}
          onChange={handleFormChange}
          onSubmit={handleFrontendSubmit}
          onClose={closeModal}
        />
      )}

      {/* CONSULTATION */}
      {modal === "view" &&
        selectedEtablissement && (
          <EtablissementViewModal
            etablissement={
              selectedEtablissement
            }
            onClose={closeModal}
          />
        )}
    </div>
  );
}