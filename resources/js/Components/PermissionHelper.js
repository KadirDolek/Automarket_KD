export const canEditCar = (user, car) => {
    if (!user) return false;
    
    // Propriétaire
    if (car.user_id === user.id) return true;
    
    // Admin ou modérateur
    if (user.role && ['admin', 'moderateur'].includes(user.role.name)) return true;
    
    return false;
}

export const hasRole = (user, roles) => {
    if (!user || !user.role) return false;
    
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role.name);
}

export const usePermissions = (auth) => {
    return {
        user: auth?.user,
        isAuthenticated: !!auth?.user,
        isAdmin: hasRole(auth?.user, 'admin'),
        isModerator: hasRole(auth?.user, ['admin', 'moderateur']),
        canCreateCar: !!auth?.user,
        canEditCar: (car) => canEditCar(auth?.user, car),
    };
}