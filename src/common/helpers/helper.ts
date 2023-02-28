import { ScreenMode } from '@common/enums/Mode';
import stringify from 'fast-safe-stringify';


export const parsePage = (page: unknown): any => {
  // Kill circular references
  return JSON.parse(stringify(page)) as any;
};

export const findCopy = (sections: any[], field: string) => {
  const data = sections?.find(x => x.fields.id === field);
  return data ? data?.fields?.singleCopy : null;
}

export const unmaskMobile = (value: string) => {
  return value.replaceAll(' ', '').replace('(', '').replace(')', '').replaceAll('_', '')
}
export const insertAt = (str: string, index: number, value: any) => {
  return str.slice(0, index) + value + str.slice(index);
}
export const maskMobile = (mobile: string) => {
  if (!mobile || mobile.length < 10) return;
  var v1 = insertAt(mobile, 0, '(')
  var v2 = insertAt(v1, 4, ')')
  var v3 = insertAt(v2, 5, ' ')
  var v4 = insertAt(v3, 9, '-')
  return v4;
}

export const replaceAt = (string, index, valueToReplace) => {
  return string.substring(0, index) + valueToReplace + string.substring(index + 1)
}

export const isMobile = (screenWidth: ScreenMode) => {
  return screenWidth === ScreenMode.Mobile
}
export const isDesktop = (screenMode: ScreenMode) => {
  return screenMode === ScreenMode.Desktop
}