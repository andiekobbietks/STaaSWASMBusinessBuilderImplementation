type ChatRequest = {
  method?: string;
};

type ChatResponse = {
  status: (code: number) => ChatResponse;
  json: (body: unknown) => void;
};

/**
 * Chat inference is deliberately unavailable until an authenticated gateway,
 * per-user authorisation, request limits and provider-side safeguards exist.
 * Do not re-enable with an environment flag: implement and test those controls
 * before replacing this fail-closed handler.
 */
export default function handler(_req: ChatRequest, res: ChatResponse) {
  res.status(503).json({
    error: "Chat inference is disabled until the authenticated gateway is implemented.",
  });
}
