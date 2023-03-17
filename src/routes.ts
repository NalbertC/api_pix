import { Router } from "express";
import { cobranca, pix, qrCode, webhook } from "./services/gerencianet";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).json({ hello: "world!" });
});

router.get("/qrcode", qrCode);
router.get("/cob", cobranca);
router.post("/webhook(/pix)?", webhook);
router.get("/pix", pix);

export { router };
