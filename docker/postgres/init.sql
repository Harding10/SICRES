-- =============================================================================
-- init.sql — Initialisation de la base de données SICRES
-- Système de Recensement des Établissements Scolaires
-- Maintainer: BEH DEGRY JEREMIE HARDING
-- =============================================================================

-- Configuration de l'encodage
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

-- =============================================================================
-- Extensions PostgreSQL utiles
-- =============================================================================

-- UUID natif (pour les identifiants Laravel)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Recherche textuelle avancée (pour les noms d'établissements)
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Statistiques étendues (pour l'optimiseur de requêtes)
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Crypto (pour les tokens)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- Configuration des droits
-- =============================================================================

-- Accorder tous les droits sur la base au user applicatif
GRANT ALL PRIVILEGES ON DATABASE sicres_db TO sicres_user;

-- =============================================================================
-- Schémas
-- =============================================================================

-- Schéma principal (déjà public, mais on le documente)
-- Les tables seront créées par les migrations Laravel

-- =============================================================================
-- Types ENUM personnalisés (utilisés par les migrations Laravel)
-- =============================================================================

-- Statut des déclarations
DO $$ BEGIN
    CREATE TYPE declaration_status AS ENUM (
        'brouillon',
        'soumis',
        'en_revision',
        'valide',
        'rejete',
        'archive'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Type d'établissement
DO $$ BEGIN
    CREATE TYPE etablissement_type AS ENUM (
        'primaire',
        'secondaire_general',
        'secondaire_technique',
        'superieur',
        'professionnel',
        'prescolaire'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Secteur d'établissement
DO $$ BEGIN
    CREATE TYPE etablissement_secteur AS ENUM (
        'public',
        'prive_laic',
        'prive_confessionnel'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Statut d'utilisateur
DO $$ BEGIN
    CREATE TYPE user_status AS ENUM (
        'actif',
        'inactif',
        'suspendu',
        'en_attente'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =============================================================================
-- Fonctions utilitaires
-- =============================================================================

-- Fonction de mise à jour automatique du champ updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- Message de confirmation
-- =============================================================================
DO $$
BEGIN
    RAISE NOTICE '=================================================';
    RAISE NOTICE ' SICRES - Base de données initialisée avec succès';
    RAISE NOTICE ' Extensions: uuid-ossp, unaccent, pgcrypto';
    RAISE NOTICE ' Types ENUM créés';
    RAISE NOTICE ' Fonctions utilitaires créées';
    RAISE NOTICE '=================================================';
END $$;
