#!/usr/bin/env node
/**
 * Arrêt propre de l'agent SEO (envoie SIGINT au process)
 */
import { readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

const SEO_DIR = join(resolve(process.cwd()), 'seo-agent');

async function stop() {
  try {
    const state = JSON.parse(await readFile(join(SEO_DIR, 'state.json'), 'utf-8'));
    if (state.status !== 'running') {
      console.log('Agent non actif (status:', state.status, ')');
      return;
    }
    state.status = 'stopping';
    await writeFile(join(SEO_DIR, 'state.json'), JSON.stringify(state, null, 2), 'utf-8');
    console.log('Signal d\'arrêt envoyé. L\'agent finira son cycle en cours puis s\'arrêtera.');
  } catch {
    console.log('Impossible de lire l\'état. L\'agent n\'est peut-être pas en cours d\'exécution.');
  }
}

stop();
