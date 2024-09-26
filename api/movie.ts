import fetch from "node-fetch";
import { VercelRequest, VercelResponse } from "@vercel/node";

const { OMDB_API_KEY } = process.env;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // request: server로 요청이 들어올 때 그 요청 정보가 들어있는 매개변수
  // response: server에서 응답을 해줄 때 사용할 수 있는 여러가지 methods가 들어있는 매개변수
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://omdbapi.com?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://omdbapi.com?apikey=${OMDB_API_KEY}&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json);
}
