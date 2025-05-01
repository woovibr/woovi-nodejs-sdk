import crypto from "node:crypto";
import constants from "@utils/constants";
import type {
  HandlerFn,
  VerifyPayloadType,
  WebhookPayload,
  WebhookRegistrationConfig,
  WebhooksHandler,
  WebhooksHandlerMap,
} from "./types";

export default (config: WebhookRegistrationConfig): WebhooksHandler => {
  return {
    config: config,
    POST: async (req: Request) => await handleWebhooks(config, req),
  };
};

export const verifyPayload = ({ payload, signature }: VerifyPayloadType) => {
  const publicKey = Buffer.from(constants.WH_PUBLIC_KEY, "base64").toString(
    "ascii",
  );

  const verify = crypto.createVerify(constants.WH_ALGORITHM);

  verify.write(Buffer.from(payload));
  verify.end();

  const isValid = verify.verify(
    publicKey,
    signature,
    constants.WH_SIGNATURE_FORMAT,
  );

  return isValid;
};

export async function handleWebhooks(
  config: WebhookRegistrationConfig,
  req: Request,
): Promise<Response> {
  const webhook_signature = req.headers.get("x-webhook-signature");

  if (!webhook_signature) {
    return new Response("Error occurred -- no x-webhook-signature header", {
      status: 400,
    });
  }

  const payloadString = await req.text();
  const payload: WebhookPayload = JSON.parse(payloadString);

  if (
    !verifyPayload({
      payload: payloadString,
      signature: webhook_signature,
    })
  )
    return new Response("Error occurred -- invalid signature", {
      status: 400,
    });

  if ((payload as any)?.evento === "teste_webhook") {
    return new Response("Test webhook acknowledged", { status: 200 });
  }

  const handlerMap: WebhooksHandlerMap = {
    "OPENPIX:CHARGE_CREATED": config.onChargeCreated,
    "OPENPIX:CHARGE_COMPLETED": config.onChargeCompleted,
    "OPENPIX:CHARGE_EXPIRED": config.onChargeExpired,
    "OPENPIX:TRANSACTION_RECEIVED": config.onTransactionReceived,
    "OPENPIX:TRANSACTION_REFUND_RECEIVED": config.onTransactionRefundReceived,
    "OPENPIX:MOVEMENT_CONFIRMED": config.onMovementConfirmed,
    "OPENPIX:MOVEMENT_FAILED": config.onMovementFailed,
    "OPENPIX:MOVEMENT_REMOVED": config.onMovementRemoved,
  };

  if (handlerMap[payload.event]) {
    return await _handler(
      payload,
      handlerMap[payload.event] as HandlerFn<WebhookPayload>,
    );
  }

  return new Response("", { status: 404 });
}

async function _handler(
  event: WebhookPayload,
  callback: HandlerFn<WebhookPayload>,
): Promise<Response> {
  const response = await callback(event);
  if (response) return response;

  return new Response("", { status: 200 });
}
