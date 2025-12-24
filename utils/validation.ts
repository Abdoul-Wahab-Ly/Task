import AppError from "./AppError";

//Valide le format et la force du mot de passe
export const validateurPassword = (password: string) => {
  if (!password) throw new AppError("Le mot de passe est obligatoire", 400);
  if (password.length < 8)
    throw new AppError(
      "Le mot de passe doit contenir au moins 8 caractères",
      400
    );

  if (!/[A-Z]/.test(password)) {
    throw new AppError(
      "Le mot de passe doit contenir au moins une lettre majuscule",
      400
    );
  }
  if (!/[a-z]/.test(password)) {
    throw new AppError(
      "Le mot de passe doit contenir au moins une lettre minuscule",
      400
    );
  }
  if (!/\d/.test(password)) {
    throw new AppError(
      "Le mot de passe doit contenir au moins un chiffre",
      400
    );
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new AppError(
      "Le mot de passe doit contenir au moins un caractère spécial",
      400
    );
  }
};

// Valide le format de l'email

export const validateurEmail = (email: string) => {
  if (!email) throw new AppError("L'adresse email est obligatoire", 400);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Le format de l'adresse email est invalide", 400);
  }
};

export const validateurSignin = (email: string, password: string) => {
  if (!email) throw new AppError("L'adresse email est requise", 400);
  if (!password) throw new AppError("Le mot de passe est requis", 400);

  // Optionnel : On peut aussi vérifier le format de l'email pour éviter
  // de chercher en base de données une chaîne qui n'est pas un email.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Format d'email invalide", 400);
  }
};
