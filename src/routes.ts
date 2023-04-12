import { Router } from "express";
import { cobranca, pix, qrCode, teste, webhook } from "./services/gerencianet";

const router = Router();

router.get("/", qrCode);
router.get("/cob", cobranca);
router.post("/webhook(/pix)?", webhook);
router.get("/pix", pix);

router.get("/teste", teste);

export { router };
