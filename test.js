/* function extrairCaminho(url) {
  const regex = /\/waiter-app\/(.+)$/i;
  const match = url.match(regex);

  if (match ?? match[1]) {
    return match[1];
  }

  return null;
}

const url =
  'https://htkgccwbhmnkbtwrhzyf.supabase.co/storage/v1/object/public/waiter-app/04a3e89e-cd64-4823-8c3d-da1cbd3c03cd/sucos.png';
const caminhoExtraido = extrairCaminho(url);

if (caminhoExtraido) {
  console.log(caminhoExtraido);
} else {
  console.error('O caminho não pôde ser extraído.');
} */

import URL from 'node:url';

function extractPath(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname;
}

const url =
  'https://htkgccwbhmnkbtwrhzyf.supabase.co/storage/v1/object/public/waiter-app/04a3e89e-cd64-4823-8c3d-da1cbd3c03cd/sucos.png';

const path = extractPath(url);
console.log(path);
