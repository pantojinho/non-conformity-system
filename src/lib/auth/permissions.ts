import { ROLES, type Role, type Permission } from "./rbac";

/**
 * Check if a given role has permission to perform an action on a resource.
 */
export function hasPermission(
  role: Role,
  module: string,
  action: string,
  resource?: string
): boolean {
  const rolePermissions = ROLES[role];
  if (!rolePermissions) return false;

  return rolePermissions.some(
    (p) =>
      p.module === module &&
      p.action === action &&
      (resource ? p.resource === resource : true)
  );
}

/**
 * Get all permissions for a given role.
 */
export function getPermissions(role: Role): Permission[] {
  return ROLES[role] ?? [];
}

/**
 * Check if a role has any permission in a module.
 */
export function hasModuleAccess(role: Role, module: string): boolean {
  const rolePermissions = ROLES[role];
  if (!rolePermissions) return false;

  return rolePermissions.some((p) => p.module === module);
}
