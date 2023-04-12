import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

import { GNRequest } from "../config/credentials";

const reqGNAlready = GNRequest();

// gerar o qrcode pix
export const qrCode = async (req: Request, res: Response) => {
  const reqGN = await reqGNAlready;

  const dataCob = {
    calendario: {
      expiracao: 3600,
    },
    devedor: {
      cpf: "12345678909",
      nome: "Francisco da Silva",
    },
    valor: {
      original: "00.10",
    },
    chave: `${String(process.env.CHAVE_PIX_ALEATORIA)}`,
    solicitacaoPagador: "Informe o número ou identificador do pedido.",
  };

  const cobResponse = await reqGN.post("/v2/cob", dataCob);

  const qrcodeResponse = await reqGN.get(
    `/v2/loc/${cobResponse.data.loc.id}/qrcode`
  );

  return res.render("qrcode", {
    qrcodeImage: qrcodeResponse.data.imagemQrcode,
    qrCode: qrcodeResponse.data.qrcode,
  });
};

export const cobranca = async (req: Request, res: Response) => {
  const reqGN = await reqGNAlready;

  const cobResponse = await reqGN.get(
    "/v2/cob?inicio=2022-01-10T16:01:35Z&fim=2024-03-17T00:30:00Z"
  );

  return res.json(cobResponse.data);
};

export const pix = async (req: Request, res: Response) => {
  const reqGN = await reqGNAlready;

  const cobResponse = await reqGN.get(
    "/v2/pix?inicio=2022-01-10T16:01:35Z&fim=2024-03-17T00:30:00Z"
  );

  return res.json(cobResponse.data);
};

export const webhook = async (req: Request, res: Response) => {
  console.log(req.body);

  return res.render("success");
};

export const teste = async (req: Request, res: Response) => {
  const teste = req.baseUrl;

  return res.render("teste");
};
