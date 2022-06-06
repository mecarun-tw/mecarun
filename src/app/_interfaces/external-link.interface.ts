import { environment } from 'src/environments/environment';
export interface ExternalLink {
  site: string;
  externalUrl: string;
}

export function getExternalLinkIconUrl(site: string): string|undefined {
  const index = environment.EXTERNAL_LINK_SITES.findIndex(link => link.SITE === site);
  if (index > -1) {
    return environment.EXTERNAL_LINK_SITES[index].IMAGE_URL;
  } else {
    return undefined;
  }
}