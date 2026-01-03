import {
  validateQrCodeValue,
  validateQrCodePayload,
  QrCodeValidator,
  ValidationError,
} from "../validation";

describe("validateQrCodeValue", () => {
  test("should accept undefined value (sem valor)", () => {
    expect(() => validateQrCodeValue(undefined)).not.toThrow();
  });

  test("should accept positive values", () => {
    expect(() => validateQrCodeValue(0.01)).not.toThrow();
    expect(() => validateQrCodeValue(1.0)).not.toThrow();
    expect(() => validateQrCodeValue(10.50)).not.toThrow();
    expect(() => validateQrCodeValue(1000.0)).not.toThrow();
  });

  test("should reject zero value", () => {
    expect(() => validateQrCodeValue(0)).toThrow(ValidationError);
    expect(() => validateQrCodeValue(0)).toThrow(
      "Amount must be greater than 0",
    );
  });

  test("should reject negative values", () => {
    expect(() => validateQrCodeValue(-0.01)).toThrow(ValidationError);
    expect(() => validateQrCodeValue(-1.0)).toThrow(ValidationError);
    expect(() => validateQrCodeValue(-10.50)).toThrow(ValidationError);
  });

  test("should provide correct error code for invalid value", () => {
    try {
      validateQrCodeValue(0);
      fail("Expected ValidationError to be thrown");
    } catch (error) {
      if (error instanceof ValidationError) {
        expect(error.code).toBe("INVALID_VALUE");
      } else {
        fail("Expected error to be instance of ValidationError");
      }
    }
  });
});

describe("validateQrCodePayload", () => {
  test("should accept valid payload with value", () => {
    expect(() =>
      validateQrCodePayload({ name: "Test QR Code", value: 10.50 }),
    ).not.toThrow();
  });

  test("should accept valid payload without value", () => {
    expect(() =>
      validateQrCodePayload({ name: "Test QR Code" }),
    ).not.toThrow();
  });

  test("should accept valid payload with correlationID", () => {
    expect(() =>
      validateQrCodePayload({
        name: "Test QR Code",
        value: 10.50,
        correlationID: "test-123",
      }),
    ).not.toThrow();
  });

  test("should reject payload with zero value", () => {
    expect(() =>
      validateQrCodePayload({ name: "Test QR Code", value: 0 }),
    ).toThrow(ValidationError);
  });

  test("should reject payload with negative value", () => {
    expect(() =>
      validateQrCodePayload({ name: "Test QR Code", value: -10.50 }),
    ).toThrow(ValidationError);
  });

  test("should reject payload with empty name", () => {
    expect(() =>
      validateQrCodePayload({ name: "", value: 10.50 }),
    ).toThrow(ValidationError);
    expect(() =>
      validateQrCodePayload({ name: "", value: 10.50 }),
    ).toThrow("Name is required");
  });

  test("should reject payload with whitespace-only name", () => {
    expect(() =>
      validateQrCodePayload({ name: "   ", value: 10.50 }),
    ).toThrow(ValidationError);
  });

  test("should reject payload without name", () => {
    expect(() =>
      validateQrCodePayload({ value: 10.50 } as { name: string; value: number }),
    ).toThrow(ValidationError);
  });

  test("should reject payload with both missing name and invalid value", () => {
    expect(() =>
      validateQrCodePayload({ value: 0 } as { name: string; value: number }),
    ).toThrow(ValidationError);
  });

  test("should provide correct error code for missing name", () => {
    try {
      validateQrCodePayload({ name: "" });
      fail("Expected ValidationError to be thrown");
    } catch (error) {
      if (error instanceof ValidationError) {
        expect(error.code).toBe("MISSING_NAME");
      } else {
        fail("Expected error to be instance of ValidationError");
      }
    }
  });
});

describe("QrCodeValidator (deprecated)", () => {
  test("should provide backward compatibility with validateValue", () => {
    expect(() => QrCodeValidator.validateValue(0)).toThrow(ValidationError);
    expect(() => QrCodeValidator.validateValue(10.50)).not.toThrow();
  });

  test("should provide backward compatibility with validate", () => {
    expect(() =>
      QrCodeValidator.validate({ name: "Test", value: 0 }),
    ).toThrow(ValidationError);
    expect(() =>
      QrCodeValidator.validate({ name: "Test", value: 10.50 }),
    ).not.toThrow();
  });
});

describe("ValidationError", () => {
  test("should create error with code and message", () => {
    const error = new ValidationError("TEST_CODE", "Test error message");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.code).toBe("TEST_CODE");
    expect(error.message).toBe("Test error message");
    expect(error.name).toBe("ValidationError");
  });

  test("should be catchable as Error", () => {
    try {
      throw new ValidationError("TEST_CODE", "Test error");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error instanceof Error).toBe(true);
    }
  });
});
