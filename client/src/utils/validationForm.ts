interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: { [field: string]: string };
}

const validateForm = (values: FormValues): ValidationResult => {
  const errors: { [field: string]: string } = {};

  // Validación del correo electrónico
  if (!values.email) {
    errors.email = "El correo electrónico es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Ingrese un correo electrónico válido";
  }

  // Validación de la contraseña
  if (!values.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (
    !/(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(values.password)
  ) {
    errors.password =
      "La contraseña debe tener al menos una mayúscula, un número y un caracter especial";
  }

  // Validación del nombre y apellido
  if (!values.firstName) {
    errors.firstName = "El nombre es obligatorio";
  }
  if (!values.lastName) {
    errors.lastName = "El apellido es obligatorio";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validateForm;
