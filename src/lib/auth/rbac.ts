/**
 * RBAC Types and Role Definitions for Robotics Hub
 */

export type Role = "super_admin" | "admin" | "manager" | "analyst" | "viewer";

export interface Permission {
  module: string;
  action: string;
  resource?: string;
}

/**
 * Module permission definitions per role.
 * Each entry is { module, action, resource? }.
 */
export const ROLES: Record<Role, Permission[]> = {
  super_admin: [
    // Full access to all modules
    { module: "nc", action: "create" },
    { module: "nc", action: "read" },
    { module: "nc", action: "update" },
    { module: "nc", action: "delete" },
    { module: "hazards", action: "create" },
    { module: "hazards", action: "read" },
    { module: "hazards", action: "update" },
    { module: "hazards", action: "delete" },
    { module: "complaints", action: "create" },
    { module: "complaints", action: "read" },
    { module: "complaints", action: "update" },
    { module: "complaints", action: "delete" },
    { module: "documents", action: "create" },
    { module: "documents", action: "read" },
    { module: "documents", action: "update" },
    { module: "documents", action: "delete" },
    { module: "audits", action: "create" },
    { module: "audits", action: "read" },
    { module: "audits", action: "update" },
    { module: "audits", action: "delete" },
    { module: "admin", action: "manage" },
  ],
  admin: [
    { module: "nc", action: "create" },
    { module: "nc", action: "read" },
    { module: "nc", action: "update" },
    { module: "nc", action: "delete" },
    { module: "hazards", action: "create" },
    { module: "hazards", action: "read" },
    { module: "hazards", action: "update" },
    { module: "hazards", action: "delete" },
    { module: "complaints", action: "create" },
    { module: "complaints", action: "read" },
    { module: "complaints", action: "update" },
    { module: "complaints", action: "delete" },
    { module: "documents", action: "create" },
    { module: "documents", action: "read" },
    { module: "documents", action: "update" },
    { module: "documents", action: "delete" },
    { module: "audits", action: "create" },
    { module: "audits", action: "read" },
    { module: "audits", action: "update" },
    { module: "audits", action: "delete" },
    { module: "admin", action: "read" },
    { module: "admin", action: "update" },
  ],
  manager: [
    { module: "nc", action: "create" },
    { module: "nc", action: "read" },
    { module: "nc", action: "update" },
    { module: "hazards", action: "create" },
    { module: "hazards", action: "read" },
    { module: "hazards", action: "update" },
    { module: "complaints", action: "create" },
    { module: "complaints", action: "read" },
    { module: "complaints", action: "update" },
    { module: "documents", action: "create" },
    { module: "documents", action: "read" },
    { module: "documents", action: "update" },
    { module: "audits", action: "create" },
    { module: "audits", action: "read" },
    { module: "audits", action: "update" },
  ],
  analyst: [
    { module: "nc", action: "create" },
    { module: "nc", action: "read" },
    { module: "nc", action: "update" },
    { module: "hazards", action: "create" },
    { module: "hazards", action: "read" },
    { module: "complaints", action: "create" },
    { module: "complaints", action: "read" },
    { module: "documents", action: "read" },
    { module: "audits", action: "read" },
  ],
  viewer: [
    { module: "nc", action: "read" },
    { module: "hazards", action: "read" },
    { module: "complaints", action: "read" },
    { module: "documents", action: "read" },
    { module: "audits", action: "read" },
  ],
};

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Administrador",
  admin: "Administrador",
  manager: "Gerente",
  analyst: "Analista",
  viewer: "Visualizador",
};
