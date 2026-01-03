/**
 * Validation error class for SDK validations
 */
export class ValidationError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Validates Pix QR Code payload to prevent invalid states
 */

/**
 * Validates that the value is greater than 0 when value is provided
 *
 * @param value - The QR Code value (optional)
 * @throws {ValidationError} If value is 0 or negative
 *
 * @example
 * ```typescript
 * validateQrCodeValue(10.50); // OK
 * validateQrCodeValue(0); // Throws ValidationError
 * validateQrCodeValue(undefined); // OK
 * ```
 */
export const validateQrCodeValue = (value?: number): void => {
  if (value !== undefined) {
    if (value <= 0) {
      throw new ValidationError(
        "INVALID_VALUE",
        "Amount must be greater than 0 when value is provided",
      );
    }
  }
};

/**
 * Validates the complete Pix QR Code payload
 *
 * @param payload - The QR Code creation payload
 * @throws {ValidationError} If validation fails
 *
 * @example
 * ```typescript
 * validateQrCodePayload({ name: "Test", value: 10.50 }); // OK
 * validateQrCodePayload({ name: "Test", value: 0 }); // Throws ValidationError
 * validateQrCodePayload({ name: "Test" }); // OK
 * ```
 */
export const validateQrCodePayload = (payload: {
  value?: number;
  name: string;
  [key: string]: unknown;
}): void => {
  if (!payload.name || payload.name.trim().length === 0) {
    throw new ValidationError(
      "MISSING_NAME",
      "Name is required and cannot be empty",
    );
  }

  validateQrCodeValue(payload.value);
};

/**
 * @deprecated Use `validateQrCodePayload` instead
 */
export const QrCodeValidator = {
  validate: validateQrCodePayload,
  validateValue: validateQrCodeValue,
} as const;
