export interface Comics {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data;
}

export interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result[];
}

export interface Result {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  rutaImagen: string;
  type: Type;
  modified: Modified;
  thumbnail: Thumbnail;
  creators: Creators;
  characters: Characters;
  series: Characters;
  comics: Characters;
  events: Characters;
  originalIssue: OriginalIssue;
}

export interface Characters {
  available: number;
  collectionURI: string;
  items: OriginalIssue[];
  returned: number;
}

export interface OriginalIssue {
  resourceURI: string;
  name: string;
}

export interface Creators {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Item {
  resourceURI: string;
  name: string;
  role: string;
}

export enum Modified {
  The19691231T1900000500 = '1969-12-31T19:00:00-0500',
}

export enum Type {
  Cover = 'cover',
  Story = 'story',
}

export interface Thumbnail {
  path: string;
  extension: string;
}
