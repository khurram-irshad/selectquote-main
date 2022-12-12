import { parsePage } from '@helpers/helper';
import { GetEntryParams } from '../types/types';
import { getClient } from './client';


const getEntryQuery = (params: GetEntryParams) => ({
  limit: 1,
  include: 5,
  'fields.slug': params.slug,
  content_type: params.pageContentType,
  ...(params?.select && { select: params.select })

});

export async function getEntry(params: any, context: any) {
  const query = getEntryQuery(params);
  const { items } = await getClient(context).getEntries(query);
  const page = items[0];

  return page ? parsePage(page) : null;
}

const getEntriesQuery = (params: any) => ({
  content_type: params.pageContentType,
});


export async function getEntries(params: any, context: any) {
  const query = getEntriesQuery(params);
  const { items } = await getClient(context).getEntries(query);
  return items ? parsePage(items) : [];
}



